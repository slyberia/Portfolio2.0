import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Interactive recreation of the Northern Grind POS cost-benefit charts.
// Each series is total monthly cost (fixed software/loyalty + per-transaction
// fee × volume) for a given processor, plotted against monthly transaction
// volume. The crossovers reproduce the modeled break-even points from the
// cost-benefit analysis (~1,037 latte / ~1,215 sandwich transactions/month).
// All figures are modeled from published U.S. rates — a proposal, not measured.

type Item = 'latte' | 'sandwich';

// Per-transaction processing fee ($) for the $6.25 latte and $10 sandwich,
// plus the fixed monthly cost (software + loyalty) for each option.
const FEE: Record<Item, { square: number; stripe: number; driposLow: number; driposHigh: number }> =
  {
    latte: { square: 0.3125, stripe: 0.21875, driposLow: 0.23125, driposHigh: 0.3125 },
    sandwich: { square: 0.41, stripe: 0.32, driposLow: 0.34, driposHigh: 0.41 },
  };

const FIXED = { square: 75, stripe: 100, dripos: 160 };

const BREAKEVEN: Record<Item, number> = { latte: 1037, sandwich: 1215 };

const SERIES = [
  { key: 'square', label: 'Square + loyalty ($75/mo)', color: '#2563eb', dashed: false },
  { key: 'stripe', label: 'Stripe + loyalty ($100/mo)', color: '#16a34a', dashed: false },
  { key: 'driposLow', label: 'Dripos (2.9% + 5¢)', color: '#f59e0b', dashed: false },
  { key: 'driposHigh', label: 'Dripos (2.6% + 15¢)', color: '#dc2626', dashed: true },
] as const;

const MAX_VOLUME = 2500;
const STEP = 100;

// Track the class-based dark mode toggled on <html> so the chart chrome
// (axes, grid, tooltip) stays theme-aware without a shared theme context.
const useIsDark = (): boolean => {
  const [isDark, setIsDark] = React.useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  );
  React.useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() => setIsDark(el.classList.contains('dark')));
    observer.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return isDark;
};

export const CostBreakEvenChart: React.FC = () => {
  const [item, setItem] = React.useState<Item>('latte');
  const isDark = useIsDark();

  const data = React.useMemo(() => {
    const fee = FEE[item];
    const points = [];
    for (let v = 0; v <= MAX_VOLUME; v += STEP) {
      points.push({
        volume: v,
        square: Math.round(FIXED.square + fee.square * v),
        stripe: Math.round(FIXED.stripe + fee.stripe * v),
        driposLow: Math.round(FIXED.dripos + fee.driposLow * v),
        driposHigh: Math.round(FIXED.dripos + fee.driposHigh * v),
      });
    }
    return points;
  }, [item]);

  const grid = isDark ? '#334155' : '#e2e8f0';
  const tick = isDark ? '#94a3b8' : '#475569';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B0F19] space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <h3 className="font-bold text-slate-950 dark:text-white">
            Total Monthly Cost vs. Transaction Volume
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Where the lines cross is the break-even volume. Software + loyalty is included in each
            total.
          </p>
        </div>
        <div
          className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 self-start"
          role="group"
          aria-label="Item to model"
        >
          {(['latte', 'sandwich'] as Item[]).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setItem(opt)}
              aria-pressed={item === opt}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                item === opt
                  ? 'bg-amber-500 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {opt === 'latte' ? '$6.25 Latte' : '$10 Sandwich'}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: 4, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
            <XAxis
              dataKey="volume"
              stroke={tick}
              fontSize={11}
              tickLine={false}
              tickFormatter={(v: number) => (v >= 1000 ? `${v / 1000}k` : `${v}`)}
              label={{
                value: 'Transactions / month',
                position: 'insideBottom',
                offset: -2,
                fontSize: 11,
                fill: tick,
              }}
            />
            <YAxis
              stroke={tick}
              fontSize={11}
              tickLine={false}
              tickFormatter={(v: number) => `$${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                borderColor: isDark ? '#1e293b' : '#e2e8f0',
                borderRadius: 12,
                fontSize: 12,
              }}
              labelStyle={{ color: isDark ? '#e2e8f0' : '#0f172a' }}
              formatter={(value, name) => [`$${Number(value).toLocaleString()}`, name]}
              labelFormatter={(label) => `${Number(label).toLocaleString()} txns/mo`}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <ReferenceLine
              x={BREAKEVEN[item]}
              stroke={tick}
              strokeDasharray="4 4"
              label={{
                value: `Dripos→Square break-even ≈ ${BREAKEVEN[item].toLocaleString()}`,
                position: 'insideTopRight',
                fontSize: 10,
                fill: tick,
              }}
            />
            {SERIES.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={2}
                strokeDasharray={s.dashed ? '6 4' : undefined}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
        Below ~{BREAKEVEN[item].toLocaleString()} {item} transactions/month, Square's lower fixed
        cost wins; Dripos only overtakes it at higher volume. Stripe stays cheapest while a
        third-party loyalty app stays affordable. Modeled from published U.S. rates — to be
        re-grounded against the café's actual volume and contract.
      </p>
    </div>
  );
};

export default CostBreakEvenChart;
