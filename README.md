# Roomtone — Open Music Classroom

A small, static music-production academy. Learners can follow shared production concepts or select an application for DAW-specific steps, original workflow diagrams, and exercises.

The subject explorer also builds multi-topic paths across instruments, vocals, songwriting, music theory, ear training, recording, synthesis, sampling, DJing, mixing, mastering, performance, music history, music technology, and music business. Learners can reorder or remove their selected subjects. DAW selection is optional.

## Learning paths

- **Paid:** Ableton Live and FL Studio.
- **Free to use:** LMMS and Waveform Free.
- Lessons cover project setup, MIDI and rhythm, sound selection, arrangement, audio recording (when supported), mixing, automation, export, and troubleshooting.
- LMMS is free/open-source and MIDI/pattern-focused. Its stable workflow does not record live audio input; the current 1.3.0-alpha.2 adds early JACK sample-track recording, but that is a pre-release feature. The curriculum labels the version distinction and offers Waveform Free for the beginner all-in-one recording path.
- Waveform Free is an ongoing no-cost tier with optional paid expansions, not a time-limited trial. Its current feature limits are summarized in the site.
- FL Studio's trial is not described as a free edition: it can save and export but saved project files cannot be reopened until a license is purchased. Fruity Edition also excludes audio recording.
- The lesson library and path builder are free. Progress is stored in the browser with localStorage and is not sent to a server.
- Light/dark appearance follows the system preference on first visit; the header toggle saves an explicit choice locally.

The DAW status notes were checked against official developer pages on 18 October 2026. Platform, license, download, and feature details can change. Follow the official links on the site for current terms before installing or purchasing.

## Run locally

No install step, account, package manager, or build process is needed. Serve this folder over HTTP:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

The site also works when opened directly from `index.html`; lesson video buttons open YouTube in a new tab.

## GitHub Pages

This is a root-relative-free static site, so it works both at a custom domain root and a GitHub Pages project URL. To deploy, push the repository and in **Settings → Pages** select **Deploy from a branch**, then choose the branch and `/ (root)` folder. The `index.html` entry point supports the Pages refresh behavior because all sections use in-page anchors rather than client-side routes.

## Curriculum editing

DAW metadata and shared production lessons live in `curriculum.js`; non-DAW subjects and lessons live in `curriculum-extra.js`; curated YouTube links and short studio notes for every lesson live in `lesson-media.js`; rendering and interactions live in `app.js`; styling is in `styles.css`. Each lesson has objectives, explanation, exercise, and mistake notes, with an optional per-DAW `steps` list. Keep status claims tied to official vendor pages, and clearly label edition-specific requirements when adding lessons.

Progress and selected subject order use versioned localStorage records. Clearing browser data clears this information. There is no account, analytics, advertising script, affiliate integration, or monetization provider configured.
