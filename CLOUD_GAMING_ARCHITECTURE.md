# Cloud Gaming Architecture

Goal: one URL, no local game files, browser-only client. The game runs on a remote Linux session and the browser receives encoded video/audio while sending input.

## Open-source streaming image

Primary image:

`ghcr.io/selkies-project/selkies/desktop:main-ubuntu26.04`

Selkies is MPL-2.0. It provides the HTML5 client, display capture, H.264/JPEG encoding, Opus audio and browser input/gamepad transport.

## Production target

- Host: Linux x86_64 with GPU preferred.
- Stream: Selkies WebSocket transport first for single-port compatibility; WebRTC when UDP/TURN is available.
- Game: reVC Linux executable.
- Proprietary GTA Vice City game data is **not** stored in this repository or public container image. A licensed server-side installation must be mounted into the runtime image/volume.
- Browser: PC, Android, iOS/iPadOS and supported smart-TV browsers.
- Input: keyboard/mouse/gamepad, with touch overlay for coarse-pointer clients.
- Saves: server-side persistent volume.

## Zero-cost smoke-test image

The repository also contains `cloud-smoke/Dockerfile`, which derives from the official Selkies desktop image and launches the fully open-source Freedoom game using Chocolate Doom. This proves the cloud-streaming path without distributing any GTA assets. Replace only the launched application and mount licensed Vice City data when moving to reVC.
