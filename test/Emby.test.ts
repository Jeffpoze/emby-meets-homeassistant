import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Emby } from '../src/modules/Emby';
import itemsFixture from './fixtures/items.json';
import sessionsFixture from './fixtures/sessions.json';

function mockFetchOnce(body: unknown, status = 200) {
  global.fetch = vi.fn().mockResolvedValue({
    ok: status < 400,
    status,
    statusText: 'OK',
    text: async () => JSON.stringify(body),
  }) as unknown as typeof fetch;
}

describe('Emby', () => {
  let emby: Emby;

  beforeEach(() => {
    emby = new Emby('192.168.1.50', 8096, 'http', 'test-api-key');
  });

  it('attaches X-Emby-Token header on every request', async () => {
    mockFetchOnce({ Items: [] });
    await emby.getItems('user-1', {});
    const [, init] = (fetch as any).mock.calls[0];
    expect(init.headers['X-Emby-Token']).toBe('test-api-key');
  });

  it('builds getItems query params correctly, including defaults', async () => {
    mockFetchOnce({ Items: [] });
    await emby.getItems('user-1', { parentId: 'lib-1', sortBy: 'SortName', limit: 10 });
    const [url] = (fetch as any).mock.calls[0];
    const parsed = new URL(url);
    expect(parsed.pathname).toBe('/emby/Users/user-1/Items');
    expect(parsed.searchParams.get('ParentId')).toBe('lib-1');
    expect(parsed.searchParams.get('SortBy')).toBe('SortName');
    expect(parsed.searchParams.get('Limit')).toBe('10');
    expect(parsed.searchParams.get('Recursive')).toBe('true');
  });

  it('maps raw Emby item JSON into the internal EmbyItem shape', async () => {
    mockFetchOnce(itemsFixture);
    const items = await emby.getItems('user-1', {});
    expect(items).toEqual([
      {
        id: 'item-1',
        name: 'Example Movie',
        type: 'Movie',
        overview: undefined,
        productionYear: 2024,
        communityRating: 7.8,
        officialRating: undefined,
        runTimeTicks: 72000000000,
        genres: ['Action', 'Sci-Fi'],
        seriesId: undefined,
        seriesName: undefined,
        seasonId: undefined,
        parentIndexNumber: undefined,
        indexNumber: undefined,
        userData: { played: false, playbackPositionTicks: 0, playedPercentage: 0 },
        imageTags: undefined,
        backdropImageTags: undefined,
        people: undefined,
        studios: undefined,
      },
    ]);
  });

  it('maps raw Emby session JSON into the internal EmbySession shape', async () => {
    mockFetchOnce(sessionsFixture);
    const sessions = await emby.getSessions();
    expect(sessions).toHaveLength(2);
    expect(sessions[0]).toMatchObject({
      id: 'session-1',
      deviceName: 'Living Room Apple TV',
      client: 'Emby for Apple TV',
      supportsRemoteControl: true,
    });
  });

  it('builds an image URL with the api key and sizing params', () => {
    const url = emby.imageUrl('item-1', 'Primary', { maxWidth: 300 });
    const parsed = new URL(url);
    expect(parsed.pathname).toBe('/emby/Items/item-1/Images/Primary');
    expect(parsed.searchParams.get('maxWidth')).toBe('300');
    expect(parsed.searchParams.get('api_key')).toBe('test-api-key');
  });

  it('builds a direct stream URL', () => {
    const url = emby.streamUrl('item-1');
    const parsed = new URL(url);
    expect(parsed.pathname).toBe('/emby/Videos/item-1/stream');
    expect(parsed.searchParams.get('Static')).toBe('true');
  });

  it('throws EmbyRequestError on a non-ok response', async () => {
    mockFetchOnce({}, 404);
    await expect(emby.getItem('user-1', 'missing')).rejects.toThrow(/404/);
  });

  it('sends session playback commands as POST', async () => {
    mockFetchOnce({});
    await emby.playOnSession('session-1', ['item-1']);
    const [url, init] = (fetch as any).mock.calls[0];
    expect(init.method).toBe('POST');
    expect(new URL(url).pathname).toBe('/emby/Sessions/session-1/Playing');
  });
});
