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
      list.replaceChildren();
      savedPrompts.forEach(p => {
        const item = document.createElement('div');
        item.className = 'p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 cursor-pointer flex justify-between items-center group/item';
        item.onclick = () => loadPrompt(p.id);
        const span = document.createElement('span');
        span.className = 'text-xs font-bold truncate pr-2';
        span.textContent = p.name;
        item.appendChild(span);
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


