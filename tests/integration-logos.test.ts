import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { publicIntegrations } from "../lib/integrations.ts";

const approvedAssets = {
  "apple-health-badge.svg": "31782111fb788796a204688ac9eaba0a0b5d33c9711c14f4f9f60fd03b81bb13",
  "openai-blossom.svg": "75c1e9fffa5e8c437bec1d67197a73992bca45d166c6ff23215185dea8fae92a",
  "anthropic-symbol.svg": "ec4b07d5814fe6171bb21cc074f5f56bcd358f38cacd31773e1d37777df09907",
  "google-g-logo.png": "4d5cfbd85af19c003770a74f8de210156ca42c54ac0a4cb0d95572c286c882a6",
  "myob-logo.png": "789224f0306d9e5b0a1748397eceef5055f374f21649b454bd273bebe024ad85",
  "quickbooks-logo.png": "fbb9a774485736d868563505d849ce6fb080cf6019bc0161402f3df7f4616095",
  "stripe-logo.svg": "4448c4b4f954285d2b2aeb6d92391c85fdc290e008c2679d2c006d6d72ae1ae9",
};

test("every integration has local logo artwork with positive dimensions", () => {
  assert.equal(publicIntegrations.length, 12);
  for (const { mark } of publicIntegrations) {
    assert.equal(mark.kind, "image");
    assert.ok(mark.width > 0 && mark.height > 0);
    assert.ok(existsSync(`public${mark.src}`), mark.src);
  }
});

test("approved integration artwork retains its recorded geometry and colours", () => {
  const provenance = readFileSync("docs/integration-brand-assets.md", "utf8");
  for (const [name, hash] of Object.entries(approvedAssets)) {
    const bytes = readFileSync(`public/integration-logos/${name}`);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), hash, name);
    assert.ok(provenance.includes(hash), name);
    if (name.endsWith(".svg")) {
      const svg = bytes.toString("utf8");
      assert.match(svg, /<svg\b/);
      assert.doesNotMatch(svg, /<script\b|<foreignObject\b|\bonload\s*=|(?:href|src)=["']https?:/i);
    } else {
      assert.equal(bytes.subarray(1, 4).toString(), "PNG");
    }
  }
});

test("logo sizing preserves aspect ratio and native contrast in both themes", () => {
  const css = readFileSync("styles/integrations.css", "utf8");
  const themes = readFileSync("styles/themes.css", "utf8");
  assert.match(css, /object-fit: contain/);
  assert.match(css, /integration-card__brand--wordmark img/);
  assert.match(themes, /\.integration-card__brand \{ background: #fafbfd/);
  assert.doesNotMatch(css, /filter:\s*(?:invert|grayscale)/);
});
