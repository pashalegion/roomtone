/* One lesson per URL: lesson.html?id=<id> loads only data/lessons/<id>.js, then renders in place. */
(() => {
  const {$, escapeHtml, isId, getProgress, setLastLesson, setLessonCompleted, getSoftware, setSoftware, reduceMotion, announce, focusAfterRender} = window.Roomtone;
  const daws = window.RT_DAWS || [];
  const id = new URLSearchParams(location.search).get("id");
  let lesson = null;
  let choosing = false;

  const dawById = dawId => daws.find(daw => daw.id === dawId) || null;
  const lessonLink = ref => `lesson.html?id=${encodeURIComponent(ref.id)}`;

  function showMissing() {
    $("#lesson-loading").hidden = true;
    $("#lesson").hidden = true;
    $("#lesson-missing").classList.remove("hidden");
    document.title = "Lesson not found — Roomtone";
  }

  // Software steps appear only for lessons that have them, and only when the learner has not declined them.
  function activeDaw(current) {
    const choice = getSoftware();
    if (!choice.daw || !current.steps || !current.steps[choice.daw]) return null;
    return dawById(choice.daw);
  }

  function mediaHtml(current) {
    const daw = activeDaw(current);
    const media = current.media && daw && current.dawMedia && current.dawMedia[daw.id] ? {...current.media, ...current.dawMedia[daw.id]} : current.media;
    if (!media) return "";
    return `<section aria-labelledby="watch-heading"><h2 id="watch-heading">Watch and listen</h2>
      <a class="video-link" href="https://www.youtube.com/watch?v=${encodeURIComponent(media.video)}" target="_blank" rel="noopener noreferrer">
        <span class="video-play" aria-hidden="true">▶</span>
        <span><strong>${escapeHtml(media.title)}</strong><small>Video by ${escapeHtml(media.creator)} · opens YouTube in a new tab</small></span>
      </a>
      ${media.note ? `<p class="studio-note" style="margin-top:14px">${escapeHtml(media.note)}</p>` : ""}
    </section>`;
  }

  function chooserHtml(current, choosingNow) {
    const choice = getSoftware();
    const available = Object.keys(current.steps).map(dawId => dawById(dawId)).filter(Boolean);
    const dawNote = choice.daw && !dawById(choice.daw) ? "" : choice.daw && !current.steps[choice.daw] ? `<p class="muted">Steps for ${escapeHtml(dawById(choice.daw).name)} aren’t written for this lesson yet.</p>` : "";
    if (choice.declined && !choosingNow) {
      return `<section id="software-section" aria-labelledby="software-heading"><h2 id="software-heading">Software steps</h2><p class="muted">Hidden. The shared steps above and the exercise still cover this idea. <button class="text-button" type="button" data-action="choose">Show software steps</button></p></section>`;
    }
    return `<section class="software-panel prompt" id="software-section" aria-labelledby="software-heading">
      <h2 id="software-heading">Software steps <span class="muted">(optional)</span></h2>
      <p class="muted" style="margin:0">Pick the app you use for exact clicks in this lesson, or skip this part. You can change it later.</p>
      ${dawNote}
      <div class="software-choices">${available.map(daw => `<button class="chip${choice.daw === daw.id ? " active" : ""}" type="button" data-action="pick" data-daw="${escapeHtml(daw.id)}" aria-pressed="${choice.daw === daw.id}">${escapeHtml(daw.name)}</button>`).join("")}</div>
      <p style="margin:0"><button class="text-button" type="button" data-action="skip">Skip software steps</button></p>
    </section>`;
  }

  function stepsHtml(current) {
    const daw = activeDaw(current);
    if (!current.steps) return "";
    if (!daw || choosing) return chooserHtml(current, choosing);
    const flow = daw.flow ? `<ol class="flow" aria-label="${escapeHtml(daw.name)} workflow">${daw.flow.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ol>` : "";
    return `<section id="software-section" aria-labelledby="software-heading">
      <h2 id="software-heading">${escapeHtml(daw.name)} steps</h2>
      ${flow}
      <ol>${current.steps[daw.id].map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
      <p class="muted" style="margin:14px 0 0;font-size:14px">Using another app? <button class="text-button" type="button" data-action="choose">Change software</button> · <button class="text-button" type="button" data-action="skip">Hide software steps</button></p>
    </section>`;
  }

  function resourcesHtml(current) {
    const daw = activeDaw(current);
    const links = [...current.resourceLinks];
    if (daw) links.push({label: `${daw.name} official documentation`, url: daw.docs});
    if (!links.length) return "";
    return `<section aria-labelledby="reading-heading"><h2 id="reading-heading">Further reading</h2><ul>${links.map(link => `<li><a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)} ↗</a></li>`).join("")}</ul></section>`;
  }

  function pagerHtml(current, label) {
    const prev = current.nav.prev ? `<a href="${lessonLink(current.nav.prev)}" rel="prev"><small>← Previous</small><strong>${escapeHtml(current.nav.prev.title)}</strong></a>` : `<span>Start of course</span>`;
    const next = current.nav.next ? `<a class="next" href="${lessonLink(current.nav.next)}" rel="next"><small>Next →</small><strong>${escapeHtml(current.nav.next.title)}</strong></a>` : `<a class="next" href="lessons.html"><small>End of course</small><strong>Back to the library</strong></a>`;
    return `<nav class="lesson-pager" aria-label="${label}">${prev}${next}</nav>`;
  }

  // Opens a prefilled GitHub issue. The text only names the lesson; nothing about the learner is included.
  function reportUrl(current) {
    const params = new URLSearchParams({
      title: `Lesson feedback: ${current.title}`,
      body: `Lesson id: ${current.id}\nLesson: ${current.title}\n\nWhat happened or what should change:\n`
    });
    return `https://github.com/pashalegion/roomtone/issues/new?${params.toString()}`;
  }

  function paintSoftware() {
    $("#media-slot").innerHTML = mediaHtml(lesson);
    $("#steps-slot").innerHTML = stepsHtml(lesson);
    $("#reading-slot").innerHTML = resourcesHtml(lesson);
  }

  // `done` is the state that is actually stored, so a failed save leaves the button as it was.
  function paintComplete(done, animate, saveFailed) {
    const button = $("#complete");
    button.classList.toggle("is-done", done);
    button.setAttribute("aria-pressed", String(done));
    button.textContent = done ? "✓ Completed · undo" : "Mark lesson complete";
    $("#complete-note").textContent = saveFailed ? "Progress could not be saved on this device." : done ? "Saved on this device." : "";
    const next = $("#next-lesson");
    if (!done) {
      next.classList.add("hidden");
      return;
    }
    if (animate && !reduceMotion()) {
      celebrate();
      setTimeout(() => next.classList.remove("hidden"), 650);
    } else {
      next.classList.remove("hidden");
    }
  }

  // A short burst of notes that removes itself after ~600 ms. Skipped under reduced motion.
  function celebrate() {
    const host = $("#burst");
    const colors = ["#c8e46b", "#f28c75", "#9cc7ef", "#c9b8f0", "#f5c27a"];
    const glyphs = ["♪", "♫", "♬", "♩"];
    host.innerHTML = "";
    for (let i = 0; i < 12; i++) {
      const note = document.createElement("span");
      const angle = (i / 12) * Math.PI * 2;
      note.textContent = glyphs[i % glyphs.length];
      note.style.setProperty("--dx", `${Math.round(Math.cos(angle) * 84)}px`);
      note.style.setProperty("--dy", `${Math.round(Math.sin(angle) * 64 - 36)}px`);
      note.style.setProperty("--rot", `${i % 2 ? 24 : -24}deg`);
      note.style.setProperty("--c", colors[i % colors.length]);
      host.appendChild(note);
    }
    setTimeout(() => { host.innerHTML = ""; }, 650);
  }

  // Search results and link previews read the head, so each lesson sets its own description, canonical URL and Open Graph values.
  // The canonical URL stays on the public site even when the page is opened from disk.
  function setHeadTags(current) {
    const title = `${current.title} — Roomtone`;
    const url = new URL(`lesson.html?id=${encodeURIComponent(current.id)}`, $('link[rel="canonical"]').href).href;
    document.title = title;
    $('meta[name="description"]').setAttribute("content", current.summary);
    $('link[rel="canonical"]').setAttribute("href", url);
    $('meta[property="og:title"]').setAttribute("content", title);
    $('meta[property="og:description"]').setAttribute("content", current.summary);
    $('meta[property="og:url"]').setAttribute("content", url);
  }

  function render(current) {
    lesson = current;
    setHeadTags(current);
    setLastLesson(current.id, current.title);
    $("#crumb-course").textContent = current.course.name;
    const pos = current.position;
    const done = getProgress().completed.includes(current.id);
    $("#lesson-view").innerHTML = `
      ${pagerHtml(current, "Lesson navigation, top")}
      <div class="lesson-meta-line"><span>${escapeHtml(current.skill)}</span><span>${escapeHtml(current.level)}</span><span>${current.time} min</span><span>Lesson ${pos.index} of ${pos.total}</span></div>
      <h1>${escapeHtml(current.title)}</h1>
      <p class="lesson-summary-large">${escapeHtml(current.summary)}</p>
      <div class="lesson-body">
        <div id="media-slot"></div>
        <section aria-labelledby="idea-heading"><h2 id="idea-heading">The idea</h2><p>${escapeHtml(current.concept)}</p></section>
        <section aria-labelledby="learn-heading"><h2 id="learn-heading">What you’ll learn</h2><ul>${current.objectives.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
        <div id="steps-slot"></div>
        <section aria-labelledby="try-heading"><h2 id="try-heading">Try it</h2><div class="exercise"><small>Practice exercise</small><p>${escapeHtml(current.exercise)}</p></div></section>
        <section aria-labelledby="mistake-heading"><h2 id="mistake-heading">Common mistake</h2><p>${escapeHtml(current.mistake)}</p></section>
        <div id="reading-slot"></div>
      </div>
      <div class="complete-zone">
        <button class="button button-primary complete-button" id="complete" type="button" aria-pressed="false">Mark lesson complete</button>
        <span class="note-burst" id="burst" aria-hidden="true"></span>
        <span class="muted" id="complete-note" role="status"></span>
        <a class="button next-lesson hidden" id="next-lesson" href="${current.nav.next ? lessonLink(current.nav.next) : "lessons.html"}">${current.nav.next ? "Next lesson →" : "Back to the library"}</a>
      </div>
      ${pagerHtml(current, "Lesson navigation, bottom")}
      <p class="report-link"><a href="${reportUrl(current)}" target="_blank" rel="noopener noreferrer">Report an issue with this lesson ↗</a></p>`;
    $("#lesson").hidden = false;
    $("#lesson-loading").hidden = true;
    paintSoftware();
    paintComplete(done, false, false);
  }

  function bind() {
    const view = $("#lesson-view");
    view.addEventListener("click", event => {
      const button = event.target.closest("[data-action]");
      if (button) {
        const action = button.dataset.action;
        if (action === "pick") {
          setSoftware({daw: button.dataset.daw, declined: false});
          choosing = false;
          announce(`${dawById(button.dataset.daw).name} steps are shown.`);
        } else if (action === "skip") {
          setSoftware({daw: null, declined: true});
          choosing = false;
        } else if (action === "choose") {
          setSoftware({...getSoftware(), declined: false});
          choosing = true;
        }
        paintSoftware();
        // The clicked control was re-rendered. Focus the control that replaced it.
        if (action === "choose") focusAfterRender(["#software-section .chip.active", "#software-section .chip"], "#software-section [data-action='skip']");
        else focusAfterRender(["#software-section [data-action='choose']"], "#complete");
        return;
      }
      if (event.target.closest("#complete")) {
        const wasDone = getProgress().completed.includes(lesson.id);
        const result = setLessonCompleted(lesson.id, !wasDone);
        if (!result.saved) {
          paintComplete(wasDone, false, true);
          announce("Progress could not be saved on this device.");
          return;
        }
        paintComplete(result.completed, true, false);
        announce(result.completed ? "Lesson marked complete." : "Lesson marked unfinished.");
      }
    });
    document.addEventListener("keydown", event => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (/^(INPUT|SELECT|TEXTAREA)$/.test(event.target.tagName) || event.target.isContentEditable) return;
      if (event.key === "ArrowLeft" && lesson.nav.prev) location.href = lessonLink(lesson.nav.prev);
      if (event.key === "ArrowRight" && lesson.nav.next) location.href = lessonLink(lesson.nav.next);
    });
  }

  if (!isId(id)) {
    showMissing();
    return;
  }
  const script = document.createElement("script");
  script.src = `data/lessons/${id}.js`;
  script.onload = () => {
    const body = window.RT_LESSON_BODY;
    window.RT_LESSON_BODY = null;
    if (!body || body.id !== id) return showMissing();
    render(body);
    bind();
  };
  script.onerror = showMissing;
  document.body.appendChild(script);
})();
