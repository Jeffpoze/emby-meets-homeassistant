# Emby Meets Home Assistant

A Home Assistant Lovelace custom card for browsing your Emby libraries and playing content on Emby clients (Android TV, Fire TV, Apple TV, Samsung/LG TV apps, Android, iOS, web) or a Chromecast `media_player` entity. A from-scratch, Emby-native rebuild of [PlexMeetsHomeAssistant](https://github.com/JurajNyiri/PlexMeetsHomeAssistant), with a modernized Netflix-style UI that themes itself using Home Assistant's own design tokens.

## Status

Early development. Core browsing, detail view, and playback are implemented; the visual editor and polish pass are still in progress.

## Installation (manual, pre-HACS)

1. Copy `dist/emby-meets-homeassistant.js` into your Home Assistant `config/www/` folder.
2. In Home Assistant, go to Settings → Dashboards → Resources, and add `/local/emby-meets-homeassistant.js` as a JavaScript Module.
3. Add a card with `type: custom:emby-meets-homeassistant` to a dashboard.

## Configuration

See [DETAILED_CONFIGURATION.md](DETAILED_CONFIGURATION.md).

Minimal example:

```yaml
type: custom:emby-meets-homeassistant
host: https://emby.example.com
apiKey: your-emby-api-key
userId: your-emby-user-id
libraryName: Movies
devices:
  - media_player.living_room_chromecast
  - Living Room Apple TV
```

### Active Sessions card

A second, standalone card (`type: custom:emby-active-sessions`) shows currently connected Emby clients (idle vs. now-playing) and a "Scan Library" button:

```yaml
type: custom:emby-active-sessions
host: https://emby.example.com
apiKey: your-emby-api-key
```

## Development

```bash
npm install
npm run build   # lint + build dist/emby-meets-homeassistant.js
npm test        # vitest unit tests
```
