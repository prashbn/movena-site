import { readLegacyMainMarkup } from "@/lib/legacy-content";
import type { LegacySource } from "@/lib/routes";
import { HomeLoop } from "./home-loop";
import { HomePlatformDiscovery } from "./home-platform-discovery";
import { HomeTrainingDisciplines } from "./home-training-connection";
import { AiConnections } from "./ai-connections";
import { rewriteHomepageForOwners } from "@/lib/home-owner-copy";
import { rewriteMarketingPageCopy } from "@/lib/marketing-page-copy";

type LegacyMainProps = {
  source: LegacySource;
  ownerHomepage?: boolean;
};

export function LegacyMain({ source, ownerHomepage = false }: LegacyMainProps) {
  const originalMarkup = readLegacyMainMarkup(source);
  const markup = source === "index.html" && ownerHomepage
    ? rewriteHomepageForOwners(originalMarkup) : rewriteMarketingPageCopy(originalMarkup, source);
  if (source === "index.html") {
    // Keep the frozen source; render interactive discovery and real product proof natively.
    const sections = markup.split(/(<section id="(?:loop|platform|disciplines)">[\s\S]*?<\/section>)/g);
    return <main id="main" className={ownerHomepage ? "home-owner-copy" : undefined}>{sections.map((section, index) => {
      if (section.startsWith('<section id="loop">')) return <HomeLoop key="loop" ownerFirst={ownerHomepage} />;
      if (section.startsWith('<section id="platform">')) return <div key="platform"><HomePlatformDiscovery ownerFirst={ownerHomepage} /><AiConnections ownerFirst={ownerHomepage} /></div>;
      if (section.startsWith('<section id="disciplines">')) return <HomeTrainingDisciplines key="disciplines" ownerFirst={ownerHomepage} />;
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
