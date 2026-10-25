/* Lesson body for "topic-research-technology-connect-midi-input-to-an-instrument". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "topic-research-technology-connect-midi-input-to-an-instrument",
  "title": "Connect MIDI input to an instrument",
  "skill": "Setup",
  "level": "Beginner",
  "time": 12,
  "summary": "Trace control messages from a keyboard to a sound source and audio output.",
  "course": {
    "id": "technology",
    "name": "Music technology",
    "kind": "subject"
  },
  "position": {
    "index": 7,
    "total": 10
  },
  "nav": {
    "prev": {
      "id": "topic-research-technology-learn-sample-rate-and-bit-depth-basics",
      "title": "Learn sample rate and bit depth basics"
    },
    "next": {
      "id": "topic-research-technology-manage-latency-while-recording",
      "title": "Manage latency while recording"
    }
  },
  "objectives": [
    "Understand the key idea behind connect midi input to an instrument.",
    "Apply it in a short practice task.",
    "Listen back and choose one specific next step."
  ],
  "concept": "MIDI note data does not contain recorded sound. A controller sends messages to an instrument, which generates audio that must then reach an output; checking each stage isolates silence.",
  "exercise": "Play a MIDI keyboard and observe its input activity. Route it to a software or hardware instrument, then verify an audio meter and monitor output. Write down the point where control becomes sound.",
  "mistake": "A lit MIDI indicator does not prove audio is routed to speakers. Check instrument and output stages separately.",
  "resourceLinks": [
    {
      "label": "MIDI Association: MIDI basics",
      "url": "https://midi.org/what-is-midi"
    }
  ],
  "media": {
    "video": "4revAw3lT4g",
    "title": "Creación musical con MIDI | Producción musical para principiantes",
    "creator": "Audio University",
    "note": "Listening cue: MIDI note data does not contain recorded sound. Pause and try it in the exercise below before adding anything else."
  },
  "dawMedia": null,
  "steps": null
};
