# Webcam

Webcam with filters, ability to snap a photo (+ sound effect) and download it to your computer.

One of the requirements for this challenge is to have a server running. I'm using Visual Studio Code extension - Live Server.

- Piped webcam video into `<video class="webcam-video">` using `getWebcamVideo()`.
- Repeated interval takes a snapshot of the video which is placed into `<canvas class="canvas-video">` with `videoToCanvas()`. 
- `<div class="taken-photos-container">` is a place for snapshots once photo is taken.
- To implement filters, pixels are modified before they've been painted onto canvas.
