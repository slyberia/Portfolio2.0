import fs from 'fs';
import path from 'path';

const LEDGER_PATH = '.agent/state/command-ledger.json';

export function logToLedger({ phase, subphase, executor, commands, mutations }) {
  if (!fs.existsSync(LEDGER_PATH)) {
    console.warn('⚠️ Command ledger missing. Initializing...');
    const dir = path.dirname(LEDGER_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      LEDGER_PATH,
      JSON.stringify({ version: '1.0.0', project: 'Portfolio2.0', phase, history: [] }, null, 2),
    );
  }

  const ledger = JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf8'));
  const entry = {
    phase,
    subphase,
    executor,
    timestamp: new Date().toISOString(),
    commands: commands || [],
    mutations: mutations || [],
  };

  ledger.history.push(entry);
  fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));
  console.log(`📝 Logged activity to command-ledger.json (Subphase: ${subphase})`);
}
