import assert from "node:assert/strict";
import test from "node:test";
import { businessCapabilities, constellationFrame } from "../lib/business-constellation.ts";

test("scroll endpoints reveal the CRM between two complete capability banks", () => {
  assert.deepEqual(constellationFrame(-1), constellationFrame(0));
  assert.deepEqual(constellationFrame(2), constellationFrame(1));
  for (const columns of [4, 6] as const) {
    const final = constellationFrame(1, columns);
    assert.equal(final.reveal, 1);
    assert.equal(final.brandOpacity, 1);
    assert.equal(final.ringOpacity, 0);
    assert.equal(final.nodes.length, businessCapabilities.length);
    assert.equal(final.nodes.filter(node => node.x < 0.2).length, 12);
    assert.equal(final.nodes.filter(node => node.x > 0.8).length, 12);
    assert.equal(new Set(final.nodes.map(node => `${node.x}/${node.y}`)).size, businessCapabilities.length);
    assert.ok(final.hubY < Math.min(...final.nodes.map(node => node.y)));
    // Keep the central CRM and its text clear of circles and side labels.
    const width = columns === 6 ? 1200 : 350;
    const footprint = columns === 6 ? 47 : 12;
    const centreEdge = columns === 6 ? width * 0.2 : 32;
    for (const node of final.nodes) {
      if (node.x < 0.5) assert.ok(width * node.x + footprint < centreEdge);
      else assert.ok(width * node.x - footprint > width - centreEdge);
    }
  }
});

test("motion begins immediately, reverses deterministically and reveals without flashes", () => {
  for (const columns of [4, 6] as const) {
    const initial = constellationFrame(0, columns);
    const early = constellationFrame(0.1, columns);
    assert.ok(early.nodes.every((node, index) => node.x !== initial.nodes[index].x || node.y !== initial.nodes[index].y));
    const frames = Array.from({ length: 101 }, (_, index) => constellationFrame(index / 100, columns));
    for (let index = 100; index >= 0; index--) {
      const frame = constellationFrame(index / 100, columns);
      assert.deepEqual(frame, frames[index]);
      if (index > 0) assert.ok(frame.reveal >= frames[index - 1].reveal);
      for (const node of frame.nodes) {
        assert.ok(Number.isFinite(node.x) && node.x >= 0.04 && node.x <= 0.96);
        assert.ok(Number.isFinite(node.y) && node.y >= 0.05 && node.y <= 0.98);
        assert.ok(node.sizeProgress >= 0 && node.sizeProgress <= 1);
        assert.ok(node.labelOpacity >= 0 && node.labelOpacity <= 1);
      }
    }
  }
});
