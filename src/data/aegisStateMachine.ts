// Sanitized, self-contained interactive diagram for the Automation & Operational Protocols
// (project-aegis) entry. Rendered via HtmlPreviewCard (srcDoc preview / Blob-URL launch).
// Conceptual reconstruction only — no Notion workspace IDs, page UUIDs, database keys, tokens,
// or credentials. The Guardian toggle contrasts the tested HITL iteration with the developed
// autonomous iteration.
export const AEGIS_STATE_MACHINE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Aegis / emOS — Sanitized State Machine</title>
<style>
  * { box-sizing: border-box; }
  body { margin:0; font-family: Inter, system-ui, -apple-system, sans-serif; background:#faf8f5; color:#0f172a; }
  .wrap { max-width: 860px; margin:0 auto; padding: 22px; }
  .head { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:6px; }
  .sub { font-size:11px; color:#64748b; text-transform:uppercase; letter-spacing:.16em; margin-bottom:4px; }
  .title { font-size:16px; font-weight:700; }
  .badge { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#0369a1; background:#e0f2fe; border:1px solid #bae6fd; border-radius:8px; padding:5px 9px; }
  .modebar { display:flex; align-items:center; gap:10px; margin:14px 0 18px; flex-wrap:wrap; }
  .modebar b { font-size:11px; text-transform:uppercase; letter-spacing:.12em; color:#475569; }
  .toggle { display:inline-flex; border:1px solid #cbd5e1; border-radius:9px; overflow:hidden; }
  .toggle button { font-size:12px; font-weight:600; padding:7px 13px; border:0; background:#fff; color:#334155; cursor:pointer; }
  .toggle button.active { background:#0f172a; color:#fff; }
  .grid { display:grid; gap:9px; }
  .node { text-align:left; width:100%; padding:12px 14px; border:1px solid #cbd5e1; border-radius:11px; background:#fff; cursor:pointer; font-size:13px; font-weight:600; color:#0f172a; display:flex; align-items:center; gap:10px; transition:all .15s; }
  .node:hover { border-color:#0ea5e9; }
  .node.active { border-color:#0ea5e9; background:#f0f9ff; box-shadow:0 0 0 1px #0ea5e9; }
  .node .tag { margin-left:auto; font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; border-radius:6px; padding:3px 7px; white-space:nowrap; }
  .node.guard { border-color:#0ea5e9; background:#f0f9ff; }
  .arrow { text-align:center; color:#94a3b8; font-size:13px; line-height:1; }
  .detail { margin-top:14px; padding:14px 16px; border:1px solid #e2e8f0; border-left:3px solid #0ea5e9; border-radius:10px; background:#f8fafc; font-size:13px; line-height:1.6; color:#334155; min-height:64px; }
  .detail b { color:#0f172a; }
  .foot { margin-top:16px; font-size:11px; color:#94a3b8; font-style:italic; line-height:1.5; }
</style>
</head>
<body>
<div class="wrap">
  <div class="head">
    <div>
      <div class="sub">Sanitized State Machine</div>
      <div class="title">Aegis Governance + emOS Runtime</div>
    </div>
    <span class="badge">Conceptual · No real data</span>
  </div>

  <div class="modebar">
    <b>Guardian seat</b>
    <div class="toggle">
      <button id="m-hitl" class="active" onclick="setMode('hitl')">Human (HITL)</button>
      <button id="m-auto" onclick="setMode('auto')">Aegis engine (Auto)</button>
    </div>
  </div>

  <div class="grid">
    <button class="node" onclick="pick(this,'task')"><span>1 · Task — Notion ticket (Pending Execution)</span><span class="tag">Notion</span></button>
    <div class="arrow">&#9660;</div>
    <button class="node" onclick="pick(this,'exec')"><span>2 · Route &amp; execute — emOS worker</span><span class="tag">Docker / Cloud Run</span></button>
    <div class="arrow">&#9660;</div>
    <button class="node guard" id="g-node" onclick="pick(this,'guard')"><span id="g-label">3 · Guard — human review</span><span class="tag" id="g-tag">Aegis · HITL</span></button>
    <div class="arrow">&#9660;</div>
    <button class="node" onclick="pick(this,'resolve')"><span>4 · Resolve — Completed / Failed: Guardrails Tripped</span><span class="tag">Notion</span></button>
  </div>

  <div class="detail" id="detail">Select a stage to see what happens. Toggle the Guardian seat to compare human-in-the-loop with autonomous operation.</div>
  <div class="foot">Sanitized reconstruction for portfolio use. No Notion workspace IDs, page UUIDs, database keys, or credentials are shown.</div>
</div>
<script>
  var mode = 'hitl';
  var details = {
    task: '<b>Task.</b> A structured Notion page lands with markdown system instructions, task parameters, and target file specs. Notion is the single, human-readable source of truth.',
    exec: '<b>Route &amp; execute (emOS).</b> A lightweight TypeScript daemon polls Notion (~15s), downloads the payload, spins up an isolated Docker container, and runs the target scripts. emOS is blind to whether the output is <i>correct</i> until Aegis checks it.',
    resolve: '<b>Resolve.</b> A markdown audit trail is appended to the Notion page and the state moves to <b>Completed</b> or <b>Failed: Guardrails Tripped</b> — nothing mutates silently.'
  };
  function guardDetail() {
    if (mode === 'hitl') {
      return '<b>Guard — Human (HITL).</b> The execution log is reviewed against the Aegis ruleset in Notion and approved or rejected by a human. This iteration was built and tested first, to prove the protocol was trustworthy.';
    }
    return '<b>Guard — Aegis engine (Autonomous).</b> The Aegis engine evaluates the log automatically — structural compliance, a mandatory thinking-trace, and drift detection against the task spec — and resolves the ticket with no human. Developed as the next step toward a containerized executable.';
  }
  function render() {
    document.getElementById('g-label').innerHTML = mode === 'hitl' ? '3 · Guard — human review' : '3 · Guard — Aegis engine';
    document.getElementById('g-tag').textContent = mode === 'hitl' ? 'Aegis · HITL' : 'Aegis · Auto';
    document.getElementById('m-hitl').classList.toggle('active', mode === 'hitl');
    document.getElementById('m-auto').classList.toggle('active', mode === 'auto');
  }
  function setMode(m) {
    mode = m;
    render();
    var active = document.querySelector('.node.active');
    if (active && active.id === 'g-node') { document.getElementById('detail').innerHTML = guardDetail(); }
  }
  function pick(el, key) {
    var nodes = document.querySelectorAll('.node');
    for (var i = 0; i < nodes.length; i++) { nodes[i].classList.remove('active'); }
    el.classList.add('active');
    document.getElementById('detail').innerHTML = key === 'guard' ? guardDetail() : details[key];
  }
  render();
</script>
</body>
</html>`;
