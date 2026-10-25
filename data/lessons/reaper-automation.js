/* Lesson body for "reaper-automation". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "reaper-automation",
  "title": "Shape a transition with track or effect envelopes",
  "skill": "Automation",
  "level": "Beginner",
  "time": 11,
  "summary": "Reveal a parameter envelope, place a few points, and make one purposeful change over time.",
  "course": {
    "id": "reaper",
    "name": "REAPER course",
    "kind": "daw"
  },
  "position": {
    "index": 9,
    "total": 12
  },
  "nav": {
    "prev": {
      "id": "reaper-routing-sends",
      "title": "Route related tracks with folders and sends"
    },
    "next": {
      "id": "reaper-mix-session",
      "title": "Balance a REAPER mix and protect headroom"
    }
  },
  "objectives": [
    "Show a track or FX parameter envelope.",
    "Use a few points to create a controlled change.",
    "Listen in context and avoid accidental automation modes."
  ],
  "concept": "An envelope stores a parameter value over time. REAPER can automate track volume, pan, mute, and many plug-in parameters. A small number of clear points is often easier to edit than many tiny movements.",
  "exercise": "Create a gentle volume fade or one filter movement over four bars. Compare the section with the envelope enabled and bypassed.",
  "mistake": "Automation modes such as Write, Touch, and Latch behave differently. Confirm the mode before performing parameter moves.",
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
    "video": "Un719m_7pNc",
    "title": "Envelopes and Automation in REAPER",
    "creator": "REAPER Mania",
    "note": "Watch how an envelope controls a parameter over time. Then draw a simple move and check the automation mode first."
  },
  "dawMedia": null,
  "steps": {
    "reaper": [
      "Choose a track parameter, such as volume, or use the FX parameter menu to expose a plug-in control.",
      "Show its envelope from the track controls and insert a few points around the transition.",
      "Play the full phrase and adjust the curve until the change supports the arrangement.",
      "If writing automation in real time, check the selected automation mode before playback to avoid recording unexpected changes."
    ]
  }
};
