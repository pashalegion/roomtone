/* Lesson body for "reaper-routing-sends". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "reaper-routing-sends",
  "title": "Route related tracks with folders and sends",
  "skill": "Mixing",
  "level": "Beginner",
  "time": 13,
  "summary": "Group parts for control and share an effect without losing track of the signal path.",
  "course": {
    "id": "reaper",
    "name": "REAPER course",
    "kind": "daw"
  },
  "position": {
    "index": 8,
    "total": 12
  },
  "nav": {
    "prev": {
      "id": "reaper-effects-chain",
      "title": "Add and order instruments and effects in the FX chain"
    },
    "next": {
      "id": "reaper-automation",
      "title": "Shape a transition with track or effect envelopes"
    }
  },
  "objectives": [
    "Understand parent/child folder routing.",
    "Create a send to an effect return.",
    "Trace the path to prevent doubled or missing signals."
  ],
  "concept": "REAPER routes audio and MIDI between tracks using sends, receives, and folder parent-child relationships. A folder can act like a group bus; a dedicated effect track can receive sends from several sources. The signal path should remain easy to trace.",
  "exercise": "Route two tracks to a shared reverb return. Mute the return, then restore it and compare the mix; sketch the path from sources to Master.",
  "mistake": "A send and a folder are different tools. Check whether a track still routes directly to the Master when you intend it to pass through a folder bus.",
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
    "video": "pfHGwzNyFC8",
    "title": "This is REAPER 6 - Sends & Busses (8/15)",
    "creator": "DRAM 2620 course",
    "note": "Follow the shared-effect routing example, then sketch the source, return, and master signal path from your own project."
  },
  "dawMedia": null,
  "steps": {
    "reaper": [
      "Create a folder track above a few related tracks and place them beneath it as children; check the folder's summed meter.",
      "Create a separate effect track, insert a reverb, then open the source track routing controls and add a send to the effect track.",
      "Adjust the send level while listening to the dry source and returned effect together.",
      "Check master/parent routing so the original signal is not accidentally muted or doubled."
    ]
  }
};
