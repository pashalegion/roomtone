/* Lesson body for "reaper-render-export". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "reaper-render-export",
  "title": "Render a master mix and check the exported file",
  "skill": "Export",
  "level": "Beginner",
  "time": 11,
  "summary": "Choose the render bounds, format, and destination, then listen to the file outside the project.",
  "course": {
    "id": "reaper",
    "name": "REAPER course",
    "kind": "daw"
  },
  "position": {
    "index": 11,
    "total": 12
  },
  "nav": {
    "prev": {
      "id": "reaper-mix-session",
      "title": "Balance a REAPER mix and protect headroom"
    },
    "next": {
      "id": "reaper-troubleshooting",
      "title": "Troubleshoot silence, crackles, and missing recordings"
    }
  },
  "objectives": [
    "Render the full song from the Master output.",
    "Choose an appropriate format for the intended use.",
    "Inspect the export by listening from beginning to end."
  ],
  "concept": "Rendering converts the project playback path into a deliverable audio file. REAPER's render window can render the master, selected tracks, items, or regions; the bounds and output settings need to match the task.",
  "exercise": "Render a one-minute arrangement to stereo WAV. Play it outside the project and note one improvement to make in the session before creating a new version.",
  "mistake": "The render can omit an ending or include unwanted silence if its bounds are wrong. Confirm the selected render range before starting.",
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
    "video": "OM_z6KdX1_8",
    "title": "Rendering - Creating a Master Mix in REAPER",
    "creator": "REAPER Mania",
    "note": "Watch the master-render choices, then render your own full project and listen to the exported file all the way through."
  },
  "dawMedia": null,
  "steps": {
    "reaper": [
      "Save the project, then open File → Render.",
      "Choose Master mix and the full project bounds for a complete song; confirm the filename and destination.",
      "Choose WAV for a high-quality working master, or another format when the recipient or platform requires it.",
      "Render and play the file outside REAPER. Check the opening, ending, loudest section, and file location."
    ]
  }
};
