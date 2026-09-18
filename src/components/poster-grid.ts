import { LitElement, html, css } from 'lit';
import { haTokens } from '../styles/ha-tokens';
import './poster-card';
import type { EmbyItem } from '../types';

export class EmbyPosterGrid extends LitElement {
  static properties = {
    rowTitle: { type: String, attribute: 'row-title' },
    items: { type: Array },
    horizontal: { type: Boolean },
    minWidth: { type: Number, attribute: 'min-width' },
    getImageUrl: { attribute: false },
    canPlay: { attribute: false },
  };

  rowTitle = '';
  items: EmbyItem[] = [];
  horizontal = false;
  minWidth = 150;
  getImageUrl: (item: EmbyItem) => string = () => '';
  canPlay: (item: EmbyItem) => boolean = () => true;

  static styles = [
    haTokens,
    css`
      :host {
        display: block;
      }
      h2 {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--emby-primary-text);
        margin: 0 0 8px 4px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(var(--row-min-width, 150px), 1fr));
        gap: var(--emby-grid-gap);
      }
      .carousel {
        display: flex;
        gap: var(--emby-grid-gap);
        overflow-x: auto;
        scroll-snap-type: x proximity;
        padding-bottom: 4px;
      }
      .carousel emby-poster-card {
        flex: 0 0 auto;
        width: var(--row-min-width, 150px);
        scroll-snap-align: start;
      }
    `,
  ];

  render() {
    const style = `--row-min-width:${this.minWidth}px`;
    return html`
      ${this.rowTitle ? html`<h2>${this.rowTitle}</h2>` : ''}
      <div class="${this.horizontal ? 'carousel' : 'grid'}" style=${style}>
        ${this.items.map(
          (item) => html`
            <emby-poster-card
              .item=${item}
              image-url=${this.getImageUrl(item)}
              ?can-play=${this.canPlay(item)}
            ></emby-poster-card>
          `,
        )}
      </div>
    `;
  }
}

customElements.define('emby-poster-grid', EmbyPosterGrid);
