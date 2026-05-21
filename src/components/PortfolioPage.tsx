import { useEffect } from "react";
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
      <div className="cookies-popup is-show">
        <p>
          This website uses cookies to ensure you get the best experience on our website.{" "}
          <a className="link-underlined" href="#footer">
            Cookies Policy
          </a>
        </p>
        <button className="button button--small--rounded--white" type="button">
          GOT IT
        </button>
      </div>
      <FooterSection />
    </div>
  );
}
