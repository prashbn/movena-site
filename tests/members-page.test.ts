import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { readLegacyMainMarkup } from "../lib/legacy-content.ts";

function sha256(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

test("the Members page mixes themes and introduces Hangout and Shop", () => {
  const markup = readLegacyMainMarkup("members/index.html");

  for (const asset of [
    "home.png",
    "home-dark.png",
    "book.png",
    "workout-dark.png",
    "progress.png",
    "progress-dark.png",
    "hangout-whats-on.png",
    "hangout-know-how.png",
    "shop-dark.png",
  ]) {
    assert.ok(markup.includes(`/members-screens/1.8.0/${asset}`));
  }

  assert.doesNotMatch(markup, /\/assets\/members\/movena-member-/);
  assert.equal(markup.match(/class="member-screen /g)?.length, 9);
  assert.equal(markup.match(/width="1320" height="2868"/g)?.length, 9);
  assert.equal(markup.match(/class="member-screen-stack"/g)?.length, 2);
  assert.match(markup, /aria-label="Home in light and dark mode"/);
  assert.match(markup, /aria-label="Progress in light and dark mode"/);
  assert.match(markup, /id="members-hangout-heading"/);
  assert.match(markup, /id="members-shop-heading"/);
  assert.ok(markup.indexOf('id="members-hangout-heading"') < markup.indexOf('id="members-shop-heading"'));
  assert.match(markup, /sec-num mono">06<\/span><span class="kicker">Yours/);
  assert.match(markup, /barbell bench press result and movement history/);
  assert.match(markup, /workout screen showing the day's movements, sets and repetitions/);
  assert.equal(markup.match(/member-legacy-phone/g)?.length, 2);
  assert.match(markup, /member-screen-grid/);
  assert.doesNotMatch(markup, /coaching-1254w\.jpg/);
  assert.match(markup, /phone-progress-1000\.jpg/);
});

test("the selected 1.8.0 screenshots retain their original pixels and proportions", () => {
  const expectedHashes = new Map([
    ["home.png", "beb6fc9e36fb22e310c823de606cfda0e5ded22f1251cb3acad51c2f30d7bdef"],
    ["book.png", "2c4a6fd76fc481ed0931e7375ecc96e03aff0b26f73939d5be4f13615838ebda"],
    ["workout.png", "3709d172221f7e78e9d0f18ca247ab259b68683a30ccd46927f028aaa11a84ba"],
    ["progress.png", "349445f0b37b9e68fc6a0726ac528da690f146713ac246cee46aa3f503ba13f6"],
    ["home-dark.png", "59a0645346fc094df6c28e134bf061c04183a4a42a74495777cdf69374f2359e"],
    ["workout-dark.png", "7a4259e705eb522ba5dd992f158d954cd843072b6e7207a82339e62faeecad57"],
    ["progress-dark.png", "3ce19d8fcbfef5f7f5f86d9b2f1cbc2712ac6d2093ee71a3442cc4ba5cea4c97"],
    ["hangout-know-how.png", "76c746ee0a6d592f448685ad85b479fd44bba0ff86450575ba8f3c421cd47b6b"],
    ["hangout-whats-on.png", "cdeaad5048daeefc9fcc7169f1f5be62efe1cf85ae4dc3a04ccbfe25e7a9ef7b"],
    ["shop-dark.png", "55b000da09fc0d21cc777c38b48846bf1156c686496670d91582d10b13bd8200"],
  ]);
  for (const [file, hash] of expectedHashes) {
    const path = `public/members-screens/1.8.0/${file}`;
    assert.equal(sha256(path), hash);
    const png = readFileSync(path);
    assert.equal(png.readUInt32BE(16), 1320);
    assert.equal(png.readUInt32BE(20), 2868);
  }
  const styles = readFileSync("styles/members.css", "utf8");
  assert.match(styles, /\.member-screen img\s*\{[^}]*height:\s*auto/);
  assert.doesNotMatch(readLegacyMainMarkup("platform/index.html"), /\/members-screens\/1\.8\.0\//);
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
  assert.match(styles, /grid-template-columns:\s*repeat\(2, minmax\(0, 20rem\)\)/);
  assert.match(styles, /\.member-screen-stack[\s\S]*grid-template-columns:\s*repeat\(12, minmax\(0, 1fr\)\)/);
  assert.match(styles, /grid-column:\s*1 \/ 8/);
  assert.match(styles, /grid-column:\s*6 \/ 13/);
  assert.match(styles, /background:\s*var\(--site-white\)/);
  assert.match(styles, /\.member-legacy-phone\s*\{\s*display:\s*none/);
});
