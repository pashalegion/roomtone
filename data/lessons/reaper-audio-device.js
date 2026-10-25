/* Lesson body for "reaper-audio-device". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "reaper-audio-device",
  "title": "Choose an audio device and manage recording latency",
  "skill": "Setup",
  "level": "Beginner",
  "time": 10,
  "summary": "Match the audio system, input, output, and buffer to the task you are doing.",
  "course": {
    "id": "reaper",
    "name": "REAPER course",
    "kind": "daw"
  },
  "position": {
    "index": 2,
    "total": 12
  },
  "nav": {
    "prev": {
      "id": "reaper-project-setup",
      "title": "Create a REAPER project that keeps its media together"
    },
    "next": {
      "id": "reaper-tracks-routing",
      "title": "Build a clear track layout for audio and MIDI"
    }
  },
  "objectives": [
    "Select a working audio device and available channels.",
    "Understand the trade-off between low latency and stable playback.",
    "Change one audio preference at a time and verify the result."
  ],
  "concept": "REAPER uses an audio system and device chosen in Preferences. A smaller buffer can make live monitoring and software instruments feel more responsive; a larger buffer may reduce crackles in demanding sessions. Hardware direct monitoring can bypass software delay for input monitoring.",
  "exercise": "Write down the current device and buffer. Record a short test at two buffer settings and note latency and crackles, changing nothing else between tests.",
  "mistake": "Changing driver, sample rate, buffer, and routing together makes it hard to find the cause. Test one setting at a time.",
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
    "video": "Nvj4e2oZfjY",
    "title": "Learn Reaper 7: Every Basic You Need, From Silence to Render",
    "creator": "Sounds Human",
    "note": "Use the audio-device and buffer chapters as a guided setup, then test the settings on your own system."
  },
  "dawMedia": null,
  "steps": {
    "reaper": [
      "Open Options → Preferences → Audio → Device and select the interface or built-in device supported on your system.",
      "Enable only the input and output channels you need, then choose a sample rate and buffer supported by the device.",
      "Play a project and listen for dropouts. If crackling occurs, increase the buffer; if live playing feels delayed, reduce it gradually.",
      "Record a short test and compare software monitoring with direct monitoring if your interface provides it."
    ]
  }
};
