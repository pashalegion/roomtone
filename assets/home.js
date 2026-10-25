/* Home: shows a "Continue" card only when the learner has an earlier lesson on record. */
(() => {
  const {$, getProgress, isId} = window.Roomtone;
  const progress = getProgress();
  const card = $("#continue-card");
  if (!card || !progress.lastLesson || !isId(progress.lastLesson.id)) return;
  const title = progress.lastLesson.title || "your last lesson";
  $("#continue-title").textContent = `Continue: ${title}`;
  card.href = `lesson.html?id=${progress.lastLesson.id}`;
  card.classList.remove("hidden");
})();
