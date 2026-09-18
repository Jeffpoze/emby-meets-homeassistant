import { CAST_ENTITY_PREFIX } from '../const';
import { Emby } from './Emby';
import type { EmbyItem, HomeAssistant, ResolvedTarget } from '../types';

function isCastEntity(device: string): boolean {
  return device.startsWith(CAST_ENTITY_PREFIX);
}

export class EmbyPlayController {
  constructor(
    private hass: HomeAssistant,
    private emby: Emby,
    private devices: string[],
  ) {}

  setHass(hass: HomeAssistant): void {
    this.hass = hass;
  }

  /** Walks configured devices in order; first one that's a Cast entity in a usable
   * state, or matches a live Emby session, wins. Mirrors the original card's
   * "first configured+available device wins" contract. */
  async resolveTarget(): Promise<ResolvedTarget | null> {
    if (!this.devices?.length) return null;

    let sessions: Awaited<ReturnType<Emby['getSessions']>> | undefined;

    for (const device of this.devices) {
      if (isCastEntity(device)) {
        const state = this.hass.states[device];
        if (state && state.state !== 'unavailable' && state.state !== 'unknown') {
          return { kind: 'cast', entityId: device, label: state.attributes?.friendly_name || device };
        }
        continue;
      }

      if (!sessions) {
        sessions = await this.emby.getSessions();
      }
      const match = sessions.find(
        (s) =>
          s.supportsRemoteControl &&
          (s.deviceName?.toLowerCase() === device.toLowerCase() ||
            s.client?.toLowerCase() === device.toLowerCase()),
      );
      if (match) {
        return { kind: 'session', sessionId: match.id, label: match.deviceName || match.client };
      }
    }

    return null;
  }

  async runScript(entityId?: string): Promise<void> {
    if (!entityId) return;
    const domain = entityId.split('.')[0];
    await this.hass.callService(domain, 'turn_on', { entity_id: entityId });
  }

  async play(
    item: EmbyItem,
    target: ResolvedTarget,
    opts: { runBefore?: string; runAfter?: string } = {},
  ): Promise<void> {
    if (opts.runBefore) await this.runScript(opts.runBefore);

    if (target.kind === 'cast' && target.entityId) {
      await this.hass.callService('media_player', 'play_media', {
        entity_id: target.entityId,
        media_content_id: this.emby.streamUrl(item.id),
        media_content_type: item.type === 'Audio' ? 'music' : 'video',
      });
    } else if (target.kind === 'session' && target.sessionId) {
      await this.emby.playOnSession(target.sessionId, [item.id]);
    }

    if (opts.runAfter) await this.runScript(opts.runAfter);
  }

  async command(
    target: ResolvedTarget,
    cmd: 'Pause' | 'Unpause' | 'Stop' | 'Seek',
    seekPositionTicks?: number,
  ): Promise<void> {
    if (target.kind === 'cast' && target.entityId) {
      const serviceMap: Record<string, string> = {
        Pause: 'media_pause',
        Unpause: 'media_play',
        Stop: 'media_stop',
      };
      const service = serviceMap[cmd];
      if (service) {
        await this.hass.callService('media_player', service, { entity_id: target.entityId });
      }
      return;
    }
    if (target.kind === 'session' && target.sessionId) {
      await this.emby.sendPlaystateCommand(target.sessionId, cmd, seekPositionTicks);
    }
  }
}
