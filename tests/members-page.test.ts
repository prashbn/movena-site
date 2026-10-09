import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { readLegacyMainMarkup } from "../lib/legacy-content.ts";

function sha256(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

test("the Members page presents all four supplied product screens", () => {
  const markup = readLegacyMainMarkup("members/index.html");

  for (const asset of [
    "movena-member-home.png",
    "movena-member-book.png",
    "movena-member-session-detail.png",
    "movena-member-movements.png",
  ]) {
    assert.match(markup, new RegExp(`/assets/members/${asset}`));
  }

  assert.equal(markup.match(/class="member-screen /g)?.length, 4);
  assert.equal(markup.match(/member-legacy-phone/g)?.length, 2);
  assert.match(markup, /member-screen-grid/);
  assert.doesNotMatch(markup, /coaching-1254w\.jpg/);
  assert.match(markup, /phone-progress-1000\.jpg/);
});

test("the long-view photo uses the selected phone portrait without changing copy or frame", () => {
  const markup = readLegacyMainMarkup("members/index.html");
  const longView = markup.match(/<span class="kicker">The long view<\/span>[\s\S]*?<\/section>/)?.[0];

  assert.ok(longView);
  assert.match(longView, /<h2>A history that builds\.<\/h2>/);
  assert.match(longView, /What your coach records becomes your record, not just the gym's\./);
  assert.match(longView, /<figure class="shot shot-portrait">/);
  assert.match(longView, /width="1000" height="1250" loading="lazy" decoding="async"/);
  assert.match(longView, /alt="A woman crouched beside her gym bag, smiling while using her phone"/);
  assert.doesNotMatch(markup, /training-(560|1000)\.jpg/);
  for (const size of [560, 1000]) {
    const path = `members-photos/phone-progress-${size}.jpg`;
    assert.ok(longView.includes(`/${path}`));
    assert.equal(existsSync(`public/${path}`), true);
  }
});

test("the repository-owned member screenshots match the supplied masters", () => {
  const expectedHashes = new Map([
    ["movena-member-home.png", "1b5cf1e7eaea0948f591972eb300ea651c67dc3c098d51f9294bcb77d4a4cfb2"],
    ["movena-member-book.png", "dcb75e04344f15a1238f5f2837a9a5791c1163c9e58695a164b0032ac7fe9498"],
    ["movena-member-session-detail.png", "141c3b4d8292bc7870db2991ae16a3744f29b792b79961c7d860f60d36592b10"],
    ["movena-member-movements.png", "a1fc030fbdc00dddea5192e15c09caa930535c308c8f99bed48e2def63d439e9"],
  ]);

  for (const [file, expectedHash] of expectedHashes) {
    assert.equal(sha256(`public/assets/members/${file}`), expectedHash);
  }
});

test("the Members page frame styling is loaded globally", () => {
  assert.match(readFileSync("app/globals.css", "utf8"), /styles\/members\.css/);

  const styles = readFileSync("styles/members.css", "utf8");
  assert.match(styles, /\.member-screen-grid/);
  assert.match(styles, /background:\s*var\(--site-white\)/);
  assert.match(styles, /\.member-legacy-phone\s*\{\s*display:\s*none/);
});
