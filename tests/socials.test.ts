import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { siteConfig } from "../lib/site-config.ts";
import { organizationStructuredData } from "../lib/structured-data.ts";

test("Movena social destinations remain exact and first-party", () => {
  assert.deepEqual(siteConfig.social, {
    facebook: "https://www.facebook.com/profile.php?id=61594035146486",
    instagram: "https://www.instagram.com/movena_au/",
    linkedin: "https://www.linkedin.com/company/movena-au/",
  });

  assert.deepEqual(
    organizationStructuredData.sameAs,
    Object.values(siteConfig.social),
  );
});

test("the shared footer exposes all three social profiles safely", () => {
  const footer = readFileSync("components/site-footer.tsx", "utf8");
  const css = readFileSync("styles/premium-shell.css", "utf8");

  assert.match(footer, /Find us on social/);
  assert.match(footer, /siteConfig\.social\.facebook/);
  assert.match(footer, /siteConfig\.social\.instagram/);
  assert.match(footer, /siteConfig\.social\.linkedin/);
  assert.equal((footer.match(/rel="noopener noreferrer"/g) ?? []).length, 3);
  assert.equal((footer.match(/target="_blank"/g) ?? []).length, 3);
  assert.match(css, /\.site-footer__social-link/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});
