# Changelog

All notable releases of **Music Player** are documented here.

## [v1.0.0] - 2026-11-24

### Added
- **Smart Radio Queue Engine**: Curated autoplay sessions with a 10–12 song seed artist streak, 2–3 song blocks per similar artist, ±6 song seed interleave, strict duplicate filtering, and proactive ±8 track lookahead buffering.
- **Adaptive Cover Theme (Onyx Refresh)**: Real-time dominant color extraction from active artwork with smooth transitions and crisp monochrome idle styling.
- **Player Gestures & Transitions**: Interactive cover drag with blurred neighboring previews, plus selectable `Slide`, 3D `Book`, or `Off` track transition animations.
- **Native Android Home Screen Widget**: Adaptive-color `NowPlayingWidget` with live artwork and playback controls.
- **Immersive Phone & Tablet UI**: Full-screen edge-to-edge mode and responsive multi-column grids for larger screens.
- **Custom Playlists**: Create and edit playlists with custom cover image uploads.
- **Offline Chunked Audio Cache & Background Service**: Resumable HTTP Range caching paired with a native Kotlin `PlaybackService` and `MediaSession` lock-screen controls.
- **Synced Lyrics**: Support for plain text, line-synced LRC, word-synced Enhanced LRC, and TTML lyrics.

### Build
- Standalone signed `arm64-v8a` release APK (`~8.3 MB` after `llvm-strip` + R8 shrinking).
