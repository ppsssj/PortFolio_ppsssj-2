import { useEffect, useMemo, useRef, useState } from "react";

import { getProjectSlug, projectCaseStudies, type HighlightCard } from "../data/portfolio";
import { AnimatedFavicon } from "./AnimatedFavicon";
import { FooterSection } from "./FooterSection";
import { MarqueeBar } from "./MarqueeBar";
import { ProjectPreviewImage } from "./ProjectPreviewImage";
import { SiteHeader } from "./SiteHeader";

type ProjectCaseStudyPageProps = {
  card: HighlightCard;
};

function ArrowIcon() {
  return (
    <svg className="ico-svg" viewBox="0 0 24 24" width="18" aria-hidden="true">
      <path d="M6 18 18 6M9 6h9v9" />
    </svg>
  );
}

export function ProjectCaseStudyPage({ card }: ProjectCaseStudyPageProps) {
  const slug = getProjectSlug(card);
  const caseStudy = projectCaseStudies[slug];
  const galleryImages = useMemo(() => card.detailImages ?? [card.image], [card.detailImages, card.image]);
  const githubLink = card.detail.links?.find((link) => link.label.toLowerCase() === "github");
  const marketplaceLink = card.detail.links?.find((link) => link.label.toLowerCase() === "marketplace");
  const heroRef = useRef<HTMLElement | null>(null);
  const heroMediaWrapRef = useRef<HTMLDivElement | null>(null);
  const heroMediaBaseLeftRef = useRef<number | null>(null);
  const [heroMediaProgress, setHeroMediaProgress] = useState(0);
  const [heroMediaShift, setHeroMediaShift] = useState(0);

  useEffect(() => {
    document.body.classList.add("has-content-header");
    window.scrollTo({ top: 0 });

    return () => {
      document.body.classList.remove("has-content-header");
    };
  }, [slug]);

  useEffect(() => {
    const updateHeroMediaProgress = () => {
      const hero = heroRef.current;

      if (!hero) {
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const scrollableRange = Math.max(1, hero.offsetHeight - window.innerHeight * 0.92);
      const travelled = Math.min(scrollableRange, Math.max(0, -heroRect.top));
      const nextProgress = Math.min(1, travelled / scrollableRange);
      const mediaWrap = heroMediaWrapRef.current;

      if (mediaWrap) {
        const mediaRect = mediaWrap.getBoundingClientRect();

        if (heroMediaBaseLeftRef.current === null || nextProgress < 0.02) {
          heroMediaBaseLeftRef.current = mediaRect.left;
        }

        const baseLeft = heroMediaBaseLeftRef.current ?? mediaRect.left;
        const targetLeft = Math.max(16, (window.innerWidth - mediaRect.width) / 2);
        const nextShift = (targetLeft - baseLeft) * nextProgress;

        setHeroMediaShift(nextShift);
      }

      setHeroMediaProgress(nextProgress);
    };

    updateHeroMediaProgress();
    window.addEventListener("scroll", updateHeroMediaProgress, { passive: true });
    window.addEventListener("resize", updateHeroMediaProgress);

    return () => {
      window.removeEventListener("scroll", updateHeroMediaProgress);
      window.removeEventListener("resize", updateHeroMediaProgress);
    };
  }, [slug]);

  if (!caseStudy) {
    return null;
  }

  return (
    <div className="page-shell project-case-page">
      <AnimatedFavicon />
      <MarqueeBar />
      <SiteHeader />
      <main className="wrapper project-case" id="content">
        <section className="project-case-hero" id="overview" ref={heroRef}>
          <div className="inner">
            <div className="project-case-hero__grid">
              <div className="project-case-hero__copy">
                <p className="project-case-kicker">{card.category}</p>
                <h1>{card.title}</h1>
                <p>{card.description}</p>
                <div className="project-case-hero__actions">
                  {githubLink ? (
                    <a href={githubLink.href} target="_blank" rel="noreferrer">
                      GitHub <ArrowIcon />
                    </a>
                  ) : null}
                  {marketplaceLink ? (
                    <a href={marketplaceLink.href} target="_blank" rel="noreferrer">
                      Marketplace <ArrowIcon />
                    </a>
                  ) : null}
                </div>
              </div>
              <div
                className="project-case-hero__media-wrap"
                ref={heroMediaWrapRef}
                style={{
                  ["--hero-media-progress" as string]: String(heroMediaProgress),
                  ["--hero-media-shift" as string]: `${heroMediaShift}px`,
                }}
              >
                <div className="project-case-hero__media">
                  <ProjectPreviewImage card={card} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="project-case-section project-case-section--dark" id="result">
          <div className="inner">
            <div className="project-case-section__heading">
              <p>Result</p>
              <h2>What this project proves.</h2>
            </div>
            <div className="project-case-metrics">
              {caseStudy.metrics.map((metric) => (
                <article
                  className={`project-case-metric${metric.value.length > 14 ? " project-case-metric--long" : ""}`}
                  key={metric.label}
                >
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <p>{metric.note}</p>
                </article>
              ))}
            </div>
            <ul className="project-case-outcomes">
              {caseStudy.outcome.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="project-case-section" id="approach">
          <div className="inner">
            <div className="project-case-section__heading">
              <p>Approach</p>
              <h2>How the interface was shaped.</h2>
            </div>
            <div className="project-case-approach">
              {caseStudy.approach.map((section) => (
                <article className="project-case-approach__item" key={section.title}>
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                  {section.points ? (
                    <ul>
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="project-case-gallery" id="screens">
          <div className="inner">
            <div className="project-case-section__heading">
              <p>Screen Flow</p>
              <h2>Selected project screens.</h2>
            </div>
            <div className="project-case-gallery__grid">
              {galleryImages.slice(0, 6).map((image) => (
                <figure className="project-case-gallery__item" key={image}>
                  <img src={image} alt={`${card.title} screen`} />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="project-case-section project-case-section--split" id="learning">
          <div className="inner">
            <div className="project-case-split">
              <article>
                <p>Learning</p>
                <h2>What I learned.</h2>
                <ul>
                  {caseStudy.learnings.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <p>Next</p>
                <h2>What should be measured next.</h2>
                <ul>
                  {caseStudy.nextSteps.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
