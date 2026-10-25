/* Lesson body for "reaper-audio-recording". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "reaper-audio-recording",
  "title": "Record and edit an audio take",
  "skill": "Recording",
  "level": "Beginner",
  "time": 12,
  "summary": "Choose an input, arm a track, capture a clean take, and trim it without losing the source.",
  "course": {
    "id": "reaper",
    "name": "REAPER course",
    "kind": "daw"
  },
  "position": {
    "index": 4,
    "total": 12
  },
  "nav": {
    "prev": {
      "id": "reaper-tracks-routing",
      "title": "Build a clear track layout for audio and MIDI"
    },
    "next": {
      "id": "reaper-midi-instrument",
      "title": "Record MIDI and play it through a virtual instrument"
    }
  },
  "objectives": [
    "Set an input and arm the intended track.",
    "Record with clean peaks and useful monitoring.",
    "Make a simple edit while retaining an original take."
  ],
  "concept": "Audio recording needs both a hardware input path and a track input selection. REAPER's recording modes and take lanes support different approaches, so begin with a simple pass and preserve a clean source before comping or processing.",
  "exercise": "Record a 10-second sound, duplicate or retain its original take, then split and trim the edit. Confirm the untouched source is still available.",
  "mistake": "Track fader level does not change the level reaching the recorder. Set the interface input gain to avoid clipping before capture.",
  "resourceLinks": [
    {
      "label": "Cockos: REAPER User Guide",
      "url": "https://www.reaper.fm/userguide.php"
    },
    {
      "label": "Cockos: REAPER Quick Start guide",
      "url": "https://www.reaper.fm/guides/REAPER%20Quick%20Start.pdf"
    }
  ],
  "media": {
    "video": "U0Tv1waD1sY",
    "title": "This is REAPER 7 - Recording Audio - Part 2",
    "creator": "REAPER Mania",
    "note": "Follow the audio recording workflow and keep the original take intact while you try the edit exercise."
  },
  "dawMedia": null,
  "steps": {
    "reaper": [
      "Create a track, choose the mono or stereo input that matches the source, then arm the track.",
      "Set input monitoring deliberately and adjust interface gain while performing the loudest expected phrase.",
      "Record a short test, listen back, then record a complete take. Split and trim the media item while keeping a project copy or alternate take.",
      "Add a short fade at an edit edge if needed and listen for clicks."
    ]
  }
};
