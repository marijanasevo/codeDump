# Text to Speech

- `New SpeechSynthesisUtterance()` offers prop like `text` that'll be said, speed as `rate`, `pitch`, `voice`, `lang`, `volume`. 
- The event `voiceschanged` fires when Chrome finishes making an API call to get the list of voices available only to Chrome users
- Then voices can be grabbed safely with `this.getVoices()` which returns an array of all available voices (OS, browser..)
- `speechSynthesis.speak(utterance)` is the controller interface for the speech service; It can be used to retrieve info about the synthesis voices available on the device, start and pause speech etc. `.getVoices()`, `.speak()`, `.pause()`, `.resume()`, `.cancel()`