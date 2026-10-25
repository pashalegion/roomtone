/* Lesson body for "sound-selection". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "sound-selection",
  "title": "Choose sounds that already belong together",
  "skill": "Sound & effects",
  "level": "Beginner",
  "time": 10,
  "summary": "Build a small palette around role, register, and contrast instead of browsing forever.",
  "course": {
    "id": "foundation",
    "name": "Shared foundation",
    "kind": "foundation"
  },
  "position": {
    "index": 3,
    "total": 8
  },
  "nav": {
    "prev": {
      "id": "midi-groove",
      "title": "Program a groove before you polish it"
    },
    "next": {
      "id": "arrange-loop",
      "title": "Turn a loop into a short arrangement"
    }
  },
  "objectives": [
    "Name the musical role of each sound.",
    "Leave room in register and frequency for the other parts.",
    "Use one effect to shape space rather than stack presets."
  ],
  "concept": "A sound choice is an arrangement decision. Start with role and register: a kick anchors the low end, a bass carries weight or motion, chords occupy the middle, and a lead draws attention. Contrast can come from timing, tone, or space.",
  "exercise": "Make a 20-second loop with four sounds. Mute each sound in turn and write down what musical job disappears.",
  "mistake": "Replacing a sound every few minutes prevents arrangement decisions. Keep a workable sound long enough to write a part around it.",
  "resourceLinks": [],
  "media": {
    "video": "AwmR_x2TFpg",
    "title": "The ULTIMATE Beginners Guide to Sound Selection",
    "creator": "Luke Daly",
    "note": "Treat every sound choice as an arrangement choice. Keep the sound that serves the part, even if another preset is more impressive soloed."
  },
  "dawMedia": null,
  "steps": {
    "ableton": [
      "Browse by role rather than preset name: choose a short kick, a bass with a clear note, one chord sound, and one contrasting accent.",
      "Load one instrument per MIDI track. Keep the first pass to four parts so every sound has a job.",
      "Use a filter or envelope on the instrument to make a sound shorter or darker before adding effects.",
      "Add one send reverb or delay to create shared space. Compare with the effect bypassed at matched loudness."
    ],
    "flstudio": [
      "Load a kick, bass, chord instrument, and a short accent from the Browser or stock plugins.",
      "Give each instrument its own Channel Rack part and route it to a named Mixer insert.",
      "Shape one source using its filter/envelope. Add only one reverb or delay to a Mixer insert or send.",
      "A/B the effect at similar volume. Keep the dry sound if the effect hides the rhythm or masks another part."
    ],
    "lmms": [
      "Choose a kick, bass, chord patch, and accent from the bundled samples or instrument presets.",
      "Give each sound a specific role and keep sustained chords out of the bass register.",
      "Try one volume, filter, or envelope change before adding effects. Route related parts deliberately if you use mixer channels.",
      "Add a modest reverb or delay, then bypass it to check whether it adds useful depth."
    ],
    "waveform": [
      "Create a four-part palette: kick, bass, chord, accent. Use bundled instruments or legally obtained samples.",
      "Name the tracks by musical role so you can make arrangement decisions quickly.",
      "Use the instrument controls to change envelope/filter before inserting effects.",
      "Add one reverb or delay, then compare it bypassed at matched loudness. A louder version often sounds falsely better."
    ],
    "reaper": [
      "Insert one track per musical role and name the tracks before browsing sounds.",
      "Add a bundled instrument or a separately installed plug-in through the track FX window. For audio, import a sample as a media item.",
      "Use the instrument controls or a single ReaEQ/ReaVerbate-style effect to shape the source before adding more processing.",
      "Keep the palette small and compare bypassed versus processed at similar loudness."
    ]
  }
};
