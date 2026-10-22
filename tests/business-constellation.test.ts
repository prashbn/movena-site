import assert from "node:assert/strict";
import test from "node:test";
import { constellationFrame } from "../lib/business-constellation.ts";

test("scroll endpoints clamp to a readable orbit and a distinct four-by-two grid", () => {
  assert.deepEqual(constellationFrame(-1), constellationFrame(0));
  assert.deepEqual(constellationFrame(2), constellationFrame(1));
  const final = constellationFrame(1);
  assert.equal(new Set(final.nodes.map(node => node.x)).size, 4);
  assert.equal(new Set(final.nodes.map(node => node.y)).size, 2);
  assert.equal(new Set(final.nodes.map(node => `${node.x}/${node.y}`)).size, 8);
  assert.ok(final.nodes.every(node => node.labelOpacity === 1));
  assert.ok(final.hubY < Math.min(...final.nodes.map(node => node.y)));
});

test("scroll geometry is reversible and stays inside the board throughout the transition", () => {
  const frames = Array.from({ length: 101 }, (_, index) => constellationFrame(index / 100));
  for (let index = 100; index >= 0; index--) {
    const frame = constellationFrame(index / 100);
    assert.deepEqual(frame, frames[index]);
    for (const node of frame.nodes) {
      assert.ok(Number.isFinite(node.x) && node.x >= 0.1 && node.x <= 0.9);
      assert.ok(Number.isFinite(node.y) && node.y >= 0.1 && node.y <= 0.9);
      assert.ok(node.labelOpacity >= 0 && node.labelOpacity <= 1);
    }
  }
});
