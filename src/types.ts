import type { HomeAssistant } from 'custom-card-helpers';

export type { HomeAssistant };

export interface EmbyCardConfig {
  type: string;
  host: string;
  port?: number;
  protocol?: 'http' | 'https';
  apiKey: string;
  userId: string;
  libraryName: string;
  title?: string;
  devices?: string[];
  showSearch?: boolean;
  showExtras?: boolean;
  playTrailer?: boolean;
  sort?: string;
  sortOrder?: 'Ascending' | 'Descending';
  maxRows?: number;
  maxCount?: number;
  minWidth?: number;
  minExpandedWidth?: number;
  minExpandedHeight?: number;
  useHorizontalScroll?: boolean;
  runBefore?: string;
  runAfter?: string;
}

export interface EmbyActiveSessionsConfig {
  type: string;
  host: string;
  port?: number;
  protocol?: 'http' | 'https';
  apiKey: string;
  title?: string;
  showScanLibrary?: boolean;
}

export interface EmbyUser {
  id: string;
  name: string;
}

export interface EmbyView {
  id: string;
  name: string;
  collectionType?: string;
}

export interface EmbyItem {
  id: string;
  name: string;
  type: string;
  overview?: string;
  productionYear?: number;
  communityRating?: number;
  officialRating?: string;
  runTimeTicks?: number;
  genres?: string[];
  seriesId?: string;
  seriesName?: string;
  seasonId?: string;
  parentIndexNumber?: number;
  indexNumber?: number;
  userData?: {
    played?: boolean;
    playbackPositionTicks?: number;
    playedPercentage?: number;
    unplayedItemCount?: number;
  };
  imageTags?: Record<string, string>;
  backdropImageTags?: string[];
  people?: { name: string; type: string }[];
  studios?: { name: string }[];
}

export interface EmbySession {
  id: string;
  deviceId: string;
  deviceName: string;
  client: string;
  userId?: string;
  supportsRemoteControl: boolean;
  playableMediaTypes: string[];
  nowPlayingItem?: EmbyItem;
}

export interface EmbyProgram {
  id: string;
  name: string;
  channelId: string;
  startDate: string;
  endDate: string;
  overview?: string;
}

export interface ItemsQuery {
  parentId?: string;
  includeItemTypes?: string;
  recursive?: boolean;
  sortBy?: string;
  sortOrder?: string;
  limit?: number;
  fields?: string;
  seasonId?: string;
}

export interface ResolvedTarget {
  kind: 'cast' | 'session';
  entityId?: string;
  sessionId?: string;
  label: string;
}
