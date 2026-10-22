import assert from "node:assert/strict";
import test from "node:test";
import { businessCapabilities, constellationFrame } from "../lib/business-constellation.ts";

test("scroll endpoints clamp to responsive grids containing every capability", () => {
  assert.deepEqual(constellationFrame(-1), constellationFrame(0));
  assert.deepEqual(constellationFrame(2), constellationFrame(1));
  for (const columns of [4, 6] as const) {
    const final = constellationFrame(1, columns);
    assert.equal(new Set(final.nodes.map(node => node.x)).size, columns);
    assert.equal(new Set(final.nodes.map(node => node.y)).size, Math.ceil(businessCapabilities.length / columns));
    assert.equal(new Set(final.nodes.map(node => `${node.x}/${node.y}`)).size, businessCapabilities.length);
    assert.ok(final.nodes.every(node => node.labelOpacity === 1));
    assert.ok(final.hubY < Math.min(...final.nodes.map(node => node.y)));
  }
});

test("scroll geometry is reversible and stays inside the board throughout the transition", () => {
  for (const columns of [4, 6] as const) {
    const frames = Array.from({ length: 101 }, (_, index) => constellationFrame(index / 100, columns));
    for (let index = 100; index >= 0; index--) {
      const frame = constellationFrame(index / 100, columns);
      assert.deepEqual(frame, frames[index]);
      for (const node of frame.nodes) {
        assert.ok(Number.isFinite(node.x) && node.x >= 0.05 && node.x <= 0.98);
        assert.ok(Number.isFinite(node.y) && node.y >= 0.05 && node.y <= 0.98);
        assert.ok(node.labelOpacity >= 0 && node.labelOpacity <= 1);
      }
    }
  }
});
