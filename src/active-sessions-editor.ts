import { LitElement, html, nothing } from 'lit';
import { ACTIVE_SESSIONS_EDITOR_TYPE } from './const';
import type { EmbyActiveSessionsConfig, HomeAssistant } from './types';

const SCHEMA = [
  { name: 'host', required: true, selector: { text: {} } },
  { name: 'port', selector: { number: { mode: 'box' } } },
  { name: 'protocol', selector: { select: { options: ['http', 'https'], mode: 'dropdown' } } },
  { name: 'apiKey', required: true, selector: { text: {} } },
  { name: 'title', selector: { text: {} } },
  { name: 'showScanLibrary', selector: { boolean: {} } },
];

export class EmbyActiveSessionsEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  hass!: HomeAssistant;
  private _config!: EmbyActiveSessionsConfig;

  setConfig(config: EmbyActiveSessionsConfig): void {
    this._config = { ...config };
  }

  private _valueChanged(e: CustomEvent) {
    this._config = { ...this._config, ...e.detail.value };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
  }

  render() {
    if (!this._config) return nothing;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${(s: { name: string }) => s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}

customElements.define(ACTIVE_SESSIONS_EDITOR_TYPE, EmbyActiveSessionsEditor);
