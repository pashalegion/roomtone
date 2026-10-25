/* Lesson body for "mix-balance". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "mix-balance",
  "title": "Make a rough mix with level and space",
  "skill": "Mixing",
  "level": "Beginner",
  "time": 15,
  "summary": "Balance the most important parts first; use EQ and effects only when they solve a clear problem.",
  "course": {
    "id": "foundation",
    "name": "Shared foundation",
    "kind": "foundation"
  },
  "position": {
    "index": 6,
    "total": 8
  },
  "nav": {
    "prev": {
      "id": "record-take",
      "title": "Record a clean take (or bring one in)"
    },
    "next": {
      "id": "automation-export",
      "title": "Automate one move and export a real file"
    }
  },
  "objectives": [
    "Set a useful static balance with faders.",
    "Keep headroom on the master bus.",
    "Use EQ or effects in response to an audible conflict."
  ],
  "concept": "A mix is a hierarchy: decide what should lead, support, or sit behind. Start with level and panning, then address masking with arrangement or EQ. Leave headroom so the master does not clip; loudness can be considered after a balanced mix exists.",
  "exercise": "Mix a 30-second section using only track faders and pan. Then identify one audible masking problem and test one fix.",
  "mistake": "A master limiter can make a louder signal, but it cannot make the parts fit together. Balance first and compare at equal loudness.",
  "resourceLinks": [],
  "media": {
    "video": "3-rlm-mxdNQ",
    "title": "Setting Mixing Levels For Each Instrument",
    "creator": "JR Mastering",
    "note": "Build the hierarchy with faders first. Compare any processing change at a similar loudness so louder does not automatically seem better."
  },
  "dawMedia": null,
  "steps": {
    "ableton": [
      "Turn down track levels and begin with the main musical anchor (often vocal, kick, or lead). Bring other parts in one at a time.",
      "Pan supporting elements modestly while keeping essential low-frequency parts centered.",
      "If two parts mask each other, first change note timing/register or lower one part; use EQ only to solve the remaining conflict.",
      "Watch the Master meter. Leave a few dB of peak headroom and compare at matched playback loudness."
    ],
    "flstudio": [
      "Balance levels on Mixer inserts, starting with the most important part and adding supporting channels one at a time.",
      "Keep kick and bass centered. Use modest panning for parts that can sit to the sides.",
      "When sounds compete, try changing arrangement, octave, or level before applying EQ.",
      "Watch the Master peak meter and avoid clipping. Do not use a limiter to hide an unbalanced mix."
    ],
    "lmms": [
      "Route instruments to mixer channels when separate level/effect control is useful. Start with the bass/drum or lead anchor.",
      "Set fader levels so the key part reads clearly; use simple panning for secondary sounds.",
      "If parts mask each other, remove a note or change register first, then test a small EQ cut if needed.",
      "Leave headroom on the master output and render a test WAV. Listen quietly and on another playback device."
    ],
    "waveform": [
      "Use track faders to build the balance from the most important part outward.",
      "Keep kick, bass, and lead vocal centered unless there is a deliberate reason to move them.",
      "Solve masking with a part change or level move before adding EQ or compression.",
      "Watch the master meter for clipping. Export a quiet rough mix and listen away from the session before chasing loudness."
    ],
    "reaper": [
      "Start with track faders and pan controls. Keep the master output from clipping and leave headroom for later processing.",
      "Use ReaEQ and ReaComp only when a specific listening problem calls for them; compare changes at a similar loudness.",
      "Create an effects return with a separate track and a send when several parts should share reverb or delay.",
      "Mute and solo in context, then check the full mix quietly and on another playback system."
    ]
  }
};
