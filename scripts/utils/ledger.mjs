import fs from 'fs';
import path from 'path';

const LEDGER_PATH = '.agent/state/command-ledger.json';

/**
 * Standardized logging utility for Phase 6 governance.
 * @param {Object} entry - The ledger entry.
 */
export function logToLedger(entry) {
  try {
    const dir = path.dirname(LEDGER_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let ledger = { version: '1.0.0', project: 'Portfolio2.0', phase: '6', history: [] };
    if (fs.existsSync(LEDGER_PATH)) {
      ledger = JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf8'));
    }

    const newEntry = {
      timestamp: new Date().toISOString(),
      ...entry,
    };

    ledger.history.push(newEntry);
    fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));
    console.log(`📓 Command logged to ledger: ${entry.subphase}`);
  } catch (err) {
    console.error('⚠️ Failed to write to command ledger:', err.message);
  }
}
