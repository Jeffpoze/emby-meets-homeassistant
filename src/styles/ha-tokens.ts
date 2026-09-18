import { css } from 'lit';

/**
 * Home Assistant CSS custom properties this card relies on for theming,
 * with sane fallbacks so the card still renders sensibly on older/custom
 * themes that don't define every token.
 */
export const haTokens = css`
  :host {
    --emby-card-background: var(--card-background-color, #141414);
    --emby-primary-text: var(--primary-text-color, #ffffff);
    --emby-secondary-text: var(--secondary-text-color, #b3b3b3);
    --emby-accent: var(--primary-color, #e50914);
    --emby-accent-secondary: var(--accent-color, var(--emby-accent));
    --emby-border-radius: var(--ha-card-border-radius, 8px);
    --emby-font: var(--paper-font-body1_-_font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    --emby-min-width: 150px;
    --emby-grid-gap: 12px;
  }
`;
