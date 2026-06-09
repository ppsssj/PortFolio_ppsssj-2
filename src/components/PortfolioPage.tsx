import { useEffect } from "react";
import { AnimatedFavicon } from "./AnimatedFavicon";
import { FooterSection } from "./FooterSection";
import { CreatorSection } from "./CreatorSection";
import { DetailsSection } from "./DetailsSection";
import { ElementsSection } from "./ElementsSection";
import { FloatingMenu } from "./FloatingMenu";
import { MarqueeBar } from "./MarqueeBar";
import { PaletteSection } from "./PaletteSection";
import { ScoreSection } from "./ScoreSection";
import { SiteHeader } from "./SiteHeader";

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
          <PaletteSection />
          <DetailsSection />
          <ScoreSection />
        </div>
        <FloatingMenu />
      </main>
      
      <FooterSection />
    </div>
  );
}
