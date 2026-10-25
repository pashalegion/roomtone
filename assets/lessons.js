/* Library: filters only change which lessons are listed. Choices are saved and shared with the subjects and software pages. */
(() => {
  const {$, $$, escapeHtml, getProgress, getSubjects, setSubjects, getSoftware, announce} = window.Roomtone;
  const lessons = window.RT_LESSON_INDEX;
  const subjects = window.RT_SUBJECTS.subjects;
  const skills = window.RT_SUBJECTS.skills;
  const daws = window.RT_DAWS;
  const subjectIds = new Set(subjects.map(subject => subject.id));
  const state = {query: "", skill: "All skills", sort: "recommended"};

  const dawName = id => (daws.find(daw => daw.id === id) || {}).name || id;

  function chosenSubjects() {
    return getSubjects().filter(id => subjectIds.has(id));
  }

  // Shared lessons appear with no subject chosen. Subject lessons need their subject.
  // Software-specific lessons appear only for the software the learner picked.
  function visibleLessons(subjectChoice, daw) {
    return lessons.filter(lesson => {
      if (lesson.course.kind === "subject") return subjectChoice.includes(lesson.course.id);
      const inSoftware = !!daw && lesson.daws.includes(daw);
      if (!subjectChoice.length) return lesson.shared || inSoftware;
      return (lesson.shared || inSoftware) && lesson.subjects.some(id => subjectChoice.includes(id));
    });
  }

  function orderLessons(list, subjectChoice) {
    const rank = lesson => {
      if (lesson.course.kind === "subject") return subjectChoice.indexOf(lesson.course.id);
      return lesson.course.kind === "foundation" ? 1000 : 2000;
    };
    const sorted = [...list];
    if (state.sort === "recommended") sorted.sort((a, b) => rank(a) - rank(b));
    if (state.sort === "beginner") sorted.sort((a, b) => a.level.localeCompare(b.level) || a.time - b.time);
    if (state.sort === "shortest") sorted.sort((a, b) => a.time - b.time);
    return sorted;
  }

  function matchesSearch(lesson) {
    const query = state.query.trim().toLowerCase();
    if (!query) return true;
    return `${lesson.title} ${lesson.summary} ${lesson.skill} ${lesson.course.name}`.toLowerCase().includes(query);
  }

  function renderSubjectPicker(subjectChoice) {
    const summary = subjectChoice.length
      ? `Subjects: ${subjectChoice.length === 1 ? subjects.find(s => s.id === subjectChoice[0]).name : `${subjectChoice.length} chosen`}`
      : "Subjects: shared foundation";
    $("#subject-summary").textContent = summary;
    const byGroup = subjects.reduce((groups, subject) => {
      (groups[subject.group] ||= []).push(subject);
      return groups;
    }, {});
    $("#subject-options").innerHTML = Object.entries(byGroup).map(([group, items]) => `
      <p class="count" style="margin:8px 6px 2px">${escapeHtml(group)}</p>
      ${items.map(subject => `<label><input type="checkbox" value="${escapeHtml(subject.id)}" ${subjectChoice.includes(subject.id) ? "checked" : ""} /> ${escapeHtml(subject.name)} <span class="muted">· ${subject.lessons}</span></label>`).join("")}
    `).join("");
  }

  function renderScope(subjectChoice, daw, declined) {
    const parts = [];
    if (!subjectChoice.length) parts.push("Showing the shared foundation. Check a subject above to add its lessons.");
    else parts.push(`Showing ${subjectChoice.length === 1 ? "one subject" : `${subjectChoice.length} subjects`} plus the shared foundation where it fits.`);
    if (daw) parts.push(`Software: ${dawName(daw)}. Steps appear inside each lesson.`);
    else if (declined) parts.push("Software steps are off.");
    else parts.push("No software chosen, so lessons show shared steps.");
    $("#scope-line").innerHTML = `${escapeHtml(parts.join(" "))} <a href="daws.html">Software</a>`;
  }

  function render() {
    const subjectChoice = chosenSubjects();
    const software = getSoftware();
    const done = new Set(getProgress().completed);
    const base = visibleLessons(subjectChoice, software.daw);
    const list = orderLessons(base.filter(lesson => (state.skill === "All skills" || lesson.skill === state.skill) && matchesSearch(lesson)), subjectChoice);

    renderSubjectPicker(subjectChoice);
    renderScope(subjectChoice, software.daw, software.declined);
    $("#count").textContent = `${list.length} lesson${list.length === 1 ? "" : "s"}`;
    $("#lesson-list").innerHTML = list.map(lesson => `
      <li><a class="lesson-row" href="lesson.html?id=${encodeURIComponent(lesson.id)}">
        <span class="lesson-index" aria-hidden="true">${String(list.indexOf(lesson) + 1).padStart(2, "0")}</span>
        <span>
          <span class="lesson-title">${escapeHtml(lesson.title)}${done.has(lesson.id) ? '<span class="done-mark" aria-hidden="true">✓</span><span class="sr-only"> (completed)</span>' : ""}</span>
          <span class="lesson-summary">${escapeHtml(lesson.summary)}</span>
        </span>
        <span class="lesson-meta"><span>${escapeHtml(lesson.course.name)}</span><span>${lesson.time} min · ${escapeHtml(lesson.level)}</span></span>
      </a></li>`).join("");
    $("#empty").classList.toggle("hidden", list.length > 0);
  }

  function fillSkills() {
    $("#skill").innerHTML = ["All skills", ...skills].map(skill => `<option value="${escapeHtml(skill)}">${escapeHtml(skill)}</option>`).join("");
  }

  $("#search").addEventListener("input", event => { state.query = event.target.value; render(); });
  $("#skill").addEventListener("change", event => { state.skill = event.target.value; render(); });
  $("#sort").addEventListener("change", event => { state.sort = event.target.value; render(); });
  $("#clear").addEventListener("click", () => {
    state.query = "";
    state.skill = "All skills";
    $("#search").value = "";
    $("#skill").value = "All skills";
    render();
    announce("Filters cleared.");
  });
  $("#subject-options").addEventListener("change", event => {
    // Keep the order the learner already set on the subjects page; new picks go to the end.
    const checked = $$("#subject-options input:checked").map(input => input.value);
    const kept = chosenSubjects().filter(id => checked.includes(id));
    const added = checked.filter(id => !kept.includes(id));
    setSubjects([...kept, ...added]);
    render();
  });
  document.addEventListener("roomtone:progress", render);

  fillSkills();
  render();
})();
