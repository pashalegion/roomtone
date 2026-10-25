/* Lesson body for "topic-technology". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "topic-technology",
  "title": "Trace a signal from source to speaker",
  "skill": "Setup",
  "level": "Beginner",
  "time": 10,
  "summary": "Follow audio through input, track, bus, master, and output to find faults.",
  "course": {
    "id": "technology",
    "name": "Music technology",
    "kind": "subject"
  },
  "position": {
    "index": 1,
    "total": 10
  },
  "nav": {
    "prev": null,
    "next": {
      "id": "topic-technology-understand-midi-versus-audio",
      "title": "Understand MIDI versus audio"
    }
  },
  "objectives": [
    "Name each stage in a basic audio path.",
    "Use meters to identify where signal stops.",
    "Change one device or routing setting at a time."
  ],
  "concept": "Audio signal flow is a chain: source → input → track → processing/routing → master → output. MIDI is control data that can trigger a sound source; it is not itself audio. Knowing which kind of signal you have prevents many setup problems.",
  "exercise": "Connect a microphone or instrument, make a short test, and watch each available meter. Write down where signal first disappears. Repeat the trace with a MIDI controller driving an instrument and notice the audio appears after the instrument.",
  "mistake": "A moving MIDI meter or controller light does not prove audio is reaching the speakers. Trace both control and audio paths.",
  "resourceLinks": [],
  "media": {
    "video": "H5f1Nlni7Mo",
    "title": "Understanding Signal Flow: The Journey from Sound to Studio",
    "creator": "No Need to Vanish",
    "note": "Follow the meters from source to speaker. MIDI is control information; audio appears when a sound source turns it into sound."
  },
  "dawMedia": null,
  "steps": null
};
