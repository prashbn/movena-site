import assert from "node:assert/strict";
import test from "node:test";
import { enquiryStoryReducer as reduce, initialEnquiryStory } from "../lib/enquiry-story.ts";

test("playback reaches the draft and stops without approving or replaying it", () => {
  let state = reduce(initialEnquiryStory, { type: "play" });
  for (let index = 0; index < 8; index++) state = reduce(state, { type: "advance" });
  assert.deepEqual(state, { step: 3, playing: false, approved: false });
  assert.deepEqual(reduce(state, { type: "approve" }), { step: 3, playing: false, approved: true });
});

test("pausing or manually selecting a scene prevents a pending timer from advancing", () => {
  const playing = reduce(initialEnquiryStory, { type: "play" });
  const paused = reduce(playing, { type: "pause" });
  assert.deepEqual(reduce(paused, { type: "advance" }), paused);
  const selected = reduce(playing, { type: "select", step: 2 });
  assert.deepEqual(reduce(selected, { type: "advance" }), selected);
  assert.equal(reduce(selected, { type: "approve" }).approved, false);
});

test("replay resets example approval and resumes from the enquiry", () => {
  const approved = reduce({ step: 3, playing: false, approved: false }, { type: "approve" });
  assert.deepEqual(reduce(approved, { type: "play" }), { step: 0, playing: true, approved: false });
});
