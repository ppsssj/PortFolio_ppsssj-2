import { useEffect } from "react";
import { AnimatedFavicon } from "./AnimatedFavicon";
import { FooterSection } from "./FooterSection";
import { CreatorSection } from "./CreatorSection";
import { ElementsSection } from "./ElementsSection";
import { FloatingMenu } from "./FloatingMenu";
import { GitHubContributionsSection } from "./GitHubContributionsSection";
import { MarketplaceStatsSection } from "./MarketplaceStatsSection";
import { MarqueeBar } from "./MarqueeBar";
import { PaletteSection } from "./PaletteSection";
import { SiteHeader } from "./SiteHeader";
import { StackRecordsSection } from "./StackRecordsSection";
import { TechnologiesSection } from "./TechnologiesSection";

export function PortfolioPage() {
  useEffect(() => {
    document.body.classList.add("has-header-above", "has-content-header");

    return () => {
      document.body.classList.remove("has-header-above", "has-content-header");
    };
  }, []);

  return (
    <div className="page-shell">
      <AnimatedFavicon />
      <div className="eu-location" data-eu="0" />
      <MarqueeBar />
      <SiteHeader />
      <main className="wrapper" id="content">
        <CreatorSection />
        <ElementsSection />
        <div className="inner">
          <MarketplaceStatsSection />
          <PaletteSection />
          <TechnologiesSection />
          <StackRecordsSection />
          <GitHubContributionsSection />
        </div>
        <FloatingMenu />
      </main>
      
      <FooterSection />
    </div>
  );
}
