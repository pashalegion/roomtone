/* Practice tools: metronome (Web Audio, started only by a press), tap tempo, and the arc exercise. */
(() => {
  const {$, getProgress, setProgress, pulseLogo, announce} = window.Roomtone;
  const LOOKAHEAD_S = 0.12;
  let bpm = 100;
  let audio = null;
  let nextBeatTime = 0;
  let beatCount = 0;
  let timer = null;

  // Clicks are scheduled ahead of time on the audio clock, so tempo stays steady even when the page is busy.
  function click(time, accent) {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.frequency.value = accent ? 1500 : 1000;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(accent ? 0.5 : 0.3, time + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);
    osc.connect(gain).connect(audio.destination);
    osc.start(time);
    osc.stop(time + 0.06);
  }

  function showBeat(index) {
    const dots = [...$("#beat-dots").children];
    dots.forEach((dot, i) => dot.classList.toggle("on", i === index));
    if (index >= 0) pulseLogo();
  }

  function schedule() {
    while (nextBeatTime < audio.currentTime + LOOKAHEAD_S) {
      const index = beatCount % 4;
      click(nextBeatTime, index === 0);
      const delay = Math.max(0, (nextBeatTime - audio.currentTime) * 1000);
      setTimeout(() => showBeat(index), delay);
      nextBeatTime += 60 / bpm;
      beatCount += 1;
    }
  }

  function setBpm(value) {
    bpm = Math.min(220, Math.max(40, Math.round(value)));
    $("#bpm-range").value = bpm;
    $("#bpm-value").textContent = bpm;
    $("#bpm-sr").textContent = bpm;
  }

  function start() {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    audio.resume();
    beatCount = 0;
    nextBeatTime = audio.currentTime + 0.05;
    timer = setInterval(schedule, 25);
    schedule();
    $("#metro-toggle").textContent = "Stop";
    $("#metro-toggle").setAttribute("aria-pressed", "true");
    $("#metro-status").textContent = `Playing ${bpm} BPM. Press Stop to end.`;
  }

  function stop() {
    clearInterval(timer);
    timer = null;
    $("#metro-toggle").textContent = "Start";
    $("#metro-toggle").setAttribute("aria-pressed", "false");
    $("#metro-status").textContent = "Stopped. Press Start to hear the click again.";
    showBeat(-1);
  }

  $("#bpm-range").addEventListener("input", event => {
    setBpm(Number(event.target.value));
    if (timer) $("#metro-status").textContent = `Playing ${bpm} BPM. Press Stop to end.`;
  });
  $("#bpm-down").addEventListener("click", () => setBpm(bpm - 1));
  $("#bpm-up").addEventListener("click", () => setBpm(bpm + 1));
  $("#metro-toggle").addEventListener("click", () => (timer ? stop() : start()));

  // Tap tempo: average the last taps, reset after a pause.
  let taps = [];
  $("#tap").addEventListener("click", () => {
    const now = performance.now();
    if (taps.length && now - taps[taps.length - 1] > 2500) taps = [];
    taps.push(now);
    taps = taps.slice(-8);
    if (taps.length < 3) {
      $("#tap-result").textContent = `${taps.length} tap${taps.length === 1 ? "" : "s"}. Tap ${3 - taps.length} more.`;
      return;
    }
    const gaps = taps.slice(1).map((time, i) => time - taps[i]);
    const average = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
    const tapped = Math.round(60000 / average);
    $("#tap-result").textContent = `About ${tapped} BPM. Keep tapping to refine.`;
    if (!timer) setBpm(tapped);
  });
  $("#tap-reset").addEventListener("click", () => {
    taps = [];
    $("#tap-result").textContent = "Tap at least 3 times to calculate.";
  });

  // Exercise completion is stored with the rest of the progress record.
  const arc = $("#arc-done");
  const paintArc = done => {
    arc.setAttribute("aria-pressed", String(done));
    arc.textContent = done ? "✓ Exercise complete · undo" : "Mark this exercise complete";
  };
  paintArc(getProgress().arcDone);
  arc.addEventListener("click", () => {
    const progress = getProgress();
    progress.arcDone = !progress.arcDone;
    setProgress(progress);
    paintArc(progress.arcDone);
    announce(progress.arcDone ? "Exercise marked complete." : "Exercise marked unfinished.");
  });

  setBpm(bpm);
})();

/* Step grid and ear training. Both make sound only after a press, and both reuse the metronome's tempo and audio clock. */
(() => {
  const {$, announce} = window.Roomtone;
  const STEPS = 8;
  const ROWS = [["kick", "Kick"], ["snare", "Snare"], ["hat", "Hat"]];
  const pattern = {kick: Array(STEPS).fill(false), snare: Array(STEPS).fill(false), hat: Array(STEPS).fill(false)};
  let audio = null;
  let noise = null;
  let playing = false;
  let timer = null;
  let nextStep = 0;
  let nextTime = 0;

  function context() {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    audio.resume();
    return audio;
  }

  // Short synthesized voices: no samples or external files.
  function noiseSource() {
    if (!noise) {
      noise = audio.createBuffer(1, audio.sampleRate * 0.5, audio.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    }
    return noise;
  }
  function kick(time) {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.12);
    gain.gain.setValueAtTime(0.9, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
    osc.connect(gain).connect(audio.destination);
    osc.start(time);
    osc.stop(time + 0.26);
  }
  function burst(time, duration, type, frequency, volume) {
    const source = audio.createBufferSource();
    const filter = audio.createBiquadFilter();
    const gain = audio.createGain();
    source.buffer = noiseSource();
    filter.type = type;
    filter.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    source.connect(filter).connect(gain).connect(audio.destination);
    source.start(time);
    source.stop(time + duration + 0.02);
  }
  const voices = {
    kick: time => kick(time),
    snare: time => burst(time, 0.2, "bandpass", 1800, 0.6),
    hat: time => burst(time, 0.05, "highpass", 7000, 0.35)
  };

  function highlight(index) {
    $$cells().forEach(cell => cell.classList.toggle("now", Number(cell.dataset.step) === index));
  }
  const $$cells = () => [...document.querySelectorAll("#step-grid button")];

  function schedule() {
    const bpm = Number($("#bpm-range").value) || 100;
    while (nextTime < audio.currentTime + 0.12) {
      const step = nextStep % STEPS;
      ROWS.forEach(([key]) => { if (pattern[key][step]) voices[key](nextTime); });
      const delay = Math.max(0, (nextTime - audio.currentTime) * 1000);
      setTimeout(() => highlight(step), delay);
      nextTime += 30 / bpm;
      nextStep += 1;
    }
  }

  function startGrid() {
    context();
    nextStep = 0;
    nextTime = audio.currentTime + 0.05;
    playing = true;
    timer = setInterval(schedule, 25);
    schedule();
    $("#grid-toggle").textContent = "Stop loop";
    $("#grid-toggle").setAttribute("aria-pressed", "true");
    $("#grid-status").textContent = "Playing one bar on repeat. Press Stop loop to end.";
  }
  function stopGrid() {
    clearInterval(timer);
    timer = null;
    playing = false;
    highlight(-1);
    $("#grid-toggle").textContent = "Play loop";
    $("#grid-toggle").setAttribute("aria-pressed", "false");
    $("#grid-status").textContent = "Stopped.";
  }

  // Grid: one button per step and row, labelled for screen readers.
  $("#step-grid").innerHTML = ROWS.map(([key, label]) => `
    <span class="row-label" aria-hidden="true">${label}</span>
    ${Array.from({length: STEPS}, (_, step) => `<button type="button" data-row="${key}" data-step="${step}" aria-pressed="false" aria-label="${label}, step ${step + 1}"></button>`).join("")}
  `).join("");
  $("#step-grid").addEventListener("click", event => {
    const cell = event.target.closest("button[data-row]");
    if (!cell) return;
    const on = !pattern[cell.dataset.row][Number(cell.dataset.step)];
    pattern[cell.dataset.row][Number(cell.dataset.step)] = on;
    cell.setAttribute("aria-pressed", String(on));
  });
  $("#grid-toggle").addEventListener("click", () => (playing ? stopGrid() : startGrid()));
  $("#grid-clear").addEventListener("click", () => {
    ROWS.forEach(([key]) => pattern[key].fill(false));
    $$cells().forEach(cell => cell.setAttribute("aria-pressed", "false"));
    announce("Grid cleared.");
  });

  // Ear training: two sine tones, then a choice. Score lasts only for this visit.
  const INTERVALS = [
    {name: "Minor 3rd", semitones: 3},
    {name: "Major 3rd", semitones: 4},
    {name: "Perfect 4th", semitones: 5},
    {name: "Perfect 5th", semitones: 7},
    {name: "Octave", semitones: 12}
  ];
  let answer = null;
  let score = {right: 0, total: 0};
  const midiToHz = midi => 440 * Math.pow(2, (midi - 69) / 12);
  function tone(frequency, time, duration) {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = "sine";
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.25, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    osc.connect(gain).connect(audio.destination);
    osc.start(time);
    osc.stop(time + duration + 0.02);
  }

  $("#ear-choices").innerHTML = INTERVALS.map((interval, index) => `<button class="chip" type="button" data-choice="${index}" disabled>${interval.name}</button>`).join("");
  const paintScore = () => {
    $("#ear-score").textContent = score.total ? `${score.right} of ${score.total} right this visit.` : "";
  };
  $("#ear-play").addEventListener("click", () => {
    context();
    const root = 60 + Math.floor(Math.random() * 12);
    answer = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];
    const start = audio.currentTime + 0.05;
    tone(midiToHz(root), start, 0.6);
    tone(midiToHz(root + answer.semitones), start + 0.7, 0.8);
    $("#ear-choices").querySelectorAll("button").forEach(button => { button.disabled = false; });
    $("#ear-feedback").textContent = "Which interval was that?";
  });
  $("#ear-choices").addEventListener("click", event => {
    const button = event.target.closest("button[data-choice]");
    if (!button || !answer) return;
    const picked = INTERVALS[Number(button.dataset.choice)];
    const right = picked === answer;
    score.total += 1;
    if (right) score.right += 1;
    $("#ear-feedback").textContent = right ? `Correct: ${answer.name}.` : `Not quite. It was ${answer.name}.`;
    $("#ear-choices").querySelectorAll("button").forEach(item => { item.disabled = true; });
    answer = null;
    paintScore();
  });
})();
