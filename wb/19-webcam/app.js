const video = document.querySelector('.webcam-video');
const canvas = document.querySelector('.canvas-video');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.taken-photos-container');
const snap = document.querySelector('.snap');

const rgbRange = document.querySelectorAll('.green-screen input');
const effects = document.querySelectorAll('.effects select');
const ghost = document.getElementById('ghost');

// Pipe webcam video into video element
function getWebcamVideo() {
  
  // >>navigator<< 
  // provides info about the web browser and its capabilities
  // browser name, geolocation, keyboard, language, os, connection..

  // >>navigator.mediaDevices<< 
  // read-only prop returns obj, 
  // which provides access to connected media devices like
  // cameras, microphones, as well as screen sharing

  // >>MediaDevices.getUserMedia()<<
  // prompts the user for permission to use a media input which produces 
  // a MediaStream like: video recording, audio recording device etc

  // >>MediaDevices.getDisplayMedia()<<
  // prompts the user to select and grant permission to capture the contents 
  // of a display or portion thereof (such as a window) as a MediaStream.
  navigator.mediaDevices.getUserMedia({video: true, audio: false}) 
    .then(stream => {
      video.srcObject = stream;
      // >>srcObject<< 
      // sets obj like MediaStream, MediaSource, Blob, File as src

      // video.play() is not necessary if >>autopllay<< attribute
    })
    .catch(err => {
      // a place to handle denied webcam access
      console.log('Error: ' + err);
    }); 
}

function videoToCanvas() {
  // Adjusting canvas size to video size
  const width = canvas.width = video.videoWidth;
  const height = canvas.height = video.videoHeight;

  // Painting webcam video onto canvas
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    // >>CanvasRenderingContext2D.getImageData()<< 
    // returns an ImageData object representing the underlying pixel data for a specified portion of the canvas. 
    // Huge integer array, each pixel represented with four entries (value 0 - 255)
    // 0: red, 1: green, 2: blue, 3: alpha, 4: red, 5: green...
    // first px..........................., second px..........

    let fn = effects[0].value + 'Effect';
    if (fn != 'noneEffect') pixels = window[fn](pixels);

    ctx.globalAlpha = ghost.value;
    pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 17); 
  // could:
  // test machine performance and adjust ms accordingly
  // implement >>requestAnimationFrame<<?
}

function takePhoto() {
  // Setting sound at 0 when photo is taken to make sure it plays each time
  snap.currentTime = 0;
  snap.play();

  const imageData = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = imageData;
  link.setAttribute('download', 'your-new-image');
  link.innerHTML = `<img src=${imageData}>`;
  strip?.prepend(link);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] += 100;
    pixels.data[i + 1] -= 50;
    pixels.data[i + 2] *= 0.5;
  }

  return pixels;
}

function greenEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] -= 50;
    pixels.data[i + 1] += 100;
    pixels.data[i + 2] *= 0.2;
  }

  return pixels;
}

function blueEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] -= 50;
    pixels.data[i + 1] -= 50;
    pixels.data[i + 2] += 100;
  }

  return pixels;
}

function splitEffect(pixels) {
  // debugger;
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 50] = pixels.data[i + 0];
    pixels.data[i + 80] = pixels.data[i + 1];
    pixels.data[i - 50] = pixels.data[i + 2];
  }

  return pixels;
}

function greenScreen(pixels) {
  let ranges = {};

  rgbRange.forEach(input => {
    ranges[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];
    blue = pixels.data[i + 1];
    green = pixels.data[i + 2];

    if (red >= ranges.rmin && 
      green >= ranges.gmin && 
      blue >= ranges.bmin && 
      red <= ranges.rmax && 
      green <= ranges.gmax && 
      blue <= ranges.bmax) {
        pixels.data[i + 3] = 0; 
        // making that pixel transparent
        // alpha channel = 0
      }
  }

  return pixels;
}


getWebcamVideo();

video?.addEventListener('canplay', videoToCanvas);