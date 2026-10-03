import { readLegacyMainMarkup } from "@/lib/legacy-content";
import type { LegacySource } from "@/lib/routes";
import { HomeLoop } from "./home-loop";
import { HomePlatformDiscovery } from "./home-platform-discovery";

type LegacyMainProps = {
  source: LegacySource;
};

export function LegacyMain({ source }: LegacyMainProps) {
  const markup = readLegacyMainMarkup(source);
  if (source === "index.html") {
    // Preserve the frozen source while replacing these two sections with native components.
    const sections = markup.split(/(<section id="(?:loop|platform)">[\s\S]*?<\/section>)/g);
    return <main id="main">{sections.map((section, index) => {
      if (section.startsWith('<section id="loop">')) return <HomeLoop key="loop" />;
      if (section.startsWith('<section id="platform">')) return <HomePlatformDiscovery key="platform" />;
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
