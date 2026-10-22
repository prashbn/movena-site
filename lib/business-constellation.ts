import type { DiscoveryIconName } from "../components/home-discovery-icon";

// These are Movena capabilities, not third-party products or replacement claims.
export const businessCapabilities: readonly { label: string; icon: DiscoveryIconName }[] = [
  { label: "Memberships", icon: "membership" },
  { label: "Bookings", icon: "day" },
  { label: "Payments", icon: "money" },
  { label: "Programs", icon: "program" },
  { label: "Leads", icon: "enquiry" },
  { label: "Team tasks", icon: "tasks" },
  { label: "Waivers", icon: "waiver" },
  { label: "Kiosk check-in", icon: "desk" },
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };
const mix = (a: number, b: number, progress: number) => progress <= 0 ? a : progress >= 1 ? b : a + (b - a) * progress;

/** Normalised geometry keeps all positions reversible and independent of
 * frame rate. Icons gather gently, then settle into four columns by two rows. */
export function constellationFrame(progress: number) {
  const t = clamp(progress);
  const gather = ease(t / 0.38);
  const spread = ease((t - 0.38) / 0.52);
  return {
    hubY: mix(0.5, 0.17, spread),
    hubScale: mix(1 - gather * 0.22, 0.78, spread),
    ringOpacity: (1 - spread) * 0.65,
    nodes: businessCapabilities.map((_, index) => {
      const angle = -Math.PI / 2 + index * Math.PI / 4 + gather * 0.12;
      const radius = mix(1, 0.72, gather);
      const orbitX = 0.5 + Math.cos(angle) * 0.38 * radius;
      const orbitY = 0.5 + Math.sin(angle) * 0.38 * radius;
      return {
        x: mix(orbitX, [0.15, 0.385, 0.615, 0.85][index % 4], spread),
        y: mix(orbitY, index < 4 ? 0.52 : 0.85, spread),
        scale: mix(mix(1, 0.78, gather), 1, spread),
        labelOpacity: mix(1 - gather * 0.8, 1, spread),
      };
    }),
  };
}
