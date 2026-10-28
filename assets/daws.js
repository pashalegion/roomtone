/* Optional software picker. One choice at a time; skipping keeps the shared steps. */
(() => {
  const {$, $$, escapeHtml, getSoftware, setSoftware, announce, focusAfterRender} = window.Roomtone;
  const daws = window.RT_DAWS;
  const state = {query: "", cost: "all"};

  function render() {
    const choice = getSoftware();
    const query = state.query.trim().toLowerCase();
    const visible = daws.filter(daw => (state.cost === "all" || daw.cost === state.cost) && (!query || [daw.name, daw.platform, daw.note, daw.license].join(" ").toLowerCase().includes(query)));
    $$("#cost [data-filter]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.filter === state.cost)));
    $("#grid").innerHTML = visible.map(daw => {
      const on = choice.daw === daw.id;
      return `<article class="card daw-card${on ? " chosen" : ""}" style="--daw-color:${escapeHtml(daw.color)}">
        <div class="daw-top"><span class="daw-mark" aria-hidden="true">${escapeHtml(daw.mark)}</span><span class="daw-kind">${escapeHtml(daw.badge || (daw.cost === "free" ? "Free to use" : "Paid license"))}</span></div>
        <h2 class="daw-name" style="font-size:1.2rem;margin:0">${escapeHtml(daw.name)}</h2>
        <span class="maker">${escapeHtml(daw.maker)}</span>
        <p>${escapeHtml(daw.note)}</p>
        <p class="meta">${escapeHtml(daw.platform)}</p>
        <div class="actions">
          <button class="button button-small${on ? " button-primary" : ""}" type="button" data-daw="${escapeHtml(daw.id)}" aria-pressed="${on}">${on ? "✓ Using for steps" : "Use for steps"}</button>
          <a class="official" href="${escapeHtml(daw.official)}" target="_blank" rel="noopener noreferrer">Official site ↗</a>
        </div>
      </article>`;
    }).join("");
    $("#none").classList.toggle("hidden", visible.length > 0);
    const chosen = daws.find(daw => daw.id === choice.daw);
    $("#status").textContent = chosen
      ? `${chosen.name} is selected. Lessons show its steps. Choose it again to switch it off.`
      : choice.declined
        ? "Software steps are off. Lessons show the shared steps only."
        : "No software chosen yet. Lessons show the shared steps until you pick one.";
    $("#skip").setAttribute("aria-pressed", String(choice.declined && !chosen));
  }

  $("#search").addEventListener("input", event => {
    state.query = event.target.value;
    render();
  });
  $("#cost").addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    state.cost = button.dataset.filter;
    render();
  });
  $("#grid").addEventListener("click", event => {
    const button = event.target.closest("[data-daw]");
    if (!button) return;
    const current = getSoftware();
    const id = button.dataset.daw;
    const next = current.daw === id ? {daw: null, declined: false} : {daw: id, declined: false};
    setSoftware(next);
    const picked = daws.find(daw => daw.id === id);
    announce(next.daw ? `${picked.name} selected.` : `${picked.name} cleared.`);
    render();
    focusAfterRender([`#grid [data-daw="${id}"]`], "#search");
  });
  $("#skip").addEventListener("click", () => {
    setSoftware({daw: null, declined: true});
    announce("Software steps are off.");
    render();
  });

  render();
})();
