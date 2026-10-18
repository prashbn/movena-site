import assert from "node:assert/strict";
import test from "node:test";
import { readLegacyMainMarkup } from "../lib/legacy-content.ts";
import { rewriteMarketingPageCopy } from "../lib/marketing-page-copy.ts";

for (const source of ["platform/index.html", "members/index.html"] as const) {
  test(`${source} editorial pass preserves media, layout and motion hooks`, () => {
    const before = readLegacyMainMarkup(source);
    const after = rewriteMarketingPageCopy(before, source);
    for (const attribute of ["src", "srcset", "alt", "class", "style", "id", "width", "height", "loading", "aria-label"]) {
      const pattern = new RegExp(`\\b${attribute}="[^"]*"`, "g");
      assert.deepEqual(after.match(pattern), before.match(pattern), attribute);
    }
    const links = (markup: string): string[] => markup.match(/href="[^"]*"/g) ?? [];
    const finalLinks = links(after);
    if (source === "platform/index.html") {
      // Drafting now has a nearby privacy link; all existing destinations stay.
      const privacyIndex = finalLinks.indexOf('href="/legal/privacy/"');
      assert.ok(privacyIndex >= 0);
      finalLinks.splice(privacyIndex, 1);
      assert.match(after, /approve before anything is sent/);
      assert.match(after, /automatic promotion when your gym enables it/);
      assert.match(after, /QuickBooks and MYOB use exports, not direct connections/);
    } else {
      assert.match(after, /participating Movena gyms/);
      assert.match(after, /invitation from your gym/);
      assert.match(after, /If your gym enables automatic promotion/);
      assert.match(after, /don’t transfer to another gym/);
      assert.match(after, /Raw workout logs aren’t shared across gyms/);
    }
    assert.deepEqual(finalLinks, links(before));
    assert.equal(after.match(/<h1>/g)?.length, 1);
    assert.doesNotMatch(after, /payroll|commissions|enterprise-grade|never lose a lead|legally binding|injury risk/i);
  });
}

test("page editorial copy does not alter the homepage or legal and help pages", () => {
  for (const source of ["index.html", "help/index.html", "help/ai-assistants/index.html", "legal/privacy/index.html", "legal/terms/index.html", "integrations/kisi/index.html"] as const) {
    const markup = readLegacyMainMarkup(source);
    assert.equal(rewriteMarketingPageCopy(markup, source), markup);
  }
});
