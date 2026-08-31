import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  readLegacyDocument,
  readUnmodifiedLegacyMainMarkup,
} from "../lib/legacy-content.ts";
import type { LegacySource } from "../lib/routes.ts";

type ContentSnapshot = {
  source: LegacySource;
  documentSha256: string;
  mainSha256: string;
};

const snapshots = JSON.parse(
  readFileSync("tests/fixtures/content-snapshots.json", "utf8"),
) as ContentSnapshot[];

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

test("all seven approved legacy documents match their frozen snapshots", () => {
  assert.equal(snapshots.length, 7);

  for (const snapshot of snapshots) {
    const document = readLegacyDocument(snapshot.source);
    const productionDocument = readFileSync(snapshot.source, "utf8");
    const main = readUnmodifiedLegacyMainMarkup(snapshot.source);

    assert.equal(
      sha256(document),
      snapshot.documentSha256,
      `${snapshot.source} changed; approved copy and production markup are frozen`,
    );
    assert.equal(
      sha256(productionDocument),
      snapshot.documentSha256,
      `${snapshot.source} production source changed; GitHub Pages files are frozen`,
    );
    assert.equal(
      document,
      productionDocument,
      `${snapshot.source} migration copy differs from the GitHub Pages source`,
    );
    assert.equal(
      sha256(main),
      snapshot.mainSha256,
      `${snapshot.source} <main> content changed; approved copy is frozen`,
    );
  }
});

test("immutable document dates remain unchanged", () => {
  assert.match(
    readLegacyDocument("help/index.html"),
    /Last updated: 2 August 2026/,
  );
  assert.match(
    readLegacyDocument("legal/privacy/index.html"),
    /Last updated: 31 August 2026/,
  );
  assert.match(
    readLegacyDocument("legal/terms/index.html"),
    /Last updated: 3 August 2026/,
  );
});
