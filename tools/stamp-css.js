/**
 * Cache-bust the stylesheet link on every page.
 *
 * GitHub Pages serves /assets/site.css with `Cache-Control: max-age=14400`
 * (4 hours) and the HTML with a much shorter life. Ship an HTML change and a
 * CSS change together on an unversioned URL and a returning visitor gets the
 * NEW markup with the OLD stylesheet for up to four hours — new sections
 * render as unstyled block flow. That is exactly what happened on 2026-08-03:
 * the timetable grid came out as a vertical list and the portrait pairs
 * stacked full-width.
 *
 * Stamping the URL with a content hash makes the CSS a different resource
 * whenever it changes, so browsers fetch it immediately. Run after any edit to
 * assets/site.css:  node tools/stamp-css.js
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const CSS = path.join(ROOT, "assets/site.css");
const PAGES = [
  "index.html",
  "platform/index.html",
  "members/index.html",
  "help/index.html",
  "legal/terms/index.html",
  "legal/privacy/index.html",
];

const hash = crypto.createHash("sha256").update(fs.readFileSync(CSS)).digest("hex").slice(0, 8);
let changed = 0;

for (const rel of PAGES) {
  const file = path.join(ROOT, rel);
  const before = fs.readFileSync(file, "utf8");
  const after = before.replace(
    /href="\/assets\/site\.css(?:\?v=[a-f0-9]+)?"/g,
    `href="/assets/site.css?v=${hash}"`
  );
  if (after !== before) { fs.writeFileSync(file, after); changed++; }
  const stamped = /href="\/assets\/site\.css\?v=[a-f0-9]+"/.test(after);
  console.log(`${rel.padEnd(24)} ${stamped ? "stamped" : "NO LINK FOUND"}`);
}

console.log(`css hash ${hash} — ${changed} page(s) updated`);
