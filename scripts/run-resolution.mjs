import fs from 'fs';
import { execSync } from 'child_process';
import { logToLedger } from './utils/ledger.mjs';

function assertSynchronizedBranch() {
  console.log('🔍 Pre-flight: Checking branch synchronicity...');
  const branch = execSync('git branch --show-current').toString().trim();

  try {
    // Ensure we have the latest from remote
    execSync('git fetch origin', { stdio: 'pipe' });

    // Check if branch has an upstream
    const hasUpstream = execSync(`git rev-parse --abbrev-ref ${branch}@{u}`, { stdio: 'pipe' })
      .toString()
      .trim();

    if (hasUpstream) {
      const counts = execSync(`git rev-list --left-right --count HEAD...${branch}@{u}`)
        .toString()
        .trim()
        .split('\t');

      const ahead = parseInt(counts[0], 10);
      const behind = parseInt(counts[1], 10);

      if (behind > 0) {
        throw new Error(
          `Branch '${branch}' is behind upstream by ${behind} commits. Pull before proceeding.`,
        );
      }

      if (ahead > 0) {
        console.log(
          `⚠️ Branch '${branch}' is ahead of upstream by ${ahead} commits. Proceeding with caution...`,
        );
      } else {
        console.log(`✅ Branch '${branch}' is synchronized with upstream.`);
      }
    }
  } catch (err) {
    if (err.message.includes('no upstream')) {
      console.log(`⚠️ Branch '${branch}' has no upstream configured. Proceeding with caution...`);
    } else {
      throw err;
    }
  }
}

try {
  assertSynchronizedBranch();

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
  let filesMutated = [];

  while ((match = fileRegex.exec(output)) !== null) {
    const filePath = match[1];
    const fileContent = match[2].trim();
    fs.writeFileSync(filePath, fileContent);
    console.log(`✅ Applied mutations to: ${filePath}`);
    filesMutated.push(filePath);
  }

  if (filesMutated.length === 0) {
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

  // Log to Ledger
  logToLedger({
    phase: '6',
    subphase: 'Resolution',
    executor: 'Codex (via Assistant Coach)',
    commands: [
      { cmd: 'npm run resolve:coach', exitCode: 0, summary: 'Applied ruling' },
      { cmd: 'npm run validate:phase', exitCode: 0, summary: 'Post-fix validation' },
    ],
    mutations: filesMutated,
  });

  const nextStepMatch = output.match(/<Next_Step>([\s\S]*?)<\/Next_Step>/);

  console.log('\n🏁 Assistant Coach: Resolution applied successfully. Ready for merge!');
  if (nextStepMatch) {
    console.log('\n🚀 Next Step Suggested by Coach:');
    console.log('-----------------------------------');
    console.log(nextStepMatch[1].trim());
  }
} catch (err) {
  console.error('\n❌ Assistant Coach Failed:', err.message);
  console.log(
    'Coach Advice: The build failed after applying mutations, or an error occurred. Review the terminal output. Code state is preserved for manual inspection.',
  );
  process.exit(1);
}
