import { LitElement, html, css, nothing } from 'lit';
import { CARD_NAME, CARD_TYPE, DEFAULT_PORT, DEFAULT_PROTOCOL, EDITOR_TYPE, PSEUDO_LIBRARY } from './const';
import { Emby } from './modules/Emby';
import { EmbyPlayController } from './modules/EmbyPlayController';
import { matchesSearch, parseEmbyHost } from './modules/utils';
import { haTokens } from './styles/ha-tokens';
import type { EmbyCardConfig, EmbyItem, EmbyView, HomeAssistant, ResolvedTarget } from './types';
import './components/poster-grid';
import './components/search-bar';
import './components/detail-panel';
import './editor';
import './active-sessions-card';

const COLLECTION_TYPE_TO_ITEM_TYPE: Record<string, string> = {
  movies: 'Movie',
  tvshows: 'Series',
  music: 'MusicAlbum',
  musicvideos: 'MusicVideo',
  homevideos: 'Video',
  books: 'Book',
};

export class EmbyMeetsHomeAssistant extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _items: { state: true },
    _rowTitle: { state: true },
    _selectedItem: { state: true },
    _selectedItemFull: { state: true },
    _searchTerm: { state: true },
    _loading: { state: true },
    _error: { state: true },
  };

  hass!: HomeAssistant;
  private _config!: EmbyCardConfig;
  private _items: EmbyItem[] = [];
  private _rowTitle = '';
  private _selectedItem?: EmbyItem;
  private _selectedItemFull?: EmbyItem;
  private _searchTerm = '';
  private _loading = true;
  private _error = '';

  private emby!: Emby;
  private playController!: EmbyPlayController;
  private view?: EmbyView;

  static styles = [
    haTokens,
    css`
      :host {
        display: block;
        font-family: var(--emby-font);
      }
      ha-card {
        background: var(--emby-card-background);
        border-radius: var(--emby-border-radius);
        padding: 16px;
        overflow: hidden;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 16px;
        flex-wrap: wrap;
      }
      .title {
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--emby-primary-text);
      }
      .search-wrap {
        min-width: 200px;
      }
      .error {
        color: var(--error-color, #ff6b6b);
        padding: 16px 0;
      }
      .loading {
        color: var(--emby-secondary-text);
        padding: 24px 0;
        text-align: center;
      }
    `,
  ];

  setConfig(config: EmbyCardConfig): void {
    if (!config.host) throw new Error('emby-meets-homeassistant: "host" is required');
    if (!config.apiKey) throw new Error('emby-meets-homeassistant: "apiKey" is required');
    if (!config.userId) throw new Error('emby-meets-homeassistant: "userId" is required');
    if (!config.libraryName) throw new Error('emby-meets-homeassistant: "libraryName" is required');

    this._config = {
      protocol: DEFAULT_PROTOCOL,
      showSearch: true,
      showExtras: true,
      minWidth: 150,
      useHorizontalScroll: true,
      ...config,
    };

    const { protocol, host, port } = parseEmbyHost(
      this._config.host,
      this._config.protocol ?? DEFAULT_PROTOCOL,
      this._config.port ?? DEFAULT_PORT,
    );
    this.emby = new Emby(host, port, protocol, this._config.apiKey);
    this.playController = new EmbyPlayController(this.hass, this.emby, this._config.devices ?? []);
    this._loadData();
  }

  getCardSize(): number {
    return 5;
  }

  static getConfigElement() {
    return document.createElement(EDITOR_TYPE);
  }

  static getStubConfig() {
    return {
      host: '192.168.1.50',
      apiKey: '',
      userId: '',
      libraryName: 'Movies',
    };
  }

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('hass') && this.playController) {
      this.playController.setHass(this.hass);
    }
  }

  private async _loadData() {
    this._loading = true;
    this._error = '';
    try {
      const { libraryName, userId } = this._config;

      if (Object.values(PSEUDO_LIBRARY).includes(libraryName as any)) {
        this._rowTitle = this._config.title ?? libraryName;
        if (libraryName === PSEUDO_LIBRARY.CONTINUE_WATCHING) {
          this._items = await this.emby.getResume(userId, { limit: this._config.maxCount });
        } else if (libraryName === PSEUDO_LIBRARY.NEXT_UP) {
          this._items = await this.emby.getNextUp(userId, { limit: this._config.maxCount });
        } else if (libraryName === PSEUDO_LIBRARY.RECENTLY_ADDED) {
          this._items = await this.emby.getLatest(userId, { limit: this._config.maxCount });
        }
      } else {
        const views = await this.emby.getViews(userId);
        this.view = views.find((v) => v.name === libraryName);
        if (!this.view) {
          throw new Error(`Library "${libraryName}" not found on this Emby server`);
        }
        this._rowTitle = this._config.title ?? this.view.name;
        this._items = await this.emby.getItems(userId, {
          parentId: this.view.id,
          includeItemTypes: this.view.collectionType
            ? COLLECTION_TYPE_TO_ITEM_TYPE[this.view.collectionType]
            : undefined,
          sortBy: this._config.sort,
          sortOrder: this._config.sortOrder,
          limit: this._config.maxCount,
        });
      }
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    } finally {
      this._loading = false;
    }
  }

  private _getImageUrl = (item: EmbyItem) =>
    this.emby.imageUrl(item.id, 'Primary', { maxWidth: (this._config.minWidth ?? 150) * 2 });

  private _canPlay = () => !!this._config.devices?.length;

  private async _onSelect(e: CustomEvent<EmbyItem>) {
    this._selectedItem = e.detail;
    this._selectedItemFull = await this.emby.getItem(this._config.userId, e.detail.id);
  }

  private _onClose() {
    this._selectedItem = undefined;
    this._selectedItemFull = undefined;
  }

  private async _onPlay(e: CustomEvent<EmbyItem>) {
    const item = e.detail;
    const target: ResolvedTarget | null = await this.playController.resolveTarget();
    if (!target) {
      this._error = 'No configured device is currently available to play on.';
      return;
    }
    await this.playController.play(item, target, {
      runBefore: this._config.runBefore,
      runAfter: this._config.runAfter,
    });
  }

  private get _filteredItems(): EmbyItem[] {
    if (!this._searchTerm) return this._items;
    return this._items.filter((item) =>
      matchesSearch(this._searchTerm, item.name, item.seriesName, item.genres?.join(' ')),
    );
  }

  render() {
    return html`
      <ha-card>
        <div class="header">
          <div class="title">${this._rowTitle || this._config?.title || ''}</div>
          ${this._config?.showSearch
            ? html`<div class="search-wrap">
                <emby-search-bar @emby-search=${(e: CustomEvent<string>) => (this._searchTerm = e.detail)}></emby-search-bar>
              </div>`
            : nothing}
        </div>

        ${this._error ? html`<div class="error">${this._error}</div>` : nothing}
        ${this._loading ? html`<div class="loading">Loading…</div>` : nothing}

        ${this._selectedItem
          ? html`
              <emby-detail-panel
                .item=${this._selectedItemFull ?? this._selectedItem}
                .emby=${this.emby}
                .userId=${this._config.userId}
                ?can-play=${this._canPlay()}
                @emby-close=${this._onClose}
                @emby-play=${this._onPlay}
              ></emby-detail-panel>
            `
          : !this._loading && !this._error
            ? html`
                <emby-poster-grid
                  .items=${this._filteredItems}
                  .getImageUrl=${this._getImageUrl}
                  .canPlay=${this._canPlay}
                  ?horizontal=${this._config.useHorizontalScroll}
                  min-width=${this._config.minWidth ?? 150}
                  @emby-select=${this._onSelect}
                  @emby-play=${this._onPlay}
                ></emby-poster-grid>
              `
            : nothing}
      </ha-card>
    `;
  }
}

customElements.define(CARD_TYPE, EmbyMeetsHomeAssistant);

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TYPE,
  name: CARD_NAME,
  preview: false,
  description: 'Browse and play your Emby libraries from a Netflix-style card.',
});

declare global {
  interface Window {
    customCards: unknown[];
  }
}
