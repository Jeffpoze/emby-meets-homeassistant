import { describe, expect, it, vi, beforeEach } from 'vitest';
import { EmbyPlayController } from '../src/modules/EmbyPlayController';
import { Emby } from '../src/modules/Emby';
import sessionsFixture from './fixtures/sessions.json';
import type { HomeAssistant } from '../src/types';

function mapSession(raw: any) {
  return {
    id: raw.Id,
    deviceId: raw.DeviceId,
    deviceName: raw.DeviceName,
    client: raw.Client,
    userId: raw.UserId,
    supportsRemoteControl: !!raw.SupportsRemoteControl,
    playableMediaTypes: raw.PlayableMediaTypes || [],
  };
}

function makeHass(states: Record<string, { state: string; attributes?: any }>): HomeAssistant {
  return {
    states,
    callService: vi.fn(),
  } as unknown as HomeAssistant;
}

describe('EmbyPlayController.resolveTarget', () => {
  let emby: Emby;

  beforeEach(() => {
    emby = new Emby('host', 8096, 'http', 'key');
    vi.spyOn(emby, 'getSessions').mockResolvedValue(sessionsFixture.map(mapSession) as any);
  });

  it('picks a cast entity first when it is configured first and available', async () => {
    const hass = makeHass({ 'media_player.living_room': { state: 'idle' } });
    const controller = new EmbyPlayController(hass, emby, [
      'media_player.living_room',
      'Living Room Apple TV',
    ]);
    const target = await controller.resolveTarget();
    expect(target).toEqual({ kind: 'cast', entityId: 'media_player.living_room', label: 'media_player.living_room' });
  });

  it('skips an unavailable cast entity and falls through to the next configured device', async () => {
    const hass = makeHass({ 'media_player.living_room': { state: 'unavailable' } });
    const controller = new EmbyPlayController(hass, emby, [
      'media_player.living_room',
      'Living Room Apple TV',
    ]);
    const target = await controller.resolveTarget();
    expect(target).toMatchObject({ kind: 'session', sessionId: 'session-1' });
  });

  it('matches a configured device name against a live Emby session, case-insensitively', async () => {
    const hass = makeHass({});
    const controller = new EmbyPlayController(hass, emby, ['living room apple tv']);
    const target = await controller.resolveTarget();
    expect(target).toMatchObject({ kind: 'session', sessionId: 'session-1' });
  });

  it('does not match a session that does not support remote control', async () => {
    const hass = makeHass({});
    const controller = new EmbyPlayController(hass, emby, ['Kids iPad']);
    const target = await controller.resolveTarget();
    expect(target).toBeNull();
  });

  it('returns null when no configured device is available', async () => {
    const hass = makeHass({ 'media_player.living_room': { state: 'unavailable' } });
    const controller = new EmbyPlayController(hass, emby, ['media_player.living_room', 'Unknown Device']);
    const target = await controller.resolveTarget();
    expect(target).toBeNull();
  });

  it('returns null when no devices are configured', async () => {
    const hass = makeHass({});
    const controller = new EmbyPlayController(hass, emby, []);
    const target = await controller.resolveTarget();
    expect(target).toBeNull();
  });
});
