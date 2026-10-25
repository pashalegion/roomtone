/* License and platform table, generated from the same software data that lessons use. */
(() => {
  const {$, escapeHtml} = window.Roomtone;
  const daws = window.RT_DAWS;

  const statusText = daw => daw.tableStatus || (daw.cost === "free" ? "No-cost edition" : "Commercial");
  const link = (href, label) => `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;

  $("#rows").innerHTML = daws.map(daw => `<tr>
    <th scope="row">${escapeHtml(daw.name)}</th>
    <td><span class="status-chip${daw.cost === "free" ? " free" : ""}">${escapeHtml(statusText(daw))}</span><br>${escapeHtml(daw.license)}</td>
    <td>${escapeHtml(daw.platform)}</td>
    <td>${escapeHtml(daw.best)}</td>
    <td>${[link(daw.official, "Website"), link(daw.docs, "Docs"), daw.purchase ? link(daw.purchase, "License") : ""].filter(Boolean).join("<br>")}</td>
  </tr>`).join("");
})();
