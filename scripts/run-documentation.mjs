import fs from 'fs';
import { execSync } from 'child_process';

try {
  console.log('Waking Documentation Agent...');
  const instruction = fs.readFileSync('.agent/prompts/doc-generation.md', 'utf8');
  const context = fs.readFileSync('docs/workflow/architect-context.md', 'utf8');

  const prompt = `${instruction}\n\n<Architect_Context>\n${context}\n</Architect_Context>`;
  fs.writeFileSync('.agent/prompts/temp-doc-prompt.md', prompt);

  // Run Codex/LLM to generate documentation
  const output = execSync('codex exec < .agent/prompts/temp-doc-prompt.md').toString();

  // Parse the bifurcated output
  const techMatch = output.match(/<Technical_Spec>([\s\S]*?)<\/Technical_Spec>/);
  const execMatch = output.match(/<Executive_Summary>([\s\S]*?)<\/Executive_Summary>/);

  if (!techMatch || !execMatch) {
    throw new Error('Documentation Agent failed to respect Audience_Bifurcation tags.');
  }

  const timestamp = new Date().toLocaleString();

  // 1. Append Technical Spec to Product Lifecycle
  const techEntry = `\n## Build Run: ${timestamp}\n${techMatch[1].trim()}\n---\n`;
  fs.appendFileSync('docs/product-lifecycle.md', techEntry);

  // 2. Save Executive Summary as a standalone artifact
  const now = new Date();
  const safeDate = now.toISOString().split('T')[0];
  const safeTime = now.toTimeString().split(' ')[0].replace(/:/g, ''); // e.g., 143000
  const execFile = `docs/executive-summaries/summary-${safeDate}-${safeTime}.md`;

  // The LLM now provides the markdown # Title within the tag, so we just trim and save
  const execContent = execMatch[1].trim();
  fs.writeFileSync(execFile, execContent);

  console.log('✅ Documentation generated and routed successfully.');
  fs.unlinkSync('.agent/prompts/temp-doc-prompt.md');
} catch (err) {
  console.error('❌ Documentation Node Failed:', err.message);
  process.exit(1);
}
