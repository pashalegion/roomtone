/* Progress: lists completed lessons, exports and imports a versioned progress file, and resets on request. */
(() => {
  const {$, escapeHtml, getProgress, setProgress, getSubjects, setSubjects, getSoftware, setSoftware, announce} = window.Roomtone;
  const FORMAT = "roomtone-progress";
  const VERSION = 1;
  const lessons = new Map(window.RT_LESSON_INDEX.map(lesson => [lesson.id, lesson]));
  const subjectIds = new Set(window.RT_SUBJECTS.subjects.map(subject => subject.id));
  const dawIds = new Set(window.RT_DAWS.map(daw => daw.id));
  let pending = null;

  function render() {
    const progress = getProgress();
    const known = progress.completed.filter(id => lessons.has(id));
    $("#count").textContent = `${known.length} lesson${known.length === 1 ? "" : "s"} completed`;
    $("#done-list").innerHTML = known.map(id => `<li><a href="lesson.html?id=${encodeURIComponent(id)}">${escapeHtml(lessons.get(id).title)} <span class="muted">· ${escapeHtml(lessons.get(id).course.name)}</span></a></li>`).join("");
    $("#done-empty").classList.toggle("hidden", known.length > 0);
    $("#exercise-line").textContent = progress.arcDone ? "Practice exercise: complete." : "Practice exercise: not marked complete yet.";
  }

  const showReset = show => {
    $("#reset").classList.toggle("hidden", show);
    $("#reset-confirm").classList.toggle("hidden", !show);
    $("#reset-cancel").classList.toggle("hidden", !show);
    if (show) $("#reset-confirm").focus();
  };

  // Export: a plain JSON download, built in the browser. Only learner choices and progress are included.
  $("#export").addEventListener("click", () => {
    const progress = getProgress();
    const software = getSoftware();
    const payload = {
      format: FORMAT,
      version: VERSION,
      exportedAt: new Date().toISOString(),
      completed: progress.completed,
      arcDone: progress.arcDone,
      subjects: getSubjects(),
      software: {daw: software.daw, declined: software.declined}
    };
    const url = URL.createObjectURL(new Blob([`${JSON.stringify(payload, null, 2)}\n`], {type: "application/json"}));
    const link = document.createElement("a");
    link.href = url;
    link.download = `roomtone-progress-${payload.exportedAt.slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    announce("Progress file downloaded.");
  });

  // Import: validate first, show what will change, then replace only after a second press.
  $("#import-file").addEventListener("change", event => {
    const file = event.target.files[0];
    pending = null;
    $("#import-confirm-row").classList.add("hidden");
    if (!file) return;
    if (file.size > 256 * 1024) {
      $("#import-status").textContent = "That file is too large to be a progress file.";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      let data;
      try {
        data = JSON.parse(reader.result);
      } catch (error) {
        $("#import-status").textContent = "This file is not valid JSON.";
        return;
      }
      if (!data || data.format !== FORMAT || data.version !== VERSION) {
        $("#import-status").textContent = "This is not a Roomtone progress file for version 1.";
        return;
      }
      const completed = Array.isArray(data.completed) ? [...new Set(data.completed.filter(id => lessons.has(id)))] : [];
      const subjects = Array.isArray(data.subjects) ? data.subjects.filter(id => subjectIds.has(id)) : [];
      const daw = data.software && dawIds.has(data.software.daw) ? data.software.daw : null;
      pending = {completed, arcDone: data.arcDone === true, subjects, software: {daw, declined: !daw && data.software && data.software.declined === true}};
      $("#import-status").textContent = `Ready to import ${completed.length} completed lesson${completed.length === 1 ? "" : "s"}, ${subjects.length} subject${subjects.length === 1 ? "" : "s"}${daw ? ` and ${daw} software` : ""}. Unknown entries are skipped.`;
      $("#import-confirm-row").classList.remove("hidden");
    };
    reader.readAsText(file);
  });
  $("#import-apply").addEventListener("click", () => {
    if (!pending) return;
    const saved = setProgress({version: 1, completed: pending.completed, arcDone: pending.arcDone, lastLesson: null}) && setSubjects(pending.subjects) && setSoftware(pending.software);
    $("#import-status").textContent = saved ? "Progress imported on this device." : "Could not save the imported progress in this browser.";
    $("#import-confirm-row").classList.add("hidden");
    $("#import-file").value = "";
    pending = null;
    announce($("#import-status").textContent);
    render();
  });
  $("#import-cancel").addEventListener("click", () => {
    pending = null;
    $("#import-file").value = "";
    $("#import-confirm-row").classList.add("hidden");
    $("#import-status").textContent = "Import cancelled. Nothing changed.";
  });

  $("#reset").addEventListener("click", () => showReset(true));
  $("#reset-cancel").addEventListener("click", () => {
    showReset(false);
    $("#reset").focus();
  });
  $("#reset-confirm").addEventListener("click", () => {
    const saved = setProgress({version: 1, completed: [], arcDone: false, lastLesson: null});
    showReset(false);
    $("#reset-note").textContent = saved ? "Progress cleared." : "Could not clear saved progress in this browser.";
    announce($("#reset-note").textContent);
    render();
  });
  document.addEventListener("roomtone:progress", render);
  render();
})();
