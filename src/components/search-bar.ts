import { LitElement, html, css } from 'lit';
import { haTokens } from '../styles/ha-tokens';
import { debounce } from '../modules/utils';

export class EmbySearchBar extends LitElement {
  static properties = {
    value: { type: String },
  };

  value = '';

  static styles = [
    haTokens,
    css`
      input {
        width: 100%;
        box-sizing: border-box;
        padding: 8px 12px;
        border-radius: var(--emby-border-radius);
        border: 1px solid rgba(255, 255, 255, 0.15);
        background: rgba(255, 255, 255, 0.06);
        color: var(--emby-primary-text);
        font-size: 0.95rem;
      }
      input:focus {
        outline: none;
        border-color: var(--emby-accent);
      }
    `,
  ];

  private emit = debounce((value: string) => {
    this.dispatchEvent(new CustomEvent('emby-search', { detail: value, bubbles: true, composed: true }));
  }, 200);

  private onInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.emit(value);
  }

  render() {
    return html`<input type="text" placeholder="Search…" .value=${this.value} @input=${this.onInput} />`;
  }
}

customElements.define('emby-search-bar', EmbySearchBar);
