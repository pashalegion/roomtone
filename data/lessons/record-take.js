/* Lesson body for "record-take". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "record-take",
  "title": "Record a clean take (or bring one in)",
  "skill": "Recording",
  "level": "Beginner",
  "time": 12,
  "summary": "Set input level, monitor without feedback, record a short phrase, and keep the source intact.",
  "course": {
    "id": "foundation",
    "name": "Shared foundation",
    "kind": "foundation"
  },
  "position": {
    "index": 5,
    "total": 8
  },
  "nav": {
    "prev": {
      "id": "arrange-loop",
      "title": "Turn a loop into a short arrangement"
    },
    "next": {
      "id": "mix-balance",
      "title": "Make a rough mix with level and space"
    }
  },
  "objectives": [
    "Select and arm the correct input.",
    "Avoid clipping and distracting monitoring delay.",
    "Keep an original take before editing."
  ],
  "concept": "Record peaks with headroom. Red meters mean digital clipping; a quiet clean take can be raised later. Monitor the input safely, prevent feedback, and keep an unedited source copy before comping or processing.",
  "exercise": "Record or import a 10-second sound. Make a duplicate before editing, trim the copy, and confirm the original remains untouched.",
  "mistake": "Turning up a clipped take later cannot restore flattened peaks. Lower the hardware input gain before recording; fader changes after recording do not fix clipping.",
  "resourceLinks": [],
  "media": {
    "video": "FbbEt4hMEEo",
    "title": "How to set Levels to Avoid Clipping (Gain Staging 101)",
    "creator": "Learn Audio Engineering",
    "note": "Set input gain for the loudest expected moment. A quieter clean recording is easier to use than a clipped one."
  },
  "dawMedia": null,
  "steps": {
    "ableton": [
      "Create an Audio track. In the track input chooser, select the interface input; enable monitoring only if needed.",
      "Arm the track and watch the meter while performing the loudest expected phrase. Lower the interface gain if the meter clips.",
      "Record a short test, listen back, then record a few full takes. Save before destructive edits.",
      "For MIDI: create a MIDI track, load an instrument, select the MIDI input, arm, and record. Quantize only after listening."
    ],
    "flstudio": [
      "Use Producer Edition or above for external audio recording; Fruity Edition does not include audio recording. The unlimited trial can test it, but saved projects cannot be reopened until licensed.",
      "Create or select a Playlist Audio track linked to a Mixer input; choose the interface input and arm recording.",
      "Set input gain so the loudest phrase stays below 0 dBFS. Record a short test, check playback, then keep the raw take.",
      "For MIDI, select the controller input, arm the recording filter for notes, and record into a pattern or Playlist workflow."
    ],
    "lmms": [
      "LMMS is MIDI/pattern-focused in its stable release. It does not record microphone or instrument audio there; record with a free recorder/editor such as Audacity and import the audio file.",
      "The current LMMS 1.3.0-alpha.2 adds sample-track recording through JACK. This is an alpha feature with limited backend support; do not rely on it for a beginner's cross-platform recording workflow.",
      "For MIDI, LMMS supports note input/recording in the Piano Roll. Set the MIDI device in Edit → Settings, open a pattern, use the Piano Roll's record control, and check the quantize value before playing.",
      "Keep original audio takes in the project folder. For a reliable all-in-one external audio recording path, use Waveform Free."
    ],
    "waveform": [
      "Add an audio track and choose the correct input in its input selector. Arm the track and set monitoring to suit your interface.",
      "Perform the loudest phrase while watching the meter; reduce interface gain if the signal approaches clipping.",
      "Record a short test and listen for latency or noise. Adjust the audio buffer and input gain before the full take.",
      "Keep the source take and make edits on a copy or non-destructively. MIDI instruments can be recorded on a separate MIDI track."
    ],
    "reaper": [
      "Create or select a track, choose its audio input, arm it, and set monitoring to suit your interface.",
      "Perform the loudest expected phrase and adjust the hardware input gain so the recorded signal does not clip.",
      "Record a short test, check playback and latency, then record complete takes. Use track lanes/takes to compare performances without overwriting the source.",
      "Keep a project copy with its media files and leave an unedited take available before comping."
    ]
  }
};
