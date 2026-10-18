import { readLegacyMainMarkup } from "@/lib/legacy-content";
import type { LegacySource } from "@/lib/routes";
import { HomeLoop } from "./home-loop";
import { HomePlatformDiscovery } from "./home-platform-discovery";
import { HomeTrainingDisciplines } from "./home-training-connection";
import { AiConnections } from "./ai-connections";
import { HomeOwnerPage } from "./home-owner-page";

type LegacyMainProps = {
  source: LegacySource;
  ownerHomepage?: boolean;
};

export function LegacyMain({ source, ownerHomepage = false }: LegacyMainProps) {
  if (source === "index.html" && ownerHomepage) return <HomeOwnerPage />;
  const markup = readLegacyMainMarkup(source);
  if (source === "index.html") {
    // Keep the frozen source; render interactive discovery and real product proof natively.
    const sections = markup.split(/(<section id="(?:loop|platform|disciplines)">[\s\S]*?<\/section>)/g);
    return <main id="main">{sections.map((section, index) => {
      if (section.startsWith('<section id="loop">')) return <HomeLoop key="loop" />;
      if (section.startsWith('<section id="platform">')) return <div key="platform"><HomePlatformDiscovery /><AiConnections /></div>;
      if (section.startsWith('<section id="disciplines">')) return <HomeTrainingDisciplines key="disciplines" />;
      return <div key={index} dangerouslySetInnerHTML={{ __html: section }} />;
    })}</main>;
  }
  return (
    <main
      id="main"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
