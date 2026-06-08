// Sanitized, self-contained interactive diagram for the Portfolio 2.0 — Governed AI Build Pipeline
// (portfolio-pipeline) entry. Rendered via HtmlPreviewCard (srcDoc preview / Blob-URL launch).
// No secrets or credentials — it describes the public governance flow of this repository.
export const PORTFOLIO_PIPELINE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Portfolio 2.0 — Governed AI Build Pipeline</title>
<style>
  * { box-sizing: border-box; }
  body { margin:0; font-family: Inter, system-ui, -apple-system, sans-serif; background:#faf8f5; color:#0f172a; }
  .wrap { max-width: 880px; margin:0 auto; padding: 22px; }
  .head { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:16px; }
  .sub { font-size:11px; color:#64748b; text-transform:uppercase; letter-spacing:.16em; margin-bottom:4px; }
  .title { font-size:16px; font-weight:700; }
  .badge { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#0369a1; background:#e0f2fe; border:1px solid #bae6fd; border-radius:8px; padding:5px 9px; }
  .cols { display:grid; grid-template-columns:1fr; gap:16px; }
  @media (min-width:620px){ .cols { grid-template-columns:1.12fr .88fr; } }
  .lab { font-size:10px; text-transform:uppercase; letter-spacing:.12em; color:#475569; font-weight:700; margin-bottom:8px; }
  .grid { display:grid; gap:8px; }
  .node { text-align:left; width:100%; padding:11px 13px; border:1px solid #cbd5e1; border-radius:11px; background:#fff; cursor:pointer; font-size:13px; font-weight:600; color:#0f172a; display:flex; align-items:center; gap:9px; transition:all .15s; }
  .node:hover { border-color:#0ea5e9; }
  .node.active { border-color:#0ea5e9; background:#f0f9ff; box-shadow:0 0 0 1px #0ea5e9; }
  .node .n { font-size:10px; font-weight:700; color:#0369a1; background:#e0f2fe; border:1px solid #bae6fd; border-radius:6px; padding:2px 6px; flex:none; }
  .arrow { text-align:center; color:#94a3b8; font-size:13px; line-height:1; }
  .rail { border:1px dashed #cbd5e1; border-radius:11px; background:#fff; padding:12px; }
  .chip { display:block; width:100%; text-align:left; padding:8px 10px; border:1px solid #e2e8f0; border-radius:9px; background:#f8fafc; cursor:pointer; font-size:12px; font-weight:600; color:#334155; margin-bottom:6px; transition:all .15s; }
  .chip:hover { border-color:#0ea5e9; }
  .chip.active { border-color:#0ea5e9; background:#f0f9ff; }
  .chip span { display:block; font-size:10px; font-weight:600; color:#64748b; margin-top:2px; }
  .railnote { font-size:11px; color:#64748b; line-height:1.5; margin-top:4px; }
  .detail { margin-top:14px; padding:14px 16px; border:1px solid #e2e8f0; border-left:3px solid #0ea5e9; border-radius:10px; background:#f8fafc; font-size:13px; line-height:1.6; color:#334155; min-height:64px; }
  .detail b { color:#0f172a; }
  .foot { margin-top:16px; font-size:11px; color:#94a3b8; font-style:italic; line-height:1.5; }
</style>
</head>
<body>
<div class="wrap">
  <div class="head">
    <div>
      <div class="sub">Governed AI Build Pipeline</div>
      <div class="title">Portfolio 2.0 — how this site is built</div>
    </div>
    <span class="badge">Public repo · human design authority</span>
  </div>

  <div class="cols">
    <div>
      <div class="lab">Governance flow</div>
      <div class="grid">
        <button class="node" onclick="pick(this,'author')"><span class="n">1</span>Author — human design authority</button>
        <div class="arrow">&#9660;</div>
        <button class="node" onclick="pick(this,'subphase')"><span class="n">2</span>Subphase protocol — one change, then STOP</button>
        <div class="arrow">&#9660;</div>
        <button class="node" onclick="pick(this,'ci')"><span class="n">3</span>CI gates — lint · types · tests · build · secret-scan</button>
        <div class="arrow">&#9660;</div>
        <button class="node" onclick="pick(this,'drift')"><span class="n">4</span>Crawler &amp; drift guards</button>
        <div class="arrow">&#9660;</div>
        <button class="node" onclick="pick(this,'deploy')"><span class="n">5</span>Docker &#8594; Google Cloud Run</button>
      </div>
    </div>

    <div class="rail">
      <div class="lab">Multi-LLM toolchain</div>
      <button class="chip" onclick="tool(this,'claude')">Claude Code<span>Primary execution &amp; implementation</span></button>
      <button class="chip" onclick="tool(this,'studio')">Gemini 1.5 Pro · AI Studio<span>Aegis protocol, scaffolding, forensic archive</span></button>
      <button class="chip" onclick="tool(this,'gapi')">Gemini API<span>Live Digital Twin chat proxy</span></button>
      <button class="chip" onclick="tool(this,'gpt')">ChatGPT<span>Strategy &amp; evidence architecture</span></button>
      <button class="chip" onclick="tool(this,'codex')">Codex<span>Appellate defense (defense:codex)</span></button>
      <button class="chip" onclick="tool(this,'jules')">Jules<span>Code review (review:jules)</span></button>
      <div class="railnote">Repomix bundles repository context into the model window via <code>sync:architect</code>.</div>
    </div>
  </div>

  <div class="detail" id="detail">Select a stage or a tool. Human intent sets direction; each AI tool executes a bounded role behind the CI gate.</div>
  <div class="foot">Sanitized overview of a public repository's build governance. No secrets, keys, or credentials are shown.</div>
</div>
<script>
  var data = {
    author: '<b>Author — human design authority.</b> Every change starts from human intent. The AI executes within a defined scope; it does not set the agenda.',
    subphase: '<b>Subphase protocol.</b> The Sequential Execution Protocol (CLAUDE.md): one subphase at a time, validate, commit with the subphase id, then <b>STOP</b> and wait for explicit human approval — capping the blast radius of any single AI change.',
    ci: '<b>CI gates.</b> GitHub Actions: npm ci &#8594; lint (zero warnings) &#8594; format check &#8594; typecheck &#8594; Vitest &#8594; build &#8594; gitleaks secret-scan &#8594; key audit (fails if an API key reaches dist/). Third-party actions are pinned to immutable commit SHAs.',
    drift: '<b>Crawler &amp; drift guards.</b> Bespoke invariant tests — crawler validation, case-study coverage, skill&#8594;evidence mapping, theme-regression, and a project-metadata contract — so AI changes cannot silently degrade the repo&#39;s semantic integrity.',
    deploy: '<b>Deploy.</b> Multi-stage Docker (node:20-alpine): the Vite frontend + Express backend are built, dev dependencies are scrubbed, the runtime drops to a non-root user, and the container ships to Google Cloud Run on port 8080.',
    claude: '<b>Claude Code.</b> Primary execution and implementation — localized code changes and terminal orchestration. This site was built with it.',
    studio: '<b>Gemini 1.5 Pro (Google AI Studio).</b> Foundational Aegis protocol generation, initial component scaffolding, and the forensic archive.',
    gapi: '<b>Gemini API.</b> Powers the live server-side Digital Twin chat proxy.',
    gpt: '<b>ChatGPT.</b> High-level strategy, architectural auditing, and structuring the evidence hierarchy.',
    codex: '<b>Codex.</b> Appellate defense and logic validation, invoked via the custom defense:codex script.',
    jules: '<b>Jules.</b> Dedicated code-review loops and automated critiques, invoked via review:jules.'
  };
  function clearAll(){ var a=document.querySelectorAll('.node,.chip'); for(var i=0;i<a.length;i++){a[i].classList.remove('active');} }
  function pick(el,key){ clearAll(); el.classList.add('active'); document.getElementById('detail').innerHTML=data[key]; }
  function tool(el,key){ clearAll(); el.classList.add('active'); document.getElementById('detail').innerHTML=data[key]; }
</script>
</body>
</html>`;
