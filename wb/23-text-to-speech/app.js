const utterance = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const settings = document.querySelectorAll('[type="range"], [type="text"]');

const readButton = document.getElementById('read');
const stopButton = document.getElementById('stop');
console.log(readButton, stopButton);