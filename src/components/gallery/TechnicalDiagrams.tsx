import React from 'react';

/**
 * Shared SVG system for the Evidence Library technical diagrams.
 *
 * Every diagram is authored once here so the modal ("full") and gallery
 * thumbnail ("thumb") renders share the same labels, palette, and facts and
 * cannot drift apart. All copy is verified against the real implementation:
 *  - twin    → server/geminiProxy.ts (Express gateway, guardrails, Gemini 2.5
 *              Flash via system-instruction, chunked HTTP streaming — no RAG/WS)
 *  - spatial → Guynode case study (TypeScript dataset registry + Leaflet
 *              preview on Cloud Run — no PostGIS/R-Tree/SSE)
 *  - state   → OperationalTriageSimulator.tsx (policy stance → 2s tick →
 *              incident classifier → PROCESSED/ESCALATED/BLOCKED → live KPIs)
 */

export type DiagramType = 'twin' | 'spatial' | 'state';

// Shared palette. Color carries meaning: teal = primary flow, cyan = interface,
// violet = data/governance, amber = decision/guardrail, rose/green = outcomes.
const C = {
  canvas: '#0B0F19',
  frame: '#1f2a3a',
  eyebrow: '#5fd0d4',
  slate: '#9fb3c4',
  body: '#dbe4ec',
  subtext: '#cbd5e1',
  white: '#f8fafc',
  bandFill: '#0e1a26',
  bandStroke: '#1e3340',
  nodeFill: '#11212e',
  panelFill: '#0c1620',
  panelStroke: '#2b5560',
  teal: '#39b8bc',
  tealStroke: '#3aa8ac',
  tealText: '#7fd4d7',
  cyan: '#5fd6da',
  cyanStroke: '#4fc4d6',
  cyanText: '#bfe3ea',
  violet: '#8b7ee0',
  violetFill: '#16132a',
  violetText: '#cbbdf2',
  amber: '#d8a84f',
  amberFill: '#1b1606',
  amberText: '#e7c890',
  slateStroke: '#5a7286',
  green: '#34d399',
  greenFill: '#0c1f18',
  greenText: '#a7f3d0',
  rose: '#fb7185',
  roseFill: '#220d12',
  roseText: '#fecdd3',
} as const;

const FONT = "'Outfit','Segoe UI',sans-serif";

// ---------------------------------------------------------------------------
// Shared primitives (full-scale, 760 x 648 author space)
// ---------------------------------------------------------------------------

/** Outer frame, dot texture, and arrowhead markers shared by every full diagram. */
const CanvasFrame: React.FC<{ idPrefix: string; children: React.ReactNode }> = ({
  idPrefix,
  children,
}) => (
  <svg viewBox="0 0 760 648" fontFamily={FONT} className="w-full h-full" role="presentation">
    <defs>
      <pattern id={`${idPrefix}-dots`} width="22" height="22" patternUnits="userSpaceOnUse">
        <circle cx="1.2" cy="1.2" r="1.2" fill="#1b2a3a" opacity="0.5" />
      </pattern>
      {(
        [
          ['teal', C.teal],
          ['cyan', C.cyan],
          ['slate', C.slate],
        ] as const
      ).map(([name, color]) => (
        <marker
          key={name}
          id={`${idPrefix}-arrow-${name}`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill={color} />
        </marker>
      ))}
    </defs>
    <rect
      x="6"
      y="6"
      width="748"
      height="636"
      rx="18"
      fill={C.canvas}
      stroke={C.frame}
      strokeWidth="1.5"
    />
    <rect x="6" y="6" width="748" height="636" rx="18" fill={`url(#${idPrefix}-dots)`} />
    {children}
  </svg>
);

/** Eyebrow + divider header. */
const Header: React.FC<{ title: string; tag?: string }> = ({ title, tag }) => (
  <g>
    <text x="40" y="40" fill={C.eyebrow} fontSize="12" fontWeight="700" letterSpacing="2.5">
      {title}
    </text>
    {tag && (
      <g>
        <rect x="566" y="26" width="156" height="22" rx="6" fill={C.bandFill} stroke="#33485a" />
        <text
          x="644"
          y="41"
          textAnchor="middle"
          fill={C.slate}
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="1.2"
        >
          {tag}
        </text>
      </g>
    )}
    <line x1="40" y1="52" x2="720" y2="52" stroke={C.bandStroke} />
  </g>
);

/** Plain-language "what this shows" summary strip. */
const Summary: React.FC<{ lines: string[] }> = ({ lines }) => (
  <g>
    <text x="40" y="74" fill={C.slate} fontSize="10" fontWeight="700" letterSpacing="1.5">
      WHAT THIS SHOWS
    </text>
    {lines.map((line, i) => (
      <text key={i} x="40" y={92 + i * 16} fill={C.body} fontSize="12">
        {line}
      </text>
    ))}
  </g>
);

/** Labelled background band for a layer / stage. */
const Band: React.FC<{ y: number; h: number; label: string }> = ({ y, h, label }) => (
  <g>
    <rect x="176" y={y} width="408" height={h} rx="12" fill={C.bandFill} stroke={C.bandStroke} />
    <text x="192" y={y + 16} fill={C.slate} fontSize="10" fontWeight="700" letterSpacing="1.5">
      {label}
    </text>
  </g>
);

/** Primary/secondary node card with title + subtitle. */
const Node: React.FC<{
  x?: number;
  y: number;
  w?: number;
  h?: number;
  title: string;
  sub?: string;
  stroke?: string;
  fill?: string;
  subColor?: string;
  titleSize?: number;
}> = ({
  x = 240,
  y,
  w = 280,
  h = 44,
  title,
  sub,
  stroke = C.tealStroke,
  fill = C.nodeFill,
  subColor = C.subtext,
  titleSize = 15,
}) => {
  const cx = x + w / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="11"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
      />
      <text
        x={cx}
        y={sub ? y + 19 : y + h / 2 + 5}
        textAnchor="middle"
        fill={C.white}
        fontSize={titleSize}
        fontWeight="700"
      >
        {title}
      </text>
      {sub && (
        <text x={cx} y={y + 34} textAnchor="middle" fill={subColor} fontSize="11">
          {sub}
        </text>
      )}
    </g>
  );
};

/** Vertical centre-column connector with a short label. */
const Step: React.FC<{
  idPrefix: string;
  y1: number;
  y2: number;
  label: string;
  x?: number;
}> = ({ idPrefix, y1, y2, label, x = 380 }) => (
  <g>
    <path
      d={`M${x} ${y1} V${y2}`}
      stroke={C.teal}
      strokeWidth="2"
      markerEnd={`url(#${idPrefix}-arrow-teal)`}
    />
    <text x={x + 12} y={(y1 + y2) / 2 + 4} fill={C.tealText} fontSize="10">
      {label}
    </text>
  </g>
);

/** Proof-point panel with up to two wrapped bullets. */
const ProofPanel: React.FC<{ bullets: string[][] }> = ({ bullets }) => (
  <g>
    <rect
      x="40"
      y="506"
      width="680"
      height="116"
      rx="12"
      fill={C.panelFill}
      stroke={C.panelStroke}
    />
    <text x="58" y="530" fill={C.eyebrow} fontSize="11" fontWeight="700" letterSpacing="1.5">
      PROOF POINT
    </text>
    {bullets.map((lines, b) => {
      const top = 552 + b * 40;
      return (
        <g key={b}>
          <circle cx="62" cy={top} r="2.5" fill={C.teal} />
          {lines.map((line, i) => (
            <text key={i} x="74" y={top + 4 + i * 16} fill={C.body} fontSize="12">
              {line}
            </text>
          ))}
        </g>
      );
    })}
  </g>
);

// ---------------------------------------------------------------------------
// Full diagrams (modal)
// ---------------------------------------------------------------------------

const TwinFull: React.FC = () => {
  const p = 'twin';
  return (
    <CanvasFrame idPrefix={p}>
      <Header title="DIGITAL TWIN · INTEGRATION ARCHITECTURE" />
      <Summary
        lines={[
          'How the on-site AI assistant answers a question: the chat widget sends your message to an Express',
          'server, guardrails screen it, and only safe prompts reach Gemini — whose reply streams back live.',
        ]}
      />

      <Band y={124} h={80} label="USER LAYER" />
      <Band y={218} h={80} label="APPLICATION LAYER" />
      <Band y={312} h={80} label="GUARDRAIL LAYER" />
      <Band y={406} h={80} label="INTELLIGENCE LAYER" />

      <Step idPrefix={p} y1={196} y2={216} label="request" />
      <Step idPrefix={p} y1={290} y2={310} label="validate" />
      <Step idPrefix={p} y1={384} y2={404} label="prompt" />

      <Node y={148} title="User Browser" sub="React chat widget · sessionStorage history" />
      <Node y={242} title="Express Gateway" sub="rate-limit · length validation" />
      <Node
        y={336}
        title="Guardrails"
        sub="injection detect · scope / relevance filter"
        stroke={C.amber}
        fill={C.amberFill}
        subColor={C.amberText}
      />
      <Node y={430} title="Gemini 2.5 Flash" sub="grounded by static system-instruction" />

      {/* Response stream (right lane) */}
      <path
        d="M520 454 H648 V172 H520"
        fill="none"
        stroke={C.cyan}
        strokeWidth="2"
        strokeDasharray="5 4"
        markerEnd={`url(#${p}-arrow-cyan)`}
      />
      <text
        x="664"
        y="313"
        fill={C.cyan}
        fontSize="11"
        fontWeight="600"
        textAnchor="middle"
        transform="rotate(90 664 313)"
      >
        HTTP stream · chunked res.write
      </text>

      {/* Deflection fallback (left lane) */}
      <path
        d="M240 360 H112 V172 H240"
        fill="none"
        stroke={C.amber}
        strokeWidth="2"
        strokeDasharray="5 4"
        markerEnd={`url(#${p}-arrow-slate)`}
      />
      <text
        x="96"
        y="266"
        fill="#e0b463"
        fontSize="11"
        fontWeight="600"
        textAnchor="middle"
        transform="rotate(-90 96 266)"
      >
        blocked → canned deflection
      </text>

      <ProofPanel
        bullets={[
          [
            'Injection and off-topic prompts are blocked before any model call —',
            'they receive a fixed deflection, never the LLM.',
          ],
          [
            'Allowed prompts reach Gemini 2.5 Flash and the grounded reply streams',
            'back to the browser as chunked HTTP.',
          ],
        ]}
      />
    </CanvasFrame>
  );
};

const SpatialFull: React.FC = () => {
  const p = 'spatial';
  return (
    <CanvasFrame idPrefix={p}>
      <Header title="GUYNODE · GOVERNED SPATIAL CATALOG" tag="GOOGLE CLOUD RUN" />
      <Summary
        lines={[
          'How scattered legacy geodata becomes a trustworthy public catalog: every dataset is registered',
          'against a strict metadata schema, validated, and previewed in-browser before anyone downloads.',
        ]}
      />

      <Band y={124} h={64} label="INPUT" />
      <Band y={200} h={64} label="GOVERNANCE" />
      <Band y={276} h={64} label="VALIDATION" />
      <Band y={352} h={64} label="PREVIEW" />
      <Band y={428} h={64} label="PUBLIC ACCESS" />

      <Step idPrefix={p} y1={186} y2={198} label="register" />
      <Step idPrefix={p} y1={262} y2={274} label="validate" />
      <Step idPrefix={p} y1={338} y2={350} label="preview" />
      <Step idPrefix={p} y1={414} y2={426} label="publish" />

      <Node
        x={246}
        y={146}
        w={268}
        h={38}
        title="Legacy Spatial Data"
        sub="fragmented sources · mixed formats"
        stroke={C.slateStroke}
        titleSize={14}
      />
      <Node
        x={246}
        y={222}
        w={268}
        h={38}
        title="Type-Safe Dataset Registry"
        sub="provenance · format · availability"
        stroke={C.violet}
        fill={C.violetFill}
        subColor={C.violetText}
        titleSize={14}
      />
      <Node
        x={246}
        y={298}
        w={268}
        h={38}
        title="Metadata Validation"
        sub="GeoJSON · SHP · KML contract"
        stroke={C.amber}
        fill={C.amberFill}
        subColor={C.amberText}
        titleSize={14}
      />
      <Node
        x={246}
        y={374}
        w={268}
        h={38}
        title="Leaflet Preview Engine"
        sub="in-browser map inspection"
        stroke={C.tealStroke}
        titleSize={14}
      />
      <Node
        x={246}
        y={450}
        w={268}
        h={38}
        title="Public Data Hub"
        sub="planners · researchers · citizens"
        stroke={C.cyanStroke}
        fill="#10202a"
        subColor={C.cyanText}
        titleSize={14}
      />

      <ProofPanel
        bullets={[
          [
            'Every dataset passes a governance schema — provenance, format, and availability —',
            'before it is published.',
          ],
          [
            'Users preview GeoJSON / SHP / KML on an interactive map before downloading —',
            'trust before commitment.',
          ],
        ]}
      />
    </CanvasFrame>
  );
};

const StateFull: React.FC = () => {
  const p = 'state';
  const chip = (
    x: number,
    label: string,
    lean: string,
    stroke: string,
    fill: string,
    text: string,
  ) => (
    <g>
      <rect
        x={x}
        y={356}
        width="168"
        height="54"
        rx="11"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
      />
      <text x={x + 84} y={382} textAnchor="middle" fill={text} fontSize="14" fontWeight="700">
        {label}
      </text>
      <text x={x + 84} y={399} textAnchor="middle" fill={text} fontSize="10" opacity="0.85">
        {lean}
      </text>
    </g>
  );
  return (
    <CanvasFrame idPrefix={p}>
      <Header title="OPS TRIAGE · POLICY SIMULATION LOOP" />
      <Summary
        lines={[
          'How a triage policy choice plays out over time: you set a stance between throughput and quality,',
          'and every tick spawns an incident that is processed, escalated, or blocked while KPIs track the trade-off.',
        ]}
      />

      {/* Connectors under nodes */}
      <Step idPrefix={p} y1={170} y2={194} label="tick" />
      <Step idPrefix={p} y1={242} y2={266} label="incident" />

      {/* Classifier → outcome chips */}
      <path
        d="M360 338 C300 348, 220 350, 180 354"
        fill="none"
        stroke={C.green}
        strokeWidth="1.8"
        markerEnd={`url(#${p}-arrow-teal)`}
      />
      <path
        d="M380 338 V354"
        stroke={C.amber}
        strokeWidth="1.8"
        markerEnd={`url(#${p}-arrow-teal)`}
      />
      <path
        d="M400 338 C460 348, 540 350, 580 354"
        fill="none"
        stroke={C.rose}
        strokeWidth="1.8"
        markerEnd={`url(#${p}-arrow-teal)`}
      />

      {/* Outcome chips → KPI */}
      <path
        d="M180 410 C220 426, 320 430, 360 434"
        fill="none"
        stroke={C.teal}
        strokeWidth="1.6"
        markerEnd={`url(#${p}-arrow-teal)`}
      />
      <path
        d="M380 410 V432"
        stroke={C.teal}
        strokeWidth="1.6"
        markerEnd={`url(#${p}-arrow-teal)`}
      />
      <path
        d="M580 410 C540 426, 440 430, 400 434"
        fill="none"
        stroke={C.teal}
        strokeWidth="1.6"
        markerEnd={`url(#${p}-arrow-teal)`}
      />

      {/* Feedback loop */}
      <path
        d="M540 456 H684 V152 H540"
        fill="none"
        stroke={C.slate}
        strokeWidth="1.8"
        strokeDasharray="5 4"
        markerEnd={`url(#${p}-arrow-slate)`}
      />
      <text
        x="700"
        y="304"
        fill={C.slate}
        fontSize="11"
        fontWeight="600"
        textAnchor="middle"
        transform="rotate(90 700 304)"
      >
        adjust stance · re-run
      </text>

      <Node
        x={230}
        y={124}
        w={300}
        h={46}
        title="Policy Stance"
        sub="Throughput ↔ Balanced ↔ Quality"
        stroke={C.amber}
        fill={C.amberFill}
        subColor={C.amberText}
      />
      <Node y={196} h={46} title="Tick Engine" sub="new incident every 2s" />
      <Node y={268} h={46} title="Incident Classifier" sub="routes by active policy" />

      {chip(96, 'PROCESSED', 'throughput-leaning', C.green, C.greenFill, C.greenText)}
      {chip(296, 'ESCALATED', 'balanced-leaning', C.amber, C.amberFill, C.amberText)}
      {chip(496, 'BLOCKED', 'quality-leaning', C.rose, C.roseFill, C.roseText)}

      <Node
        x={230}
        y={432}
        w={300}
        h={46}
        title="Live KPIs & Telemetry"
        sub="First-Pass Yield · Backlog · SLA risk"
        stroke={C.cyanStroke}
        fill="#10202a"
        subColor={C.cyanText}
      />

      <ProofPanel
        bullets={[
          [
            'The same incident stream resolves differently as you slide from throughput to quality —',
            'processed, escalated, or blocked.',
          ],
          [
            'First-Pass Yield, Backlog, and SLA risk update live, exposing the real cost of each',
            'policy choice.',
          ],
        ]}
      />
    </CanvasFrame>
  );
};

// ---------------------------------------------------------------------------
// Thumbnails (gallery card) — simplified, same palette and facts
// ---------------------------------------------------------------------------

const ThumbFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 240 170" fontFamily={FONT} className="w-full h-full" role="presentation">
    {children}
  </svg>
);

const thumbNode = (
  x: number,
  y: number,
  w: number,
  label: string,
  stroke: string,
  fill: string = C.nodeFill,
  textColor: string = C.white,
) => (
  <g>
    <rect x={x} y={y} width={w} height="26" rx="6" fill={fill} stroke={stroke} strokeWidth="1.5" />
    <text
      x={x + w / 2}
      y={y + 17}
      textAnchor="middle"
      fill={textColor}
      fontSize="11"
      fontWeight="700"
    >
      {label}
    </text>
  </g>
);

const TwinThumb: React.FC = () => (
  <ThumbFrame>
    <path d="M120 50 V62 M120 88 V100 M120 126 V138" stroke={C.teal} strokeWidth="1.5" />
    {thumbNode(70, 24, 100, 'Client', C.tealStroke)}
    {thumbNode(70, 62, 100, 'Gateway', C.tealStroke)}
    {thumbNode(70, 100, 100, 'Guardrails', C.amber, C.amberFill, C.amberText)}
    {thumbNode(70, 138, 100, 'Gemini', C.tealStroke)}
    <path
      d="M170 151 H210 V37 H170"
      fill="none"
      stroke={C.cyan}
      strokeWidth="1.5"
      strokeDasharray="4 3"
    />
  </ThumbFrame>
);

const SpatialThumb: React.FC = () => (
  <ThumbFrame>
    <path d="M120 36 V44 M120 72 V80 M120 108 V116" stroke={C.teal} strokeWidth="1.5" />
    {thumbNode(64, 10, 112, 'Registry', C.violet, C.violetFill, C.violetText)}
    {thumbNode(64, 44, 112, 'Validate', C.amber, C.amberFill, C.amberText)}
    {thumbNode(64, 80, 112, 'Preview', C.tealStroke)}
    {thumbNode(64, 116, 112, 'Data Hub', C.cyanStroke, '#10202a', C.cyanText)}
    <text x="120" y="158" textAnchor="middle" fill={C.slate} fontSize="9" letterSpacing="1">
      GeoJSON · SHP · KML
    </text>
  </ThumbFrame>
);

const StateThumb: React.FC = () => (
  <ThumbFrame>
    {thumbNode(70, 18, 100, 'Policy', C.amber, C.amberFill, C.amberText)}
    {thumbNode(70, 60, 100, 'Classifier', C.tealStroke)}
    <path d="M120 44 V60 M95 86 V104 M120 86 V104 M145 86 V104" stroke={C.teal} strokeWidth="1.4" />
    <circle cx="70" cy="118" r="11" fill={C.greenFill} stroke={C.green} strokeWidth="1.5" />
    <circle cx="120" cy="118" r="11" fill={C.amberFill} stroke={C.amber} strokeWidth="1.5" />
    <circle cx="170" cy="118" r="11" fill={C.roseFill} stroke={C.rose} strokeWidth="1.5" />
    <text x="120" y="152" textAnchor="middle" fill={C.slate} fontSize="9" letterSpacing="0.5">
      processed · escalated · blocked
    </text>
  </ThumbFrame>
);

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

const FULL: Record<DiagramType, React.FC> = {
  twin: TwinFull,
  spatial: SpatialFull,
  state: StateFull,
};

const THUMB: Record<DiagramType, React.FC> = {
  twin: TwinThumb,
  spatial: SpatialThumb,
  state: StateThumb,
};

export const DiagramFull: React.FC<{ type: DiagramType }> = ({ type }) => {
  const Cmp = FULL[type];
  return <Cmp />;
};

export const DiagramThumb: React.FC<{ type: DiagramType }> = ({ type }) => {
  const Cmp = THUMB[type];
  return <Cmp />;
};
