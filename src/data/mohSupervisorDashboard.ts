// Sanitized, self-contained interactive supervisor-dashboard mockup for the MOH case study.
// Rendered via HtmlPreviewCard (srcDoc preview / Blob-URL launch). Zero external resources,
// no real data: all names, figures, districts, and map points are fictional samples.
export const MOH_SUPERVISOR_DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Contact Tracing — Supervisor View (Sample)</title>
<style>
  * { box-sizing: border-box; }
  body { margin:0; font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif; background:#faf8f5; color:#0f172a; }
  .wrap { max-width: 940px; margin:0 auto; padding: 20px; }
  .ribbon { display:flex; align-items:center; gap:8px; font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:#b45309; background:#fffbeb; border:1px solid #fde68a; border-radius:9px; padding:7px 11px; margin-bottom:15px; }
  .ribbon .d { width:8px; height:8px; border-radius:50%; background:#f59e0b; flex:none; }
  .head { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:16px; }
  .brand { display:flex; align-items:center; gap:11px; }
  .mark { width:34px; height:34px; border-radius:9px; background:#0f172a; color:#fff; display:flex; align-items:center; justify-content:center; flex:none; }
  .sub { font-size:10.5px; color:#64748b; text-transform:uppercase; letter-spacing:.16em; }
  .title { font-size:16px; font-weight:700; line-height:1.15; }
  .scope { font-size:11px; color:#0369a1; background:#e0f2fe; border:1px solid #bae6fd; border-radius:8px; padding:6px 11px; font-weight:600; }
  .tiles { display:grid; grid-template-columns: repeat(4, 1fr); gap:11px; margin-bottom:12px; }
  .tile { border:1px solid #e2e8f0; border-radius:12px; background:#fff; padding:13px 14px; }
  .tile .k { font-size:10px; text-transform:uppercase; letter-spacing:.07em; color:#64748b; font-weight:600; margin-bottom:9px; }
  .tile .vrow { display:flex; align-items:baseline; justify-content:space-between; gap:6px; }
  .tile .v { font-size:25px; font-weight:700; line-height:1; color:#0f172a; font-variant-numeric:tabular-nums; }
  .delta { display:inline-flex; align-items:center; gap:3px; font-size:10px; font-weight:600; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; border-radius:999px; padding:2px 7px; }
  .delta svg { width:9px; height:9px; }
  .tile .t { font-size:9.5px; margin-top:7px; color:#94a3b8; }
  .cols { display:grid; grid-template-columns: 1fr; gap:12px; }
  @media (min-width:660px){ .cols { grid-template-columns: .86fr 1.14fr; } }
  .stack { display:flex; flex-direction:column; gap:12px; }
  .card { border:1px solid #e2e8f0; border-radius:12px; background:#fff; padding:14px; }
  .card-h { display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:3px; }
  .card h3 { margin:0; font-size:12px; font-weight:700; }
  .card .hint { font-size:10.5px; color:#94a3b8; margin:0 0 11px; }
  .pill { font-size:9px; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; border-radius:999px; padding:3px 8px; }
  .mapbox { position:relative; width:100%; border:1px solid #e2e8f0; border-radius:10px; overflow:hidden; background:#f8fafc; }
  .maplegend { display:flex; align-items:center; gap:10px; font-size:9.5px; color:#475569; margin-top:9px; flex-wrap:wrap; }
  .ml { display:flex; align-items:center; gap:5px; }
  .ml .dot { width:9px; height:9px; border-radius:50%; }
  .donut-row { display:flex; align-items:center; gap:14px; }
  .donut { width:92px; height:92px; border-radius:50%; flex:none; display:flex; align-items:center; justify-content:center; }
  .donut .hole { width:60px; height:60px; border-radius:50%; background:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; }
  .donut .hv { font-size:17px; font-weight:700; line-height:1; }
  .donut .hl { font-size:8px; text-transform:uppercase; letter-spacing:.08em; color:#94a3b8; margin-top:2px; }
  .legend { display:flex; flex-direction:column; gap:6px; flex:1; }
  .lrow { display:flex; align-items:center; gap:8px; font-size:12px; cursor:pointer; padding:4px 6px; border-radius:7px; border:1px solid transparent; }
  .lrow:hover { background:#f8fafc; }
  .lrow.active { border-color:#cbd5e1; background:#f8fafc; }
  .lrow .sw { width:9px; height:9px; border-radius:3px; flex:none; }
  .lrow .ln { color:#334155; flex:1; }
  .lrow .lc { font-weight:700; font-variant-numeric:tabular-nums; }
  .chips { display:flex; gap:6px; flex-wrap:wrap; margin:0 0 11px; }
  .chip { font-size:11px; font-weight:600; padding:6px 11px; border-radius:8px; border:1px solid #cbd5e1; background:#fff; color:#334155; cursor:pointer; }
  .chip.active { background:#0f172a; color:#fff; border-color:#0f172a; }
  table { width:100%; border-collapse:collapse; }
  th { text-align:left; font-size:9px; text-transform:uppercase; letter-spacing:.07em; color:#94a3b8; font-weight:700; padding:6px 8px; border-bottom:1px solid #e2e8f0; }
  td { font-size:12px; color:#334155; padding:8px; border-bottom:1px solid #f1f5f9; }
  tr:last-child td { border-bottom:0; }
  .id { font-weight:700; color:#0f172a; }
  .badge { font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:.03em; padding:3px 8px; border-radius:6px; white-space:nowrap; }
  .s-pending { background:#fef3c7; color:#b45309; border:1px solid #fde68a; }
  .s-progress { background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; }
  .s-closed { background:#ecfdf5; color:#047857; border:1px solid #a7f3d0; }
  .p-high { color:#dc2626; font-weight:700; }
  .p-medium { color:#d97706; font-weight:600; }
  .p-low { color:#64748b; }
  .count { font-size:10.5px; color:#94a3b8; margin-top:10px; }
  .foot { margin-top:15px; font-size:11px; color:#94a3b8; font-style:italic; line-height:1.5; }
  .point { cursor:pointer; }
</style>
</head>
<body>
<div class="wrap">
  <div class="ribbon"><span class="d"></span>Sample data · Illustrative mockup · Not a live or real dashboard</div>

  <div class="head">
    <div class="brand">
      <div class="mark">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
      </div>
      <div>
        <div class="sub">Contact Tracing · Operations</div>
        <div class="title">Supervisor View</div>
      </div>
    </div>
    <span class="scope">Role-specific view · follow-up focus</span>
  </div>

  <div class="tiles" id="tiles"></div>

  <div class="cols">
    <div class="stack">
      <div class="card">
        <div class="card-h"><h3>Case map</h3><span class="pill">Schematic · not to scale</span></div>
        <p class="hint">Where sample cases sit. Click a point to view its linked survey record.</p>
        <div class="mapbox">
          <svg id="map" viewBox="0 0 360 230" width="100%" preserveAspectRatio="xMidYMid meet" style="display:block">
            <rect x="0" y="0" width="360" height="230" fill="#f8fafc"/>
            <g id="grid" stroke="#eef2f7" stroke-width="1"></g>
            <g id="ambient"></g>
            <g id="points"></g>
            <g id="pop" style="display:none"></g>
            <g transform="translate(338,24)" stroke="#94a3b8" stroke-width="1.4" fill="none"><path d="M0,-8 L0,8 M0,-8 L-3,-3 M0,-8 L3,-3"/></g>
            <text x="334" y="38" font-family="Inter,sans-serif" font-size="8" fill="#94a3b8">N</text>
          </svg>
        </div>
        <div class="maplegend">
          <span class="ml"><span class="dot" style="background:#f59e0b"></span>Pending</span>
          <span class="ml"><span class="dot" style="background:#0ea5e9"></span>In progress</span>
          <span class="ml"><span class="dot" style="background:#10b981"></span>Closed</span>
          <span class="pill">Synthetic points · generic extent</span>
        </div>
      </div>

      <div class="card">
        <div class="card-h"><h3>Status mix</h3></div>
        <p class="hint">Share of the sample queue. Click a row to filter.</p>
        <div class="donut-row">
          <div class="donut" id="donut"><div class="hole"><span class="hv" id="donut-total">0</span><span class="hl">cases</span></div></div>
          <div class="legend" id="legend"></div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-h"><h3>Follow-up queue</h3></div>
      <p class="hint">Fictional placeholder names (first name + last initial) — not real people or patient data.</p>
      <div class="chips" id="chips"></div>
      <table>
        <thead><tr><th>Contact</th><th>District</th><th>Status</th><th>Priority</th><th>Updated</th></tr></thead>
        <tbody id="rows"></tbody>
      </table>
      <div class="count" id="count"></div>
    </div>
  </div>

  <div class="foot">Sanitized reconstruction for portfolio use. All figures, names, districts, and map points are fictional samples on a generic, schematic extent — they illustrate layout and spatial-analysis design judgment, and are not real operational data, locations, metrics, or outcomes.</div>
</div>
<script>
  var arrowUp = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  var arrowDn = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>';
  var SVGNS = 'http://www.w3.org/2000/svg';

  var tiles = [
    { k:'Open cases', v:38, d:4, up:true, t:'across 5 districts' },
    { k:'Follow-up pending', v:24, d:2, up:true, t:'awaiting action' },
    { k:'In progress', v:11, d:1, up:false, t:'assigned' },
    { k:'Closed (7d)', v:63, d:9, up:true, t:'resolved this week' }
  ];
  var rows = [
    { id:'Jordan M.', zone:'D1', status:'Pending', prio:'High', upd:'2h ago', x:106, y:100 },
    { id:'Priya S.', zone:'D1', status:'In progress', prio:'Medium', upd:'4h ago', x:122, y:118 },
    { id:'Andre B.', zone:'D2', status:'Pending', prio:'Medium', upd:'5h ago', x:250, y:62 },
    { id:'Mei L.', zone:'D4', status:'Pending', prio:'High', upd:'6h ago', x:150, y:178 },
    { id:'Daniel O.', zone:'D1', status:'In progress', prio:'Low', upd:'8h ago', x:94, y:120 },
    { id:'Sara K.', zone:'D3', status:'Closed', prio:'Low', upd:'1d ago', x:300, y:138 },
    { id:'Tomas R.', zone:'D2', status:'In progress', prio:'High', upd:'1d ago', x:268, y:80 },
    { id:'Aisha N.', zone:'D5', status:'Pending', prio:'Medium', upd:'1d ago', x:74, y:186 },
    { id:'Leah W.', zone:'D4', status:'Closed', prio:'Medium', upd:'2d ago', x:162, y:192 },
    { id:'Marco D.', zone:'D1', status:'Closed', prio:'Low', upd:'2d ago', x:126, y:98 }
  ];
  var ambient = [ [98,108],[114,104],[88,118],[128,114],[150,186],[160,176],[256,70],[262,58],[300,150],[80,178] ];
  var statusMeta = {
    'Pending': { color:'#f59e0b', cls:'s-pending' },
    'In progress': { color:'#0ea5e9', cls:'s-progress' },
    'Closed': { color:'#10b981', cls:'s-closed' }
  };
  var order = ['Pending','In progress','Closed'];
  var statusFilter = 'All';

  function el(tag, attrs){ var e=document.createElementNS(SVGNS, tag); for (var k in attrs){ e.setAttribute(k, attrs[k]); } return e; }
  function pClass(p){ return p === 'High' ? 'p-high' : (p === 'Medium' ? 'p-medium' : 'p-low'); }

  function renderTiles(){
    var c = document.getElementById('tiles'); c.innerHTML = '';
    for (var i=0;i<tiles.length;i++){ var t=tiles[i];
      c.innerHTML += '<div class="tile"><div class="k">' + t.k + '</div>'
        + '<div class="vrow"><span class="v">' + t.v + '</span>'
        + '<span class="delta">' + (t.up?arrowUp:arrowDn) + (t.up?'+':'−') + t.d + '</span></div>'
        + '<div class="t">' + t.t + ' · vs last week</div></div>';
    }
  }
  function renderMap(){
    var grid = document.getElementById('grid'); grid.innerHTML='';
    for (var gx=45; gx<360; gx+=45){ grid.appendChild(el('line',{x1:gx,y1:0,x2:gx,y2:230})); }
    for (var gy=46; gy<230; gy+=46){ grid.appendChild(el('line',{x1:0,y1:gy,x2:360,y2:gy})); }
    var amb = document.getElementById('ambient'); amb.innerHTML='';
    for (var a=0;a<ambient.length;a++){ amb.appendChild(el('circle',{cx:ambient[a][0],cy:ambient[a][1],r:2.5,fill:'#0f172a','fill-opacity':0.16})); }
    var pts = document.getElementById('points'); pts.innerHTML='';
    for (var p=0;p<rows.length;p++){ var r=rows[p];
      var g = el('g', { class:'point' });
      g.appendChild(el('circle',{cx:r.x,cy:r.y,r:6,fill:statusMeta[r.status].color,stroke:'#ffffff','stroke-width':2}));
      g.addEventListener('click', (function(idx){ return function(){ showPop(idx); }; })(p));
      pts.appendChild(g);
    }
  }
  function showPop(i){
    var r=rows[i]; var pop=document.getElementById('pop'); pop.innerHTML='';
    var w=150,h=56; var px=r.x-w/2; var py=r.y-h-12; var below=false;
    if (px<6) px=6; if (px>360-w-6) px=360-w-6;
    if (py<6){ py=r.y+14; below=true; }
    pop.appendChild(el('rect',{x:px,y:py,width:w,height:h,rx:9,fill:'#0f172a'}));
    pop.appendChild(el('path',{ fill:'#0f172a', d: below
      ? ('M' + (r.x-6) + ',' + py + ' L' + (r.x+6) + ',' + py + ' L' + r.x + ',' + (py-7) + ' Z')
      : ('M' + (r.x-6) + ',' + (py+h) + ' L' + (r.x+6) + ',' + (py+h) + ' L' + r.x + ',' + (py+h+7) + ' Z') }));
    function txt(x,y,s,a){ var t=el('text',Object.assign({x:x,y:y,'font-family':'Inter,sans-serif',fill:'#fff'},a)); t.textContent=s; pop.appendChild(t); }
    txt(px+12, py+19, r.id + ' · ' + r.zone, {'font-size':11.5,'font-weight':700});
    txt(px+12, py+35, r.status + ' · ' + r.prio + ' priority', {'font-size':10,'fill':'#cbd5e1'});
    txt(px+12, py+49, 'Survey: submitted (sample)', {'font-size':10,'fill':'#7dd3fc'});
    pop.style.display='';
    var ps=document.getElementById('points').childNodes;
    for (var k=0;k<ps.length;k++){ var c=ps[k].firstChild; c.setAttribute('r', k===i?8:6); c.setAttribute('stroke', k===i?'#0f172a':'#ffffff'); }
  }
  function counts(){ var c={'Pending':0,'In progress':0,'Closed':0}; for (var i=0;i<rows.length;i++){ c[rows[i].status]++; } return c; }
  function renderDonut(){
    var c=counts(); var total=rows.length; var stops=[]; var acc=0;
    for (var i=0;i<order.length;i++){ var s=order[i]; var pct=(c[s]/total)*100; stops.push(statusMeta[s].color+' '+acc+'% '+(acc+pct)+'%'); acc+=pct; }
    document.getElementById('donut').style.background='conic-gradient('+stops.join(', ')+')';
    document.getElementById('donut-total').textContent=total;
    var leg=document.getElementById('legend'); leg.innerHTML='';
    leg.appendChild(legRow('All statuses', '#cbd5e1', total, 'All'));
    for (var j=0;j<order.length;j++){ var st=order[j];
      leg.appendChild(legRow(st, statusMeta[st].color, c[st], st));
    }
  }
  function legRow(label, color, count, val){
    var d=document.createElement('div');
    d.className='lrow' + (statusFilter===val ? ' active' : '');
    d.innerHTML='<span class="sw" style="background:'+color+'"></span><span class="ln">'+label+'</span><span class="lc">'+count+'</span>';
    d.addEventListener('click', function(){ setStatus(val); });
    return d;
  }
  function renderChips(){
    var c=document.getElementById('chips'); c.innerHTML='';
    var opts=['All','Pending','In progress','Closed'];
    for (var i=0;i<opts.length;i++){
      (function(s){
        var b=document.createElement('button');
        b.className='chip' + (statusFilter===s ? ' active' : '');
        b.textContent=s;
        b.addEventListener('click', function(){ setStatus(s); });
        c.appendChild(b);
      })(opts[i]);
    }
  }
  function renderRows(){
    var body=document.getElementById('rows'); body.innerHTML=''; var shown=0;
    for (var i=0;i<rows.length;i++){ var r=rows[i];
      if (statusFilter!=='All' && r.status!==statusFilter) continue;
      shown++;
      body.innerHTML+='<tr><td class="id">'+r.id+'</td><td>'+r.zone+'</td>'
        +'<td><span class="badge '+statusMeta[r.status].cls+'">'+r.status+'</span></td>'
        +'<td class="'+pClass(r.prio)+'">'+r.prio+'</td><td>'+r.upd+'</td></tr>';
    }
    document.getElementById('count').textContent='Showing '+shown+' of '+rows.length+' cases · '+statusFilter;
  }
  function setStatus(s){ statusFilter=s; renderChips(); renderDonut(); renderRows(); }

  renderTiles(); renderMap(); renderDonut(); renderChips(); renderRows();
</script>
</body>
</html>
`;
