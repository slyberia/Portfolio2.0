import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

async function main() {
  // 1. Read JULES_API_KEY from environment or .env
  const envPath = path.join(rootDir, '.env');
  let apiKey = process.env.JULES_API_KEY;

  if (!apiKey && fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^JULES_API_KEY=(.*)$/m);
    if (match) {
      apiKey = match[1].trim();
    }
  }

  if (!apiKey) {
    console.error('❌ ERROR: JULES_API_KEY is not set in the environment or .env file.');
    process.exit(1);
  }

  if (apiKey === 'your_key_here') {
    console.error(
      '⚠️ WARNING: JULES_API_KEY is still using the placeholder value. Please update your .env file.',
    );
  }

  // 2. Execute git diff main...HEAD
  let diff = '';
  try {
    diff = execSync('git diff main...HEAD', { encoding: 'utf8' });
  } catch (error) {
    console.error(
      '❌ ERROR: Failed to execute git diff. Make sure you are on a branch and have commits.',
    );
    console.error(error.message);
    process.exit(1);
  }

  if (!diff.trim()) {
    console.warn(
      '⚠️ WARNING: No diff found between main and HEAD. Ensure you have committed changes.',
    );
  }

  // 3. Read rules from docs/workflow/jules-review-template.md
  const templatePath = path.join(rootDir, 'docs', 'workflow', 'jules-review-template.md');
  let template = '';
  try {
    template = fs.readFileSync(templatePath, 'utf8');
  } catch (error) {
    console.error('❌ ERROR: Failed to read docs/workflow/jules-review-template.md');
    process.exit(1);
  }

  // 4. Construct payload and make POST request to the API
  const payload = {
    model: 'gpt-4o', // Assuming Jules uses an OpenAI-compatible endpoint
    messages: [
      {
        role: 'system',
        content: `You are Jules, the reviewer agent. Follow these instructions exactly:\n\n${template}`,
      },
      {
        role: 'user',
        content: `Here is the current git diff for this phase:\n\n\`\`\`diff\n${diff}\n\`\`\`\n\nProvide your review.`,
      },
    ],
  };

  console.log('Sending diff to Jules API for review...');

  try {
    // Note: To use a different Jules API URL, update this endpoint.
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    const report = data.choices[0].message.content;

    // 5. Write the API response to docs/workflow/jules-report.md
    const reportPath = path.join(rootDir, 'docs', 'workflow', 'jules-report.md');
    fs.writeFileSync(reportPath, report, 'utf8');
    console.log(`✅ Jules review complete. Report written to ${reportPath}`);
  } catch (error) {
    console.error('❌ ERROR: Failed to communicate with Jules API.');
    console.error(error.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
