import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import { join, relative } from "node:path";
import test from "node:test";

function filesUnder(root: string): string[] {
  const results: string[] = [];

  for (const entry of readdirSync(root)) {
    const path = join(root, entry);
    if (statSync(path).isDirectory()) {
      results.push(...filesUnder(path));
    } else {
      results.push(path);
    }
  }

  return results.sort();
}

function sha256(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

test("Next public assets are an exact, non-destructive copy of legacy assets", () => {
  const legacyFiles = filesUnder("assets");
  const publicFiles = filesUnder("public/assets");
  const legacyPaths = legacyFiles.map((path) => relative("assets", path));
  const legacyPathSet = new Set(legacyPaths);

  assert.deepEqual(
    publicFiles
      .map((path) => relative("public/assets", path))
      .filter((path) => !legacyPathSet.has(path)),
    [
      "app/movena-app-page-qr.png",
      "app/movena-class-booking.jpg",
      "app/movena-training-performance.jpg",
    ],
  );

  for (const legacyPath of legacyFiles) {
    const publicPath = join("public/assets", relative("assets", legacyPath));
    assert.equal(sha256(publicPath), sha256(legacyPath), publicPath);
  }
});

test("the baseline has no runtime application or marketing backend surface", () => {
  assert.equal(existsSync("app/api"), false);
  assert.equal(existsSync("middleware.ts"), false);
  assert.equal(existsSync("middleware.js"), false);

  const sourceRoots = ["app", "components", "lib"];
  const sourceFiles = sourceRoots.flatMap(filesUnder).filter((path) =>
    /\.(?:ts|tsx)$/.test(path),
  );

  const forbidden = [
    /\bfetch\s*\(/,
    /["']use server["']/,
    /\bcookies\s*\(/,
    /\bheaders\s*\(/,
    /\brevalidate\s*=/,
  ];

  for (const sourceFile of sourceFiles) {
    const source = readFileSync(sourceFile, "utf8");
    for (const pattern of forbidden) {
      assert.doesNotMatch(source, pattern, `${sourceFile} matched ${pattern}`);
    }
  }

  assert.match(readFileSync("app/layout.tsx", "utf8"), /force-static/);
  assert.match(readFileSync("next.config.ts", "utf8"), /trailingSlash:\s*true/);
  assert.equal(readFileSync("CNAME", "utf8"), "movena.com.au");

  const saasReferences = sourceFiles.filter((sourceFile) =>
    readFileSync(sourceFile, "utf8").includes("app.movena.com.au"),
  );
  assert.deepEqual(saasReferences, ["lib/site-config.ts"]);
});

test("the repository has one consistent Node 24 runtime contract", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
    engines?: { node?: string };
  };

  assert.equal(packageJson.engines?.node, "24.x");
  assert.equal(readFileSync(".nvmrc", "utf8").trim(), "24");
  assert.equal(existsSync(".node-version"), false);
});
