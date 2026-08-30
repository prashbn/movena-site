import { readLegacyMainMarkup } from "@/lib/legacy-content";
import type { LegacySource } from "@/lib/routes";

type LegacyMainProps = {
  source: LegacySource;
};

export function LegacyMain({ source }: LegacyMainProps) {
  return (
    <main
      id="main"
      dangerouslySetInnerHTML={{ __html: readLegacyMainMarkup(source) }}
    />
  );
}
