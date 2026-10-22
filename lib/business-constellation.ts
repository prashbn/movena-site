import type { DiscoveryIconName } from "../components/home-discovery-icon";

// These are Movena capabilities, not third-party products or replacement claims.
export const businessCapabilities: readonly { label: string; icon: DiscoveryIconName; emphasis: "core" | "supporting" | "detail"; orbit: readonly [number, number]; phoneOrbit: readonly [number, number] }[] = [
  { label: "Memberships", icon: "membership", emphasis: "core", orbit: [0.23, 0.38], phoneOrbit: [0.20, 0.36] },
  { label: "Class packs", icon: "pack", emphasis: "detail", orbit: [0.05, 0.07], phoneOrbit: [0.08, 0.05] },
  { label: "Timetables", icon: "day", emphasis: "supporting", orbit: [0.50, 0.08], phoneOrbit: [0.50, 0.06] },
  { label: "Bookings & waitlists", icon: "session", emphasis: "core", orbit: [0.70, 0.16], phoneOrbit: [0.72, 0.20] },
  { label: "Payments", icon: "money", emphasis: "core", orbit: [0.77, 0.38], phoneOrbit: [0.80, 0.40] },
  { label: "Programs", icon: "program", emphasis: "core", orbit: [0.32, 0.79], phoneOrbit: [0.22, 0.68] },
  { label: "Workout builder", icon: "workout", emphasis: "supporting", orbit: [0.16, 0.64], phoneOrbit: [0.08, 0.56] },
  { label: "Exercise progress", icon: "progress", emphasis: "detail", orbit: [0.065, 0.75], phoneOrbit: [0.10, 0.80] },
  { label: "Leads", icon: "enquiry", emphasis: "core", orbit: [0.68, 0.79], phoneOrbit: [0.74, 0.73] },
  { label: "Attendance follow-ups", icon: "followup", emphasis: "supporting", orbit: [0.87, 0.66], phoneOrbit: [0.94, 0.86] },
  { label: "Team tasks", icon: "tasks", emphasis: "supporting", orbit: [0.85, 0.16], phoneOrbit: [0.90, 0.15] },
  { label: "Waivers", icon: "waiver", emphasis: "supporting", orbit: [0.94, 0.37], phoneOrbit: [0.93, 0.27] },
  { label: "Kiosk check-in", icon: "desk", emphasis: "supporting", orbit: [0.94, 0.82], phoneOrbit: [0.10, 0.24] },
  { label: "Door access (add-on)", icon: "door", emphasis: "supporting", orbit: [0.15, 0.16], phoneOrbit: [0.10, 0.15] },
  { label: "Messaging", icon: "chat", emphasis: "supporting", orbit: [0.08, 0.42], phoneOrbit: [0.08, 0.44] },
  { label: "Hangout", icon: "community", emphasis: "detail", orbit: [0.07, 0.60], phoneOrbit: [0.50, 0.29] },
  { label: "Challenges", icon: "trophy", emphasis: "detail", orbit: [0.14, 0.88], phoneOrbit: [0.11, 0.92] },
  { label: "Milestones & rewards", icon: "badge", emphasis: "detail", orbit: [0.40, 0.94], phoneOrbit: [0.38, 0.97] },
  { label: "Retail", icon: "shop", emphasis: "detail", orbit: [0.86, 0.89], phoneOrbit: [0.70, 0.95] },
  { label: "Financial reports", icon: "chart", emphasis: "core", orbit: [0.49, 0.82], phoneOrbit: [0.44, 0.86] },
  { label: "Multiple locations", icon: "location", emphasis: "core", orbit: [0.30, 0.16], phoneOrbit: [0.28, 0.20] },
  { label: "ChatGPT & Claude", icon: "assistant", emphasis: "core", orbit: [0.74, 0.60], phoneOrbit: [0.82, 0.62] },
  { label: "Member app", icon: "member", emphasis: "supporting", orbit: [0.31, 0.57], phoneOrbit: [0.48, 0.76] },
  { label: "Accounting exports", icon: "export", emphasis: "detail", orbit: [0.95, 0.07], phoneOrbit: [0.92, 0.05] },
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };
const mix = (a: number, b: number, progress: number) => progress <= 0 ? a : progress >= 1 ? b : a + (b - a) * progress;

// Each bank has twelve capabilities. Desktop uses two columns per side;
// phones keep a single quiet rail so the CRM remains readable in the centre.
const leftBank: readonly DiscoveryIconName[] = ["pack", "location", "day", "session", "desk", "membership", "door", "money", "waiver", "chart", "export", "shop"];
const rightBank: readonly DiscoveryIconName[] = ["program", "workout", "enquiry", "followup", "tasks", "chat", "assistant", "member", "community", "badge", "progress", "trophy"];

/** Reversible scroll geometry. Motion starts immediately and uses transforms
 * rather than resizing 24 elements on every frame. The product is the endpoint. */
export function constellationFrame(progress: number, columns: 4 | 6 = 6) {
  const t = clamp(progress);
  const compact = columns === 4;
  const spread = ease(t / 0.86);
  const reveal = ease((t - 0.16) / 0.66);
  return {
    spread,
    reveal,
    hubY: mix(0.5, 0.065, spread),
    hubScale: mix(1, 0.38, spread),
    brandOpacity: ease((t - 0.35) / 0.3),
    ringOpacity: (1 - spread) * 0.85,
    nodes: businessCapabilities.map(capability => {
      const left = leftBank.includes(capability.icon);
      const slot = (left ? leftBank : rightBank).indexOf(capability.icon);
      const position = compact ? capability.phoneOrbit : capability.orbit;
      const orbitX = compact ? position[0] : 0.5 + (position[0] - 0.5) * 0.74;
      const dockX = compact ? (left ? 0.04 : 0.96) : left ? (slot % 2 ? 0.135 : 0.04) : (slot % 2 ? 0.96 : 0.865);
      const dockY = compact ? 0.22 + slot * 0.7 / 11 : 0.19 + Math.floor(slot / 2) * 0.72 / 5;
      return {
        x: mix(orbitX, dockX, spread),
        y: mix(position[1], dockY, spread),
        sizeProgress: spread,
        labelOpacity: compact ? 0 : ease((t - 0.42) / 0.38),
      };
    }),
  };
}
