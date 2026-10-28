/* Lesson body for "topic-research-technology-manage-latency-while-recording". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "topic-research-technology-manage-latency-while-recording",
  "title": "Manage latency while recording",
  "skill": "Setup",
  "level": "Beginner",
  "time": 12,
  "summary": "Balance monitoring delay against playback stability.",
  "course": {
    "id": "technology",
    "name": "Music technology",
    "kind": "subject"
  },
  "position": {
    "index": 8,
    "total": 10
  },
  "nav": {
    "prev": {
      "id": "topic-research-technology-connect-midi-input-to-an-instrument",
      "title": "Connect MIDI input to an instrument"
    },
    "next": {
      "id": "topic-research-technology-route-a-signal-through-a-simple-chain",
      "title": "Route a signal through a simple chain"
    }
  },
  "objectives": [
    "Record a short test at your current buffer setting.",
    "Change one buffer step and compare monitoring delay and crackles.",
    "Note a stable recording setting and a separate playback setting if one helps."
  ],
  "concept": "Audio buffer settings trade responsiveness for processing stability. Smaller buffers can reduce monitoring delay while increasing processor demand; larger buffers can reduce dropouts during playback. Names and behavior vary by driver and device.",
  "exercise": "Record a short test at your current buffer setting. Change one step, repeat, and compare monitoring delay and crackles. Note the stable recording setting and a separate playback setting if your system benefits from one.",
  "mistake": "Do not change multiple driver or buffer controls at once. Record the original setting and test one variable at a time.",
  "resourceLinks": [
    {
      "label": "MIDI Association: MIDI basics",
      "url": "https://midi.org/what-is-midi"
    }
  ],
  "media": {
    "video": "HG_Jj7g571g",
    "title": "Best Buffer Size For Mixing & Recording [Buffer Size Explained]",
    "creator": "Orpheus Audio Academy",
    "note": "Listening cue: Audio buffer settings trade responsiveness for processing stability. Pause and try it in the exercise below before adding anything else."
  },
  "dawMedia": null,
  "steps": null
};
