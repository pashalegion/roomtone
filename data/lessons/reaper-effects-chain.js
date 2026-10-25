/* Lesson body for "reaper-effects-chain". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "reaper-effects-chain",
  "title": "Add and order instruments and effects in the FX chain",
  "skill": "Sound & effects",
  "level": "Beginner",
  "time": 12,
  "summary": "Use REAPER's FX browser to build a short, intentional processing chain.",
  "course": {
    "id": "reaper",
    "name": "REAPER course",
    "kind": "daw"
  },
  "position": {
    "index": 7,
    "total": 12
  },
  "nav": {
    "prev": {
      "id": "reaper-arrange-edit",
      "title": "Arrange a song with media items, markers, and fades"
    },
    "next": {
      "id": "reaper-routing-sends",
      "title": "Route related tracks with folders and sends"
    }
  },
  "objectives": [
    "Open the track FX window and find a processor.",
    "Understand that FX order changes the result.",
    "Compare bypassed and processed sound at similar loudness."
  ],
  "concept": "REAPER's track FX chain can hold virtual instruments and audio effects. In a typical instrument track the instrument comes before effects; for audio, filters, dynamics, and time-based effects can be ordered to support a specific musical goal. REAPER includes native ReaPlugs and JS effects, but bundled synth choices are limited compared with some integrated DAWs.",
  "exercise": "Choose one audio source. Make a two-effect chain with a clear purpose, then bypass the chain and write down what changed besides loudness.",
  "mistake": "Adding effects because they are available can obscure the source. A short chain with a clear purpose is easier to understand and automate.",
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
    "note": "The effects chapters show track processing and FX chains. Keep your experiment short and compare it with the bypassed source."
  },
  "dawMedia": null,
  "steps": {
    "reaper": [
      "Open the track FX window and browse the included effects. Search for ReaEQ, ReaComp, or ReaVerbate as a starting point.",
      "Add one effect, listen, then add a second only if it solves a distinct problem.",
      "Use the bypass control to compare with the original at similar loudness.",
      "For an instrument track, check that the instrument is placed before audio-processing effects in the chain."
    ]
  }
};
