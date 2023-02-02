# Native Speech Recognition

Speech recognition in the browser without libraries or external APIs.
- `new SpeechRecognition()` to create a new SpeechRecognition obj
- `ecognition.interimResults = true`
Interim results are results that are not yet final. If false, 
the final result will be returned once the user has stopped speaking.