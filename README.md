<div align="center">
  <img src="assets/icon.svg" alt="Music Player Logo" width="88" height="88" />
  <h1>Music Player</h1>
  <p><strong>A lightweight Android music player with a clean single-tone Onyx theme, built with Rust, Dioxus 0.7, and native Kotlin audio services.</strong></p>

  <p>
    <a href="https://github.com/h3rwthme/Music-/releases/latest">
      <img src="https://img.shields.io/github/v/release/h3rwthme/Music-?style=for-the-badge&color=1db954&label=Latest%20Release" alt="Latest Release" />
    </a>
    <img src="https://img.shields.io/badge/Rust-2024-000000?style=for-the-badge&logo=rust&logoColor=white" alt="Rust" />
    <img src="https://img.shields.io/badge/Dioxus-0.7-2563eb?style=for-the-badge" alt="Dioxus 0.7" />
    <img src="https://img.shields.io/badge/Android-7.0%2B%20(arm64)-3ddc84?style=for-the-badge&logo=android&logoColor=black" alt="Android arm64" />
    <img src="https://img.shields.io/badge/APK%20Size-~8.6%20MB-18181b?style=for-the-badge" alt="APK Size" />
  </p>

  <p>
    <a href="https://github.com/h3rwthme/Music-/releases/latest/download/music-player.apk">
      <img src="https://img.shields.io/badge/%E2%AC%87%EF%B8%8F%20Download%20Latest%20APK-Direct%20Install-1db954?style=for-the-badge" alt="Download Latest APK" />
    </a>
    &nbsp;
    <a href="https://github.com/h3rwthme/Music-/releases">
      <img src="https://img.shields.io/badge/All%20Releases-Archive-27272a?style=for-the-badge" alt="All Releases" />
    </a>
  </p>

  <sub>
    Bookmark the direct link — it always downloads the newest release:<br/>
    <code>https://github.com/h3rwthme/Music-/releases/latest/download/music-player.apk</code>
  </sub>
</div>

<br/>

<p align="center">
  <img src="screenshots/banner.png" alt="Music Player Showcase Banner" width="100%" />
</p>

### Smart Radio Mix & Match — Cara Pakai Terbaik
> **Tips:** Klik ikon **titik tiga (`⋮`)** di samping lagu favoritmu lalu pilih **`Start radio`** supaya mesin **Smart Radio** langsung meracik mix & match yang paling pas (10–12 streak artis utama → blok 2–3 lagu per band mirip → selipan artis utama tiap ±6 lagu → 0 lagu dobel).

<p align="center">
  <img src="screenshots/smart-radio.png" alt="Panduan Smart Radio: Klik titik tiga lalu pilih Start radio" width="100%" />
</p>

---

## Overview

**Music Player** is a personal cross-platform audio player engineered for speed, low footprint (`~8.3 MB` release APK), and editorial-grade visual polish. Its core UI and state engine are written in **Rust (Dioxus 0.7)** and bridged cleanly to a **native Android Kotlin foreground playback service**, giving uninterrupted background audio, lock-screen media controls, a home-screen widget, and smooth offline caching even on unstable mobile connections.

> **Repository Scope:** This repository serves as the public **portfolio showcase and binary release distribution hub** (`README`, visual showcase, changelog, and signed APK releases). Application source code is maintained privately.

---

## Visual Showcase

| Onyx Player | Import Playlists | 15-Band Equalizer & Crossfade |
| :---: | :---: | :---: |
| <img src="screenshots/feature-player-onyx.png" alt="Onyx Now Playing" width="100%" /> | <img src="screenshots/feature-import.png" alt="Import playlists from YouTube, Spotify and Apple Music" width="100%" /> | <img src="screenshots/feature-eq-crossfade.png" alt="15-band equalizer and crossfade" width="100%" /> |
| One neutral black & white palette with a blurred cover backdrop, live lyrics pill and quick controls. | Paste a public YouTube, Spotify or Apple Music playlist link to import it with original covers. | Drag the 15-band curve, adjust Preamp / Bass / Treble, and enjoy gapless equal-power crossfades. |

---

## Key Features

- **Single-Tone Onyx Theme** — One consistent neutral black & white palette across the app and widget, with a lightweight blurred cover backdrop on the player.
- **Smart Radio Universal & Poweramp-Style 15-Band Native Equalizer** — Deterministic, unit-tested queue planner (`smart_queue`) with skip-aware learning and Spotify-style playlist recommendations + Refresh — paired with a **15-band (`31 Hz–16 kHz`) native Android `DynamicsProcessing` Equalizer**, Preamp, Tone Bass/Treble, and anti-clipping Limiter.
- **Display Modes (`Maksimal / Seimbang / Hemat baterai`), Orbit 3D, Recap & Auto-Updater** — Dedicated `Hemat baterai` zero-blur performance mode for older Android devices, 3D Orbit cover ring, true random Shuffle from track #1, newest-first Artist discography, and in-app auto-download updates.
- **Resilient Offline Disk Cache** — Chunked HTTP Range (`206 Partial Content`) disk cache keeps scrubbing responsive on flaky networks and allows pinned tracks to play completely offline without mid-track stalls.
- **Native Background, Back Navigation & Lock-Screen Playback** — Dedicated Android `PlaybackService` with `MediaSessionCompat`, native audio queue mirroring, auto-advance while screen is off or gaming, audio focus handling, headphone-disconnect pause, and full Android Back gesture/button routing (`Sheet → History → Preserved Search → Home → Background Minimize`).
- **Custom Playlists with Cover Photos** — Create, edit, and organize personal playlists with custom uploaded cover artwork, persisted locally across updates.
- **Immersive Phone & Tablet Layout** — Edge-to-edge immersive system bars (`WindowInsetsControllerCompat`) and responsive multi-column grids tailored for both phones and tablets (e.g., 8.8"–11" displays).
- **Ultra-Light Footprint** — Optimized with `llvm-strip`, R8 code minification, and Android resource shrinking for a standalone `~8.3 MB` `arm64-v8a` APK.

---

## Architecture Highlights

```mermaid
flowchart LR
    subgraph UI["Rust / Dioxus 0.7 UI Layer"]
        A["Onyx Theme & Views<br/>(Home, Explore, Player, Lyrics)"]
        B["Smart Radio Engine<br/>(Pure Queue Planner + Refiller)"]
    end

    subgraph Bridge["JS / Android WebView Bridge"]
        C["Native Media Bridge<br/>(@JavascriptInterface)"]
    end

    subgraph Android["Native Kotlin Runtime"]
        D["PlaybackService + MediaSession<br/>(Lock Screen, Background, Queue)"]
        E["NowPlayingWidget<br/>(Home Screen Widget)"]
        F["Embedded Audio Proxy &<br/>Chunked Offline Disk Cache"]
    end

    A <--> B
    A <--> C
    B --> C
    C <--> D
    D --> E
    D <--> F
```

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Core UI & State** | Rust (Edition 2024), Dioxus `0.7`, Modular CSS Design Tokens |
| **Queue & Lyrics Engines** | Pure Rust modules with full unit test coverage (Smart Radio, LRC/ELRC/TTML parser, RGB contrast clamping) |
| **Native Android Layer** | Kotlin, `android.media.MediaPlayer`, `androidx.media` (`MediaSessionCompat`), `AppWidgetProvider`, `WindowInsetsControllerCompat` |
| **Build & Optimization** | `dx bundle`, Android NDK `llvm-strip`, Gradle R8 minification + resource shrinking, `zipalign`, `apksigner` |

---

## Installation & Easy Updates

### Requirements
- **Android 7.0 (API 24) or higher**
- **64-bit ARM (`arm64-v8a`)** — supported by virtually all modern Android phones and tablets

### Install / Update Steps
1. Open the direct download link on your Android device:
   - **[Download Latest `music-player.apk`](https://github.com/h3rwthme/Music-/releases/latest/download/music-player.apk)**
2. Tap the downloaded APK file (allow *"Install unknown apps"* if prompted on first install).
3. Tap **Install / Update**.
   - Updating over an existing installation preserves all your saved playlists, cover photos, listening history, and offline cache automatically.

---

## Release History

See [CHANGELOG.md](CHANGELOG.md) or browse [GitHub Releases](https://github.com/h3rwthme/Music-/releases) for version notes and previous builds.

---

<div align="center">
  <sub>Built with Rust & Kotlin by <a href="https://github.com/h3rwthme">@h3rwthme</a></sub>
</div>
