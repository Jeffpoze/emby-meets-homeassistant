import { LitElement, html, nothing } from 'lit';
import { DEFAULT_PORT, DEFAULT_PROTOCOL, EDITOR_TYPE, PSEUDO_LIBRARY } from './const';
import { Emby } from './modules/Emby';
import { parseEmbyHost } from './modules/utils';
import type { EmbyCardConfig, EmbyUser, EmbyView, HomeAssistant } from './types';

const SCHEMA = [
  { name: 'host', required: true, selector: { text: {} } },
  { name: 'port', selector: { number: { mode: 'box' } } },
  {
    name: 'protocol',
    selector: { select: { options: ['http', 'https'], mode: 'dropdown' } },
  },
  { name: 'apiKey', required: true, selector: { text: {} } },
];

export class EmbyMeetsHomeAssistantEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _users: { state: true },
    _views: { state: true },
  };

  hass!: HomeAssistant;
  private _config!: EmbyCardConfig;
  private _users: EmbyUser[] = [];
  private _views: EmbyView[] = [];

  setConfig(config: EmbyCardConfig): void {
    this._config = { ...config };
    this._refreshServerData();
  }

  private async _refreshServerData() {
    if (!this._config?.host || !this._config?.apiKey) return;
    try {
      const { protocol, host, port } = parseEmbyHost(
        this._config.host,
        this._config.protocol ?? DEFAULT_PROTOCOL,
        this._config.port ?? DEFAULT_PORT,
      );
      const emby = new Emby(host, port, protocol, this._config.apiKey);
      this._users = await emby.getUsers();
      if (this._config.userId) {
        this._views = await emby.getViews(this._config.userId);
      }
    } catch {
      // connection not ready yet (still typing host/key) — ignore until it works
    }
  }

  private _valueChanged(e: CustomEvent) {
    const newConfig = { ...this._config, ...e.detail.value };
    this._config = newConfig;
    this._fireChanged();
    this._refreshServerData();
  }

  private _fieldChanged(key: keyof EmbyCardConfig, value: unknown) {
    this._config = { ...this._config, [key]: value };
    this._fireChanged();
    this._refreshServerData();
  }

  private _fireChanged() {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
  }

  render() {
    if (!this._config) return nothing;

    const libraryOptions = [
      ...Object.values(PSEUDO_LIBRARY),
      ...this._views.map((v) => v.name),
    ];

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${(s: { name: string }) => s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[
          {
            name: 'userId',
            required: true,
            selector: {
              select: {
                mode: 'dropdown',
                options: this._users.map((u) => ({ value: u.id, label: u.name })),
              },
            },
          },
        ]}
        .computeLabel=${() => 'Emby user'}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[
          {
            name: 'libraryName',
            required: true,
            selector: libraryOptions.length
              ? { select: { mode: 'dropdown', options: libraryOptions, custom_value: true } }
              : { text: {} },
          },
        ]}
        .computeLabel=${() => 'Library'}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-textfield
        label="Devices (comma-separated: media_player.* entities for Cast, or Emby device/client names)"
        .value=${(this._config.devices ?? []).join(', ')}
        @change=${(e: Event) =>
          this._fieldChanged(
            'devices',
            (e.target as HTMLInputElement).value
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
          )}
        style="display:block;margin-top:16px;width:100%;"
      ></ha-textfield>

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[
          { name: 'title', selector: { text: {} } },
          { name: 'showSearch', selector: { boolean: {} } },
          { name: 'showExtras', selector: { boolean: {} } },
          { name: 'playTrailer', selector: { boolean: {} } },
          { name: 'useHorizontalScroll', selector: { boolean: {} } },
          { name: 'minWidth', selector: { number: { mode: 'box' } } },
          { name: 'sort', selector: { text: {} } },
          {
            name: 'sortOrder',
            selector: { select: { options: ['Ascending', 'Descending'], mode: 'dropdown' } },
          },
          { name: 'maxCount', selector: { number: { mode: 'box' } } },
          { name: 'runBefore', selector: { entity: { domain: 'script' } } },
          { name: 'runAfter', selector: { entity: { domain: 'script' } } },
        ]}
        .computeLabel=${(s: { name: string }) => s.name}
        @value-changed=${this._valueChanged}
        style="display:block;margin-top:16px;"
      ></ha-form>
    `;
  }
}

customElements.define(EDITOR_TYPE, EmbyMeetsHomeAssistantEditor);
