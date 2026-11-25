# Changelog

All notable releases of **Music Player** are documented here.

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
