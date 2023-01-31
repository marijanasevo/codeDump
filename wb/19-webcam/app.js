const video = document.querySelector('.webcam-video');
const canvas = document.querySelector('.canvas-video');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.taken-photos-container');
const snap = document.querySelector('.snap');

// Pipe video into <video class="player"> element
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


getWebcamVideo();