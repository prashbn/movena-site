import type { DiscoveryIconName } from "../components/home-discovery-icon";

// These are Movena capabilities, not third-party products or replacement claims.
export const businessCapabilities: readonly { label: string; icon: DiscoveryIconName }[] = [
  { label: "Memberships", icon: "membership" },
  { label: "Class packs", icon: "pack" },
  { label: "Timetables", icon: "day" },
  { label: "Bookings & waitlists", icon: "session" },
  { label: "Payments", icon: "money" },
  { label: "Programs", icon: "program" },
  { label: "Workout builder", icon: "workout" },
  { label: "Exercise progress", icon: "progress" },
  { label: "Leads", icon: "enquiry" },
  { label: "Attendance follow-ups", icon: "followup" },
  { label: "Team tasks", icon: "tasks" },
  { label: "Waivers", icon: "waiver" },
  { label: "Kiosk check-in", icon: "desk" },
  { label: "Door access (add-on)", icon: "door" },
  { label: "Messaging", icon: "chat" },
  { label: "Hangout", icon: "community" },
  { label: "Challenges", icon: "trophy" },
  { label: "Milestones & rewards", icon: "badge" },
  { label: "Retail", icon: "shop" },
  { label: "Financial reports", icon: "chart" },
  { label: "Multiple locations", icon: "location" },
  { label: "ChatGPT & Claude", icon: "assistant" },
  { label: "Member app", icon: "member" },
  { label: "Accounting exports", icon: "export" },
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };
const mix = (a: number, b: number, progress: number) => progress <= 0 ? a : progress >= 1 ? b : a + (b - a) * progress;

/** Normalised geometry keeps all positions reversible and independent of
 * frame rate. Two rings settle into a responsive grid with every capability. */
export function constellationFrame(progress: number, columns: 4 | 6 = 6) {
  const t = clamp(progress);
  const gather = ease(t / 0.38);
  const spread = ease((t - 0.38) / 0.52);
  return {
    hubY: mix(0.5, 0.065, spread),
    hubScale: mix(1 - gather * 0.18, 0.6, spread),
    ringOpacity: (1 - spread) * 0.85,
    nodes: businessCapabilities.map((_, index) => {
      const inner = index < 8;
      const angle = -Math.PI / 2 + (inner ? index * Math.PI / 4 : (index - 8) * Math.PI / 8 + Math.PI / 16) + gather * 0.12;
      const radius = mix(1, 0.84, gather);
      const orbitX = 0.5 + Math.cos(angle) * (inner ? 0.27 : 0.44) * radius;
      const orbitY = 0.5 + Math.sin(angle) * (inner ? 0.25 : 0.42) * radius;
      const rows = Math.ceil(businessCapabilities.length / columns);
      const gridX = columns === 6 ? 0.08 + (index % columns) * 0.84 / (columns - 1) : 0.1 + (index % columns) * 0.8 / (columns - 1);
      const gridY = (columns === 6 ? 0.28 : 0.24) + Math.floor(index / columns) * (columns === 6 ? 0.66 : 0.7) / (rows - 1);
      return {
        x: mix(orbitX, gridX, spread),
        y: mix(orbitY, gridY, spread),
        scale: mix(mix(0.9, 0.78, gather), 1, spread),
        labelOpacity: ease((t - 0.5) / 0.35),
      };
    }),
  };
}
