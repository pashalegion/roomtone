/* Lesson body for "troubleshoot". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "troubleshoot",
  "title": "Troubleshoot silence, crackles, and missing sound",
  "skill": "Setup",
  "level": "Beginner",
  "time": 9,
  "summary": "Trace a signal from source to output before changing random settings.",
  "course": {
    "id": "foundation",
    "name": "Shared foundation",
    "kind": "foundation"
  },
  "position": {
    "index": 8,
    "total": 8
  },
  "nav": {
    "prev": {
      "id": "automation-export",
      "title": "Automate one move and export a real file"
    },
    "next": null
  },
  "objectives": [
    "Check the signal path in a reliable order.",
    "Tell a device problem from a routing or instrument problem.",
    "Change one setting at a time and verify the result."
  ],
  "concept": "Audio problems become easier when you follow signal flow: sound source → track input or instrument → track meter → mixer channel → master meter → output device. If a meter moves at one stage and not the next, the fault is downstream.",
  "exercise": "Mute the master, then unmute it and trace meters from a single source toward the output. Write down the first point where signal disappears.",
  "mistake": "Changing several audio settings at once can hide the cause. Change one setting, test, then keep or revert it.",
  "resourceLinks": [],
  "media": {
    "video": "tQHxqIFnyi8",
    "title": "Handling Crackle and CPU Problems in Audio Production. And Simple Definition of Latency.",
    "creator": "Fender Studio Training by DAWJunkie",
    "note": "Trace the signal one stage at a time. Change one setting, test, and keep a note of what changed."
  },
  "dawMedia": null,
  "steps": {
    "ableton": [
      "If there is silence, check that the track contains an instrument or clip, then inspect its track meter and mixer routing.",
      "If the track meter moves but you hear nothing, check the Master meter, output configuration in Settings → Audio, and the system output volume.",
      "If audio crackles, raise the buffer size and close other high-CPU applications. If playing feels delayed, lower the buffer again for recording.",
      "If a plug-in is missing, verify its format and folder in Plug-in settings, then rescan. Save a copy before replacing devices."
    ],
    "flstudio": [
      "For silence, confirm the Channel Rack instrument or Playlist clip exists, then check that its Mixer insert is assigned and not muted.",
      "Follow the Mixer insert meter to the Master meter. If the Master moves, check Options → Audio settings and system output.",
      "For crackles, select the interface's recommended driver and increase the buffer. Lower it again only when recording needs responsive input.",
      "For a missing plug-in, verify the installed format and scan paths in Plugin Manager. Save a new project version before substituting it."
    ],
    "lmms": [
      "For silence, check that the pattern is in the Song Editor, the instrument channel is enabled, and the master/output meter responds.",
      "Confirm the Audio settings backend and operating-system output device match the device you are listening through.",
      "For crackles, try another supported audio backend or increase the buffer. Close competing apps that may hold the audio device.",
      "Live sample-track recording is available in the current 1.3 alpha via JACK; if recording isn't available in your stable build, use a separate recorder or Waveform Free."
    ],
    "waveform": [
      "For silence, confirm the clip or instrument is on an enabled track and trace its meter through track, bus, master, and output.",
      "Check Audio Devices and confirm the selected output matches your operating-system playback device.",
      "For crackles, increase the audio buffer and check that the sample rate is supported by the selected device.",
      "If a plug-in is missing, check its installed format and scan location, then reopen the project copy before making substitutions."
    ],
    "reaper": [
      "For silence, check the item or instrument, track input/FX, track meter, routing, Master meter, and hardware output in that order.",
      "For recording problems, confirm the input is enabled in Preferences → Audio → Device and selected on the armed track.",
      "For latency or crackles, test one buffer or driver setting at a time and use the lowest stable buffer while playing/recording.",
      "Use the Actions list to search for a command if a menu or shortcut differs; REAPER key mappings and layouts can be customized."
    ]
  }
};
