let currentModule=0,currentScenario=null,examQs=[],session=null;
let progress=JSON.parse(localStorage.getItem("giaV22a")||'{"completed":[],"practice":{"a":0,"c":0},"scenarios":{"a":0,"c":0},"exams":[],"missed":{},"cats":{},"sessions":0}');
function scrollTopNow(){window.scrollTo({top:0,behavior:"smooth"})} function save(){localStorage.setItem("giaV22a",JSON.stringify(progress));ready()} function pct(c,a){return a?Math.round(c/a*100):0} function cat(category,correct){if(!progress.cats[category])progress.cats[category]={a:0,c:0};progress.cats[category].a++;if(correct)progress.cats[category].c++} function miss(q){if(!progress.missed[q.id])progress.missed[q.id]={id:q.id,category:q.category,subcategory:q.subcategory,times:0,corrected:false};progress.missed[q.id].times++;progress.missed[q.id].corrected=false} function corrected(q){if(progress.missed[q.id])progress.missed[q.id].corrected=true} function readiness(){let m=progress.completed.length/MODULES.length*100,p=pct(progress.practice.c,progress.practice.a),s=pct(progress.scenarios.c,progress.scenarios.a),e=progress.exams.length?Math.max(...progress.exams):0;return Math.round(m*.20+p*.25+s*.25+e*.30)} function label(x){return x>=95?"Exam Ready":x>=85?"Ready":x>=70?"Nearly Ready":"Not Ready"} function ready(){let r=readiness();readyScore.textContent=r+"%";readyLabel.textContent=label(r)}
function renderCourseCards(){
  if(typeof COURSES==="undefined"||!document.getElementById("courseCards"))return;
  const active=(typeof ACTIVE_COURSE_ID!=="undefined"?ACTIVE_COURSE_ID:"FER");
  const current=COURSES.find(c=>c.id===active)||COURSES[0];
  if(document.getElementById("selectedCourseLine")&&current)selectedCourseLine.textContent="Selected Course: "+current.title;
  courseCards.innerHTML=COURSES.map(c=>{
    const isActive=c.id===active;
    const badge=c.status==="active"?'<span class="badge active">Active</span>':'<span class="badge soon">Coming Soon</span>';
    const langs=[...(c.languages||[]),...(c.futureLanguages||[]).map(x=>x+" planned")].join(", ");
    return `<div class="courseCard ${isActive?'activeCourse':''}">${badge}<h3>${c.shortTitle||c.title}</h3><p>${c.description||''}</p><p class="note"><strong>Course ID:</strong> ${c.id}<br><strong>Version:</strong> ${c.version}<br><strong>Languages:</strong> ${langs}</p><button ${isActive?'class="primary"':'disabled'}>${isActive?'Current Course':'Coming Soon'}</button></div>`;
  }).join("");
}
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>{document.querySelectorAll(".tab,.view").forEach(x=>x.classList.remove("active"));t.classList.add("active");document.getElementById(t.dataset.view).classList.add("active");scrollTopNow();if(t.dataset.view==="dashboard")dashboard();if(t.dataset.view==="missed")missedList()});
function renderModules(){moduleList.innerHTML="<h3>Modules</h3>";MODULES.forEach((m,i)=>{let b=document.createElement("button");b.className="moduleBtn"+(i===currentModule?" active":"")+(progress.completed.includes(m.id)?" complete":"");b.textContent=(i+1)+". "+m.title;b.onclick=()=>{currentModule=i;renderModule();renderModules()};moduleList.appendChild(b)})} function renderModule(){let m=MODULES[currentModule];moduleContent.innerHTML=`<p class="eyebrow">Study Mode</p><h2>${currentModule+1}. ${m.title}</h2><p><strong>Objective:</strong> ${m.objective}</p>`+m.lessons.map(l=>`<div class="lesson"><h3>${l[0]}</h3><p>${l[1]}</p><p><strong>Memory Aid:</strong> ${l[2]}</p></div>`).join("")+`<div class="memory"><strong>Mastery Target:</strong> 85%+</div>`}
prev.onclick=()=>{currentModule=Math.max(0,currentModule-1);renderModule();renderModules();scrollTopNow()};next.onclick=()=>{currentModule=Math.min(MODULES.length-1,currentModule+1);renderModule();renderModules();scrollTopNow()};complete.onclick=()=>{let id=MODULES[currentModule].id;if(!progress.completed.includes(id))progress.completed.push(id);save();renderModules()};resetModule.onclick=()=>{let id=MODULES[currentModule].id;progress.completed=progress.completed.filter(x=>x!==id);save();renderModules()};
function topicOptions(){let cats=[...new Set(QUESTIONS.map(q=>q.category))];practiceTopic.innerHTML='<option value="all">All Topics</option>'+cats.map(c=>`<option value="${c}">${c}</option>`).join("")+'<option value="tag:nutrient-deficiency">Nutrient Deficiencies</option><option value="tag:water-problems">Water Problems</option><option value="tag:calibration-math">Calibration Math</option><option value="tag:disease-recognition">Disease Recognition</option><option value="tag:job-proficiency">Job Proficiency Mix</option>'} topicOptions();
function showPracticeMenu(){session=null;practiceSession.classList.add("hidden");practiceSession.innerHTML="";practiceSetup.classList.remove("hidden");scrollTopNow()} showCustomize.onclick=()=>customOptions.classList.toggle("hidden");recommendedPractice.onclick=()=>startSession(10,"all",true);startCustom.onclick=()=>startSession(Number(practiceLength.value),practiceTopic.value,false);
function poolFor(topic){if(topic==="all")return [...QUESTIONS];if(topic.startsWith("tag:")){let tag=topic.replace("tag:","");return QUESTIONS.filter(q=>q.tags&&q.tags.includes(tag))}return QUESTIONS.filter(q=>q.category===topic)} function startSession(length,topic,recommended){let pool=poolFor(topic);if(!pool.length)pool=[...QUESTIONS];let qs=[...pool].sort(()=>Math.random()-.5).slice(0,Math.min(length,pool.length));session={questions:qs,index:0,correct:0,incorrect:0,misses:[],topic,recommended};practiceSetup.classList.add("hidden");practiceSession.classList.remove("hidden");renderSessionQuestion();scrollTopNow()} function sessionHeader(){let total=session.questions.length,done=session.correct+session.incorrect,acc=pct(session.correct,done);return `<div class="sessionbar"><strong>Question ${Math.min(session.index+1,total)} of ${total}</strong><span>Correct: ${session.correct}</span><span>Incorrect: ${session.incorrect}</span><span>Accuracy: ${acc}%</span><button onclick="showPracticeMenu()">Change Practice Type</button><button onclick="endSession(true)">End / Grade Session</button></div>`} function qhtml(q,name){return `<div class="qcard"><p class="eyebrow">${q.id} · ${q.category} · ${q.subcategory}</p><h3>${q.q}</h3>${q.choices.map((c,i)=>`<label class="option"><input type="radio" name="${name}" value="${i}"> ${String.fromCharCode(65+i)}. ${c}</label>`).join("")}</div>`} function renderSessionQuestion(){let q=session.questions[session.index];practiceSession.innerHTML=sessionHeader()+qhtml(q,"sessAns")+`<button id="submitSess">Submit Answer</button><div id="sessFeedback"></div><div class="bottomBar"><button onclick="endSession(true)">End / Grade Session</button><button onclick="scrollTopNow()">Back to Top</button><button onclick="showPracticeMenu()">Return to Practice Menu</button></div>`;submitSess.onclick=submitSessionAnswer} function submitSessionAnswer(){let ch=document.querySelector('input[name="sessAns"]:checked');if(!ch){sessFeedback.innerHTML='<div class="feedback bad">Choose an answer first.</div>';return}let q=session.questions[session.index],ok=Number(ch.value)===q.answer;if(ok)session.correct++;else{session.incorrect++;session.misses.push(q.id);miss(q)}progress.practice.a++;if(ok)progress.practice.c++;cat(q.category,ok);if(ok)corrected(q);save();sessFeedback.innerHTML=`<div class="feedback ${ok?"":"bad"}"><strong>${ok?"Correct":"Incorrect"}.</strong> ${q.explain}<br><strong>Memory Aid:</strong> ${q.memory}${ok?"":"<br><strong>Added to Missed Question Vault™</strong>"}</div><button id="nextSess">Next Question →</button>`;submitSess.disabled=true;document.querySelectorAll('input[name="sessAns"]').forEach(i=>i.disabled=true);nextSess.onclick=()=>{session.index++;if(session.index>=session.questions.length)endSession(false);else renderSessionQuestion()}} function endSession(early){if(!session)return;progress.sessions++;save();let total=session.correct+session.incorrect,acc=pct(session.correct,total),weak={};session.misses.forEach(id=>{let q=QUESTIONS.find(x=>x.id===id);if(q)weak[q.category]=(weak[q.category]||0)+1});practiceSession.innerHTML=`<h2>${early?"Practice Session Ended / Graded":"Practice Session Complete"}</h2><div class="grid"><div class="metric"><strong>${total}</strong>Answered</div><div class="metric"><strong>${session.correct}</strong>Correct</div><div class="metric"><strong>${session.incorrect}</strong>Incorrect</div><div class="metric"><strong>${acc}%</strong>Accuracy</div></div><h3>Weak Areas This Session</h3><p>${Object.keys(weak).length?Object.entries(weak).map(([k,v])=>`${k}: ${v} miss(es)`).join("<br>"):"No missed questions in this session."}</p><div class="bottomBar"><button onclick="scrollTopNow()">Back to Top</button><button onclick="showPracticeMenu()">Return to Practice Menu</button><button onclick="document.querySelector('[data-view=missed]').click()">Review Missed Questions</button></div>`}
function missedList(){let arr=Object.values(progress.missed);if(!arr.length){missedBox.innerHTML="<p>No missed questions yet.</p>";return}missedBox.innerHTML=`<table><tr><th>ID</th><th>Category</th><th>Subcategory</th><th>Times</th><th>Status</th></tr>${arr.map(m=>`<tr><td>${m.id}</td><td>${m.category}</td><td>${m.subcategory||""}</td><td>${m.times}</td><td>${m.corrected?"Corrected":"Needs Review"}</td></tr>`).join("")}</table>`} reviewMissed.onclick=()=>{let ids=Object.values(progress.missed).filter(m=>!m.corrected).map(m=>m.id);if(!ids.length){missedBox.innerHTML="<p>No active missed questions.</p>";return}let q=QUESTIONS.find(q=>q.id===ids[Math.floor(Math.random()*ids.length)]);missedBox.innerHTML=qhtml(q,"mans")+`<button id="checkM">Check Review</button><div id="mfb"></div><div class="bottomBar"><button onclick="scrollTopNow()">Back to Top</button><button onclick="missedList()">Back to Missed List</button></div>`;checkM.onclick=()=>{let ch=document.querySelector('input[name="mans"]:checked');if(!ch){mfb.innerHTML='<div class="feedback bad">Choose an answer first.</div>';return}let ok=Number(ch.value)===q.answer;cat(q.category,ok);ok?corrected(q):miss(q);save();mfb.innerHTML=`<div class="feedback ${ok?"":"bad"}"><strong>${ok?"Corrected":"Still needs review"}.</strong> ${q.explain}</div>`}};clearMissed.onclick=()=>{Object.keys(progress.missed).forEach(id=>{if(progress.missed[id].corrected)delete progress.missed[id]});save();missedList()};clearAllMissed.onclick=()=>{if(confirm("Clear all missed questions?")){progress.missed={};save();missedList()}}
startExam.onclick=()=>{examQs=[...QUESTIONS].sort(()=>Math.random()-.5).slice(0,Math.min(20,QUESTIONS.length));gradeExam.disabled=false;examBox.innerHTML=examQs.map((q,i)=>qhtml(q,"e"+i)).join("")+`<div class="bottomBar"><button onclick="gradeExam.click()">Grade Exam</button><button onclick="scrollTopNow()">Back to Top</button><button onclick="cancelExam.click()">Cancel Exam</button></div>`};cancelExam.onclick=()=>{examQs=[];gradeExam.disabled=true;examBox.innerHTML="<p>Exam cancelled. Start a new exam when ready.</p>"};gradeExam.onclick=()=>{if(!examQs.length)return;let c=0,rev="";examQs.forEach((q,i)=>{let ch=document.querySelector(`input[name="e${i}"]:checked`),ok=ch&&Number(ch.value)===q.answer;if(ok)c++;else miss(q);cat(q.category,ok);rev+=`<div class="feedback ${ok?"":"bad"}"><strong>${q.id}:</strong> ${ok?"Correct":"Review"} — ${q.explain}</div>`});let sc=Math.round(c/examQs.length*100);progress.exams.push(sc);save();gradeExam.disabled=true;examBox.innerHTML=`<h3>Exam Score: ${sc}%</h3><p>${sc>=85?"Target met.":"Keep studying. Target is 85%+."}</p>`+rev+`<div class="bottomBar"><button onclick="scrollTopNow()">Back to Top</button><button onclick="startExam.click()">Start New Exam</button></div>`}
newScenario.onclick=scenario;resetScenario.onclick=()=>{scenarioBox.innerHTML="<p>Scenario reset. Click New Scenario when ready.</p>"};function scenario(){currentScenario=SCENARIOS[Math.floor(Math.random()*SCENARIOS.length)];scenarioBox.innerHTML=`<div class="qcard"><p class="eyebrow">${currentScenario.id} · ${currentScenario.category}</p><h3>${currentScenario.title}</h3><p>${currentScenario.prompt}</p>${currentScenario.choices.map((c,i)=>`<label class="option"><input type="radio" name="sans" value="${i}"> ${String.fromCharCode(65+i)}. ${c}</label>`).join("")}</div><button id="checkS">Check Decision</button><div id="sfb"></div>`;checkS.onclick=()=>{let ch=document.querySelector('input[name="sans"]:checked');if(!ch){sfb.innerHTML='<div class="feedback bad">Choose an answer first.</div>';return}let ok=Number(ch.value)===currentScenario.answer;progress.scenarios.a++;if(ok)progress.scenarios.c++;cat(currentScenario.category,ok);save();sfb.innerHTML=`<div class="feedback ${ok?"":"bad"}"><strong>${ok?"Good decision":"Review this decision"}.</strong> ${currentScenario.explain}</div>`}}
function dashboard(){let r=readiness(),mp=Math.round(progress.completed.length/MODULES.length*100),pp=pct(progress.practice.c,progress.practice.a),sp=pct(progress.scenarios.c,progress.scenarios.a),be=progress.exams.length?Math.max(...progress.exams):0,active=Object.values(progress.missed).filter(m=>!m.corrected).length;let rows=Object.entries(progress.cats).map(([k,v])=>`<tr><td>${k}</td><td>${v.c}/${v.a}</td><td>${pct(v.c,v.a)}%</td></tr>`).join("");let weak=Object.entries(progress.cats).filter(([k,v])=>v.a>=2&&pct(v.c,v.a)<85).map(([k])=>k).join(", ")||"No weak area identified yet.";dashBox.innerHTML=`<div class="grid"><div class="metric"><strong>${r}%</strong>Readiness Score™<br>${label(r)}</div><div class="metric"><strong>${mp}%</strong>Module Completion</div><div class="metric"><strong>${pp}%</strong>Practice Accuracy</div><div class="metric"><strong>${sp}%</strong>Scenario Accuracy</div><div class="metric"><strong>${be}%</strong>Best Exam</div><div class="metric"><strong>${active}</strong>Active Misses</div><div class="metric"><strong>${progress.sessions}</strong>Practice Sessions</div></div><h3>Weak Area Analyzer™</h3>${rows?`<table><tr><th>Category</th><th>Correct</th><th>Accuracy</th></tr>${rows}</table>`:"<p>No category data yet.</p>"}<h3>Recommended Study Focus</h3><p>${weak}</p>`} reset.onclick=()=>{if(confirm("Reset all local progress?")){localStorage.removeItem("giaV22a");location.reload()}};renderCourseCards();renderModules();renderModule();scenario();ready();

// ---------- Diagnostic Tree Trainer v2.2c ----------
let currentDiagnostic = null;
let currentDiagnosticNode = null;
let diagnosticPath = [];

function setupDiagnostics(){
  const sel = document.getElementById("diagnosticSelect");
  const start = document.getElementById("startDiagnostic");
  const reset = document.getElementById("resetDiagnostic");
  if(!sel || !start || !reset || typeof DIAGNOSTICS === "undefined") return;

  sel.innerHTML = DIAGNOSTICS
    .filter(t => t.status === "active")
    .map(t => `<option value="${t.id}">${t.title}</option>`)
    .join("");

  start.onclick = () => {
    const id = sel.value;
    currentDiagnostic = DIAGNOSTICS.find(t => t.id === id);
    currentDiagnosticNode = currentDiagnostic.startNode;
    diagnosticPath = [];
    renderDiagnosticNode();
  };

  reset.onclick = () => {
    currentDiagnostic = null;
    currentDiagnosticNode = null;
    diagnosticPath = [];
    document.getElementById("diagnosticBox").innerHTML = "<p class='note'>Diagnostic reset. Choose a tree and click Start Diagnostic.</p>";
  };

  document.getElementById("diagnosticBox").innerHTML = "<p class='note'>Choose a diagnostic tree and click Start Diagnostic.</p>";
}

function renderDiagnosticNode(){
  const box = document.getElementById("diagnosticBox");
  if(!box || !currentDiagnostic) return;

  const node = currentDiagnostic.nodes[currentDiagnosticNode];
  if(!node){
    box.innerHTML = "<div class='feedback bad'>Diagnostic node missing. Check diagnostics.js.</div>";
    return;
  }

  const pathText = diagnosticPath.length
    ? `<div class="diag-path"><strong>Path:</strong> ${diagnosticPath.join(" → ")}</div>`
    : "";

  if(node.outcome){
    box.innerHTML = `
      <div class="diag-complete">
        <p class="eyebrow">Diagnostic Outcome</p>
        <h3>${node.title}</h3>
        <p>${node.explanation}</p>
        <div class="memory"><strong>Memory Aid:</strong> ${node.memoryAid || ""}</div>
      </div>
      ${pathText}
    `;
    return;
  }

  box.innerHTML = `
    <div class="diag-step">
      <p class="eyebrow">${currentDiagnostic.category}</p>
      <h3>${currentDiagnostic.title}</h3>
      <p><strong>Objective:</strong> ${currentDiagnostic.objective}</p>
      <p><strong>Situation:</strong> ${node.prompt}</p>
      <p>${node.observation || ""}</p>
    </div>
    ${pathText}
    <h3>Choose the next best step:</h3>
    ${node.choices.map((c, i) => `<button class="diag-choice" data-next="${c.next}" data-label="${c.label.replace(/"/g,'&quot;')}">${String.fromCharCode(65+i)}. ${c.label}</button>`).join("")}
  `;

  box.querySelectorAll(".diag-choice").forEach(btn => {
    btn.onclick = () => {
      diagnosticPath.push(btn.dataset.label);
      currentDiagnosticNode = btn.dataset.next;
      renderDiagnosticNode();
    };
  });
}

try { setupDiagnostics(); } catch(e) { console.warn('Diagnostics setup skipped', e); }


// ---------- Diagnostic Builder Console v2.2d ----------
function setupBuilderConsole(){
  const validateBtn = document.getElementById("validateDiagnostics");
  const templateBtn = document.getElementById("showTreeTemplate");
  const rulesBtn = document.getElementById("showBuilderRules");
  const box = document.getElementById("builderBox");
  if(!validateBtn || !templateBtn || !rulesBtn || !box) return;

  validateBtn.onclick = () => renderDiagnosticValidation();
  templateBtn.onclick = () => renderDiagnosticTemplate();
  rulesBtn.onclick = () => renderBuilderRules();

  box.innerHTML = "<p class='note'>Use this console to validate diagnostic-tree structure and review content-builder standards.</p>";
}

function validateDiagnosticTrees(){
  const results = [];
  if(typeof DIAGNOSTICS === "undefined"){
    return [{ ok:false, tree:"System", message:"DIAGNOSTICS repository is not loaded." }];
  }

  const ids = new Set();
  DIAGNOSTICS.forEach(tree => {
    const treeName = tree.title || tree.id || "Unnamed tree";
    if(!tree.id) results.push({ ok:false, tree:treeName, message:"Missing tree id." });
    if(ids.has(tree.id)) results.push({ ok:false, tree:treeName, message:"Duplicate tree id: " + tree.id });
    ids.add(tree.id);

    ["courseId","title","category","difficulty","status","objective","startNode","nodes"].forEach(field => {
      if(!tree[field]) results.push({ ok:false, tree:treeName, message:"Missing required field: " + field });
    });

    if(!tree.nodes) return;
    if(!tree.nodes[tree.startNode]) results.push({ ok:false, tree:treeName, message:"startNode does not exist in nodes: " + tree.startNode });

    let outcomeCount = 0;
    Object.keys(tree.nodes).forEach(nodeKey => {
      const node = tree.nodes[nodeKey];

      if(node.outcome){
        outcomeCount++;
        ["title","explanation"].forEach(field => {
          if(!node[field]) results.push({ ok:false, tree:treeName, message:`Outcome node ${nodeKey} missing ${field}.` });
        });
      } else {
        if(!node.prompt) results.push({ ok:false, tree:treeName, message:`Decision node ${nodeKey} missing prompt.` });
        if(!Array.isArray(node.choices) || node.choices.length === 0){
          results.push({ ok:false, tree:treeName, message:`Decision node ${nodeKey} has no choices.` });
        } else {
          node.choices.forEach((choice, idx) => {
            if(!choice.label) results.push({ ok:false, tree:treeName, message:`Choice ${idx+1} in ${nodeKey} missing label.` });
            if(!choice.next) results.push({ ok:false, tree:treeName, message:`Choice ${idx+1} in ${nodeKey} missing next node.` });
            if(choice.next && !tree.nodes[choice.next]) results.push({ ok:false, tree:treeName, message:`Choice '${choice.label}' in ${nodeKey} points to missing node: ${choice.next}.` });
          });
        }
      }
    });

    if(outcomeCount === 0) results.push({ ok:false, tree:treeName, message:"No outcome nodes found." });
    if(results.filter(r => r.tree === treeName && !r.ok).length === 0){
      results.push({ ok:true, tree:treeName, message:"Tree passed validation." });
    }
  });

  return results;
}

function renderDiagnosticValidation(){
  const box = document.getElementById("builderBox");
  const results = validateDiagnosticTrees();
  const failures = results.filter(r => !r.ok).length;
  box.innerHTML = `
    <h3>Diagnostic Validation Results</h3>
    <p><strong>${failures === 0 ? "All active diagnostic trees passed validation." : failures + " issue(s) found."}</strong></p>
    ${results.map(r => `<div class="${r.ok ? "builder-good" : "builder-bad"}"><strong>${r.tree}</strong><br>${r.message}</div>`).join("")}
  `;
}

function renderDiagnosticTemplate(){
  const box = document.getElementById("builderBox");
  const template = `{
  id: "COURSE-DT-###",
  courseId: "COURSE",
  title: "Diagnostic Tree Title",
  category: "Category",
  difficulty: "Beginner | Intermediate | Advanced",
  status: "draft | active | retired",
  objective: "What the learner should diagnose or decide.",
  startNode: "start",
  nodes: {
    start: {
      prompt: "Situation or first decision point.",
      observation: "Background information shown to the learner.",
      choices: [
        { label: "Choice A", next: "nodeA" },
        { label: "Choice B", next: "nodeB" }
      ]
    },
    nodeA: {
      prompt: "Follow-up decision point.",
      observation: "New information after choice A.",
      choices: [
        { label: "Proceed to outcome", next: "outcomeGood" }
      ]
    },
    outcomeGood: {
      outcome: true,
      title: "Likely Diagnosis or Correct Decision",
      explanation: "Why this outcome is correct.",
      memoryAid: "Short memory aid."
    }
  }
}`;
  box.innerHTML = `<h3>Diagnostic Tree Template</h3><div class="builder-code">${template.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div>`;
}

function renderBuilderRules(){
  const box = document.getElementById("builderBox");
  box.innerHTML = `
    <h3>Diagnostic Builder Rules</h3>
    <div class="builder-rule"><strong>1. Start with the real-world situation.</strong><br>Example: Yellow turf, zone will not run, backflow test fails, condenser will not start.</div>
    <div class="builder-rule"><strong>2. Force observation before treatment.</strong><br>The tree should train the learner to inspect, test, and reason before acting.</div>
    <div class="builder-rule"><strong>3. Every choice must go somewhere.</strong><br>Each answer points to another node or to an outcome.</div>
    <div class="builder-rule"><strong>4. Wrong paths should teach.</strong><br>A wrong choice should explain why it is premature, unsafe, or incomplete.</div>
    <div class="builder-rule"><strong>5. Outcomes must include why.</strong><br>The final answer should include the reasoning and a memory aid.</div>
    <div class="builder-rule"><strong>6. Trees should support job confidence.</strong><br>The point is not just passing tests; it is learning how professionals think.</div>
  `;
}

try { setupBuilderConsole(); } catch(e) { console.warn('Builder console setup skipped', e); }
