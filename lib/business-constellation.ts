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

/** Normalised geometry keeps all positions reversible and independent of
 * frame rate. Art-directed positions preserve the visual hierarchy before
 * settling into a responsive grid with every capability. */
export function constellationFrame(progress: number, columns: 4 | 6 = 6) {
  const t = clamp(progress);
  const gather = ease(t / 0.38);
  const spread = ease((t - 0.38) / 0.52);
  return {
    spread,
    hubY: mix(0.5, 0.07, spread),
    hubScale: mix(1 - gather * 0.04, 0.56, spread),
    ringOpacity: (1 - spread) * 0.85,
    nodes: businessCapabilities.map((capability, index) => {
      const radius = mix(1, 0.9, gather);
      const position = columns === 4 ? capability.phoneOrbit : capability.orbit;
      const orbitX = mix(0.5, position[0], radius);
      const orbitY = mix(0.5, position[1], radius);
      const rows = Math.ceil(businessCapabilities.length / columns);
      const gridX = columns === 6 ? 0.08 + (index % columns) * 0.84 / (columns - 1) : 0.1 + (index % columns) * 0.8 / (columns - 1);
      const gridY = (columns === 6 ? 0.25 : 0.21) + Math.floor(index / columns) * (columns === 6 ? 0.6 : 0.69) / (rows - 1);
      return {
        x: mix(orbitX, gridX, spread),
        y: mix(orbitY, gridY, spread),
        scale: mix(mix(1, 0.94, gather), 1, spread),
        labelOpacity: ease((t - 0.5) / 0.35),
      };
    }),
  };
}
