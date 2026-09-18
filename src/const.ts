export const CARD_TYPE = 'emby-meets-homeassistant';
export const CARD_NAME = 'Emby Meets Home Assistant';
export const EDITOR_TYPE = 'emby-meets-homeassistant-editor';

export const ACTIVE_SESSIONS_CARD_TYPE = 'emby-active-sessions';
export const ACTIVE_SESSIONS_CARD_NAME = 'Emby Active Sessions';
export const ACTIVE_SESSIONS_EDITOR_TYPE = 'emby-active-sessions-editor';
export const ACTIVE_SESSIONS_POLL_MS = 10_000;

export const PSEUDO_LIBRARY = {
  CONTINUE_WATCHING: 'Continue Watching',
  NEXT_UP: 'Next Up',
  RECENTLY_ADDED: 'Recently Added',
} as const;

export type PseudoLibraryName = (typeof PSEUDO_LIBRARY)[keyof typeof PSEUDO_LIBRARY];

export const DEFAULT_PORT = 8096;
export const DEFAULT_PROTOCOL = 'http';
export const DEFAULT_MIN_WIDTH = 150;
export const DEFAULT_MIN_EXPANDED_WIDTH = 300;
export const DEFAULT_MIN_EXPANDED_HEIGHT = 450;
export const DEFAULT_MAX_COUNT = 100;
export const DEFAULT_SORT = 'SortName';
export const DEFAULT_SORT_ORDER = 'Ascending';

export const CAST_ENTITY_PREFIX = 'media_player.';
