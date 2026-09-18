# Detailed Configuration

| Key | Required | Default | Description |
|---|---|---|---|
| `host` | yes | — | Emby server host/IP, or a full URL (e.g. `https://emby.example.com`) if reverse-proxied. |
| `port` | no | `8096` | Ignored if `host` is a full URL with its own port (or no port, for a reverse-proxied domain). |
| `protocol` | no | `http` | `http` or `https`. Ignored if `host` is a full URL. |
| `apiKey` | yes | — | Generate one in Emby Dashboard → Advanced → API Keys. |
| `userId` | yes | — | The Emby user whose libraries/watch-state the card uses. Pick via the visual editor once it queries `/Users`, or find it manually via the Emby API. |
| `libraryName` | yes | — | A real library (view) name, e.g. `Movies`, or one of the pseudo-libraries: `Continue Watching`, `Next Up`, `Recently Added`. |
| `title` | no | library name | Overrides the card header text. |
| `devices` | no | `[]` | Ordered list of playback targets. First one that's currently available wins. A `media_player.*` entity id targets Home Assistant's Cast integration (`media_player.play_media` with a direct Emby stream URL). Any other string is matched against the `DeviceName`/`Client` of a live Emby `/Sessions` entry (covers Android TV, Fire TV, Apple TV, Samsung/LG TV apps, Android, iOS, and the Emby web client). |
| `showSearch` | no | `true` | Show the search box. |
| `showExtras` | no | `true` | Reserved for extras/trailers display. |
| `playTrailer` | no | `false` | Reserved for trailer autoplay behavior. |
| `sort` | no | — | Emby `SortBy` field, e.g. `SortName`, `DateCreated`, `CommunityRating`. |
| `sortOrder` | no | `Ascending` | `Ascending` or `Descending`. |
| `maxRows` | no | unlimited | Reserved for capping visible rows. |
| `maxCount` | no | `100` | Max items fetched for the library/pseudo-library. |
| `minWidth` | no | `150` | Minimum poster width in px; feeds the CSS grid's `minmax()`. |
| `minExpandedWidth` / `minExpandedHeight` | no | `300` / `450` | Reserved sizing knobs for the expanded detail view. |
| `useHorizontalScroll` | no | `true` | `true` for a Netflix-style horizontal carousel row, `false` for a wrapping grid. |
| `runBefore` / `runAfter` | no | — | A `script.*` entity id to run before/after starting playback (e.g. to power on a TV first). |

## Devices

Unlike Plex, Emby's own `/Sessions` API lets you remote-control almost every official Emby client (Android TV, Fire TV, Apple TV, Samsung/LG TV apps, Android, iOS, and the web client) with one uniform call, so most entries in `devices` are just the device or client name as it appears in Emby (e.g. "Living Room Apple TV"). The one exception is Chromecast: point a `media_player.*` entity (from Home Assistant's Google Cast integration) at it instead, and the card will use `media_player.play_media` with a direct Emby stream URL.
