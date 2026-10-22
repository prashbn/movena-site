import Image from "next/image";
import type { ReactNode } from "react";
import type { DiscoveryIconName } from "./home-discovery-icon";

// A dedicated filled symbol system for this visual. The small interface details
// distinguish the capabilities without borrowing another product's identity.
const marks: Partial<Record<DiscoveryIconName, ReactNode>> = {
  membership: <><rect x="3" y="6" width="26" height="21" rx="4" opacity=".16" /><circle cx="11" cy="13" r="3.5" /><path d="M5.5 24v-2a5.5 5.5 0 0 1 11 0v2z" /><rect x="20" y="11" width="6" height="3" rx="1.5" /><rect x="20" y="17" width="6" height="3" rx="1.5" /></>,
  pack: <><rect x="9" y="3" width="20" height="23" rx="3" opacity=".2" /><rect x="3" y="8" width="20" height="23" rx="3" /><path d="M8 15h10M8 21h7" className="capability-mark__cut-line" /></>,
  day: <><rect x="4" y="6" width="24" height="24" rx="4" opacity=".18" /><path d="M8 2h3v8H8zm13 0h3v8h-3zM4 11h24v4H4z" /><rect x="9" y="19" width="5" height="5" rx="1" /><rect x="18" y="19" width="5" height="5" rx="1" /></>,
  session: <><rect x="4" y="4" width="24" height="25" rx="4" /><path d="M4 11h24" className="capability-mark__cut-line" /><path d="m10 20 4 4 8-8" className="capability-mark__cut-line" /><path d="M10 2v5m12-5v5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></>,
  money: <><rect x="7" y="2" width="23" height="21" rx="4" opacity=".2" /><rect x="2" y="8" width="25" height="22" rx="4" /><path d="M2 15h25" className="capability-mark__cut-line" /><rect x="7" y="21" width="7" height="3" rx="1.5" className="capability-mark__cut" /><circle cx="21" cy="23" r="2" className="capability-mark__cut" /></>,
  program: <><rect x="9" y="2" width="20" height="25" rx="3" opacity=".18" /><rect x="3" y="6" width="21" height="25" rx="3" /><path d="M8 12h11M8 18h11M8 24h6" className="capability-mark__cut-line" /></>,
  workout: <><rect x="1" y="11" width="4" height="10" rx="1.5" /><rect x="6" y="6" width="5" height="20" rx="2" /><rect x="11" y="14" width="10" height="4" /><rect x="21" y="6" width="5" height="20" rx="2" /><rect x="27" y="11" width="4" height="10" rx="1.5" /></>,
  progress: <><path d="M3 28V4h3v21h24v3z" opacity=".25" /><path d="m7 20 7-8 6 4 9-12v9l-8 8-6-4-6 7z" /><circle cx="14" cy="12" r="2.5" /><circle cx="20" cy="16" r="2.5" /></>,
  enquiry: <><rect x="3" y="5" width="26" height="23" rx="5" opacity=".18" /><path d="M3 9v15a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V9L16 19z" /><path d="m6 7 10 8L26 7z" /></>,
  followup: <><circle cx="11" cy="10" r="5" /><path d="M2 28v-4a9 9 0 0 1 18 0v4z" opacity=".25" /><rect x="17" y="15" width="14" height="11" rx="3" /><path d="m19 25 1 5 5-5z" /><path d="M21 19h6m-6 3h4" className="capability-mark__cut-line" /></>,
  tasks: <><rect x="3" y="3" width="26" height="27" rx="4" opacity=".16" /><path d="m7 10 2 2 4-5m-6 12 2 2 4-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><rect x="17" y="8" width="8" height="3" rx="1.5" /><rect x="17" y="17" width="8" height="3" rx="1.5" /><rect x="7" y="25" width="18" height="2" rx="1" /></>,
  waiver: <><path d="M6 2h13l7 7v19a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3" opacity=".18" /><path d="M18 2v8h8zM11 24l2-7L25 5l5 5-12 12z" /><path d="m9 28 10-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></>,
  desk: <><rect x="2" y="3" width="28" height="20" rx="4" /><path d="m11 12 4 4 7-8" className="capability-mark__cut-line" /><path d="M13 23h6v4h7v3H6v-3h7z" opacity=".3" /></>,
  door: <><path d="M4 4h23v27h-4V8H8v23H4z" opacity=".25" /><path d="m9 6 12-4v29H9z" /><circle cx="17.5" cy="18" r="1.5" className="capability-mark__cut" /></>,
  chat: <><path d="M7 3h18a5 5 0 0 1 5 5v12a5 5 0 0 1-5 5H13l-9 6v-7a5 5 0 0 1-2-4V8a5 5 0 0 1 5-5" /><path d="M8 11h16M8 17h11" className="capability-mark__cut-line" /></>,
  community: <><path d="M4 2h19a4 4 0 0 1 4 4v13H14l-8 6v-6H4a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3" /><path d="M14 22h16V12h1v15h-4v5l-9-5h-4z" opacity=".35" /><circle cx="9" cy="10" r="2" className="capability-mark__cut" /><circle cx="16" cy="10" r="2" className="capability-mark__cut" /><circle cx="23" cy="10" r="2" className="capability-mark__cut" /></>,
  trophy: <><path d="M8 2h16v10a8 8 0 0 1-16 0zM14 20h4v7h7v4H7v-4h7z" /><path d="M8 5H2v6a7 7 0 0 0 8 7M24 5h6v6a7 7 0 0 1-8 7" fill="none" stroke="currentColor" strokeWidth="3" /><path d="m16 6 1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5L11 9.5l3.5-.5z" className="capability-mark__cut" /></>,
  badge: <><path d="m7 17-4 13 9-3 4 5 3-15z" opacity=".25" /><path d="m16 1 4 3 5 1 1 5 3 4-3 4-1 5-5 1-4 3-4-3-5-1-1-5-3-4 3-4 1-5 5-1z" /><path d="m10 14 4 4 8-9" className="capability-mark__cut-line" /></>,
  shop: <><path d="M5 9h22l3 21H2z" /><path d="M10 12V7a6 6 0 0 1 12 0v5" fill="none" stroke="currentColor" strokeWidth="3" /><path d="M10 13v3m12-3v3" className="capability-mark__cut-line" /></>,
  chart: <><rect x="2" y="18" width="7" height="12" rx="2" opacity=".3" /><rect x="12" y="10" width="7" height="20" rx="2" opacity=".6" /><rect x="22" y="2" width="7" height="28" rx="2" /></>,
  location: <><rect x="2" y="15" width="8" height="16" rx="1.5" opacity=".3" /><rect x="12" y="2" width="10" height="29" rx="2" /><rect x="24" y="10" width="7" height="21" rx="1.5" opacity=".55" /><path d="M16 8h2m-2 6h2m-2 6h2" className="capability-mark__cut-line" /></>,
  member: <><rect x="7" y="1" width="19" height="30" rx="4" /><rect x="10" y="6" width="13" height="18" rx="1" className="capability-mark__cut" /><rect x="12" y="9" width="9" height="5" rx="1" opacity=".3" /><path d="M12 18h9m-9 3h6" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="16.5" cy="27.5" r="1.5" className="capability-mark__cut" /></>,
  export: <><path d="M5 2h13l8 8v18a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3" opacity=".2" /><path d="M17 2v9h9zM13 14h5v7h7l-9.5 10L6 21h7z" /></>,
};

export function HomeCapabilityMark({ name }: { name: DiscoveryIconName }) {
  if (name === "assistant") return <span className="business-capability__brands" aria-hidden="true">
    <span className="business-capability__openai"><Image src="/integration-logos/openai-blossom.svg" width={716} height={716} alt="" unoptimized /></span>
    <span className="business-capability__anthropic"><Image src="/integration-logos/anthropic-symbol.svg" width={92} height={65} alt="" unoptimized /></span>
  </span>;
  return <svg className="business-capability__mark" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">{marks[name]}</svg>;
}
