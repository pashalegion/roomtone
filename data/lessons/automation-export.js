/* Lesson body for "automation-export". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "automation-export",
  "title": "Automate one move and export a real file",
  "skill": "Export",
  "level": "Beginner",
  "time": 12,
  "summary": "Make one musical parameter move, render the full range, and check the file outside the DAW.",
  "course": {
    "id": "foundation",
    "name": "Shared foundation",
    "kind": "foundation"
  },
  "position": {
    "index": 7,
    "total": 8
  },
  "nav": {
    "prev": {
      "id": "mix-balance",
      "title": "Make a rough mix with level and space"
    },
    "next": {
      "id": "troubleshoot",
      "title": "Troubleshoot silence, crackles, and missing sound"
    }
  },
  "objectives": [
    "Automate one parameter with a clear musical purpose.",
    "Choose the correct render range and file format.",
    "Reimport or play back the exported audio to catch mistakes."
  ],
  "concept": "Automation records a parameter change over time: volume can create a fade, filter cutoff can add motion, and send level can widen a transition. Export is a translation check, not just a button; listen to the rendered file from beginning to end.",
  "exercise": "Export a one-minute arrangement to WAV. Listen through once without stopping and write down one change you want to make in the project, not in the export.",
  "mistake": "Rendering only the current loop or selection can cut off the song. Confirm the full range and recheck the rendered file.",
  "resourceLinks": [],
  "media": {
    "video": "vPUn-kn-bcA",
    "title": "What is Automation and How to Use It | Music Production For Beginners",
    "creator": "Music Production For Beginners",
    "note": "Automation controls vary by DAW. Focus on the musical purpose of a move, then use the software-specific steps for the exact control."
  },
  "dawMedia": null,
  "steps": {
    "ableton": [
      "Choose a parameter with a purpose, such as a filter cutoff that opens into the next section. Enable automation mode and draw a simple ramp.",
      "Select the full arrangement range. Use File → Export Audio/Video and choose WAV, stereo, and a suitable sample rate/bit depth for the next use.",
      "Render, then import the WAV into a new track or play it in another app. Check the start, ending, transitions, and peak level.",
      "Keep the project and export in the project folder with clear names and a version number."
    ],
    "flstudio": [
      "Right-click a parameter and choose Create automation clip. Draw one deliberate movement across the transition.",
      "Set the Playlist range to the complete song and use File → Export → WAV (or MP3 for a listening copy). Choose stereo and a suitable bit depth.",
      "Render the file, then play it outside the project or reimport it. Check the beginning, ending, and loudest section.",
      "Save a new project version and keep the export alongside the project, clearly labeled."
    ],
    "lmms": [
      "Right-click a plugin or mixer parameter and create an automation track; draw one simple change that marks a section transition.",
      "Confirm the Song Editor range includes the whole piece. Use File → Export and render to WAV for a high-quality working master.",
      "Play the exported WAV outside LMMS. Check for a clipped peak, missing opening, unexpected silence, and abrupt ending.",
      "Save the project and rendered audio together. Remember LMMS exports audio but does not record audio input."
    ],
    "waveform": [
      "Choose a filter, send, or track-volume parameter and draw one automation change that has an audible purpose.",
      "Select the complete Edit range and open the render/export dialog. Choose stereo WAV and a bit depth appropriate to delivery.",
      "Render and listen to the file outside the session or import it into a fresh track. Confirm the start and tail are intact.",
      "Save a new version and keep the project, source audio, and render organized together."
    ],
    "reaper": [
      "Choose a track volume, pan, or FX parameter and show its envelope from the track controls.",
      "Add a few envelope points to make a single intentional change across a section; keep the move easy to hear.",
      "Open File → Render, choose the master mix and the full project bounds, then choose the required format and destination.",
      "Render a WAV, listen to it from beginning to end, and check its start, tail, and peak level."
    ]
  }
};
