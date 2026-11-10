/**
 * Fast Wave — keep shared blocks identical across pages.
 * Copies the <!-- @shared:head|header|footer --> blocks from index.html (the source of truth)
 * into every other page.  Run after editing the header/footer/Tailwind config:
 *     node tools/sync-shared.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['providers.html', 'about.html', 'contact.html'];
const blocks = ['head', 'header', 'footer'];
const src = readFileSync(join(root, 'index.html'), 'utf8');
const grab = (html, name) => {
  const re = new RegExp(`<!-- @shared:${name} -->[\\s\\S]*?<!-- /@shared:${name} -->`);
  const m = html.match(re);
  if (!m) throw new Error(`Missing @shared:${name} block`);
  return { re, text: m[0] };
};
for (const page of pages) {
  const file = join(root, page);
  let html = readFileSync(file, 'utf8');
  for (const b of blocks) {
    const { text } = grab(src, b);
    const { re } = grab(html, b);
    html = html.replace(re, () => text);
  }
  writeFileSync(file, html);
  console.log(`synced ${page}`);
}
