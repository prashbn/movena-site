export type DiscoveryIconName = "session" | "desk" | "member" | "day" | "money" | "team";

const paths: Record<DiscoveryIconName, string> = {
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
