/* Lesson body for "reaper-arrange-edit". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "reaper-arrange-edit",
  "title": "Arrange a song with media items, markers, and fades",
  "skill": "Arrangement",
  "level": "Beginner",
  "time": 13,
  "summary": "Turn a short loop into sections and make clean edits on the timeline.",
  "course": {
    "id": "reaper",
    "name": "REAPER course",
    "kind": "daw"
  },
  "position": {
    "index": 6,
    "total": 12
  },
  "nav": {
    "prev": {
      "id": "reaper-midi-instrument",
      "title": "Record MIDI and play it through a virtual instrument"
    },
    "next": {
      "id": "reaper-effects-chain",
      "title": "Add and order instruments and effects in the FX chain"
    }
  },
  "objectives": [
    "Duplicate and place audio or MIDI items on the timeline.",
    "Mark sections so the arrangement is easy to navigate.",
    "Use item edges and fades to avoid clicks."
  ],
  "concept": "The Arrange view is REAPER's timeline for media items. Repetition creates a foundation; changes in entrances, exits, and texture give sections shape. Markers and regions make the larger form visible and can also guide export.",
  "exercise": "Arrange 16 bars as intro, main section, and ending. Use markers to label each section and make one clear entrance change. Listen across the joins for clicks.",
  "mistake": "A perfectly aligned clip edge can still click if the waveform is cut away from a zero crossing. Add a small fade or crossfade when needed.",
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
    "video": "EGL54WGa85A",
    "title": "This is REAPER 7 - Basic Audio Editing",
    "creator": "REAPER Mania",
    "note": "Watch the item editing and fade choices, then use markers and sections to arrange your own short project."
  },
  "dawMedia": null,
  "steps": {
    "reaper": [
      "Place a short MIDI or audio idea on the timeline and duplicate it to build a main section.",
      "Use item splits and trims to vary or remove parts; check snapping when aligning edits to bars.",
      "Insert markers or regions to label the intro, main section, and ending.",
      "Add short fades or crossfades at audio edit points and play across each transition."
    ]
  }
};
