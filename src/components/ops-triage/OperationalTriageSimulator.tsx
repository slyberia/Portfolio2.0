import React, { useState, useEffect, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Incident = {
  id: string;
  timestamp: string;
  type: 'GIS_DATA' | 'WORKFLOW_ERROR' | 'SYSTEM_ESCALATION';
  status: 'PROCESSED' | 'ESCALATED' | 'BLOCKED';
  message: string;
};

export const OperationalTriageSimulator = () => {
  const [policy, setPolicy] = useState<number>(50);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [tick, setTick] = useState(0);

  // Derived state based on slider
  const mode = policy < 34 ? 'Throughput' : policy > 66 ? 'Quality' : 'Balanced';

  // Readout text
  const readout = useMemo(() => {
    if (mode === 'Throughput') {
      return "PRIORITY: VELOCITY. Aggressive auto-processing enabled. Risk of defect leakage increased. High SLA compliance, low First-Pass Yield stability.";
    }
    if (mode === 'Quality') {
      return "PRIORITY: PRECISION. Zero-trust validation active. Deep manual review required. High First-Pass Yield, severe risk of backlog accumulation and SLA breaches.";
    }
    return "PRIORITY: BALANCED. Standard triage protocols active. Acceptable defect tolerance with moderate backlog velocity.";
  }, [mode]);

  // Simulating time series data for Recharts based on policy
  const telemetryData = useMemo(() => {
    const data = [];
    let fpy = 95;
    let backlog = 10;
    
    for (let i = 0; i < 20; i++) {
      if (mode === 'Throughput') {
        fpy = Math.max(70, fpy - Math.random() * 5);
        backlog = Math.max(0, backlog - Math.random() * 10);
      } else if (mode === 'Quality') {
        fpy = Math.min(99.9, fpy + Math.random() * 2);
        backlog = backlog + Math.random() * 15;
      } else {
        fpy = 90 + Math.random() * 5;
        backlog = 20 + Math.random() * 5;
      }
      
      data.push({
        time: `T-${20 - i + tick}`,
        fpy: Number(fpy.toFixed(1)),
        backlog: Math.floor(backlog),
        capacity: 100,
      });
    }
    return data;
  }, [mode, tick]);

  // KPIs
  const kpis = useMemo(() => {
    if (mode === 'Throughput') {
      return { processed: 1450, fpy: '72%', leakage: 'High', backlog: 12, slaRisk: 'Low', escalations: 89 };
    } else if (mode === 'Quality') {
      return { processed: 320, fpy: '99.5%', leakage: 'Zero', backlog: 840, slaRisk: 'Critical', escalations: 12 };
    }
    return { processed: 850, fpy: '91%', leakage: 'Moderate', backlog: 145, slaRisk: 'Nominal', escalations: 34 };
  }, [mode]);

  // Simulation Tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
      
      const newIncident: Incident = {
        id: Math.random().toString(36).substring(2, 8).toUpperCase(),
        timestamp: new Date().toLocaleTimeString(),
        type: Math.random() > 0.5 ? 'GIS_DATA' : 'WORKFLOW_ERROR',
        status: mode === 'Throughput' ? 'PROCESSED' : mode === 'Quality' ? (Math.random() > 0.3 ? 'BLOCKED' : 'PROCESSED') : 'ESCALATED',
        message: Math.random() > 0.5 ? 'Geometry snapping failure detected' : 'Payload schema mismatch on ingress'
      };
      
      setIncidents(prev => [newIncident, ...prev].slice(0, 50));
    }, 2000);
    return () => clearInterval(interval);
  }, [mode]);

  return (
    <div className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl overflow-hidden font-sans shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Operational Triage Control</h2>
          <p className="text-sm text-slate-400 mt-1">Live throughput vs. quality simulation</p>
        </div>
        
        <div className="flex-1 max-w-md space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <span className={mode === 'Throughput' ? 'text-amber-500' : ''}>Throughput (0-33)</span>
            <span className={mode === 'Balanced' ? 'text-blue-500' : ''}>Balanced (34-66)</span>
            <span className={mode === 'Quality' ? 'text-emerald-500' : ''}>Quality (67-100)</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={policy} 
            onChange={(e) => setPolicy(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x border-slate-800">
        
        {/* Readout and KPIs */}
        <div className="p-6 space-y-8 col-span-1 lg:col-span-2">
          
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">System Readout</div>
            <div className="text-sm text-slate-300 leading-relaxed font-mono">
              {readout}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Processed</div>
              <div className="text-2xl font-bold text-white">{kpis.processed}</div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">First-Pass Yield</div>
              <div className={`text-2xl font-bold ${mode === 'Throughput' ? 'text-rose-400' : 'text-emerald-400'}`}>{kpis.fpy}</div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Defect Leakage</div>
              <div className="text-2xl font-bold text-white">{kpis.leakage}</div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Backlog</div>
              <div className={`text-2xl font-bold ${mode === 'Quality' ? 'text-rose-400' : 'text-emerald-400'}`}>{kpis.backlog}</div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">SLA Risk</div>
              <div className={`text-2xl font-bold ${mode === 'Quality' ? 'text-rose-400' : 'text-emerald-400'}`}>{kpis.slaRisk}</div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Escalations</div>
              <div className="text-2xl font-bold text-white">{kpis.escalations}</div>
            </div>
          </div>

          <div className="h-48 pt-4">
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetryData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFpy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBacklog" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="fpy" name="First-Pass Yield %" stroke="#10b981" fillOpacity={1} fill="url(#colorFpy)" />
                <Area type="monotone" dataKey="backlog" name="Backlog Volume" stroke="#f43f5e" fillOpacity={1} fill="url(#colorBacklog)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Incident Queue */}
        <div className="flex flex-col bg-slate-950 col-span-1 lg:col-span-1 border-t lg:border-t-0 border-slate-800 h-96 lg:h-auto">
          <div className="p-4 border-b border-slate-800 bg-slate-900/30">
             <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Incident Stream</div>
          </div>
          <div className="flex-1 p-4 overflow-hidden relative">
            <div className="absolute inset-0 overflow-y-auto p-4 space-y-3 font-mono text-xs">
              {incidents.length === 0 && <div className="text-slate-600 animate-pulse">Waiting for telemetry...</div>}
              {incidents.map((inc, i) => (
                <div key={i} className="flex flex-col gap-1 border-l-2 pl-3 py-1 border-slate-700 animate-in fade-in slide-in-from-top-2 duration-300" style={{ opacity: Math.max(0.2, 1 - i * 0.1) }}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">{inc.timestamp}</span>
                    <span className={`px-1.5 py-0.5 rounded uppercase ${inc.status === 'PROCESSED' ? 'bg-emerald-500/10 text-emerald-400' : inc.status === 'BLOCKED' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {inc.status}
                    </span>
                  </div>
                  <div className="text-slate-300 truncate">{inc.message}</div>
                  <div className="text-[9px] text-slate-600 uppercase">[{inc.id}] {inc.type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
