import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("homepage and integrations give both AI connections a prominent branded section", () => {
  const component = readFileSync("components/ai-connections.tsx", "utf8");
  for (const page of ["components/legacy-main.tsx", "app/integrations/page.tsx"]) {
    assert.match(readFileSync(page, "utf8"), /<AiConnections(?: ownerFirst=\{ownerHomepage\})? \/>/);
  }
  assert.match(component, /Your gym\.<br \/>A conversation away\./);
  assert.equal((component.match(/<article className="ai-connection">/g) ?? []).length, 2);
  for (const asset of ["openai-blossom.svg", "anthropic-symbol.svg"]) assert.ok(component.includes(asset));
  for (const heading of ["ChatGPT", "Claude"]) assert.ok(component.includes(`<h3>${heading}</h3>`));
  assert.match(component, /Connector enabled · Directory listing in review/);
  assert.match(component, /role, permissions and member consent/);
  assert.match(component, /read-only answers/);
  assert.match(component, /compatibility, not endorsement/);
  assert.doesNotMatch(component, /api\/mcp|AI responds to leads|AI checks completion/);
});

test("AI artwork keeps its native contrast, proportions and responsive card layout", () => {
  const css = readFileSync("styles/ai-connections.css", "utf8");
  assert.match(readFileSync("app/globals.css", "utf8"), /styles\/ai-connections\.css/);
  assert.match(css, /repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width: 700px\)/);
  assert.match(css, /background: #fafbfd/);
  assert.match(css, /object-fit: contain; height: auto/);
  assert.doesNotMatch(css, /filter:|mix-blend-mode:/);
});
