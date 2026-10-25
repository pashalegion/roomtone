# Roomtone — Open Music Classroom

A small, static music-production academy. Start a lesson in one tap. Subjects and software are optional: pick them when a lesson needs them, or never.

## Pages

| Page | What it does |
| --- | --- |
| `index.html` | Home. "Start lesson 1", plus a "Continue" card once a lesson has been opened. |
| `lessons.html` | Library: search, skill filter, sort, and an optional subject filter. |
| `lesson.html?id=<id>` | One lesson, with its own URL, previous/next, keyboard arrows, and Mark complete. |
| `subjects.html` | Optional subject picker: multi-select, search, and your order. |
| `daws.html` | Optional software picker, with a free/paid filter. |
| `practice.html` | Metronome, tap tempo, arc exercise, step grid, and interval ear training. |
| `concepts.html` | Shared production concepts, each linked to a lesson. |
| `software.html` | License and platform table, linked to official vendor pages. |
| `progress.html` | Completed lessons, progress export and import, and reset. |
| `404.html` | Friendly not-found page. |

Old one-page anchors redirect on the home page: `#explore` → subjects, `#paths` → software picker, `#library` → lessons, `#concepts` → concepts, `#practice` → practice, `#software-notes` → licenses.

## Learning paths

- **Paid:** Ableton Live and FL Studio.
- **Free to use:** LMMS and Waveform Free.
- **“Technically free to use”:** REAPER has a fully functional 60-day evaluation. It is not permanently free; Cockos requires a license after 60 days. Cockos currently lists a $60 discounted license for personal use, education/non-profit, or commercial users with annual gross revenue of $20,000 or less, and a $225 commercial license for other commercial use, before applicable taxes. Check the official license page for current prices and eligibility.
- Lessons cover project setup, MIDI and rhythm, sound selection, arrangement, audio recording (when supported), mixing, automation, export, and troubleshooting.
- LMMS is free/open-source and MIDI/pattern-focused. Its stable workflow does not record live audio input; the current 1.3.0-alpha.2 adds early JACK sample-track recording, but that is a pre-release feature. The curriculum labels the version distinction and offers Waveform Free for the beginner all-in-one recording path.
- Waveform Free is an ongoing no-cost tier with optional paid expansions, not a time-limited trial. Its current feature limits are summarized in the site.
- FL Studio's trial is not described as a free edition: it can save and export but saved project files cannot be reopened until a license is purchased. Fruity Edition also excludes audio recording.
- REAPER lessons cover project setup, audio and MIDI recording, editing, plug-ins, routing, automation, mixing, rendering, and troubleshooting. REAPER is available for Windows, macOS, and Linux; the course points to Cockos' user guide and official video library.
- The lesson library and path builder are free. Progress is stored in the browser with localStorage and is not sent to a server.
- Light/dark appearance follows the system preference on first visit; the header toggle saves an explicit choice locally.

The DAW status notes were checked against official developer pages on 18 October 2026. Platform, license, download, and feature details can change. Follow the official links on the site for current terms before installing or purchasing.

## Run locally

No install step, account, package manager, or build process is needed. Either open `index.html` directly from disk, or serve the folder over HTTP:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>. Every page works from `file://` too; lesson pages load their content with `<script>` tags, not `fetch`. Lesson video buttons open YouTube in a new tab. There are no video embeds.

## Data layout

| File | Contents |
| --- | --- |
| `data/lessons-index.js` | Metadata for every lesson (title, skill, level, time, summary, course, relevant subjects, software with steps). Used by the library and progress pages. |
| `data/lessons/<id>.js` | The full lesson: idea, objectives, steps per software, exercise, mistake, video companion, and previous/next. Loaded only by `lesson.html?id=<id>`. |
| `data/subjects.js` | Optional subjects, their groups, and lesson counts. |
| `data/daws.js` | Software metadata, license and platform text, official links, and workflow outlines. |

When you add or change a lesson, edit both its body file and its entry in `data/lessons-index.js`. The data check in `tests/check-data.mjs` fails if they disagree. Keep status and license claims tied to official vendor pages, and clearly label edition-specific requirements.

Shared styles are in `assets/site.css`. Shared behavior (theme, header, saved choices, announcements) is in `assets/shell.js`. Each page has its own small script in `assets/`.

## Checks

These run in GitHub Actions on each pull request (see `.github/workflows/ci.yml`):

- `node tests/check-shell.mjs`: the header and footer markup must match on every page.
- `node tests/check-data.mjs`: the lesson index, lesson bodies, subjects, and software agree.
- `node tests/check-budget.mjs`: the home page loads under 60 KB of JavaScript and CSS.
- Playwright (`tests/site.spec.mjs`): every page at 375 px and 1280 px, in light and dark themes, with no horizontal scroll and no axe violations, plus file:// and flow tests. Run with:

  ```sh
  npm install --no-save --no-package-lock @playwright/test@1.56.1 @axe-core/playwright@4.10.1
  npx playwright install --with-deps chromium firefox
  npx playwright test -c tests/playwright.config.mjs
  ```

- Lighthouse CI (`lighthouserc.json`): mobile performance 95 or higher, LCP under 2.5 s, CLS under 0.1.

The site has no `package.json`. The browser and Lighthouse tooling is installed only for the CI job and for local test runs.

## Motion

Motion is short, optional, and never blocks content. Home: the arrangement blocks draw in and a playhead loops. The logo bars bounce once on each page load. Completing a lesson bursts a few notes for about 600 ms. The metronome pulses the logo on each beat. Pages fade between each other where the browser supports View Transitions. Under `prefers-reduced-motion`, every animation stops. Animations only change `transform` and `opacity`. Sound plays only after a press.

## GitHub Pages

The site is static and root-relative-free: every link is relative, so it works at a custom domain root or a project URL. To deploy, push the repository and in **Settings → Pages** select **Deploy from a branch**, then choose the branch and `/ (root)` folder.

## Privacy

Learner data lives in browser localStorage under versioned keys (`roomtone.progress.v1`, `roomtone.learning-focus.v1`, `roomtone.software.v1`, `roomtone.theme.v1`). Clearing browser data clears it. Progress can be downloaded as a versioned JSON file and imported elsewhere; nothing is uploaded. There is no account, analytics, advertising script, affiliate integration, or monetization provider configured.
