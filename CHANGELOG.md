# Changelog

All notable releases of **Music Player** are documented here.

## [v1.1.1] - 2026-11-26

### Fixed & Improved
- **APK Install & Upgrade Reliability (Monotonic `versionCode` + `v1+v2+v3` Signing)**:
  - Automatically derives monotonic `versionCode` from `Cargo.toml` (`10101` for `v1.1.1`, up from hardcoded `1` on earlier builds) so upgrading over older installs never triggers Android PackageInstaller conflicts.
  - Signs release APKs with APK Signature Schemes `v1 + v2 + v3` and adds Android 11+ `<queries>` for `application/vnd.android.package-archive`.
- **In-App Auto-Updater Fix (No More Hang After Granting Permission)**:
  - Persists downloaded APK in `filesDir/updates/` with ZIP + `PackageManager` integrity verification and exact `Content-Length` check; never deletes and re-downloads an already-downloaded APK.
  - Added `MainActivity.onResume()` & `onActivityResult()` hooks to automatically launch Android PackageInstaller right after returning from *"Install unknown apps"* settings, using foreground `Activity` context, `ClipData`, and explicit `grantUriPermission` (fixing MIUI / ColorOS / OneUI / Android 10–15 hangs), plus a 1-tap *"Unduh lewat Browser"* fallback.
- **v1.0.8 Clean UI + v1.1.0 Performance & Audio Polish**:
  - Restored compact `Settings → Tampilan` dropdown + Save (`Maksimal` / `Seimbang` / `Hemat baterai`), hardened `Hemat baterai` mode without zeroing UI transitions or adding `content-visibility` glitches, kept smooth 60 fps playback progress with low-overhead pause polling, and refined `shuffle_start_order` so every track stays queued.
  - Upgraded 15-band `NativeEq` to stereo 2-channel `DynamicsProcessing` with 13s delayed release of the previous session's audio FX so crossfade stays seamless, paired with the curve EQ + `DbSlider` (Preamp / Bass / Treble).

### Build
- Standalone signed Android `arm64-v8a` APK (`versionCode=10101`, `v1+v2+v3` signed, 62/62 Rust unit tests passing).

## [v1.1.0] - 2026-11-26

### Added & Improved
- **Game-Style Graphics Presets (`Low / Medium / High / Auto`) & Low-End Android Performance**:
  - Replaced continuous 60 fps `requestAnimationFrame` + `querySelectorAll` loop in `player_bridge.js` with an idle-stopping, DOM-cached, tier-throttled progress scheduler (`60 Hz` High, `10 Hz` Medium, `4 Hz` Low; `0%` when paused/backgrounded).
  - Hardened `Low (Hemat Ekstrem)` mode (`data-quality="lite"`) to eliminate all `backdrop-filter`, `filter: blur`, `box-shadow`, full-screen glows, heavy animations/transitions, and `BlurArt` canvas work + added `content-visibility: auto` across list rows for smooth FPS on older Android 9 devices.
- **Poweramp-Inspired 15-Band Equalizer Pro (Real DSP Audio Output)**:
  - Expanded from 10 to **15 bands (`31 Hz–16 kHz`)** with vertical Poweramp-style faders + interactive curve view, **Preamp (`-12..+12 dB`)**, quick **Tone Bass & Treble**, **Limiter**, 10 presets, and seamless migration from old 10-band settings.
  - Upgraded Android `NativeEq` to **`android.media.audiofx.DynamicsProcessing`** on Android 9+ (API 28+) for genuine 15-band DSP post-EQ + input gain + limiter (with automatic `Equalizer + BassBoost` fallback on Android 7–8).
- **True Random Shuffle from Track #1**: Fixed Shuffle in `CollectionPage` and `ArtistPage` using SplitMix64 `pick_random_index` so Shuffle starts on a genuinely random song instead of always playing track #1 first.
- **Spotify-Style Playlist Recommendations + Refresh**: Added a relevant recommendations section beneath playlists with one-tap `+` adding and a **Refresh** button that rotates seeds and avoids repeating shown tracks.
- **Upgraded Artist Page & Discography**: Added Play / Shuffle / Radio hero actions, **Lagu Terbaik** ranked by priority (Latest releases → Popular/viral → All-time), and **Diskografi** sorted newest → oldest by release year.
- **Optimized Search Pagination & Artist Relevance**: Ranked artists by query relevance, capped All-tab artist preview to top 4 with "Lihat semua", and added lazy "Muat lebih banyak" pagination for Artists (8/page), Songs (15/page), and Albums (12/page).

### Build
- Standalone signed Android `arm64-v8a` release APK (59/59 Rust unit tests passing).

## [v1.0.8] - 2026-11-25

### Added & Fixed
- **Zero-Lag Typing & Fast Search/Filter (`fast_input.js`, `SearchCache`, `use_memo`)**: Moved SearchBar debouncing (`~350ms` + instant `Enter` + instant DOM clear button) completely into WebView JS with IME composition protection, eliminated per-keystroke re-renders across `Explore`, `AddSongsSheet`, `Library`, `PlaylistForm`, and `Settings`, added an in-memory 24-entry LRU search cache, minimum 2-character online search gate, and memoized merged results so filter chips (`Semua / Lagu / Artis / Album`) switch in `0ms`.
- **True Native Android & Web Crossfade**: Implemented overlapping dual-`MediaPlayer` equal-power (`sin`/`cos`) crossfade in Android `PlaybackService` (works even with screen off!), fixed Web `<audio>` fade-in timing to trigger on `playing`, and persisted crossfade/normalize settings on app launch.
- **In-App Update Notifications & Auto-Installer (U2)**: Automatic GitHub Releases semver checker (`v1.0.8` → detects `v1.0.9+`), Home Bell 🔔 indicator dot + dismissible update banner + `Settings → Pembaruan aplikasi`, with native in-app APK downloader, real-time progress bar, and automatic Android Install dialog (`FileProvider`).

### Build
- Standalone signed Android `arm64-v8a` release APK (54/54 Rust unit tests passing).

## [v1.0.7] - 2026-11-25

### Added & Improved
- **Native 10-Band Equalizer (Android)**: Interactive 10-point frequency curve (`31 Hz–16 kHz`, `±12 dB`) with presets backed by Android's native `android.media.audiofx.Equalizer` attached to `MediaPlayer`.
- **Orbit 3D Cover Transitions**: Replaces Book mode with a smooth GPU-only 3D ring carousel (`Slide` / `Orbit` / `Off`) that follows touch drag naturally.
- **Universal Smart Radio**: Automatically kicks in for loose tracks (Search, Charts, Recently Played), preserves Album/Playlist order before seamlessly continuing with radio, learns from early skips (`< 30s`), avoids recent repeats, and favors liked songs.
- **Friendlier Playlists & Unified Disukai**: Multi-playlist picker sheet with live checkmarks, quick `+` button on Player/PlayerBar/Now Playing panel, in-playlist *Add songs* search & suggestions, and merged **Disukai** collection.
- **Honest Monthly Recap & Yearly Wrapped**: Pure per-month listening log (`mp.listen_log`), interactive Recap stories (minutes, top 5 tracks, top artist, favorite hour, active days, month-over-month comparison), and annual `/wrapped` view without dummy sample data.
- **Clean Onboarding**: Added **Lewati** button and removed dummy Blend/sample history cards.

### Build
- Standalone signed Android `arm64-v8a` release APK (47/47 Rust unit tests passing).

## [v1.0.5] - 2026-11-24

### Added & Improved
- **Refined Custom Icons & UI Polish**: Added dedicated icons (`gauge`, `scale`, `battery-low`, `audio-lines`, `users`) across Quality Picker, Home, Explore, Up Next queue, and Player controls with matching CSS refinements.
- **Full Classic 60 fps Lyrics Animation on `Maksimal` Quality**: Selecting **Maksimal** in `Settings → Tampilan` uses the full GPU cascade lyrics engine (`lyrics_sync_classic.js`) with continuous 60 fps word-by-word sweep and no idle throttling, while **Seimbang** and **Hemat baterai** retain power-saving lyrics rendering.

### Build
- Standalone signed Android `arm64-v8a` release APK (after `llvm-strip` + R8 shrinking).

## [v1.0.3] - 2026-11-24

### Added & Improved
- **Adaptive Display Quality Mode (`Settings → Tampilan`)**: Auto-detects device hardware and frame pacing to choose between `Maksimal`, `Seimbang`, and `Hemat baterai` (plus manual override via `QualityPicker` and GPU-friendly pre-blurred cover artwork).
- **Live Lyric Pill on Player**: Real-time synced lyric preview pill directly on the Player screen alongside smoother `lyrics_sync` updates.
- **Responsive Tablet Landscape 3-Column Layout**: Dedicated left `Sidebar`, bottom `PlayerBar`, and right `NowPlayingPanel` for tablets and wide screens.
- **Home & Player Polish**: New `ContinueCard`, smoother cover drag gestures, and refined Android `UiExtras` polish.

### Build
- Standalone signed Android `arm64-v8a` release APK (after `llvm-strip` + R8 shrinking).

## [v1.0.2] - 2026-11-24

### Added & Fixed
- **Native Android Back Button / Gesture Navigation**: Closes open bottom sheets first, navigates back step-by-step (`Player / Lyrics / Playlist / Artist → Search` with preserved query & results), returns to `Home` from top-level tabs, and minimizes cleanly without stopping playback.
- **Cleaner Player UI**: Removed provider badge beneath album artwork during normal playback and simplified artist labels.
- **Smart Radio Queue Engine**: 10–12 song seed artist streak, 2–3 song blocks per similar band, ±6 song seed interleave, strict deduplication, and proactive ±8 track lookahead.
