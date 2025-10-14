const fs = require('fs');
const path = require('path');

const ROOT = path.join(process.cwd(), 'src');
const exts = new Set(['.ts', '.tsx', '.js', '.jsx']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (exts.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function replaceInFile(file) {
  const original = fs.readFileSync(file, 'utf8');
  const replaced = original.replaceAll('process.env.NEXT_APP_URI', 'process.env.NEXT_PUBLIC_APP_URI');
  if (replaced !== original) {
    fs.writeFileSync(file, replaced, 'utf8');
    console.log('Updated', path.relative(process.cwd(), file));
  }
}

const files = walk(ROOT);
files.forEach(replaceInFile);

console.log('Done updating env var name to NEXT_PUBLIC_APP_URI.');
