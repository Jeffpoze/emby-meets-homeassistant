import { LitElement, html, css, nothing } from 'lit';
import {
  ACTIVE_SESSIONS_CARD_NAME,
  ACTIVE_SESSIONS_CARD_TYPE,
  ACTIVE_SESSIONS_EDITOR_TYPE,
  ACTIVE_SESSIONS_POLL_MS,
  DEFAULT_PORT,
  DEFAULT_PROTOCOL,
} from './const';
import { Emby } from './modules/Emby';
import { parseEmbyHost } from './modules/utils';
import { haTokens } from './styles/ha-tokens';
import type { EmbyActiveSessionsConfig, EmbySession, HomeAssistant } from './types';
import './active-sessions-editor';

export class EmbyActiveSessionsCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _sessions: { state: true },
    _loading: { state: true },
    _error: { state: true },
    _scanning: { state: true },
  };

  hass!: HomeAssistant;
  private _config!: EmbyActiveSessionsConfig;
  private _sessions: EmbySession[] = [];
  private _loading = true;
  private _error = '';
  private _scanning = false;

  private emby!: Emby;
  private pollHandle?: ReturnType<typeof setInterval>;

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
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
      }
      .title {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--emby-primary-text);
      }
      .count {
        background: var(--emby-accent-secondary);
        color: white;
        border-radius: 12px;
        padding: 2px 10px;
        font-size: 0.85rem;
        font-weight: 700;
      }
      .empty {
        color: var(--emby-secondary-text);
        padding: 12px 0;
      }
      .error {
        color: var(--error-color, #ff6b6b);
      }
      .session {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 0;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }
      .session:first-of-type {
        border-top: none;
      }
      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .dot.playing {
        background: var(--emby-accent);
      }
      .dot.idle {
        background: var(--emby-secondary-text);
      }
      .session-info {
        flex: 1;
        min-width: 0;
      }
      .device {
        color: var(--emby-primary-text);
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .now-playing {
        color: var(--emby-secondary-text);
        font-size: 0.85rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .scan-button {
        margin-top: 16px;
        width: 100%;
        background: rgba(255, 255, 255, 0.08);
        color: var(--emby-primary-text);
        border: none;
        border-radius: var(--emby-border-radius);
        padding: 10px;
        font-size: 0.95rem;
        cursor: pointer;
      }
      .scan-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ];

  setConfig(config: EmbyActiveSessionsConfig): void {
    if (!config.host) throw new Error('emby-active-sessions: "host" is required');
    if (!config.apiKey) throw new Error('emby-active-sessions: "apiKey" is required');
    this._config = { protocol: DEFAULT_PROTOCOL, showScanLibrary: true, ...config };

    const { protocol, host, port } = parseEmbyHost(
      this._config.host,
      this._config.protocol ?? DEFAULT_PROTOCOL,
      this._config.port ?? DEFAULT_PORT,
    );
    this.emby = new Emby(host, port, protocol, this._config.apiKey);
    this._loadSessions();
  }

  getCardSize(): number {
    return 3;
  }

  static getConfigElement() {
    return document.createElement(ACTIVE_SESSIONS_EDITOR_TYPE);
  }

  static getStubConfig() {
    return { host: '192.168.1.50', apiKey: '' };
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.emby) this._loadSessions();
    this.pollHandle = setInterval(() => this._loadSessions(), ACTIVE_SESSIONS_POLL_MS);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.pollHandle) clearInterval(this.pollHandle);
  }

  private async _loadSessions() {
    try {
      const sessions = await this.emby.getSessions();
      this._sessions = sessions.filter((s) => s.deviceName);
      this._error = '';
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    } finally {
      this._loading = false;
    }
  }

  private async _scanLibrary() {
    this._scanning = true;
    try {
      await this.emby.refreshLibrary();
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    } finally {
      setTimeout(() => (this._scanning = false), 2000);
    }
  }

  render() {
    return html`
      <ha-card>
        <div class="header">
          <div class="title">${this._config?.title ?? 'Active Sessions'}</div>
          <div class="count">${this._sessions.length}</div>
        </div>
        ${this._error ? html`<div class="error">${this._error}</div>` : nothing}
        ${!this._loading && !this._sessions.length && !this._error
          ? html`<div class="empty">No active sessions</div>`
          : nothing}
        ${this._sessions.map(
          (s) => html`
            <div class="session">
              <div class="dot ${s.nowPlayingItem ? 'playing' : 'idle'}"></div>
              <div class="session-info">
                <div class="device">${s.deviceName} · ${s.client}</div>
                <div class="now-playing">
                  ${s.nowPlayingItem ? `Playing ${s.nowPlayingItem.name}` : 'Idle'}
                </div>
              </div>
            </div>
          `,
        )}
        ${this._config?.showScanLibrary
          ? html`<button class="scan-button" ?disabled=${this._scanning} @click=${this._scanLibrary}>
              ${this._scanning ? 'Scanning…' : 'Scan Library'}
            </button>`
          : nothing}
      </ha-card>
    `;
  }
}

customElements.define(ACTIVE_SESSIONS_CARD_TYPE, EmbyActiveSessionsCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: ACTIVE_SESSIONS_CARD_TYPE,
  name: ACTIVE_SESSIONS_CARD_NAME,
  preview: false,
  description: 'Shows currently active Emby sessions and lets you trigger a library scan.',
});
