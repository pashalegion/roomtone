/* Lesson body for "midi-groove". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "midi-groove",
  "title": "Program a groove before you polish it",
  "skill": "MIDI & rhythm",
  "level": "Beginner",
  "time": 12,
  "summary": "Use a kick, backbeat, and hats to make a two-bar rhythm with a deliberate pocket.",
  "course": {
    "id": "foundation",
    "name": "Shared foundation",
    "kind": "foundation"
  },
  "position": {
    "index": 2,
    "total": 8
  },
  "nav": {
    "prev": {
      "id": "first-session",
      "title": "Set up a session that stays out of your way"
    },
    "next": {
      "id": "sound-selection",
      "title": "Choose sounds that already belong together"
    }
  },
  "objectives": [
    "Place kick and snare on a two-bar grid.",
    "Use note length and velocity to shape movement.",
    "Compare strict grid timing with a small humanized shift."
  ],
  "concept": "MIDI is performance instruction, not sound. Notes carry pitch, start time, duration, and velocity; a virtual instrument turns those instructions into audio. A groove can be tight without every hit landing on the exact same subdivision.",
  "exercise": "Make two versions of the same two-bar groove: one quantized, one with a subtle timing/velocity variation. Export both and decide which supports the mood.",
  "mistake": "Quantizing everything to the smallest grid can flatten the performance. Start with a clear pulse, then make only intentional timing changes.",
  "resourceLinks": [],
  "media": {
    "video": "AKDpQV3devg",
    "title": "Building your first drum pattern for Music Production!",
    "creator": "SEIDS",
    "note": "Listen for the relationship between kick, backbeat, and subdivision before copying any exact pattern."
  },
  "dawMedia": null,
  "steps": {
    "ableton": [
      "Create a MIDI track and load Drum Rack from the Browser. Add a kit or three simple drum sounds.",
      "Create a two-bar MIDI clip. In the note editor, draw kick on beats 1 and 3, snare on 2 and 4, and eighth-note hats.",
      "Duplicate the clip to make two bars. Remove or soften one hat and add a small variation at the end of bar two.",
      "Audition at a comfortable tempo. Adjust velocity first; then move only one or two hits slightly off-grid if the groove calls for it."
    ],
    "flstudio": [
      "In the Channel Rack, load a kick, clap/snare, and hat. Use the step buttons to sketch a one-bar pattern.",
      "Open the Piano roll for each drum channel and extend the pattern to two bars. Place kick on 1 and 3, snare on 2 and 4, hats on eighths.",
      "Use the velocity lane to make alternating hats softer. Add a small fill only in the final beat of bar two.",
      "In the Playlist, repeat the pattern and listen at a comfortable tempo. Change one thing at a time so you hear what creates the pocket."
    ],
    "lmms": [
      "Add a beat/bassline track and load three samples: kick, snare or clap, and closed hat.",
      "Use the Beat+Bassline editor to place a simple kick/snare pattern. Add eighth-note hats, then open Piano Roll for more exact two-bar note editing.",
      "Adjust note velocities in the Piano Roll velocity lane to avoid identical hat accents.",
      "Repeat the pattern and make one variation at the end of the second bar. Render a short audio file to compare versions."
    ],
    "waveform": [
      "Create a MIDI track and load a drum instrument or sampler. If no kit is available, import three short one-shot samples onto audio tracks.",
      "Create a two-bar MIDI clip. Draw kick on 1 and 3, snare on 2 and 4, and eighth-note hats.",
      "Edit note velocity so the hats alternate strong and soft. Add a single variation near the end of bar two.",
      "Loop the clip and listen at a comfortable tempo. Change one timing or velocity choice at a time."
    ],
    "reaper": [
      "Insert a track and choose Insert → New MIDI item over a short time selection, or arm a track for MIDI input from a controller.",
      "Open the MIDI item in the editor. Draw kick and backbeat notes on a simple grid, then add quieter accents with note velocity.",
      "For an instrument part, add a virtual instrument from the FX browser to the track and confirm MIDI input reaches it.",
      "Loop two bars and change one timing or velocity choice at a time. REAPER does not force a built-in drum kit workflow; add a plugin or use audio samples if needed."
    ]
  }
};
