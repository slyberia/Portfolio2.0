import fs from 'fs';
import { execSync } from 'child_process';

try {
  const ruling = process.argv[2];
  if (!ruling) {
    throw new Error('Architect ruling missing. Usage: npm run resolve:coach "Your ruling here"');
  }

  console.log(`\nAssistant Coach received ruling: "${ruling}"`);
  console.log('Consulting Codex for approved mutations...');

  const instruction = fs.readFileSync('.agent/prompts/resolution-coach.md', 'utf8');
  const context = fs.readFileSync('docs/workflow/architect-context.md', 'utf8');

  const prompt = `${instruction}\n\n<Architect_Context>\n${context}\n</Architect_Context>\n\n<Architect_Ruling>\n${ruling}\n</Architect_Ruling>\n\nExecute approved mutations now.`;
  fs.writeFileSync('.agent/prompts/temp-resolution-prompt.md', prompt);

  // Trigger Codex
  const output = execSync('codex exec < .agent/prompts/temp-resolution-prompt.md').toString();

  // Parse <File> tags and apply mutations to the disk
  const fileRegex = /<File path="([^"]+)">([\s\S]*?)<\/File>/g;
  let match;
  let filesMutated = 0;

  while ((match = fileRegex.exec(output)) !== null) {
    const filePath = match[1];
    const fileContent = match[2].trim();
    fs.writeFileSync(filePath, fileContent);
    console.log(`✅ Applied mutations to: ${filePath}`);
    filesMutated++;
  }

  if (filesMutated === 0) {
    console.log('No file mutations required based on ruling.');
  }

  if (fs.existsSync('.agent/prompts/temp-resolution-prompt.md')) {
    fs.unlinkSync('.agent/prompts/temp-resolution-prompt.md');
  }

  console.log('\nFixing formatting...');
  execSync('npm run fix:format', { stdio: 'inherit' });

  console.log('\nRunning validation suite...');
  execSync('npm run validate:phase', { stdio: 'inherit' });

  console.log('\n✅ Validation passed. Archiving Git State...');
  execSync('git add .');
  execSync('git commit -m "chore(resolution): apply architect-approved fixes"');

  const nextStepRegex = /<Next_Step>([\s\S]*?)<\/Next_Step>/;
  const stepMatch = output.match(nextStepRegex);

  console.log('\n🏁 Assistant Coach: Resolution applied successfully. Ready for merge!');
  if (stepMatch) {
    console.log('\n\x1b[36m%s\x1b[0m', 'NOTE'); // Cyan text for NOTE
    console.log(stepMatch[1].trim());
  }
} catch (err) {
  console.error('\n❌ Resolution Halted:', err.message);
  console.log(
    'Coach Advice: The build failed after applying mutations, or an error occurred. Review the terminal output. Code state is preserved for manual inspection.',
  );
  process.exit(1);
}
