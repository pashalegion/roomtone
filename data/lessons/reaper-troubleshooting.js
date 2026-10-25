/* Lesson body for "reaper-troubleshooting". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "reaper-troubleshooting",
  "title": "Troubleshoot silence, crackles, and missing recordings",
  "skill": "Setup",
  "level": "Beginner",
  "time": 10,
  "summary": "Trace REAPER's signal path and check one cause at a time.",
  "course": {
    "id": "reaper",
    "name": "REAPER course",
    "kind": "daw"
  },
  "position": {
    "index": 12,
    "total": 12
  },
  "nav": {
    "prev": {
      "id": "reaper-render-export",
      "title": "Render a master mix and check the exported file"
    },
    "next": null
  },
  "objectives": [
    "Follow the signal from source to output.",
    "Separate recording-input issues from playback issues.",
    "Use the Actions list and official guide when controls differ."
  ],
  "concept": "A reliable troubleshooting order is source or instrument → track input and FX → track meter → routing → Master meter → hardware output. If one meter moves and the next does not, look downstream from the last point with signal.",
  "exercise": "Create a short MIDI sound and deliberately mute its route to the Master. Follow the meters to find where signal stops, then restore the route and document the fix.",
  "mistake": "Changing several settings at once hides the cause and can introduce new problems. Change one variable, test, and keep or revert it.",
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
    "video": "AHxft6LIodw",
    "title": "REAPER Buffer Size Tutorial: Fix Latency and Audio Crackling Fast",
    "creator": "Jared B.",
    "note": "Use the buffer explanation as one troubleshooting option. Change one setting at a time and confirm whether the result improves."
  },
  "dawMedia": null,
  "steps": {
    "reaper": [
      "For silence, confirm there is an item or instrument, check track mute/solo and FX, then watch the track meter during playback.",
      "If the track meter moves, inspect sends/folders, the Master meter, and the selected hardware output.",
      "For a missing recording, confirm device input channels are enabled, the correct track input is selected, and the track was armed in the intended recording mode.",
      "For crackles or delay, test a buffer adjustment. Use the Actions list to search for a command if custom mappings changed the menus or shortcuts."
    ]
  }
};
