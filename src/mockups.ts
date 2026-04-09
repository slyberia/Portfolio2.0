export const PROMPTER_HUB_MOCKUP_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>V9 Hub | Pro Sandbox</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root { --bg: #0f172a; --indigo: #6366f1; --text: #f8fafc; --muted: #94a3b8; }
    body { background-color: #020617; color: var(--text); font-family: 'Inter', sans-serif; overflow: hidden; height: 100vh; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .glass-panel { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.05); }
    .nav-active { background: #4f46e5; color: white; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
  </style>
</head>
<body class="flex">
  <nav class="w-20 hover:w-64 group transition-all duration-300 ease-in-out bg-slate-900 border-r border-white/5 flex flex-col p-4 z-50 overflow-hidden">
    <div class="mb-8 flex items-center gap-4 cursor-pointer" onclick="switchTool('home')">
      <div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-xl shrink-0">V9</div>
      <div class="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        <div class="font-bold text-lg">Dev Hub</div>
        <div class="text-[10px] text-indigo-400 uppercase tracking-widest font-bold">AI & Firestore Ops</div>
      </div>
    </div>
    <div class="space-y-2 mb-8">
      <button onclick="switchTool('home')" id="btn-home" class="nav-btn w-full flex items-center p-3 rounded-lg text-indigo-200 hover:bg-white/5 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        <span class="ml-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">Dashboard</span>
      </button>
      <p class="text-[10px] uppercase font-bold text-slate-500 mt-6 mb-2 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">Tools</p>
      <button onclick="switchTool('generator')" id="btn-generator" class="nav-btn w-full flex items-center p-3 rounded-lg text-indigo-200 hover:bg-white/5 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
        <span class="ml-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">Prompt Gen</span>
      </button>
      <button onclick="switchTool('schema')" id="btn-schema" class="nav-btn w-full flex items-center p-3 rounded-lg text-indigo-200 hover:bg-white/5 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
        <span class="ml-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">Schema Builder</span>
      </button>
    </div>
    <div class="mt-auto pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
      <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sandbox Mode</div>
      <div class="text-[9px] text-indigo-400 mono">PERSISTENCE: LOCALSTORAGE</div>
    </div>
  </nav>
  <main class="flex-1 overflow-y-auto p-8 scrollbar-hide">
    <div id="view-home" class="tool-view space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <div>
          <h2 class="text-4xl font-black tracking-tight">V9 Dev Hub Sandbox</h2>
          <p class="text-slate-400 mt-1">Accelerating human intent to production data structures.</p>
        </div>
      </div>
      <div class="grid md:grid-cols-3 gap-6 mt-12">
        <div onclick="switchTool('generator')" class="glass-panel p-6 rounded-3xl hover:border-indigo-500/50 cursor-pointer transition-all hover:scale-[1.02] group">
          <div class="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg></div>
          <h3 class="text-xl font-bold mb-2">Prompt Generator</h3>
          <p class="text-sm text-slate-400 leading-relaxed">Template advanced System Instructions with sandbox storage.</p>
        </div>
        <div onclick="switchTool('schema')" class="glass-panel p-6 rounded-3xl hover:border-purple-500/50 cursor-pointer transition-all hover:scale-[1.02] group">
          <div class="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg></div>
          <h3 class="text-xl font-bold mb-2">Schema Builder</h3>
          <p class="text-sm text-slate-400 leading-relaxed">Recursive engine for Gemini responseSchema generation.</p>
        </div>
      </div>
    </div>
    <div id="view-generator" class="tool-view hidden animate-in fade-in duration-300">
      <div class="flex gap-8 h-[calc(100vh-100px)]">
        <div class="flex-1 flex flex-col gap-6">
          <header class="flex justify-between items-end border-b border-white/10 pb-4">
             <div><h2 class="text-2xl font-bold">Prompt Configuration Editor</h2><p class="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">Sandbox Persistence</p></div>
             <div class="flex gap-2">
                <button onclick="clearEditor()" class="px-4 py-2 text-xs font-bold text-slate-400 border border-white/10 rounded-lg hover:bg-white/5 transition-all">Reset</button>
                <button onclick="saveCurrentPrompt()" class="px-4 py-2 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all">Save Config</button>
             </div>
          </header>
          <div class="space-y-4 flex-1 flex flex-col">
            <input type="text" id="gen-name" placeholder="Configuration Name" class="w-full bg-slate-900 border border-white/10 p-3 rounded-xl focus:border-indigo-500 outline-none transition-all">
            <div class="flex-1 flex flex-col"><label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">System Instruction</label><textarea id="gen-system" placeholder="Act as a world-class systems analyst..." class="flex-1 w-full bg-slate-900 border border-white/10 p-4 rounded-xl focus:border-indigo-500 outline-none transition-all mono text-sm scrollbar-hide"></textarea></div>
            <div class="flex-1 flex flex-col"><label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">User Prompt</label><textarea id="gen-user" placeholder="Analyze the following..." class="flex-1 w-full bg-slate-900 border border-white/10 p-4 rounded-xl focus:border-indigo-500 outline-none transition-all mono text-sm scrollbar-hide"></textarea></div>
          </div>
        </div>
        <div class="w-72 glass-panel rounded-3xl p-6 flex flex-col"><h3 class="font-bold mb-6">Saved Sandbox Configs</h3><div id="saved-list" class="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-hide"></div></div>
      </div>
    </div>
    <div id="view-schema" class="tool-view hidden animate-in fade-in duration-300 space-y-6">
       <header class="border-b border-white/10 pb-4"><h2 class="text-2xl font-bold">JSON Schema Builder</h2><p class="text-sm text-slate-400">Recursive Type Inference logic.</p></header>
       <div class="grid lg:grid-cols-2 gap-6 h-[500px]">
          <div class="flex flex-col gap-3"><label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">JSON Input</label><textarea id="schema-input" class="flex-1 bg-slate-900 border border-white/10 p-4 rounded-xl focus:border-purple-500 outline-none transition-all mono text-sm scrollbar-hide"></textarea><button onclick="runSchemaBuilder()" class="w-full py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-500 transition-all">Execute Inference</button></div>
          <div class="flex flex-col gap-3"><label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Schema Output</label><div id="schema-output" class="flex-1 bg-black border border-white/5 p-4 rounded-xl mono text-xs text-emerald-400 overflow-y-auto scrollbar-hide"></div></div>
       </div>
    </div>
  </main>
  <script>
    let activeTool = 'home';
    let savedPrompts = JSON.parse(localStorage.getItem('v9_saved_prompts') || '[]');
    const SAMPLE_JSON = \`{\\n  "recipeName": "Pesto Pasta",\\n  "ingredients": ["Pasta", "Pesto"],\\n  "serves": 4,\\n  "isVegetarian": true\\n}\`;
    
    function switchTool(tool) {
      activeTool = tool;
      document.querySelectorAll('.tool-view').forEach(v => v.classList.add('hidden'));
      document.getElementById('view-' + tool).classList.remove('hidden');
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('nav-active'));
      const activeBtn = document.getElementById('btn-' + tool);
      if (activeBtn) activeBtn.classList.add('nav-active');
      if (tool === 'generator') renderSavedList();
      if (tool === 'schema' && !document.getElementById('schema-input').value) {
        document.getElementById('schema-input').value = SAMPLE_JSON;
        runSchemaBuilder();
      }
    }

    function renderSavedList() {
      const list = document.getElementById('saved-list');
      list.innerHTML = '';
      savedPrompts.forEach(p => {
        const item = document.createElement('div');
        item.className = 'p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 cursor-pointer flex justify-between items-center group/item';
        item.onclick = () => loadPrompt(p.id);
        item.innerHTML = \`<span class="text-xs font-bold truncate pr-2">\${p.name}</span>\`;
        list.appendChild(item);
      });
    }

    function saveCurrentPrompt() {
      const name = document.getElementById('gen-name').value;
      const sys = document.getElementById('gen-system').value;
      const user = document.getElementById('gen-user').value;
      if (!name || !user) return;
      const id = name.toLowerCase().replace(/\\s+/g, '-');
      const promptData = { id, name, system: sys, user };
      savedPrompts.push(promptData);
      localStorage.setItem('v9_saved_prompts', JSON.stringify(savedPrompts));
      renderSavedList();
    }

    function loadPrompt(id) {
      const p = savedPrompts.find(pr => pr.id === id);
      if (!p) return;
      document.getElementById('gen-name').value = p.name;
      document.getElementById('gen-system').value = p.system;
      document.getElementById('gen-user').value = p.user;
    }

    const buildSchema = (obj) => {
      if (Array.isArray(obj)) return { type: "ARRAY", items: obj.length > 0 ? buildSchema(obj[0]) : { type: "STRING" } };
      if (typeof obj === 'object' && obj !== null) {
        const properties = {};
        for (const key in obj) properties[key] = buildSchema(obj[key]);
        return { type: "OBJECT", properties, propertyOrdering: Object.keys(obj) };
      }
      return { type: typeof obj === 'boolean' ? "BOOLEAN" : typeof obj === 'number' ? "NUMBER" : "STRING" };
    };

    function runSchemaBuilder() {
      const input = document.getElementById('schema-input').value;
      const output = document.getElementById('schema-output');
      try { 
        const schema = buildSchema(JSON.parse(input)); 
        output.textContent = JSON.stringify(schema, null, 2); 
      } catch (e) { 
        output.textContent = "Error: " + e.message; 
      }
    }
    
    switchTool('home');
  </script>
</body>
</html>`;

export const LUXE_LOFTS_MOCKUP_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>LoftLife | Operational Dashboard</title><script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Fira+Code&display=swap');
    :root { --bg: #050505; --accent: #c1121f; --text: #f7f7f7; }
    body { background-color: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; overflow: hidden; height: 100vh; background-image: radial-gradient(circle at 10% 10%, rgba(193,18,31,0.05), transparent 40%); }
    .font-outfit { font-family: 'Outfit', sans-serif; }
    .glass { background: rgba(20,20,20,0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08); }
    .active-engine { border-color: var(--accent); background: rgba(193,18,31,0.05); }
  </style>
</head>
<body class="flex flex-col">
  <header class="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md">
    <div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-900 shadow-[0_0_20px_rgba(193,18,31,0.3)]"></div><div class="font-outfit font-black tracking-tight text-lg">LoftLife <span class="text-red-500">Ops</span></div></div>
    <div class="flex items-center gap-8"><div class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div><span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Unified API: Connected</span></div></div>
  </header>
  <div class="flex-1 flex overflow-hidden">
    <aside class="w-64 border-r border-white/5 p-6 flex flex-col gap-2 bg-black/20">
      <p class="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">Core Systems</p>
      <button onclick="switchEngine('rates')" id="btn-rates" class="engine-btn active-engine flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-sm font-medium text-slate-400">Rate Calculator</button>
      <button onclick="switchEngine('planner')" id="btn-planner" class="engine-btn flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-sm font-medium text-slate-400">AI Event Planner</button>
      <button onclick="switchEngine('booking')" id="btn-booking" class="engine-btn flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-sm font-medium text-slate-400">Booking Orchestrator</button>
    </aside>
    <main class="flex-1 p-10 overflow-y-auto scrollbar-hide flex gap-10">
      <div class="flex-1 space-y-8">
        <div id="engine-rates" class="engine-view space-y-8">
          <div class="space-y-2"><h2 class="text-3xl font-outfit font-extrabold tracking-tight">Rate Calculation Engine</h2><p class="text-slate-500 text-sm">Dynamic pricing based on density, duration, and tier logic.</p></div>
          <div class="grid grid-cols-2 gap-6">
            <div class="glass p-6 rounded-3xl space-y-4"><label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Guest Count</label><input type="range" id="input-guests" min="10" max="150" value="80" oninput="calculateRate()" class="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-600"><div id="val-guests" class="text-xs font-mono font-bold text-red-500">80 Guests</div></div>
            <div class="glass p-6 rounded-3xl space-y-4"><label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Duration (Hours)</label><input type="range" id="input-hours" min="2" max="12" value="5" oninput="calculateRate()" class="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-600"><div id="val-hours" class="text-xs font-mono font-bold text-red-500">5 Hours</div></div>
          </div>
          <div class="glass p-10 rounded-[2.5rem] flex items-center justify-between"><div><div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">System Quote</div><div id="final-rate" class="text-6xl font-outfit font-black tracking-tighter text-white">$1,850</div></div></div>
        </div>
        <div id="engine-planner" class="engine-view hidden space-y-8">
          <div class="space-y-2"><h2 class="text-3xl font-outfit font-extrabold tracking-tight">AI Planning Ingress</h2><p class="text-slate-500 text-sm">Intent mapping to operational recommendations.</p></div>
          <div class="glass p-6 rounded-3xl"><label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Simulated User Input</label><div class="text-sm font-medium text-slate-300 italic border-l-2 border-red-600/50 pl-4 py-2">"Corporate mixer for 90 people. Modern red decor, photo area."</div></div>
          <div class="glass p-6 rounded-3xl bg-red-950/10 border-red-500/20"><label class="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-4 block">Recommended System Patch</label><div class="space-y-3 font-mono text-[11px] text-slate-400"><div><span class="text-red-500">ADD:</span> Secondary bar station</div><div><span class="text-red-500">ADD:</span> Uplighting pack (vibe: "red")</div></div></div>
        </div>
        <div id="engine-booking" class="engine-view hidden space-y-8">
           <div class="space-y-2"><h2 class="text-3xl font-outfit font-extrabold tracking-tight">Booking Orchestrator</h2><p class="text-slate-500 text-sm">Managing intent to confirmed revenue transition.</p></div>
           <div class="glass rounded-3xl overflow-hidden"><table class="w-full text-left text-xs"><thead class="bg-white/5 text-slate-500"><tr class="uppercase tracking-widest font-bold"><th class="p-4">Step</th><th class="p-4">Action</th><th class="p-4">Status</th></tr></thead><tbody class="divide-y divide-white/5"><tr><td class="p-4 font-bold text-slate-500">01</td><td class="p-4">Inquiry Captured</td><td class="p-4 text-emerald-400">COMPLETE</td></tr><tr><td class="p-4 font-bold text-slate-500">02</td><td class="p-4">Lead Created</td><td class="p-4 text-emerald-400">COMPLETE</td></tr></tbody></table></div>
        </div>
      </div>
      <aside class="w-80 flex flex-col gap-6">
        <div class="glass p-6 rounded-3xl flex-1 flex flex-col"><h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-4 mb-4">Operational Monitor</h3><div id="log-list" class="flex-1 font-mono text-[10px] text-slate-500 space-y-4 overflow-y-auto scrollbar-hide"></div></div>
      </aside>
    </main>
  </div>
  <script>
    function addLog(msg) { 
      const list = document.getElementById('log-list'); 
      const e = document.createElement('div'); 
      const time = new Date().toLocaleTimeString();
      e.innerHTML = '<span class="text-red-500/50">[' + time + ']</span> ' + msg; 
      list.prepend(e); 
    }
    
    function switchEngine(eng) {
      document.querySelectorAll('.engine-view').forEach(v => v.classList.add('hidden')); 
      document.getElementById('engine-' + eng).classList.remove('hidden');
      document.querySelectorAll('.engine-btn').forEach(b => b.classList.remove('active-engine')); 
      document.getElementById('btn-' + eng).classList.add('active-engine');
      addLog('Context switched: ' + eng.toUpperCase() + '_ENGINE');
    }
    
    function calculateRate() {
      const g = document.getElementById('input-guests').value; 
      const h = document.getElementById('input-hours').value;
      document.getElementById('val-guests').textContent = g + " Guests"; 
      document.getElementById('val-hours').textContent = h + " Hours";
      const total = 1000 + (g * 5) + (h * 150); 
      document.getElementById('final-rate').textContent = "$" + total.toLocaleString();
      addLog('Recalculated: G=' + g + ' H=' + h);
    }
    
    calculateRate(); 
    addLog("Hub Initialized [OK]"); 
    switchEngine('rates');
  </script>
</body>
</html>`;

export const PROJECT_AEGIS_MOCKUP_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Aegis Governance Console</title><script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;700&display=swap');
    body { background-color: #020617; color: #94a3b8; font-family: 'Fira Code', monospace; overflow: hidden; height: 100vh; }
    .terminal-window { background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(45, 212, 191, 0.2); }
    .status-pulse { animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
  </style>
</head>
<body class="p-8 flex flex-col gap-6">
  <header class="flex items-center justify-between border-b border-white/5 pb-4">
    <div class="flex items-center gap-4"><h1 class="text-xl font-bold text-white tracking-tight">AEGIS PROTOCOL <span class="text-teal-400">v3.0.4</span></h1></div>
    <div class="text-right text-xs text-teal-400 font-bold">32 ACTIVE INVARIANTS</div>
  </header>
  <div class="flex-1 grid grid-cols-[1fr_300px] gap-6 overflow-hidden">
    <div class="terminal-window rounded-2xl flex flex-col overflow-hidden">
      <div class="bg-black/40 px-6 py-3 border-b border-white/5 flex items-center justify-between"><div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-teal-400 status-pulse"></div><span class="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Live Reasoning</span></div></div>
      <div id="content" class="flex-1 p-6 text-sm overflow-y-auto space-y-4">
        <div class="text-emerald-400">>> Identity: PRINCIPAL ARCHITECT ENABLED</div>
        <div class="flex gap-2 text-white"><span>user@admin:</span> <span>"Add Bootstrap styling."</span></div>
        <div id="thinking" class="hidden bg-teal-500/5 p-4 rounded-xl text-xs"><div class="uppercase tracking-widest font-bold mb-2">Thinking</div><ul id="steps" class="space-y-1"></ul></div>
        <div id="resp" class="hidden text-rose-400">>> Decision: REFUSE. Bootstrap conflicts with Tailwind CSS invariant.</div>
      </div>
      <div class="p-6 bg-black/20 border-t border-white/5 flex gap-4"><button onclick="drift()" class="flex-1 bg-teal-500 text-black font-bold py-3 rounded-xl active:scale-95 transition-transform">SIMULATE DRIFT</button></div>
    </div>
    <aside class="terminal-window rounded-2xl p-6 space-y-4"><h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Status</h3><div class="text-xs text-white font-bold">Context: 94% Stable</div><div class="h-1.5 w-full bg-white/5 rounded-full"><div class="h-full w-[94%] bg-teal-500 rounded-full"></div></div></aside>
  </div>
  <script>
    function drift() {
      const think = document.getElementById('thinking'); 
      const stepsList = document.getElementById('steps');
      think.classList.remove('hidden'); 
      stepsList.innerHTML = '';
      const s = ["Analysing Stack...", "Invariant #001: Tailwind_Locked found.", "Conflict Detected.", "Action: Refuse Request."];
      let i = 0; 
      const interval = setInterval(function() { 
        if(i < s.length) { 
          const l = document.createElement('li'); 
          l.textContent = '> ' + s[i++]; 
          stepsList.appendChild(l); 
        } else { 
          clearInterval(interval); 
          document.getElementById('resp').classList.remove('hidden'); 
        } 
      }, 600);
    }
  </script>
</body>
</html>`;

export const OPS_TRIAGE_MOCKUP_HTML = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Ops Triage Dashboard</title><script src="https://cdn.tailwindcss.com"></script>
<style>body { background: #0b1220; color: #e6eefc; font-family: sans-serif; }</style>
</head>
<body class="p-8"><div class="max-w-6xl mx-auto space-y-8">
  <header><h1 class="text-2xl font-bold">Operational Triage (Mockup)</h1><p class="text-slate-400">Throughput vs Quality tracking.</p></header>
  <div class="grid grid-cols-4 gap-6">
    <div class="bg-white/5 p-6 rounded-2xl border border-white/10"><div class="text-xs text-slate-500 uppercase mb-2">Target</div><div class="text-3xl font-bold">50 / day</div></div>
    <div class="bg-white/5 p-6 rounded-2xl border border-white/10"><div class="text-xs text-slate-500 uppercase mb-2">Selected</div><div class="text-3xl font-bold">48</div></div>
    <div class="bg-white/5 p-6 rounded-2xl border border-white/10"><div class="text-xs text-slate-500 uppercase mb-2">Completed</div><div class="text-3xl font-bold text-emerald-400">44</div></div>
    <div class="bg-white/5 p-6 rounded-2xl border border-white/10"><div class="text-xs text-slate-500 uppercase mb-2">Errors</div><div class="text-3xl font-bold text-rose-500">12</div></div>
  </div>
  <div class="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"><table class="w-full text-left"><thead class="bg-white/5 uppercase text-[10px] font-bold tracking-widest text-slate-500"><th class="p-4">Week</th><th class="p-4">Completed</th><th class="p-4">Errors</th></thead><tbody class="divide-y divide-white/5"><tr class="hover:bg-white/5"><td class="p-4">Wk 4</td><td class="p-4">251</td><td class="p-4 text-emerald-400">1</td></tr><tr class="hover:bg-white/5"><td class="p-4">Wk 1</td><td class="p-4">205</td><td class="p-4 text-rose-500">10</td></tr></tbody></table></div>
</div></body></html>`;
