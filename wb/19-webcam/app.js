const video = document.querySelector('.webcam-video');
const canvas = document.querySelector('.canvas-video');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.taken-photos-container');
const snap = document.querySelector('.snap');

// Pipe webcam video into video element
function getWebcamVideo() {
  
  // >>navigator<< 
  // provides info about the web browser and its capabilities
  // browser name, geolocation, keyboard, language, os, connection..

  // >>navigator.mediaDevices<< 
  // read-only prop returns obj, 
  // which provides access to connected media devices like
  // cameras an microphones, as well as screen sharing

  // >>MediaDevices.getUserMedia()<<
  // prompts the user for permission to use a media input which produces 
  // a MediaStream like: video recording, audio recording device etc

  // >>MediaDevices.getDisplayMedia()<<
  // prompts the user to select and grant permission to capture the contents 
  // of a display or portion thereof (such as a window) as a MediaStream.
  navigator.mediaDevices.getUserMedia({video: true, audio: false}) 
    .then(stream => {

      // >>srcObject<< 
      // sets obj like MediaStream, MediaSource, Blob, File as src
      video.srcObject = stream;

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
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src=${imageData}>`;
  strip?.prepend(link);
}


getWebcamVideo();

video?.addEventListener('canplay', videoToCanvas);