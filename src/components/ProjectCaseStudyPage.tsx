import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { getProjectSlug, projectCaseStudies, projectNavigationItems, siteMeta, type HighlightCard } from "../data/portfolio";
import { AnimatedFavicon } from "./AnimatedFavicon";
import { FloatingMenu } from "./FloatingMenu";
import { FooterSection } from "./FooterSection";
import { MarqueeBar } from "./MarqueeBar";
import { ProjectPreviewImage } from "./ProjectPreviewImage";
import { SiteHeader } from "./SiteHeader";
import { resetWindowScrollToTop } from "../utils/scrollReset";

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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = galleryImages[activeImageIndex] ?? galleryImages[0];
  const hasMultipleImages = galleryImages.length > 1;
  const githubLink = card.detail.links?.find((link) => link.label.toLowerCase() === "github");
  const marketplaceLink = card.detail.links?.find((link) => link.label.toLowerCase() === "marketplace");
  const heroRef = useRef<HTMLElement | null>(null);
  const heroMediaWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [slug]);

  useLayoutEffect(() => {
    document.body.classList.add("has-content-header");
    const hero = heroRef.current;
    const mediaWrap = heroMediaWrapRef.current;

    resetWindowScrollToTop();

    hero?.classList.remove("is-media-fixed", "is-media-stacked");
    hero?.style.setProperty("--hero-media-progress", "0");
    hero?.style.setProperty("--hero-media-shift", "0px");
    hero?.style.setProperty("--hero-media-shift-y", "0px");
    hero?.style.setProperty("--hero-media-scale", "1");
    hero?.style.setProperty("--hero-copy-opacity", "1");
    hero?.style.setProperty("--hero-copy-y", "0px");
    hero?.style.setProperty("--hero-result-progress", "0");
    hero?.style.setProperty("--hero-surface-blend", "0");
    hero?.style.setProperty("--hero-carousel-opacity", "0");
    mediaWrap?.style.removeProperty("inline-size");

    return () => {
      document.body.classList.remove("has-content-header");
    };
  }, [slug]);

  useEffect(() => {
    const hero = heroRef.current;
    const mediaWrap = heroMediaWrapRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactLayout = window.matchMedia("(max-width: 1024px)");
    let animationFrame = 0;
    let layout = {
      shift: 0,
      shiftY: 0,
      releasePoint: 1,
      scale: 1,
    };

    if (!hero || !mediaWrap || reduceMotion.matches || compactLayout.matches) {
      return undefined;
    }

    const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const smoothstep = (value: number) => {
      const nextValue = clamp(value);

      return nextValue * nextValue * (3 - 2 * nextValue);
    };
    const smootherstep = (value: number) => {
      const nextValue = clamp(value);

      return nextValue * nextValue * nextValue * (nextValue * (nextValue * 6 - 15) + 10);
    };

    const measureLayout = () => {
      hero.classList.remove("is-media-fixed");
      hero.classList.remove("is-media-stacked");
      mediaWrap.style.removeProperty("inline-size");
      const media = mediaWrap.querySelector<HTMLElement>(".project-case-hero__media");

      if (!media) {
        return;
      }

      const positionParent = mediaWrap.offsetParent as HTMLElement | null;
      const positionParentRect = positionParent?.getBoundingClientRect();
      const positionParentDocumentTop = positionParentRect ? positionParentRect.top + window.scrollY : 0;
      const positionParentLeft = positionParentRect?.left ?? 0;
      const mediaRect = media.getBoundingClientRect();
      const wrapRect = mediaWrap.getBoundingClientRect();
      const resultSection = document.getElementById("result");
      const resultDocumentTop = resultSection
        ? resultSection.getBoundingClientRect().top + window.scrollY
        : hero.getBoundingClientRect().top + window.scrollY + hero.offsetHeight;
      const layoutLeft = mediaRect.left;
      const width = Math.max(1, mediaRect.width);
      const height = Math.max(1, mediaRect.height);
      const wrapWidth = Math.max(1, wrapRect.width);
      const currentCenter = layoutLeft + width / 2;
      const targetCenter = window.innerWidth / 2;
      const currentCenterY = mediaRect.top + height / 2;
      const targetCenterY = window.innerHeight / 2;
      const horizontalInset = clamp(window.innerWidth * 0.08, 80, 150);
      const verticalInset = clamp(window.innerHeight * 0.12, 80, 120);
      const availableWidth = Math.max(width, window.innerWidth - horizontalInset);
      const availableHeight = Math.max(height, window.innerHeight - verticalInset);
      const scaleByWidth = availableWidth / width;
      const scaleByHeight = availableHeight / height;
      const targetScale = clamp(Math.min(scaleByWidth, scaleByHeight), 1, 2.45);
      const finalWidth = width * targetScale;
      const finalHeight = height * targetScale;
      const finalLeft = targetCenter - finalWidth / 2;
      const finalTop = targetCenterY - finalHeight / 2;
      const finalBottom = targetCenterY + finalHeight / 2;
      const releasePoint = Math.max(1, resultDocumentTop - finalBottom);

      layout = {
        shift: targetCenter - currentCenter,
        shiftY: targetCenterY - currentCenterY,
        releasePoint,
        scale: targetScale,
      };

      hero.style.setProperty("--hero-media-base-left", `${wrapRect.left.toFixed(2)}px`);
      hero.style.setProperty("--hero-media-base-top", `${wrapRect.top.toFixed(2)}px`);
      hero.style.setProperty("--hero-media-base-width", `${wrapWidth.toFixed(2)}px`);
      hero.style.setProperty("--hero-media-stack-left", `${(finalLeft - positionParentLeft).toFixed(2)}px`);
      hero.style.setProperty("--hero-media-stack-top", `${(releasePoint + finalTop - positionParentDocumentTop).toFixed(2)}px`);
      hero.style.setProperty("--hero-media-stack-width", `${finalWidth.toFixed(2)}px`);
      mediaWrap.style.inlineSize = `${wrapWidth.toFixed(2)}px`;
      hero.classList.add("is-media-fixed");
    };

    const setProgress = () => {
      const hero = heroRef.current;

      if (!hero) {
        return;
      }

      const rawProgress = clamp(window.scrollY / layout.releasePoint);
      const mediaProgress = smootherstep(rawProgress);
      const copyProgress = smoothstep(rawProgress / 0.34);
      const resultProgress = smoothstep((rawProgress - 0.56) / 0.36);
      const surfaceBlendProgress = smootherstep((rawProgress - 0.68) / 0.32);
      const carouselProgress = rawProgress >= 1 ? 1 : 0;

      hero.style.setProperty("--hero-media-progress", mediaProgress.toFixed(4));
      hero.style.setProperty("--hero-media-shift", `${(layout.shift * mediaProgress).toFixed(2)}px`);
      hero.style.setProperty("--hero-media-shift-y", `${(layout.shiftY * mediaProgress).toFixed(2)}px`);
      hero.style.setProperty("--hero-media-scale", (1 + (layout.scale - 1) * mediaProgress).toFixed(4));
      hero.style.setProperty("--hero-copy-opacity", (1 - copyProgress).toFixed(4));
      hero.style.setProperty("--hero-copy-y", `${(-26 * copyProgress).toFixed(2)}px`);
      hero.style.setProperty("--hero-result-progress", resultProgress.toFixed(4));
      hero.style.setProperty("--hero-surface-blend", surfaceBlendProgress.toFixed(4));
      hero.style.setProperty("--hero-carousel-opacity", carouselProgress.toFixed(4));

      if (rawProgress >= 1) {
        hero.classList.remove("is-media-fixed");
        hero.classList.add("is-media-stacked");
        mediaWrap.style.removeProperty("inline-size");
      } else {
        hero.classList.remove("is-media-stacked");
        hero.classList.add("is-media-fixed");
        mediaWrap.style.inlineSize = `${Number.parseFloat(getComputedStyle(hero).getPropertyValue("--hero-media-base-width")).toFixed(2)}px`;
      }
    };

    const updateHeroMediaProgress = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        setProgress();
      });
    };
    const handleResize = () => {
      measureLayout();
      updateHeroMediaProgress();
    };
    const mediaImage = mediaWrap.querySelector("img");

    measureLayout();
    updateHeroMediaProgress();
    mediaImage?.addEventListener("load", handleResize);
    window.addEventListener("scroll", updateHeroMediaProgress, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      mediaImage?.removeEventListener("load", handleResize);
      window.removeEventListener("scroll", updateHeroMediaProgress);
      window.removeEventListener("resize", handleResize);
      hero.classList.remove("is-media-fixed");
      hero.classList.remove("is-media-stacked");
      mediaWrap.style.removeProperty("inline-size");
    };
  }, [slug]);

  if (!caseStudy) {
    return null;
  }

  const showPreviousImage = () => {
    setActiveImageIndex((index) => (index - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNextImage = () => {
    setActiveImageIndex((index) => (index + 1) % galleryImages.length);
  };

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
              <div className="project-case-hero__media-wrap" ref={heroMediaWrapRef}>
                <div className="project-case-hero__media">
                  <div className="project-case-hero__image-stage">
                    <ProjectPreviewImage key={activeImage} card={card} image={activeImage} />
                  </div>
                  {hasMultipleImages ? (
                    <div className="project-case-hero__carousel" aria-label={`${card.title} image gallery`}>
                      <button
                        className="project-case-hero__nav project-case-hero__nav--prev"
                        type="button"
                        onClick={showPreviousImage}
                        aria-label="Show previous project image"
                      >
                        <svg className="ico-svg" viewBox="0 0 24 24" width="22" aria-hidden="true">
                          <path d="m15 5-7 7 7 7" />
                        </svg>
                      </button>
                      <div className="project-case-hero__thumbs">
                        {galleryImages.map((image, index) => (
                          <button
                            className={`project-case-hero__thumb${index === activeImageIndex ? " is-active" : ""}`}
                            type="button"
                            key={image}
                            onClick={() => setActiveImageIndex(index)}
                            aria-label={`Show project image ${index + 1}`}
                            aria-pressed={index === activeImageIndex}
                          >
                            <img src={image} alt="" />
                          </button>
                        ))}
                      </div>
                      <button
                        className="project-case-hero__nav project-case-hero__nav--next"
                        type="button"
                        onClick={showNextImage}
                        aria-label="Show next project image"
                      >
                        <svg className="ico-svg" viewBox="0 0 24 24" width="22" aria-hidden="true">
                          <path d="m9 5 7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  ) : null}
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
      <FloatingMenu items={projectNavigationItems} githubHref={githubLink?.href ?? siteMeta.visitHref} showMail={false} />
      <FooterSection />
    </div>
  );
}
