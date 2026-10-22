export type DiscoveryIconName = "session" | "desk" | "member" | "day" | "money" | "team" | "door" | "enquiry" | "alert" | "approval" | "reply" | "play" | "pause" | "cursor" | "membership" | "program" | "tasks" | "waiver" | "pack" | "workout" | "progress" | "followup" | "chat" | "community" | "trophy" | "badge" | "shop" | "chart" | "location" | "assistant" | "export";

const paths: Record<DiscoveryIconName, string> = {
  pack: "M4 7h14v14H4z M7 3h14v14 M8 12h6 M8 16h4",
  workout: "M6 5v14 M3 8v8 M18 5v14 M21 8v8 M6 12h12",
  progress: "M3 3v18h18 M6 16l5-5 4 2 5-7 M16 6h4v4",
  followup: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M2 21v-2a6 6 0 0 1 9-5 M15 13h7v6h-4l-3 3z",
  chat: "M3 4h18v13H9l-6 4z M7 8h10 M7 12h6",
  community: "M8 5H3v11h4l4 4v-9h10V3H8z M14 15h4l3 3v-7",
  trophy: "M7 3h10v6a5 5 0 0 1-10 0z M7 5H3v3a4 4 0 0 0 4 4 M17 5h4v3a4 4 0 0 1-4 4 M12 14v7 M7 21h10",
  badge: "M12 3l3 2 4 1v4l2 3-3 3-1 4-5-1-5 1-1-4-3-3 2-3V6l4-1z M8 11l3 3 5-6",
  shop: "M4 7h16l1 14H3z M8 7V5a4 4 0 0 1 8 0v2",
  chart: "M3 3v18h18 M7 17v-5 M12 17V7 M17 17V4",
  location: "M12 22s8-7 8-13a8 8 0 1 0-16 0c0 6 8 13 8 13 M12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  assistant: "M3 4h13v11H8l-5 4z M19 9h3v11h-6l-4 3v-5 M7 8h5 M7 11h3",
  export: "M14 3H4v18h16V11 M9 15L21 3 M15 3h6v6",
  membership: "M3 5h18v14H3z M8 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4 M5 16c0-3 6-3 6 0 M14 9h4 M14 13h4",
  program: "M6 3h12v18H6z M9 7h6 M9 11h6 M9 15h3 M9 18h5",
  tasks: "M4 5l2 2 3-3 M12 6h8 M4 12l2 2 3-3 M12 13h8 M4 19l2 2 3-3 M12 20h8",
  waiver: "M14 3H5v18h14v-8 M10 14l1-4 7-7 3 3-7 7-4 1 M16 5l3 3",
  cursor: "M4 3l7 18 3-7 7-3z",
  enquiry: "M3 5h18v14H3z M3 5l9 7 9-7",
  alert: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4",
  approval: "M4 12l5 5L20 6",
  reply: "M9 5l-6 6 6 6 M3 11h11a6 6 0 0 1 6 6v3",
  play: "M7 4l13 8-13 8z",
  pause: "M8 4v16 M16 4v16",
  door: "M3 21h18 M6 21V4l10-2v19 M16 4h3v17 M12 12h1",
  session: "M9 5H5v16h14V5h-4 M9 3h6v4H9z M9 14l2 2 4-4",
  desk: "M3 4h18v13H3z M8 21h8 M12 17v4",
  member: "M7 2h10v20H7z M11 18h2",
  day: "M4 5h16v16H4z M8 3v4 M16 3v4 M4 10h16 M8 14h2 M14 14h2 M8 17h2",
  money: "M3 5h18v14H3z M3 10h18 M7 15h4",
  team: "M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M2 21v-2a6 6 0 0 1 12 0v2 M17 5a3 3 0 0 1 0 6 M18 15a4 4 0 0 1 4 4v2",
};

export function HomeDiscoveryIcon({ name }: { name: DiscoveryIconName }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
