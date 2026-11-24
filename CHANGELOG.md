# Changelog

All notable releases of **Music Player** are documented here.

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
