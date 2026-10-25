/* Lesson body for "reaper-project-setup". Metadata lives in data/lessons-index.js. */
window.RT_LESSON_BODY = {
  "id": "reaper-project-setup",
  "title": "Create a REAPER project that keeps its media together",
  "skill": "Setup",
  "level": "Beginner",
  "time": 9,
  "summary": "Set the project folder, tempo, meter, and audio device before you begin tracking.",
  "course": {
    "id": "reaper",
    "name": "REAPER course",
    "kind": "daw"
  },
  "position": {
    "index": 1,
    "total": 12
  },
  "nav": {
    "prev": null,
    "next": {
      "id": "reaper-audio-device",
      "title": "Choose an audio device and manage recording latency"
    }
  },
  "objectives": [
    "Save the project with its media in a predictable location.",
    "Set tempo and meter for the musical idea.",
    "Confirm REAPER can play sound through the selected device."
  ],
  "concept": "REAPER separates project settings from global audio-device preferences. A portable project folder protects imported and recorded media, while the device and buffer settings determine how input and playback behave.",
  "exercise": "Create and save a project called practice-01. Import a short audio file with copy-to-project enabled, close the project, and reopen it to confirm the media is found.",
  "mistake": "Saving a project file without copying external media can leave the project dependent on files scattered elsewhere. Keep a portable project copy before moving or sharing it.",
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
    "video": "hLB83sOxVfs",
    "title": "This is REAPER 7 - Starting a New Project",
    "creator": "REAPER Mania",
    "note": "Watch how the project is created, then use the exercise to verify your own project can find its media."
  },
  "dawMedia": null,
  "steps": {
    "reaper": [
      "Choose File → New project, then File → Save project as and make a dedicated folder.",
      "Enable the options to create a project subdirectory and copy media into the project when appropriate.",
      "Set tempo and meter in the transport; use File → Project settings for project-specific options.",
      "Open Options → Preferences → Audio → Device, select the available driver and device, then test playback."
    ]
  }
};
