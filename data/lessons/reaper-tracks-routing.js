/* Lesson body for "reaper-tracks-routing". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "reaper-tracks-routing",
  "title": "Build a clear track layout for audio and MIDI",
  "skill": "Setup",
  "level": "Beginner",
  "time": 10,
  "summary": "Use tracks as flexible lanes for recording, instruments, audio, and routing.",
  "course": {
    "id": "reaper",
    "name": "REAPER course",
    "kind": "daw"
  },
  "position": {
    "index": 3,
    "total": 12
  },
  "nav": {
    "prev": {
      "id": "reaper-audio-device",
      "title": "Choose an audio device and manage recording latency"
    },
    "next": {
      "id": "reaper-audio-recording",
      "title": "Record and edit an audio take"
    }
  },
  "objectives": [
    "Create and name tracks by musical role.",
    "Identify track controls, the mixer, and the master signal path.",
    "Choose a useful layout before adding more parts."
  ],
  "concept": "In REAPER, one track can hold audio, MIDI, effects, and routing. This flexibility is powerful, but clear names and simple track organization help you see what each part does and where its signal goes.",
  "exercise": "Create four named tracks for a short idea. Add one source to each, then trace each meter to the Master without using plug-ins.",
  "mistake": "REAPER's flexibility can encourage a complicated layout too early. Keep the first project to a few tracks and name them immediately.",
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
    "video": "L5E1enayMQY",
    "title": "This is REAPER 7 - The Tracks",
    "creator": "REAPER Mania",
    "note": "Notice how tracks hold different kinds of material and controls. Name your own tracks by their musical role."
  },
  "dawMedia": null,
  "steps": {
    "reaper": [
      "Use Insert → Track to add tracks and name them by role, such as Vocal, Bass, or Keys.",
      "Show the mixer and compare its channel strips with the track control panel in the Arrange view.",
      "Keep the Master track visible and follow a signal from source track to Master to hardware output.",
      "Color or group tracks only after the basic layout is clear; avoid adding folders until you know what they should control."
    ]
  }
};
