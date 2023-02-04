const utterThis = new SpeechSynthesisUtterance();
let voices;
const voicesDropdown = document.querySelector('[name="voice"]');
const settings = document.querySelectorAll('[type="range"], [name="text"]');
const text = document.querySelector('textarea');

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

utterThis.text = text?.value;

function getVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices.filter(voice => {
    return voice.name.includes('English');
  })
    .map(voice => {
      return `<option value="${voice.name}">${voice.name}</option>`;
    }).join('');
}

function chooseVoice() {
  utterThis.voice = voices.find(voice => {
    return voice.name.includes(this.value);
  });

  speak();
}

function setValue() {
  utterThis[this.name] = this.value;
  speak();
}

function speak(speak = true) {
  speechSynthesis.cancel();
  if (speak) speechSynthesis.speak(utterThis);
}

speechSynthesis.addEventListener('voiceschanged', getVoices);
voicesDropdown?.addEventListener('input', chooseVoice);

settings.forEach(setting => setting.addEventListener('change', setValue));

startButton?.addEventListener('click', speak);
stopButton?.addEventListener('click', speak.bind(null, false));
