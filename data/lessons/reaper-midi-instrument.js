/* Lesson body for "reaper-midi-instrument". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "reaper-midi-instrument",
  "title": "Record MIDI and play it through a virtual instrument",
  "skill": "MIDI & rhythm",
  "level": "Beginner",
  "time": 13,
  "summary": "Route a controller or virtual keyboard to an instrument, then edit the recorded notes.",
  "course": {
    "id": "reaper",
    "name": "REAPER course",
    "kind": "daw"
  },
  "position": {
    "index": 5,
    "total": 12
  },
  "nav": {
    "prev": {
      "id": "reaper-audio-recording",
      "title": "Record and edit an audio take"
    },
    "next": {
      "id": "reaper-arrange-edit",
      "title": "Arrange a song with media items, markers, and fades"
    }
  },
  "objectives": [
    "Insert an instrument on a track.",
    "Select the MIDI input and record-enable the track.",
    "Edit note timing and velocity while listening to the sound."
  ],
  "concept": "MIDI carries note and controller instructions; a virtual instrument turns those instructions into sound. In REAPER, an instrument plug-in can live in the track FX chain, while MIDI items hold the performance data.",
  "exercise": "Record a two-bar melody or chord pattern, then create a copy with only two notes adjusted for timing or velocity. Compare both versions.",
  "mistake": "MIDI can record correctly while making no sound if the track has no instrument or its output is not routed. Check the instrument and meters before rerecording.",
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
    "video": "HOcJ31SIj68",
    "title": "This is REAPER 7 - Recording MIDI",
    "creator": "REAPER Mania",
    "note": "Watch the MIDI input and recording setup, then record a short phrase and edit its notes in the lesson exercise."
  },
  "dawMedia": null,
  "steps": {
    "reaper": [
      "Insert a track and add a virtual instrument through its FX window. REAPER includes ReaSynth; other instruments can be installed separately.",
      "Choose the controller or virtual MIDI keyboard as track input, set the track to record MIDI, and arm it.",
      "Record a short phrase. Open the MIDI item in the MIDI editor to move notes, adjust lengths, or edit velocity.",
      "Listen before quantizing. Correct only timing problems that interfere with the intended groove."
    ]
  }
};
