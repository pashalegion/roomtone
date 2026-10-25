/* Lesson body for "first-session". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "first-session",
  "title": "Set up a session that stays out of your way",
  "skill": "Setup",
  "level": "Beginner",
  "time": 8,
  "summary": "Set a useful tempo, meter, save location, and audio device before ideas pile up.",
  "course": {
    "id": "foundation",
    "name": "Shared foundation",
    "kind": "foundation"
  },
  "position": {
    "index": 1,
    "total": 8
  },
  "nav": {
    "prev": null,
    "next": {
      "id": "midi-groove",
      "title": "Program a groove before you polish it"
    }
  },
  "objectives": [
    "Create a named project folder and save a working version.",
    "Choose a tempo by feel and confirm the meter.",
    "Set the correct input and output device, then verify playback."
  ],
  "concept": "A session is a container for source files, timing, routing, and decisions. A predictable project folder protects recordings; a low-latency audio buffer helps playing and tracking, while a larger buffer often helps during mixing.",
  "exercise": "Create a blank project called practice-01. Set its tempo, save it, close it, and reopen it. Confirm that the project still finds its media folder.",
  "mistake": "Saving the project file in one location and recorded media somewhere unrelated makes sessions fragile. Keep the project and its audio together.",
  "resourceLinks": [],
  "media": {
    "video": "_emgDYEAJhI",
    "title": "Easy DAW Setup for Beginner Music Producers: Follow These Simple Steps",
    "creator": "Audio University",
    "note": "This overview works before you choose software. Pick a DAW whenever you are ready; the lesson will then switch to that program's getting-started video and steps."
  },
  "dawMedia": {
    "ableton": {
      "video": "eji6fRuVNUw",
      "title": "Make your first beat in Ableton Live | Beginner Series Ep. 1",
      "creator": "Ableton",
      "note": "Follow along in Ableton Live, then use the lesson steps to set up your own first session."
    },
    "flstudio": {
      "video": "RQDvnfleST0",
      "title": "FL Studio | Getting Started Tutorial",
      "creator": "FL Studio",
      "note": "Follow along in FL Studio, then use the lesson steps to set up your own first session."
    },
    "lmms": {
      "video": "RxufVnnHG60",
      "title": "LMMS - Tutorial for Beginners in 11 Minutes",
      "creator": "Skills Factory",
      "note": "This beginner overview uses LMMS. Its setup and naming differ from paid DAWs; use the lesson steps for the current LMMS workflow."
    },
    "waveform": {
      "video": "fHmEUA9PdyA",
      "title": "Get Started With Tracktion Waveform Free or Pro",
      "creator": "Audio Tech TV",
      "note": "This walkthrough includes Waveform Free. Follow the free-edition steps and skip any paid-only tools."
    },
    "reaper": {
      "video": "hLB83sOxVfs",
      "title": "This is REAPER 7 - Starting a New Project",
      "creator": "REAPER Mania",
      "note": "This is a REAPER-specific project setup walkthrough. Follow the lesson steps for a portable project folder and audio setup."
    }
  },
  "steps": {
    "ableton": [
      "Choose File → New Live Set, then save with File → Save Live Set As inside a new project folder.",
      "Set tempo and time signature in the Control Bar. Keep 4/4 only when it serves the music.",
      "Open Settings → Audio. Pick your interface or built-in device, set the input/output channels, then play a test clip.",
      "If playing a MIDI instrument feels delayed, lower the buffer while recording; raise it again if playback crackles."
    ],
    "flstudio": [
      "Choose File → New from template → Minimal, then save an .flp in a dedicated project folder.",
      "Set tempo in the top transport. FL Studio defaults to 4/4; change the time signature in the project settings if needed.",
      "Open Options → Audio settings. Select the interface driver and confirm inputs and outputs.",
      "Use a smaller buffer for responsive recording; increase it if the audio engine clicks during playback."
    ],
    "lmms": [
      "Create a new project and use File → Save As to save an .mmp in a dedicated folder.",
      "Set tempo in the transport and open the Time Signature controls if the piece is not in 4/4.",
      "Open Edit → Settings → Audio settings and select the available audio backend and device.",
      "LMMS is for sequencing and rendering, not live audio capture. Record an external performance in a separate recorder, then import the audio file if needed."
    ],
    "waveform": [
      "Create a new Edit, then save it in a new project folder before importing or recording anything.",
      "Set tempo and meter in the Edit settings / transport. Confirm both before recording to the grid.",
      "Open Settings → Audio Devices and choose the correct device, outputs, sample rate, and buffer.",
      "Use a small buffer to play/record with low delay. Raise it if you hear crackles while mixing."
    ],
    "reaper": [
      "Choose File → New project, then File → Save project as. Create a project subdirectory and copy imported media into it when prompted so the session stays portable.",
      "Set tempo and meter in the transport. Open File → Project settings to check the timebase and project sample rate where needed.",
      "Open Options → Preferences → Audio → Device. Select the audio system and input/output device; use the smallest stable buffer for live playing and a larger one if playback crackles.",
      "Play a test item and confirm the Master meter and output before recording."
    ]
  }
};
