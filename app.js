(() => {
  const {daws, lessons, skills, disciplines} = window.ROOMTONE;
  const FOCUS_STORE="roomtone.learning-focus.v1";
  let savedFocus=[];
  try { const stored=JSON.parse(localStorage.getItem(FOCUS_STORE)||"null"); if(stored&&stored.version===1&&Array.isArray(stored.subjects))savedFocus=stored.subjects.filter(id=>disciplines.some(d=>d.id===id)); } catch(e) { /* The subject explorer still works when storage is unavailable. */ }
  const state = {daw:null, cost:"all", skill:"All skills", query:"", disciplineQuery:"", disciplineGroup:"All subjects", topics:savedFocus, sort:"recommended"};
  const STORE="roomtone.progress.v1";
  const THEME_STORE="roomtone.theme.v1";
  const systemTheme=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):{matches:false};
  let savedTheme=null;
  try { savedTheme=localStorage.getItem(THEME_STORE); } catch(e) { /* Theme still follows the system preference. */ }
  const setTheme=theme=>{
    const dark=theme==="dark";
    document.documentElement.dataset.theme=dark?"dark":"light";
    const control=document.querySelector("#theme-toggle");
    if(control){control.setAttribute("aria-pressed",String(dark));control.setAttribute("aria-label",dark?"Switch to light mode":"Switch to dark mode");control.title=dark?"Switch to light mode":"Switch to dark mode";control.firstElementChild.textContent=dark?"☀":"☾";}
  };
  setTheme(savedTheme==="dark"||savedTheme==="light"?savedTheme:(systemTheme.matches?"dark":"light"));
  let progress={completed:[], arcDone:false};
  try { const raw=localStorage.getItem(STORE); if(raw){const parsed=JSON.parse(raw); if(parsed&&parsed.version===1&&Array.isArray(parsed.completed)) progress={completed:parsed.completed.filter(id=>lessons.some(l=>l.id===id)),arcDone:!!parsed.arcDone};} } catch(e) { /* Storage can be disabled; this session remains usable. */ }
  const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
  const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  const save=()=>{try{localStorage.setItem(STORE,JSON.stringify({version:1,completed:progress.completed,arcDone:progress.arcDone}));}catch(e){const status=$("#path-status");if(status) status.textContent="Progress storage is unavailable; your current lesson view still works.";}};
  const saveFocus=()=>{try{localStorage.setItem(FOCUS_STORE,JSON.stringify({version:1,subjects:state.topics}));}catch(e){$("#focus-message").textContent="Your focus is active for this visit, but browser storage is unavailable.";}};
  const officialButton=d=>`<a class="official-link" href="${d.official}" target="_blank" rel="noreferrer">Official site <span>↗</span></a>`;
  function renderTopicFilters(){
    const groups=["All subjects",...new Set(disciplines.map(d=>d.group))];
    $("#discipline-filters").innerHTML=groups.map(group=>`<button class="discipline-filter ${state.disciplineGroup===group?"active":""}" data-group="${escapeHtml(group)}" type="button">${escapeHtml(group)}</button>`).join("");
    $$(".discipline-filter").forEach(button=>button.addEventListener("click",()=>{state.disciplineGroup=button.dataset.group;renderTopicFilters();renderDisciplines();}));
  }
  function renderDisciplines(){
    const q=state.disciplineQuery.trim().toLowerCase();
    const visible=disciplines.filter(d=>(state.disciplineGroup==="All subjects"||d.group===state.disciplineGroup)&&(!q||`${d.name} ${d.group} ${d.summary}`.toLowerCase().includes(q)));
    $("#discipline-grid").innerHTML=visible.map(d=>{const selected=state.topics.includes(d.id);const count=lessons.filter(l=>l.discipline===d.id).length;return `<article class="discipline-card ${selected?"chosen":""}"><div class="discipline-card-top"><span class="discipline-group">${escapeHtml(d.group)}</span><span class="discipline-check">${selected?"✓":"+"}</span></div><h3>${escapeHtml(d.name)}</h3><p>${escapeHtml(d.summary)}</p><span class="discipline-lesson-count">${count} LESSONS</span><button class="topic-add ${selected?"added":""}" type="button" data-topic="${d.id}" aria-pressed="${selected}">${selected?"Added to my path":"Add to my path +"}</button></article>`;}).join("");
    if(!visible.length)$("#discipline-grid").innerHTML='<p class="empty-library">No subjects match that search. Try a different name or category.</p>';
    $$(".topic-add").forEach(button=>button.addEventListener("click",()=>toggleTopic(button.dataset.topic)));
  }
  function renderFocus(){
    const chosen=state.topics.map(id=>disciplines.find(d=>d.id===id)).filter(Boolean);
    $("#focus-count").textContent=`${chosen.length} SUBJECT${chosen.length===1?"":"S"}`;
    $("#focus-message").textContent=chosen.length?`Your lesson library shows these subjects only. Add a DAW separately if you want software workflows.`:"Choose one or more subjects to build your path. Shared production foundations are available without choosing a subject.";
    $("#focus-items").innerHTML=chosen.length?chosen.map((d,index)=>`<div class="focus-item"><span class="focus-order">${String(index+1).padStart(2,"0")}</span><strong>${escapeHtml(d.name)}</strong><span class="focus-item-actions"><button type="button" class="focus-shift" data-index="${index}" data-direction="-1" aria-label="Move ${escapeHtml(d.name)} up" ${index===0?"disabled":""}>↑</button><button type="button" class="focus-shift" data-index="${index}" data-direction="1" aria-label="Move ${escapeHtml(d.name)} down" ${index===chosen.length-1?"disabled":""}>↓</button><button type="button" class="focus-remove" data-topic="${d.id}" aria-label="Remove ${escapeHtml(d.name)}">×</button></span></div>`).join(""):'<span class="focus-empty">Your selected subjects will appear here.</span>';
    $$(".focus-shift").forEach(button=>button.addEventListener("click",()=>moveTopic(Number(button.dataset.index),Number(button.dataset.direction))));
    $$(".focus-remove").forEach(button=>button.addEventListener("click",()=>toggleTopic(button.dataset.topic,false)));
  }
  function toggleTopic(id,force){
    const has=state.topics.includes(id);const add=force===undefined?!has:force;
    if(add&&!has)state.topics.push(id);else if(!add&&has)state.topics=state.topics.filter(topic=>topic!==id);
    saveFocus();renderDisciplines();renderFocus();renderLessons();renderPath();
  }
  function moveTopic(index,delta){const next=index+delta;if(next<0||next>=state.topics.length)return;[state.topics[index],state.topics[next]]=[state.topics[next],state.topics[index]];saveFocus();renderFocus();renderLessons();}
  function renderDaws(){
    const q=state.query.trim().toLowerCase();
    const visible=daws.filter(d=>(state.cost==="all"||d.cost===state.cost)&&(!q||[d.name,d.platform,d.note,d.license].join(" ").toLowerCase().includes(q)));
    $("#daw-grid").innerHTML=visible.map(d=>`<article class="daw-card ${state.daw===d.id?"selected":""}" style="--daw-color:${d.color}"><div class="daw-card-top"><span class="daw-mark">${escapeHtml(d.mark)}</span><span class="daw-kind">${escapeHtml(d.badge||(d.cost==="free"?"FREE TO USE":"PAID LICENSE"))}</span></div><h3 class="daw-name">${escapeHtml(d.name)}</h3><div class="daw-maker">${escapeHtml(d.maker)}</div><p class="daw-note">${escapeHtml(d.note)}</p><div class="daw-meta"><span>${escapeHtml(d.platform)}</span><span>${d.capabilities.includes("audio recording")?"AUDIO + MIDI":"MIDI-FOCUSED"}</span></div><div class="daw-actions"><button class="select-path" data-daw="${d.id}">${state.daw===d.id?"Selected ✓":"Explore this path ↗"}</button>${officialButton(d)}</div></article>`).join("");
    $$(".select-path").forEach(b=>b.addEventListener("click",()=>selectDaw(b.dataset.daw)));
    if(!visible.length) $("#daw-grid").innerHTML='<div class="empty-library">No software matches this search. Try another name or platform.</div>';
  }
  function selectDaw(id){state.daw=id;state.skill="All skills";renderDaws();renderPath();renderLessons();$("#path-status").textContent=`${daws.find(d=>d.id===id).name} path selected. Shared ideas stay the same; the workflow steps below now match your software.`;document.querySelector("#library").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});}
  function renderPath(){
    const d=daws.find(x=>x.id===state.daw);
    $("#route-title").innerHTML=state.topics.length?(d?`Your <span class="serif-word">${escapeHtml(d.name)}</span> + subject path.`:'Your music learning <span class="serif-word">path.</span>'):d?`Your <span class="serif-word">${escapeHtml(d.name)}</span> path.`:'Start with the shared <span class="serif-word">essentials.</span>';
    $("#path-current").innerHTML=`<button class="current-path ${!d?"active":""}" data-clear="true"><span class="current-dot"></span> No DAW selected</button>`+daws.map(x=>`<button class="current-path ${d&&x.id===d.id?"active":""}" data-path="${x.id}"><span class="current-dot"></span> ${escapeHtml(x.name)}</button>`).join("");
    $$(".current-path").forEach(b=>b.addEventListener("click",()=>{if(b.dataset.clear){state.daw=null;renderPath();renderLessons();renderDaws();$("#path-status").textContent="Showing the shared foundation. Choose a DAW later whenever you like.";}else selectDaw(b.dataset.path);}));
  }
  function renderSkills(){ $("#skill-filters").innerHTML=skills.map(s=>`<button class="skill-filter ${state.skill===s?"active":""}" data-skill="${escapeHtml(s)}">${escapeHtml(s)}</button>`).join("");$$(".skill-filter").forEach(b=>b.addEventListener("click",()=>{state.skill=b.dataset.skill;renderSkills();renderLessons();})); }
  const lessonSubjectPaths={
    "midi-groove":["drums","bass","ear-training"],
    "sound-selection":["synths","sound-design","sampling","vocal-production"],
    "arrange-loop":["composition","lyrics","arranging"],
    "record-take":["recording","vocal-production"],
    "mix-balance":["mixing","mastering","recording","vocal-production"],
    "automation-export":["mixing","mastering","technology"],
    "troubleshoot":["technology","recording","vocal-production"]
  };
  function visibleLessons(){let list=lessons.filter(l=>{if(l.discipline)return state.topics.includes(l.discipline);const hasDawWorkflow=!!(state.daw&&l.steps&&l.steps[state.daw]);if(!state.topics.length)return l.shared||hasDawWorkflow;if(!state.daw)return false;if(l.id==="first-session")return hasDawWorkflow;const subjects=lessonSubjectPaths[l.id]||l.relevantSubjects||[];return hasDawWorkflow&&state.topics.some(subject=>subjects.includes(subject));});if(state.skill!=="All skills")list=list.filter(l=>l.skill===state.skill);if(state.sort==="beginner")list.sort((a,b)=>a.level.localeCompare(b.level)||a.time-b.time);if(state.sort==="shortest")list.sort((a,b)=>a.time-b.time);if(state.sort==="recommended"&&state.topics.length)list.sort((a,b)=>{const ai=a.discipline?state.topics.indexOf(a.discipline):Number.MAX_SAFE_INTEGER;const bi=b.discipline?state.topics.indexOf(b.discipline):Number.MAX_SAFE_INTEGER;return ai-bi;});return list;}
  function renderLessons(){
    const list=visibleLessons();$("#results-count").textContent=`${String(list.length).padStart(2,"0")} LESSON${list.length===1?"":"S"}`;const captionParts=[];if(state.topics.length)captionParts.push(`${state.topics.length===1?disciplines.find(d=>d.id===state.topics[0]).name:"chosen subjects"} path`);if(state.daw)captionParts.push(`${daws.find(d=>d.id===state.daw).name} workflows`);const lessonScope=state.topics.length?(state.daw?"subject lessons + relevant DAW workflows":"subject lessons only"):"shared foundations";$(".result-caption").textContent=` • ${captionParts.join(" + ")||"shared foundations"} · ${lessonScope}`;
    $("#lesson-list").innerHTML=list.map((l,i)=>`<button class="lesson-row" data-lesson="${l.id}" aria-label="Open lesson ${escapeHtml(l.title)}"><span class="lesson-index">${String(i+1).padStart(2,"0")}</span><span><span class="lesson-title">${escapeHtml(l.title)} ${progress.completed.includes(l.id)?'<span class="lesson-done">✓</span>':''}</span><span class="lesson-summary">${escapeHtml(l.summary)}</span></span><span class="lesson-skill">${escapeHtml(l.skill)}</span><span class="lesson-time">${l.time} MIN · ${escapeHtml(l.level.toUpperCase())}</span><span class="lesson-arrow">↗</span></button>`).join("");
    $("#no-results").classList.toggle("hidden",list.length>0);$$(".lesson-row").forEach(b=>b.addEventListener("click",()=>openLesson(b.dataset.lesson)));
  }
  function openLesson(id){
    const l=lessons.find(x=>x.id===id);if(!l)return;
    const daw=daws.find(d=>d.id===state.daw);const workflow=daw&&!l.discipline&&l.steps?l.steps[daw.id]:null;
    const baseMedia=window.ROOMTONE.lessonMedia&&window.ROOMTONE.lessonMedia[l.id];
    const media=baseMedia&&daw&&baseMedia.dawVideos&&baseMedia.dawVideos[daw.id]?{...baseMedia,...baseMedia.dawVideos[daw.id]}:baseMedia;
    const course=l.discipline&&disciplines.find(d=>d.id===l.discipline);
    $("#dialog-kicker").textContent=`${course?course.name.toUpperCase():daw?daw.name.toUpperCase()+" PATH":"SHARED FOUNDATION"} · ${l.time} MIN · ${l.level.toUpperCase()}`;
    const flow=daw&&!l.discipline?{ableton:["MIDI / audio tracks","Session clips","Arrangement","Mix & render"],flstudio:["Channel Rack + Piano roll","Patterns","Playlist","Mixer + render"],lmms:["Beat+Bassline / Piano Roll","Song Editor","FX Mixer","Render audio"],waveform:["Audio + MIDI tracks","Clips on timeline","Mixer + automation","Render audio"],reaper:["Tracks + media items","Arrange + edit","FX + routing + envelopes","Render master mix"]}[daw.id]:null;
    const resourceLinks=l.resourceLinks&&l.resourceLinks.length?`<p class="dialog-links">Further reading: ${l.resourceLinks.map(link=>`<a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)} ↗</a>`).join(" · ")}</p>`:daw&&!l.discipline?`<p class="dialog-links">Further reading: <a href="${daw.docs}" target="_blank" rel="noreferrer">${escapeHtml(daw.name)} official documentation ↗</a></p>`:"";
    const videoSection=media?`<section class="lesson-video"><div class="lesson-video-heading"><div><span class="video-eyebrow">WATCH & LISTEN</span><h3>${escapeHtml(media.title)}</h3><p>Video by ${escapeHtml(media.creator)}</p></div></div><a class="watch-youtube-button" href="https://www.youtube.com/watch?v=${encodeURIComponent(media.video)}" target="_blank" rel="noreferrer"><span class="youtube-play-mark" aria-hidden="true">▶</span><span>Watch on YouTube</span><span class="youtube-open-mark" aria-hidden="true">↗</span></a></section>`:"";
    const studioNote=media?`<aside class="studio-note"><strong>STUDIO NOTE</strong><p>${escapeHtml(media.note)}</p></aside>`:"";
    const softwareHint=!l.discipline&&!workflow?`<div class="exercise-box"><strong>SOFTWARE STEP</strong><p>Choose a DAW above to see the exact controls and workflow for this skill. The concept and exercise remain available without choosing software.</p></div>`:"";
    $("#dialog-content").innerHTML=`<div class="lesson-meta-line"><span>${escapeHtml(l.skill.toUpperCase())}</span><span>${escapeHtml(l.level.toUpperCase())}</span><span>${l.time} MIN</span></div><h2>${escapeHtml(l.title)}</h2><p class="dialog-lead">${escapeHtml(l.summary)}</p>${videoSection}${flow?`<div class="workflow-diagram" aria-label="${escapeHtml(daw.name)} production workflow">${flow.map((x,i)=>`<div class="workflow-node"><span>0${i+1}</span><b>${escapeHtml(x)}</b></div>${i<flow.length-1?'<span class="workflow-arrow">→</span>':''}`).join("")}</div>`:""}<h3>What you’ll learn</h3><ul>${l.objectives.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul><h3>The idea</h3><p>${escapeHtml(l.concept)}</p>${workflow?`<h3>${escapeHtml(daw.name)} workflow</h3><ol>${workflow.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ol>`:softwareHint}${studioNote}<h3>Try it</h3><div class="exercise-box"><strong>PRACTICE EXERCISE</strong><p>${escapeHtml(l.exercise)}</p></div><h3>Common mistake</h3><p>${escapeHtml(l.mistake)}</p>${resourceLinks}<button class="complete-lesson ${progress.completed.includes(l.id)?"complete":""}" data-complete="${l.id}">${progress.completed.includes(l.id)?"✓ Lesson complete — mark unfinished":"Mark lesson complete"}</button>`;
    $("#dialog-content .complete-lesson").addEventListener("click",e=>{const key=e.currentTarget.dataset.complete;if(progress.completed.includes(key))progress.completed=progress.completed.filter(x=>x!==key);else progress.completed.push(key);save();renderProgress();renderLessons();openLesson(id);});
    $("#lesson-dialog").showModal();
  }
  function renderTable(){ $("#software-table").innerHTML=daws.map(d=>`<tr><td>${escapeHtml(d.name)}</td><td><span class="license-chip ${d.cost}">${escapeHtml(d.tableStatus||(d.cost==="free"?"NO-COST EDITION":"COMMERCIAL"))}</span><br>${escapeHtml(d.license)}</td><td>${escapeHtml(d.platform)}</td><td>${escapeHtml(d.best)}</td><td><a href="${d.official}" target="_blank" rel="noreferrer">Website ↗</a><br><a href="${d.docs}" target="_blank" rel="noreferrer">Docs ↗</a><br>${d.purchase?`<a href="${d.purchase}" target="_blank" rel="noreferrer">License ↗</a>`:""}</td></tr>`).join(""); }
  function renderProgress(){const count=progress.completed.length;$("#progress-label").textContent=`${count} lesson${count===1?"":"s"} done`;$("#arc-done").innerHTML=`<span>${progress.arcDone?"✓":"○"}</span> ${progress.arcDone?"Exercise complete — mark unfinished":"Mark this exercise complete"}`;$("#arc-done").classList.toggle("completed",progress.arcDone);}
  $("#daw-search").addEventListener("input",e=>{state.query=e.target.value;renderDaws();});
  $("#discipline-search").addEventListener("input",e=>{state.disciplineQuery=e.target.value;renderDisciplines();});
  $("#clear-focus").addEventListener("click",()=>{state.topics=[];saveFocus();renderDisciplines();renderFocus();renderLessons();renderPath();});
  $("#focus-start").addEventListener("click",()=>{$("#library").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});});
  $$(".segment").forEach(b=>b.addEventListener("click",()=>{$$(".segment").forEach(x=>x.classList.remove("active"));b.classList.add("active");state.cost=b.dataset.filter;renderDaws();}));
  $("#lesson-sort").addEventListener("change",e=>{state.sort=e.target.value;renderLessons();});
  $("#clear-filter").addEventListener("click",()=>{state.skill="All skills";renderSkills();renderLessons();});
  $("#reset-filters").addEventListener("click",()=>{state.skill="All skills";renderSkills();renderLessons();});
  $("#dialog-close").addEventListener("click",()=>$("#lesson-dialog").close());
  $("#theme-toggle").addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";savedTheme=next;setTheme(next);try{localStorage.setItem(THEME_STORE,next);}catch(e){/* Theme works for this page even without storage. */}});
  if(systemTheme.addEventListener)systemTheme.addEventListener("change",event=>{if(savedTheme!=="dark"&&savedTheme!=="light")setTheme(event.matches?"dark":"light");});
  $("#lesson-dialog").addEventListener("click",e=>{if(e.target===$("#lesson-dialog"))$("#lesson-dialog").close();});
  $("#arc-done").addEventListener("click",()=>{progress.arcDone=!progress.arcDone;save();renderProgress();});
  let taps=[];$("#tap-tempo").addEventListener("click",()=>{const now=performance.now();taps=taps.filter(t=>now-t<8000);if(taps.length&&now-taps[taps.length-1]>2500)taps=[];taps.push(now);if(taps.length>=3){const gaps=taps.slice(1).map((t,i)=>t-taps[i]);const avg=gaps.reduce((a,b)=>a+b,0)/gaps.length;const bpm=Math.round(60000/avg);$("#tempo-value").textContent=bpm;$("#tempo-feedback").textContent=`${taps.length} taps · around ${bpm} BPM. Keep tapping to refine.`;}else{$("#tempo-value").textContent="…";$("#tempo-feedback").textContent=`${taps.length} tap${taps.length===1?"":"s"} · tap ${3-taps.length} more.`;}});
  $("#reset-tempo").addEventListener("click",()=>{taps=[];$("#tempo-value").textContent="—";$("#tempo-feedback").textContent="Tap at least 3 times to calculate.";});
  $("#start-export").addEventListener("click",()=>openLesson("automation-export"));
  $("#progress-open").addEventListener("click",()=>{const n=progress.completed.length;$("#path-status").textContent=n?`Your progress is saved on this device: ${n} completed lesson${n===1?"":"s"}${progress.arcDone?" and one exercise":""}.`:"Your progress is saved on this device as you complete lessons.";document.querySelector("#library").scrollIntoView({behavior:"smooth",block:"start"});});
  $("#mobile-menu").addEventListener("click",e=>{const open=document.body.classList.toggle("mobile-nav-open");e.currentTarget.setAttribute("aria-expanded",String(open));e.currentTarget.textContent=open?"×":"☰";});
  $$(".top-nav a").forEach(a=>a.addEventListener("click",()=>{document.body.classList.remove("mobile-nav-open");$("#mobile-menu").setAttribute("aria-expanded","false");$("#mobile-menu").textContent="☰";}));
  renderDaws();renderTopicFilters();renderDisciplines();renderFocus();renderPath();renderSkills();renderLessons();renderTable();renderProgress();
})();
