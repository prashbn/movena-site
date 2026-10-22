export type DiscoveryIconName = "session" | "desk" | "member" | "day" | "money" | "team" | "door" | "enquiry" | "alert" | "approval" | "reply" | "play" | "pause" | "cursor" | "membership" | "program" | "tasks" | "waiver";

const paths: Record<DiscoveryIconName, string> = {
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
