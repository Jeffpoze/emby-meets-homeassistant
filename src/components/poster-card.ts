import { LitElement, html, css, nothing } from 'lit';
import { haTokens } from '../styles/ha-tokens';
import type { EmbyItem } from '../types';

export class EmbyPosterCard extends LitElement {
  static properties = {
    item: { type: Object },
    imageUrl: { type: String, attribute: 'image-url' },
    canPlay: { type: Boolean, attribute: 'can-play' },
  };

  item!: EmbyItem;
  imageUrl = '';
  canPlay = false;

  static styles = [
    haTokens,
    css`
      :host {
        display: block;
      }
      .tile {
        position: relative;
        border-radius: var(--emby-border-radius);
        overflow: hidden;
        aspect-ratio: 2 / 3;
        background: #222 center / cover no-repeat;
        cursor: pointer;
        transform: scale(1);
        transition: transform 200ms ease, box-shadow 200ms ease;
      }
      .tile:hover,
      .tile:focus-within {
        transform: scale(1.08);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
        z-index: 1;
      }
      .badge {
        position: absolute;
        top: 8px;
        right: 8px;
        min-width: 22px;
        height: 22px;
        padding: 0 6px;
        border-radius: 11px;
        background: var(--emby-accent-secondary);
        color: white;
        font-size: 0.7rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
      }
      .progress {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 3px;
        background: rgba(255, 255, 255, 0.25);
      }
      .progress > div {
        height: 100%;
        background: var(--emby-accent);
      }
      .play {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        background: rgba(0, 0, 0, 0.35);
        transition: opacity 150ms ease;
      }
      .tile:hover .play,
      .tile:focus-within .play {
        opacity: 1;
      }
      .play ha-icon,
      .play svg {
        width: 42px;
        height: 42px;
        color: white;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
      }
      .title {
        margin-top: 6px;
        font-size: 0.85rem;
        color: var(--emby-primary-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .meta {
        font-size: 0.75rem;
        color: var(--emby-secondary-text);
      }
    `,
  ];

  private onClick() {
    this.dispatchEvent(new CustomEvent('emby-select', { detail: this.item, bubbles: true, composed: true }));
  }

  private onPlayClick(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('emby-play', { detail: this.item, bubbles: true, composed: true }));
  }

  render() {
    const pct = this.item?.userData?.playedPercentage;
    const unplayed = this.item?.userData?.unplayedItemCount;
    return html`
      <div class="tile" style="background-image:url(${this.imageUrl})" @click=${this.onClick} tabindex="0">
        ${this.canPlay
          ? html`<div class="play" @click=${this.onPlayClick}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </div>`
          : nothing}
        ${unplayed ? html`<div class="badge">${unplayed}</div>` : nothing}
        ${pct ? html`<div class="progress"><div style="width:${pct}%"></div></div>` : nothing}
      </div>
      <div class="title">${this.item?.name}</div>
      ${this.item?.productionYear
        ? html`<div class="meta">${this.item.productionYear}</div>`
        : nothing}
    `;
  }
}

customElements.define('emby-poster-card', EmbyPosterCard);
