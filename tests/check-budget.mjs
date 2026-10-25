// The home page must load under 60 KB of JavaScript and CSS on first load (raw bytes, fonts excluded).
import {readFileSync, statSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BUDGET = 60 * 1024;
const html = readFileSync(join(root, 'index.html'), 'utf8');
const assets = [
  ...[...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(match => match[1]),
  ...[...html.matchAll(/<script src="([^"]+)"/g)].map(match => match[1])
];
const sizes = assets.map(asset => ({asset, bytes: statSync(join(root, asset)).size}));
const total = sizes.reduce((sum, item) => sum + item.bytes, 0);
for (const item of sizes) console.log(`${String(item.bytes).padStart(7)} B  ${item.asset}`);
console.log(`${String(total).padStart(7)} B  total JavaScript + CSS on the home page (budget ${BUDGET} B)`);
if (total >= BUDGET) {
  console.error('Home page is over the JavaScript and CSS budget.');
  process.exit(1);
}
