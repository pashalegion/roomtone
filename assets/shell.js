/* Shared shell for every page: versioned storage, theme, header state, and small motion helpers. Loaded everywhere; keep it small. */
(() => {
  const KEYS = {
    progress: "roomtone.progress.v1",
    subjects: "roomtone.learning-focus.v1",
    software: "roomtone.software.v1",
    theme: "roomtone.theme.v1"
  };
  const ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,80}$/;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduceMotion = () => !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const isId = value => typeof value === "string" && ID_PATTERN.test(value);
  const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"}[c]));

  // Versioned records. A record with an unknown version is ignored, never migrated silently.
  const read = key => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  };
  const write = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  };

  const emptyProgress = () => ({version: 1, completed: [], arcDone: false, lastLesson: null});
  function getProgress() {
    const record = read(KEYS.progress);
    if (!record || record.version !== 1) return emptyProgress();
    return {
      version: 1,
      completed: Array.isArray(record.completed) ? record.completed.filter(isId) : [],
      arcDone: !!record.arcDone,
      lastLesson: record.lastLesson && isId(record.lastLesson.id) ? {id: record.lastLesson.id, title: String(record.lastLesson.title || "")} : null
    };
  }
  function setProgress(progress) {
    const saved = write(KEYS.progress, {version: 1, completed: progress.completed, arcDone: progress.arcDone, lastLesson: progress.lastLesson});
    document.dispatchEvent(new CustomEvent("roomtone:progress"));
    return saved;
  }
  function setLastLesson(id, title) {
    const progress = getProgress();
    progress.lastLesson = {id, title};
    return setProgress(progress);
  }
  function setLessonCompleted(id, done) {
    const progress = getProgress();
    const has = progress.completed.includes(id);
    if (done && !has) progress.completed.push(id);
    if (!done && has) progress.completed = progress.completed.filter(item => item !== id);
    return {saved: setProgress(progress), completed: progress.completed.includes(id), count: progress.completed.length};
  }

  function getSubjects() {
    const record = read(KEYS.subjects);
    return record && record.version === 1 && Array.isArray(record.subjects) ? record.subjects.filter(isId) : [];
  }
  function setSubjects(subjects) {
    return write(KEYS.subjects, {version: 1, subjects});
  }

  function getSoftware() {
    const record = read(KEYS.software);
    if (!record || record.version !== 1) return {version: 1, daw: null, declined: false};
    return {version: 1, daw: isId(record.daw) ? record.daw : null, declined: !!record.declined};
  }
  function setSoftware(choice) {
    return write(KEYS.software, {version: 1, daw: choice.daw, declined: choice.declined});
  }

  // Header: theme toggle, progress count, navigation state, and the mobile menu.
  function applyTheme(theme) {
    const dark = theme === "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    const toggle = $(".theme-toggle");
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", String(dark));
    toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    toggle.title = dark ? "Switch to light mode" : "Switch to dark mode";
    toggle.firstElementChild.textContent = dark ? "☀" : "☾";
  }
  // The theme value is stored as a plain "light" or "dark" string, read by the inline script in each page's head.
  function savedTheme() {
    try {
      const value = localStorage.getItem(KEYS.theme);
      return value === "dark" || value === "light" ? value : null;
    } catch (error) {
      return null;
    }
  }
  function bindTheme() {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    const toggle = $(".theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(next);
        try {
          localStorage.setItem(KEYS.theme, next);
        } catch (error) {
          /* The theme still changes for this page. */
        }
      });
    }
    // Without a saved choice, the theme follows the system setting as it changes.
    const system = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    if (system && system.addEventListener) {
      system.addEventListener("change", event => {
        if (!savedTheme()) applyTheme(event.matches ? "dark" : "light");
      });
    }
  }
  function renderProgressCount() {
    const count = getProgress().completed.length;
    $$("[data-progress-count]").forEach(node => {
      node.innerHTML = `${count} <span class="unit">lesson${count === 1 ? "" : "s"} done</span>`;
    });
  }
  function markCurrentPage() {
    const page = (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "") || "index";
    const parent = page === "lesson" ? "lessons" : page;
    $$(".site-nav a").forEach(link => {
      const target = link.getAttribute("href").replace(/\.html$/, "");
      if (target === parent) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }
  function bindMenu() {
    const toggle = $(".menu-toggle");
    const nav = $(".site-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Polite announcements for screen readers (status text, never a popup).
  let live = null;
  function announce(message) {
    if (!live) {
      live = document.createElement("div");
      live.className = "sr-only";
      live.setAttribute("aria-live", "polite");
      document.body.appendChild(live);
    }
    live.textContent = "";
    requestAnimationFrame(() => { live.textContent = message; });
  }

  // Logo beat: restarts a short scale pulse. Skipped under reduced motion.
  function pulseLogo() {
    const brand = $(".brand");
    if (!brand || reduceMotion()) return;
    brand.classList.remove("beat");
    void brand.offsetWidth;
    brand.classList.add("beat");
  }

  window.Roomtone = {
    KEYS, $, $$, escapeHtml, isId, reduceMotion, announce, pulseLogo,
    getProgress, setProgress, setLastLesson, setLessonCompleted,
    getSubjects, setSubjects, getSoftware, setSoftware
  };

  document.documentElement.classList.add("js");
  document.body.classList.add("logo-first");
  bindTheme();
  bindMenu();
  markCurrentPage();
  renderProgressCount();
  document.addEventListener("roomtone:progress", renderProgressCount);
  window.addEventListener("storage", event => {
    if (event.key === KEYS.progress) renderProgressCount();
  });
})();
