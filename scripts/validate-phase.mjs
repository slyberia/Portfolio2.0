import { execSync } from 'child_process';

const commands = [
  'npm run format:check',
  'npm run typecheck',
  'npm run lint',
  'npm test -- --run',
  'npm run build',
  'npm run generate:crawler-html',
  'npm run validate:crawler',
];

console.log('Running Portfolio2.0 validation suite...');

try {
  for (const cmd of commands) {
    console.log(`\n> Executing: ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
  }
  console.log('\n✅ Validation suite passed.');
} catch (error) {
  console.error('\n❌ Validation suite failed. See logs above.');
  process.exit(1);
}
