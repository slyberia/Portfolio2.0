import fs from 'fs';
import { execSync } from 'child_process';

let apiKey = process.env.JULES_API_KEY;
if (!apiKey && fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  const match = envContent.match(/^JULES_API_KEY=(.*)$/m);
  if (match) apiKey = match[1].trim();
}

if (!apiKey || apiKey.includes('your_key_here')) {
  console.error('❌ ERROR: Missing or invalid JULES_API_KEY in .env file.');
  process.exit(1);
}

console.log('Starting Jules code review...');

try {
  // 1. Get the Git Diff (Resilient Fallback)
  let diff = '';
  try {
    diff = execSync('git diff HEAD').toString(); // Uncommitted changes
    if (!diff.trim()) {
      diff = execSync('git diff HEAD~1').toString(); // Last commit
    }
  } catch (err) {
    console.error('❌ Error getting git diff:', err.message);
    process.exit(1);
  }

  // 2. Load the Rules
  const rulesPath = fs.existsSync('.github/pull_request_template.md')
    ? '.github/pull_request_template.md'
    : 'docs/workflow/jules-review-template.md';
  const rules = fs.readFileSync(rulesPath, 'utf8');

  if (!diff.trim()) {
    console.log('No code changes detected to review.');
    process.exit(0);
  }

  // 3. Construct Google Gemini API payload
  const promptText = `You are Jules, a strict code reviewer. Review this code diff based on the following rules:\n\nRULES:\n${rules}\n\nGIT DIFF:\n${diff}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey.trim()}`;
  const payload = { contents: [{ parts: [{ text: promptText }] }] };

  // 4. Execute the call
  console.log('Sending diff to Google Gemini API...');
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error('❌ API Error:', data.error.message);
        process.exit(1);
      }

      const candidate = Array.isArray(data.candidates) ? data.candidates[0] : null;
      const content = candidate?.content;
      const part = Array.isArray(content?.parts) ? content.parts[0] : null;
      const rawReviewText = typeof part?.text === 'string' ? part.text : null;

      if (!candidate || !content || !part || !rawReviewText) {
        console.error('❌ Invalid Gemini response: missing candidates[0].content.parts[0].text.');
        process.exit(1);
      }

      const timestamp = new Date().toLocaleString();
      const formattedReport = `# Jules Code Review\n**Generated:** ${timestamp}\n\n${rawReviewText}`;

      fs.writeFileSync('docs/workflow/jules-report.md', formattedReport);
      console.log('✅ Jules review complete. Saved to docs/workflow/jules-report.md');
    })
    .catch((err) => {
      console.error('❌ Fetch failed:', err);
      process.exit(1);
    });
} catch (error) {
  console.error('❌ Execution failed:', error.message);
  process.exit(1);
}
