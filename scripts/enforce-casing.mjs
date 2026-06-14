import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesToProcess = [
  '../src/constants.tsx',
  '../src/views/GalleryView.tsx',
  '../src/data/projectMetadata.ts',
  '../src/data/trackContent.ts',
  '../src/data/northernGrindGallery.ts',
  '../src/data/deepDiveContent.ts',
];

const SMALL_WORDS = new Set([
  'a',
  'an',
  'and',
  'as',
  'at',
  'but',
  'by',
  'for',
  'if',
  'in',
  'of',
  'on',
  'or',
  'the',
  'to',
  'v',
  'via',
  'vs',
  'with',
]);

function toTitleCase(str) {
  return str.replace(/([A-Za-z0-9_']+)|([^A-Za-z0-9_']+)/g, (match, word, nonWord, offset) => {
    if (nonWord) return nonWord;

    const isFirst = offset === 0 || !str.substring(0, offset).match(/[A-Za-z]/);
    const isLast =
      offset + word.length === str.length || !str.substring(offset + word.length).match(/[A-Za-z]/);

    const lower = word.toLowerCase();

    if (!isFirst && !isLast && SMALL_WORDS.has(lower)) {
      return lower;
    }

    if (word === lower) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    if (word.charAt(0) === word.charAt(0).toUpperCase()) {
      return word;
    }

    return word.charAt(0).toUpperCase() + word.slice(1);
  });
}

function processFile(filePath) {
  const fullPath = path.resolve(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');
  let changes = 0;

  const regex = /(title|subtitle|label):\s*(['"`])(.*?)\2/g;

  content = content.replace(regex, (match, field, quote, text) => {
    const casedText = toTitleCase(text);
    if (text !== casedText) {
      console.log(`[${path.basename(filePath)}] ${field}: "${text}" -> "${casedText}"`);
      changes++;
    }
    return `${field}: ${quote}${casedText}${quote}`;
  });

  const specificFixRegex = /Northern Grind gallery/g;
  if (content.match(specificFixRegex)) {
    console.log(
      `[${path.basename(filePath)}] Fixing specific string: "Northern Grind gallery" -> "Northern Grind Gallery"`,
    );
    content = content.replace(specificFixRegex, 'Northern Grind Gallery');
    changes++;
  }

  if (changes > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
  }
}

filesToProcess.forEach(processFile);
