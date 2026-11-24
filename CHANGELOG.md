# Changelog

All notable releases of **Music Player** are documented here.

## [v1.0.2] - 2026-11-24

### Added & Fixed
- **Native Android Back Button / Gesture Navigation**: Intercepts Android's `OnBackPressedCallback` so pressing or swiping Back never abruptly closes the app — it closes open bottom sheets first, navigates back step-by-step (`Player / Lyrics / Playlist / Artist → Search`), returns to `Home` from top-level tabs, and cleanly minimizes to background on `Home` without stopping playback.
- **Preserved Search State**: Returning to `Explore` (Search) via Back keeps your active search query and results intact.
- **Cleaner Player UI**: Removed provider badge clutter beneath album artwork during normal playback and simplified artist role labels.
- **Smart Radio Queue Engine**: 10–12 song seed artist streak, 2–3 song blocks per similar band, ±6 song seed interleave, strict deduplication, and proactive ±8 track lookahead.
- **Adaptive Cover Theme (Onyx Refresh)**, cover drag (`Slide` / 3D `Book`), native `NowPlayingWidget`, immersive phone & tablet layout, custom playlists with cover uploads, chunked offline cache, and synced lyrics.

### Build
- Standalone signed Android `arm64-v8a` release APK (`~8.3 MB` after `llvm-strip` + R8 shrinking).
- Lightweight Windows 64-bit desktop builds: `music-player-setup.exe` (NSIS LZMA installer) & `music-player-windows.zip` (portable).
