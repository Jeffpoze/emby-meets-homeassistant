import { LitElement, html, css, nothing } from 'lit';
import { haTokens } from '../styles/ha-tokens';
import { formatRuntime } from '../modules/utils';
import type { Emby } from '../modules/Emby';
import type { EmbyItem } from '../types';
import './poster-grid';

export class EmbyDetailPanel extends LitElement {
  static properties = {
    item: { type: Object },
    emby: { attribute: false },
    userId: { type: String },
    canPlay: { type: Boolean, attribute: 'can-play' },
    _seasons: { state: true },
    _episodes: { state: true },
    _selectedSeasonId: { state: true },
  };

  item!: EmbyItem;
  emby!: Emby;
  userId = '';
  canPlay = false;
  private _seasons: EmbyItem[] = [];
  private _episodes: EmbyItem[] = [];
  private _selectedSeasonId?: string;

  static styles = [
    haTokens,
    css`
      :host {
        display: block;
        background: var(--emby-card-background);
        border-radius: var(--emby-border-radius);
        padding: 20px;
        position: relative;
        color: var(--emby-primary-text);
      }
      .close {
        position: absolute;
        top: 12px;
        right: 12px;
        cursor: pointer;
        color: var(--emby-secondary-text);
        background: rgba(255, 255, 255, 0.08);
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .layout {
        display: flex;
        gap: 24px;
        flex-wrap: wrap;
      }
      .poster {
        width: 220px;
        min-width: 160px;
        aspect-ratio: 2 / 3;
        border-radius: var(--emby-border-radius);
        background: #222 center / cover no-repeat;
        flex-shrink: 0;
      }
      .info {
        flex: 1;
        min-width: 240px;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 1.6rem;
      }
      .meta-row {
        color: var(--emby-secondary-text);
        font-size: 0.9rem;
        margin-bottom: 12px;
      }
      .meta-row span {
        margin-right: 12px;
      }
      .overview {
        line-height: 1.5;
        color: var(--emby-primary-text);
        margin-bottom: 16px;
      }
      .play-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: var(--emby-accent);
        color: white;
        border: none;
        border-radius: var(--emby-border-radius);
        padding: 10px 20px;
        font-size: 1rem;
        cursor: pointer;
      }
      .play-button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .season-tabs {
        display: flex;
        gap: 8px;
        margin: 16px 0;
        flex-wrap: wrap;
      }
      .season-tabs button {
        background: rgba(255, 255, 255, 0.08);
        border: none;
        color: var(--emby-primary-text);
        padding: 6px 14px;
        border-radius: 16px;
        cursor: pointer;
      }
      .season-tabs button.active {
        background: var(--emby-accent);
      }
    `,
  ];

  updated(changed: Map<string, unknown>) {
    if (changed.has('item') && this.item?.type === 'Series') {
      this._loadSeasons();
    }
  }

  private async _loadSeasons() {
    this._seasons = await this.emby.getSeasons(this.item.id, this.userId);
    if (this._seasons.length) {
      this._selectSeason(this._seasons[0].id);
    }
  }

  private async _selectSeason(seasonId: string) {
    this._selectedSeasonId = seasonId;
    this._episodes = await this.emby.getEpisodes(this.item.id, this.userId, seasonId);
  }

  private _play(item: EmbyItem = this.item) {
    this.dispatchEvent(new CustomEvent('emby-play', { detail: item, bubbles: true, composed: true }));
  }

  private _close() {
    this.dispatchEvent(new CustomEvent('emby-close', { bubbles: true, composed: true }));
  }

  render() {
    if (!this.item) return nothing;
    const genres = this.item.genres?.join(', ');
    return html`
      <div class="close" @click=${this._close}>✕</div>
      <div class="layout">
        <div
          class="poster"
          style="background-image:url(${this.emby.imageUrl(this.item.id, 'Primary', { maxWidth: 400 })})"
        ></div>
        <div class="info">
          <h1>${this.item.name}</h1>
          <div class="meta-row">
            ${this.item.productionYear ? html`<span>${this.item.productionYear}</span>` : nothing}
            ${this.item.officialRating ? html`<span>${this.item.officialRating}</span>` : nothing}
            ${this.item.communityRating
              ? html`<span>★ ${this.item.communityRating.toFixed(1)}</span>`
              : nothing}
            ${this.item.runTimeTicks ? html`<span>${formatRuntime(this.item.runTimeTicks)}</span>` : nothing}
          </div>
          ${this.item.overview ? html`<div class="overview">${this.item.overview}</div>` : nothing}
          ${genres ? html`<div class="meta-row">Genres: ${genres}</div>` : nothing}
          <button class="play-button" ?disabled=${!this.canPlay} @click=${() => this._play()}>▶ Play</button>
        </div>
      </div>
      ${this._seasons.length
        ? html`
            <div class="season-tabs">
              ${this._seasons.map(
                (s) => html`
                  <button
                    class=${s.id === this._selectedSeasonId ? 'active' : ''}
                    @click=${() => this._selectSeason(s.id)}
                  >
                    ${s.name}
                  </button>
                `,
              )}
            </div>
            <emby-poster-grid
              .items=${this._episodes}
              .getImageUrl=${(ep: EmbyItem) => this.emby.imageUrl(ep.id, 'Primary', { maxWidth: 300 })}
              .canPlay=${() => this.canPlay}
              min-width="220"
              @emby-select=${(e: CustomEvent) => this._play(e.detail)}
              @emby-play=${(e: CustomEvent) => this._play(e.detail)}
            ></emby-poster-grid>
          `
        : nothing}
    `;
  }
}

customElements.define('emby-detail-panel', EmbyDetailPanel);
