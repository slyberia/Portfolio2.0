import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find all files in src/
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(dirPath, '/', file));
      }
    }
  });

  return arrayOfFiles;
}

const filesToProcess = getAllFiles(path.resolve(__dirname, '../src'));

const replacements = [
  {
    regex: /(?<!-)\bforward deployed engineer\b(?!-)/gi,
    replacement: 'Forward Deployed Engineer',
  },
  {
    regex: /(?<!-)\bcustomer success manager\b(?!-)/gi,
    replacement: 'Customer Success Manager',
  },
  {
    regex: /(?<!-)\bimplementations? consultant\b(?!-)/gi,
    replacement: 'Implementation Consultant',
  },
  {
    regex: /(?<!-)\bspatial systems architect\b(?!-)/gi,
    replacement: 'Spatial Systems Architect',
  },
];

filesToProcess.forEach((filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  replacements.forEach(({ regex, replacement }) => {
    content = content.replace(regex, (match) => {
      // If it's already exactly the replacement, ignore
      if (match === replacement) {
        return match;
      }
      console.log(`[${path.basename(filePath)}] "${match}" -> "${replacement}"`);
      return replacement;
    });
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
