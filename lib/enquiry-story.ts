export const enquiryStorySteps = [
  "Enquiry arrives",
  "Team follows up",
  "You see what needs you",
  "You approve",
] as const;

export const enquiryExampleDraft = "Hi Sarah,\n\nThanks for your reply. We’d love to help you find a class at Newtown. What time on Monday evening would suit you?\n\nDana";

export type EnquiryStoryState = {
  step: number;
  playing: boolean;
  approved: boolean;
};

export type EnquiryStoryAction =
  | { type: "play" }
  | { type: "pause" }
  | { type: "advance" }
  | { type: "select"; step: number }
  | { type: "approve" };

export const initialEnquiryStory: EnquiryStoryState = { step: 0, playing: false, approved: false };

// Playback stops at the draft. Approval is always an explicit interaction,
// and is a local demonstration only: it never sends an email.
export function enquiryStoryReducer(state: EnquiryStoryState, action: EnquiryStoryAction): EnquiryStoryState {
  switch (action.type) {
    case "play":
      return { step: state.step === 3 ? 0 : state.step, playing: true, approved: false };
    case "pause":
      return state.playing ? { ...state, playing: false } : state;
    case "advance": {
      if (!state.playing) return state;
      const step = Math.min(3, state.step + 1);
      return { step, playing: step < 3, approved: false };
    }
    case "select":
      return { step: Math.max(0, Math.min(3, action.step)), playing: false, approved: false };
    case "approve":
      return state.step === 3 ? { ...state, playing: false, approved: true } : state;
  }
}
