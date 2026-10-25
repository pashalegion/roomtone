// Fails when a page's header or footer differs from the reference markup, or when a page lacks its main landmark.
import {readdirSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = readdirSync(root).filter(name => name.endsWith('.html')).sort();
const block = (html, open, close) => {
  const start = html.indexOf(open);
  const end = html.indexOf(close, start);
  return start < 0 || end < 0 ? null : html.slice(start, end + close.length);
};
const reference = {header: null, footer: null};
const problems = [];

for (const page of pages) {
  const html = readFileSync(join(root, page), 'utf8');
  const header = block(html, '<header class="topbar">', '</header>');
  const footer = block(html, '<footer class="site-footer">', '</footer>');
  if (!header) problems.push(`${page}: missing <header class="topbar">`);
  if (!footer) problems.push(`${page}: missing <footer class="site-footer">`);
  if (!html.includes('<main id="main"')) problems.push(`${page}: missing <main id="main">`);
  if (!reference.header) reference.header = header;
  if (!reference.footer) reference.footer = footer;
  if (header && header !== reference.header) problems.push(`${page}: header differs from ${pages[0]}`);
  if (footer && footer !== reference.footer) problems.push(`${page}: footer differs from ${pages[0]}`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`Header and footer match on ${pages.length} pages.`);
