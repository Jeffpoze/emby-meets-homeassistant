import type {
  EmbyItem,
  EmbyProgram,
  EmbySession,
  EmbyUser,
  EmbyView,
  ItemsQuery,
} from '../types';

export class EmbyRequestError extends Error {
  constructor(
    message: string,
    public status: number,
    public url: string,
  ) {
    super(message);
    this.name = 'EmbyRequestError';
  }
}

const ITEM_FIELDS =
  'Overview,Genres,ProductionYear,CommunityRating,OfficialRating,RunTimeTicks,SeriesId,SeriesName,SeasonId,ParentIndexNumber,IndexNumber,People,Studios,BackdropImageTags';

function mapItem(raw: any): EmbyItem {
  return {
    id: raw.Id,
    name: raw.Name,
    type: raw.Type,
    overview: raw.Overview,
    productionYear: raw.ProductionYear,
    communityRating: raw.CommunityRating,
    officialRating: raw.OfficialRating,
    runTimeTicks: raw.RunTimeTicks,
    genres: raw.Genres,
    seriesId: raw.SeriesId,
    seriesName: raw.SeriesName,
    seasonId: raw.SeasonId,
    parentIndexNumber: raw.ParentIndexNumber,
    indexNumber: raw.IndexNumber,
    userData: raw.UserData && {
      played: raw.UserData.Played,
      playbackPositionTicks: raw.UserData.PlaybackPositionTicks,
      playedPercentage: raw.UserData.PlayedPercentage,
    },
    imageTags: raw.ImageTags,
    backdropImageTags: raw.BackdropImageTags,
    people: raw.People,
    studios: raw.Studios,
  };
}

function mapSession(raw: any): EmbySession {
  return {
    id: raw.Id,
    deviceId: raw.DeviceId,
    deviceName: raw.DeviceName,
    client: raw.Client,
    userId: raw.UserId,
    supportsRemoteControl: !!raw.SupportsRemoteControl,
    playableMediaTypes: raw.PlayableMediaTypes || [],
    nowPlayingItem: raw.NowPlayingItem ? mapItem(raw.NowPlayingItem) : undefined,
  };
}

function mapProgram(raw: any): EmbyProgram {
  return {
    id: raw.Id,
    name: raw.Name,
    channelId: raw.ChannelId,
    startDate: raw.StartDate,
    endDate: raw.EndDate,
    overview: raw.Overview,
  };
}

export class Emby {
  constructor(
    private host: string,
    private port: number,
    private protocol: string,
    private apiKey: string,
  ) {}

  private baseUrl(): string {
    return `${this.protocol}://${this.host}:${this.port}/emby`;
  }

  private buildUrl(path: string, params: Record<string, string | number | boolean | undefined> = {}): string {
    const url = new URL(`${this.baseUrl()}${path}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
    return url.toString();
  }

  private async request<T>(path: string, params?: Record<string, string | number | boolean | undefined>, init?: RequestInit): Promise<T> {
    const url = this.buildUrl(path, params);
    const response = await fetch(url, {
      ...init,
      headers: {
        'X-Emby-Token': this.apiKey,
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
    });
    if (!response.ok) {
      throw new EmbyRequestError(`Emby request failed: ${response.status} ${response.statusText}`, response.status, url);
    }
    if (response.status === 204) {
      return undefined as unknown as T;
    }
    const text = await response.text();
    return (text ? JSON.parse(text) : undefined) as T;
  }

  async getUsers(): Promise<EmbyUser[]> {
    const raw = await this.request<any[]>('/Users');
    return raw.map((u) => ({ id: u.Id, name: u.Name }));
  }

  async getViews(userId: string): Promise<EmbyView[]> {
    const raw = await this.request<{ Items: any[] }>(`/Users/${userId}/Views`);
    return raw.Items.map((v) => ({ id: v.Id, name: v.Name, collectionType: v.CollectionType }));
  }

  async getItems(userId: string, query: ItemsQuery = {}): Promise<EmbyItem[]> {
    const raw = await this.request<{ Items: any[] }>(`/Users/${userId}/Items`, {
      ParentId: query.parentId,
      IncludeItemTypes: query.includeItemTypes,
      Recursive: query.recursive ?? true,
      SortBy: query.sortBy,
      SortOrder: query.sortOrder,
      Limit: query.limit,
      Fields: query.fields ?? ITEM_FIELDS,
    });
    return raw.Items.map(mapItem);
  }

  async getItem(userId: string, itemId: string): Promise<EmbyItem> {
    const raw = await this.request<any>(`/Users/${userId}/Items/${itemId}`, { Fields: ITEM_FIELDS });
    return mapItem(raw);
  }

  async getResume(userId: string, opts: { limit?: number; parentId?: string } = {}): Promise<EmbyItem[]> {
    const raw = await this.request<{ Items: any[] }>(`/Users/${userId}/Items/Resume`, {
      Limit: opts.limit ?? 50,
      Recursive: true,
      MediaTypes: 'Video',
      ParentId: opts.parentId,
      Fields: ITEM_FIELDS,
    });
    return raw.Items.map(mapItem);
  }

  async getNextUp(userId: string, opts: { limit?: number } = {}): Promise<EmbyItem[]> {
    const raw = await this.request<{ Items: any[] }>('/Shows/NextUp', {
      UserId: userId,
      Limit: opts.limit ?? 50,
      Fields: ITEM_FIELDS,
    });
    return raw.Items.map(mapItem);
  }

  async getLatest(userId: string, opts: { limit?: number; parentId?: string } = {}): Promise<EmbyItem[]> {
    const raw = await this.request<any[]>(`/Users/${userId}/Items/Latest`, {
      Limit: opts.limit ?? 50,
      ParentId: opts.parentId,
      Fields: ITEM_FIELDS,
    });
    return raw.map(mapItem);
  }

  async getSeasons(seriesId: string, userId: string): Promise<EmbyItem[]> {
    const raw = await this.request<{ Items: any[] }>(`/Shows/${seriesId}/Seasons`, {
      UserId: userId,
      Fields: ITEM_FIELDS,
    });
    return raw.Items.map(mapItem);
  }

  async getEpisodes(seriesId: string, userId: string, seasonId?: string): Promise<EmbyItem[]> {
    const raw = await this.request<{ Items: any[] }>(`/Shows/${seriesId}/Episodes`, {
      UserId: userId,
      SeasonId: seasonId,
      Fields: ITEM_FIELDS,
    });
    return raw.Items.map(mapItem);
  }

  async getCollections(userId: string): Promise<EmbyItem[]> {
    return this.getItems(userId, { includeItemTypes: 'BoxSet' });
  }

  async getPlaylistItems(playlistId: string, userId: string): Promise<EmbyItem[]> {
    const raw = await this.request<{ Items: any[] }>(`/Playlists/${playlistId}/Items`, {
      UserId: userId,
      Fields: ITEM_FIELDS,
    });
    return raw.Items.map(mapItem);
  }

  async getLiveTvChannels(userId: string): Promise<EmbyItem[]> {
    const raw = await this.request<{ Items: any[] }>('/LiveTv/Channels', {
      UserId: userId,
      Fields: ITEM_FIELDS,
    });
    return raw.Items.map(mapItem);
  }

  async getEpg(channelIds: string[]): Promise<EmbyProgram[]> {
    const raw = await this.request<{ Items: any[] }>('/LiveTv/EPG', {
      ChannelIds: channelIds.join(','),
    });
    return raw.Items.map(mapProgram);
  }

  async getSessions(controllableByUserId?: string): Promise<EmbySession[]> {
    const raw = await this.request<any[]>('/Sessions', {
      ControllableByUserId: controllableByUserId,
    });
    return raw.map(mapSession);
  }

  imageUrl(
    itemId: string,
    type: 'Primary' | 'Backdrop' | 'Thumb' | 'Logo' = 'Primary',
    opts: { maxWidth?: number; maxHeight?: number; tag?: string; quality?: number } = {},
  ): string {
    return this.buildUrl(`/Items/${itemId}/Images/${type}`, {
      maxWidth: opts.maxWidth,
      maxHeight: opts.maxHeight,
      tag: opts.tag,
      quality: opts.quality ?? 90,
      api_key: this.apiKey,
    });
  }

  streamUrl(itemId: string): string {
    return this.buildUrl(`/Videos/${itemId}/stream`, {
      Static: true,
      api_key: this.apiKey,
    });
  }

  async playbackInfo(itemId: string, userId: string): Promise<any> {
    return this.request(`/Items/${itemId}/PlaybackInfo`, { UserId: userId }, { method: 'POST' });
  }

  async playOnSession(
    sessionId: string,
    itemIds: string[],
    opts: { startPositionTicks?: number } = {},
  ): Promise<void> {
    await this.request(
      `/Sessions/${sessionId}/Playing`,
      {
        ItemIds: itemIds.join(','),
        PlayCommand: 'PlayNow',
        StartPositionTicks: opts.startPositionTicks,
      },
      { method: 'POST' },
    );
  }

  async sendPlaystateCommand(
    sessionId: string,
    command: 'Stop' | 'Pause' | 'Unpause' | 'NextTrack' | 'PreviousTrack' | 'Seek',
    seekPositionTicks?: number,
  ): Promise<void> {
    await this.request(
      `/Sessions/${sessionId}/Playing/${command}`,
      { SeekPositionTicks: seekPositionTicks },
      { method: 'POST' },
    );
  }
}
