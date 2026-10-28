/* Optional subject picker. Choices only change which lessons the library lists. */
(() => {
  const {$, escapeHtml, getSubjects, setSubjects, announce, focusAfterRender} = window.Roomtone;
  const subjects = window.RT_SUBJECTS.subjects;
  const byId = new Map(subjects.map(subject => [subject.id, subject]));
  const state = {query: "", group: "All subjects"};
  const groups = ["All subjects", ...new Set(subjects.map(subject => subject.group))];

  const chosen = () => getSubjects().filter(id => byId.has(id));
  const save = list => setSubjects(list);

  function renderGroups() {
    $("#groups").innerHTML = groups.map(group => `<button class="chip" type="button" data-group="${escapeHtml(group)}" aria-pressed="${state.group === group}">${escapeHtml(group)}</button>`).join("");
  }

  function renderGrid() {
    const picked = chosen();
    const query = state.query.trim().toLowerCase();
    const visible = subjects.filter(subject => (state.group === "All subjects" || subject.group === state.group) && (!query || `${subject.name} ${subject.group} ${subject.summary}`.toLowerCase().includes(query)));
    $("#grid").innerHTML = visible.map(subject => {
      const on = picked.includes(subject.id);
      return `<button class="card subject-card${on ? " is-on" : ""}" type="button" data-id="${escapeHtml(subject.id)}" aria-pressed="${on}">
        <span class="meta">${escapeHtml(subject.group)} · ${subject.lessons} lessons</span>
        <h3>${escapeHtml(subject.name)}</h3>
        <p>${escapeHtml(subject.summary)}</p>
        <span class="tick">${on ? "✓ In my library" : "+ Add to my library"}</span>
      </button>`;
    }).join("");
    $("#none").classList.toggle("hidden", visible.length > 0);
    $("#status").textContent = picked.length
      ? `${picked.length} subject${picked.length === 1 ? "" : "s"} chosen. The library lists them in the order below.`
      : "No subjects chosen. That’s fine: the shared foundation works on its own.";
  }

  function renderOrder() {
    const picked = chosen();
    $("#order").innerHTML = picked.map((id, index) => {
      const subject = byId.get(id);
      return `<li>
        <span class="name">${String(index + 1).padStart(2, "0")} · ${escapeHtml(subject.name)}</span>
        <button type="button" data-move="-1" data-id="${escapeHtml(id)}" aria-label="Move ${escapeHtml(subject.name)} up" ${index === 0 ? "disabled" : ""}>↑</button>
        <button type="button" data-move="1" data-id="${escapeHtml(id)}" aria-label="Move ${escapeHtml(subject.name)} down" ${index === picked.length - 1 ? "disabled" : ""}>↓</button>
        <button type="button" data-remove="${escapeHtml(id)}" aria-label="Remove ${escapeHtml(subject.name)}">×</button>
      </li>`;
    }).join("");
    $("#order-empty").classList.toggle("hidden", picked.length > 0);
  }

  function renderAll() {
    renderGroups();
    renderGrid();
    renderOrder();
  }

  $("#search").addEventListener("input", event => {
    state.query = event.target.value;
    renderGrid();
  });

  $("#groups").addEventListener("click", event => {
    const button = event.target.closest("[data-group]");
    if (!button) return;
    state.group = button.dataset.group;
    renderAll();
    focusAfterRender([`#groups [data-group="${button.dataset.group}"]`], "#search");
  });

  $("#grid").addEventListener("click", event => {
    const card = event.target.closest("[data-id]");
    if (!card) return;
    const id = card.dataset.id;
    const picked = chosen();
    const next = picked.includes(id) ? picked.filter(item => item !== id) : [...picked, id];
    save(next);
    announce(next.includes(id) ? `${byId.get(id).name} added.` : `${byId.get(id).name} removed.`);
    renderAll();
    focusAfterRender([`#grid [data-id="${id}"]`], "#search");
  });

  $("#order").addEventListener("click", event => {
    const move = event.target.closest("[data-move]");
    const remove = event.target.closest("[data-remove]");
    const picked = chosen();
    if (move) {
      const index = picked.indexOf(move.dataset.id);
      const direction = Number(move.dataset.move);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= picked.length) return;
      [picked[index], picked[target]] = [picked[target], picked[index]];
      save(picked);
      renderAll();
      // Moving to the top or bottom disables that arrow, so focus the other arrow for the same subject.
      const id = move.dataset.id;
      focusAfterRender([`#order [data-id="${id}"][data-move="${direction}"]`, `#order [data-id="${id}"][data-move="${-direction}"]`, `#order [data-remove="${id}"]`], "#search");
    } else if (remove) {
      const id = remove.dataset.remove;
      const index = picked.indexOf(id);
      const next = picked.filter(item => item !== id);
      save(next);
      renderAll();
      // Focus the remove button of the subject that took its place, or the subject's card when none is left.
      const neighbour = next.length ? `#order li:nth-child(${Math.min(index, next.length - 1) + 1}) [data-remove]` : null;
      focusAfterRender([neighbour, `#grid [data-id="${id}"]`].filter(Boolean), "#search");
    }
  });

  $("#clear").addEventListener("click", () => {
    save([]);
    renderAll();
    announce("All subjects cleared.");
  });

  renderAll();
})();
