/* Lesson body for "reaper-mix-session". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "reaper-mix-session",
  "title": "Balance a REAPER mix and protect headroom",
  "skill": "Mixing",
  "level": "Beginner",
  "time": 14,
  "summary": "Set levels, organize a small mix, and use the Master meter as a safety check.",
  "course": {
    "id": "reaper",
    "name": "REAPER course",
    "kind": "daw"
  },
  "position": {
    "index": 10,
    "total": 12
  },
  "nav": {
    "prev": {
      "id": "reaper-automation",
      "title": "Shape a transition with track or effect envelopes"
    },
    "next": {
      "id": "reaper-render-export",
      "title": "Render a master mix and check the exported file"
    }
  },
  "objectives": [
    "Build a level hierarchy with faders and pan.",
    "Use folders or sends to manage related parts.",
    "Check for clipping and preserve the source."
  ],
  "concept": "A useful mix begins with balance and musical roles, not plug-in quantity. REAPER's flexible routing and included processors can support a complete mix, but the learner still needs to choose any additional sound libraries or specialized plug-ins they want.",
  "exercise": "Balance a four-track project using only faders and pan first. Save a new version, then add no more than one processor per track if needed.",
  "mistake": "A hotter Master is not automatically a better mix. Leave headroom and judge changes at matched loudness.",
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
    "note": "Use the mixing and signal-flow chapters as examples, but begin your own mix with balance and headroom before adding processors."
  },
  "dawMedia": null,
  "steps": {
    "reaper": [
      "Start playback and set track faders so the most important part is clear without clipping the Master.",
      "Pan parts where it helps separation; keep low-frequency anchors centered unless the musical choice calls for otherwise.",
      "Add EQ or compression only when listening reveals a specific issue. Compare at a similar output level.",
      "Use a folder or effect send for related parts, then check the Master and listen at a quiet level."
    ]
  }
};
