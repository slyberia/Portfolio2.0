import fs from 'fs';
import { execSync } from 'child_process';

try {
  console.log('Verifying Defense Node prerequisites...');
  const instruction = fs.readFileSync('.agent/prompts/appellate-defense.md', 'utf8');
  const julesReport = fs.readFileSync('docs/workflow/jules-report.md', 'utf8');

  const fullPrompt = `${instruction}\n\n<Jules_Report>\n${julesReport}\n</Jules_Report>\n\nExecute your Execution_Taxonomy and output your Defense_Block items now.`;

  fs.writeFileSync('.agent/prompts/temp-defense-prompt.md', fullPrompt);

  console.log('Invoking Codex for Appellate Defense...');
  // Pipe the generated prompt into the local Codex agent
  const defenseOutput = execSync('codex exec < .agent/prompts/temp-defense-prompt.md').toString();

  const timestamp = new Date().toLocaleString();
  const formattedOutput = `# Codex Appellate Defense\n**Generated:** ${timestamp}\n\n${defenseOutput}`;

  fs.writeFileSync('docs/workflow/codex-defense.md', formattedOutput);
  console.log('✅ Defense analysis complete. Saved to docs/workflow/codex-defense.md');

  // Cleanup staging file
  if (fs.existsSync('.agent/prompts/temp-defense-prompt.md')) {
    fs.unlinkSync('.agent/prompts/temp-defense-prompt.md');
  }
} catch (err) {
  console.error('❌ Defense Node failed:', err.message);
  process.exit(1);
}
