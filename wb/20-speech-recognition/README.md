# Native Speech Recognition

Speech recognition in the browser without libraries or external APIs.

- `const recognition = new SpeechRecognition()` to create a new SpeechRecognition obj
- `recognition.interimResults = true`. Interim results are results that are not yet final. If false, the final result will be returned once the user has stopped speaking.
- `recognition.start()` to start listening

Events:
- `onresult`
  - `Array.from(e.results[0][0].transcript).join('')` joining results
- `recognition.onend = recognition.start` to re-activate listening