import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

import { getProjectSlug, projectCaseStudies, projectNavigationItems, siteMeta, type HighlightCard } from "../data/portfolio";
import { AnimatedFavicon } from "./AnimatedFavicon";
import { FloatingMenu } from "./FloatingMenu";
import { FooterSection } from "./FooterSection";
import { MarqueeBar } from "./MarqueeBar";
import { ProjectHeroImageStack } from "./ProjectHeroImageStack";
import { ProjectScreenFlowCamera } from "./ProjectScreenFlowCamera";
import { SiteHeader } from "./SiteHeader";
import { resetWindowScrollToTop } from "../utils/scrollReset";

type ProjectCaseStudyPageProps = {
  card: HighlightCard;
};

function GitHubIcon() {
  return (
    <svg className="ico-svg project-case-hero__github-icon" viewBox="0 0 24 24" width="22" aria-hidden="true">
      <path d="M12 2.3c-5.5 0-9.9 4.4-9.9 9.9 0 4.4 2.8 8.1 6.7 9.4.5.1.7-.2.7-.5v-1.8c-2.7.6-3.3-1.2-3.3-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.8.1-.7.4-1.1.7-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.4.3.8 1 .8 2v3c0 .3.2.6.7.5 3.9-1.3 6.7-5 6.7-9.4 0-5.5-4.4-9.9-9.9-9.9Z" />
    </svg>
  );
}

function MarketplaceIcon() {
  return (
    <svg className="ico-svg project-case-hero__marketplace-icon" viewBox="0 0 24 24" width="22" aria-hidden="true">
      <path d="M6.2 8.5h11.6l1 11H5.2l1-11Z" />
      <path d="M9 9V7.4a3 3 0 0 1 6 0V9" />
      <path d="m9 14.4 2-2 2 1.6 2-1.6v5.2l-2-1.6-2 1.6-2-2Z" />
    </svg>
  );
}

function DownIcon() {
  return (
    <svg className="ico-svg" viewBox="0 0 24 24" width="18" aria-hidden="true">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

export function ProjectCaseStudyPage({ card }: ProjectCaseStudyPageProps) {
  const slug = getProjectSlug(card);
  const caseStudy = projectCaseStudies[slug];
  const galleryImages = useMemo(() => card.detailImages ?? [card.image], [card.detailImages, card.image]);
  const heroStackCount = Math.min(galleryImages.length, 5);
  const githubLink = card.detail.links?.find((link) => link.label.toLowerCase() === "github");
  const marketplaceLink = card.detail.links?.find((link) => link.label.toLowerCase() === "marketplace");
  const heroRef = useRef<HTMLElement | null>(null);
  const heroMediaWrapRef = useRef<HTMLDivElement | null>(null);
  const heroStackTargetRef = useRef(0);
  const heroStackScrollFrameRef = useRef<number | null>(null);

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
    hero?.style.setProperty("--hero-stack-extra", `${Math.max(0, heroStackCount - 1) * 1200}px`);
    mediaWrap?.style.removeProperty("inline-size");

    return () => {
      document.body.classList.remove("has-content-header");
    };
  }, [slug, heroStackCount]);

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
      stackReleasePoint: 1,
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
    const lerp = (start: number, end: number, progress: number) => start + (end - start) * progress;
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
      const stackReleasePoint = releasePoint;
      const stackJumpPoint = heroStackCount > 1 ? releasePoint * 0.96 : releasePoint;

      layout = {
        shift: targetCenter - currentCenter,
        shiftY: targetCenterY - currentCenterY,
        releasePoint,
        stackReleasePoint,
        scale: targetScale,
      };
      heroStackTargetRef.current = stackJumpPoint;

      hero.style.setProperty("--hero-media-base-left", `${wrapRect.left.toFixed(2)}px`);
      hero.style.setProperty("--hero-media-base-top", `${wrapRect.top.toFixed(2)}px`);
      hero.style.setProperty("--hero-media-base-width", `${wrapWidth.toFixed(2)}px`);
      hero.style.setProperty("--hero-media-stack-left", `${(finalLeft - positionParentLeft).toFixed(2)}px`);
      hero.style.setProperty("--hero-media-stack-top", `${(stackReleasePoint + finalTop - positionParentDocumentTop).toFixed(2)}px`);
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
      const hasHeroStack = heroStackCount > 1;
      const mediaProgress = smootherstep(hasHeroStack ? rawProgress / 0.38 : rawProgress);
      const copyProgress = smoothstep(rawProgress / 0.34);
      const resultProgress = smoothstep((rawProgress - (hasHeroStack ? 0.82 : 0.56)) / (hasHeroStack ? 0.16 : 0.36));
      const surfaceBlendProgress = smootherstep((rawProgress - (hasHeroStack ? 0.4 : 0.68)) / (hasHeroStack ? 0.18 : 0.32));
      const carouselProgress = 0;

      hero.style.setProperty("--hero-media-progress", mediaProgress.toFixed(4));
      hero.style.setProperty("--hero-media-shift", `${(layout.shift * mediaProgress).toFixed(2)}px`);
      hero.style.setProperty("--hero-media-shift-y", `${(layout.shiftY * mediaProgress).toFixed(2)}px`);
      hero.style.setProperty("--hero-media-scale", (1 + (layout.scale - 1) * mediaProgress).toFixed(4));
      hero.style.setProperty("--hero-copy-opacity", (1 - copyProgress).toFixed(4));
      hero.style.setProperty("--hero-copy-y", `${(-26 * copyProgress).toFixed(2)}px`);
      hero.style.setProperty("--hero-result-progress", resultProgress.toFixed(4));
      hero.style.setProperty("--hero-surface-blend", surfaceBlendProgress.toFixed(4));
      hero.style.setProperty("--hero-carousel-opacity", carouselProgress.toFixed(4));
      hero.classList.toggle("is-stack-complete", window.scrollY >= layout.stackReleasePoint);

      const stackCards = Array.from(hero.querySelectorAll<HTMLElement>(".project-case-hero__stack-card"));
      const stackTotal = stackCards.length;

      stackCards.forEach((stackCard, index) => {
        const stackStart = index === 0 ? 0.56 : Math.min(0.61 + (index - 1) * 0.07, 0.94);
        const stackEnd = Math.min(stackStart + 0.04, 0.985);
        const isLast = index === stackTotal - 1;
        const targetScale = isLast ? 1 : Math.max(0.5, 1 - (stackTotal - index - 1) * 0.1);
        const settleProgress = smoothstep((rawProgress - stackStart) / (0.985 - stackStart));
        const enterProgress = smoothstep((rawProgress - stackStart) / (stackEnd - stackStart));
        const startY = index === 0 ? 0 : 360 + index * 120;
        const settledY = index === 0 ? 0 : index * 16;
        const y = lerp(startY, settledY, enterProgress);
        const scale = lerp(1, targetScale, settleProgress);
        const opacity = index === 0 || stackTotal === 1 ? 1 : enterProgress;

        stackCard.style.opacity = opacity.toFixed(4);
        stackCard.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
      });

      if (window.scrollY >= layout.stackReleasePoint) {
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
  }, [slug, heroStackCount]);

  if (!caseStudy) {
    return null;
  }

  const scrollToHeroStack = () => {
    const targetY = heroStackTargetRef.current;

    if (!targetY) {
      return;
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = Math.min(6200, Math.max(3400, Math.abs(distance) * 0.95));
    const startTime = window.performance.now();
    const easeOutSine = (value: number) => Math.sin((value * Math.PI) / 2);

    if (heroStackScrollFrameRef.current) {
      window.cancelAnimationFrame(heroStackScrollFrameRef.current);
    }

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const step = (currentTime: number) => {
      const progress = Math.min(1, (currentTime - startTime) / duration);
      const easedProgress = easeOutSine(progress);

      window.scrollTo({ top: startY + distance * easedProgress, behavior: "auto" });

      if (progress < 1) {
        heroStackScrollFrameRef.current = window.requestAnimationFrame(step);
      } else {
        heroStackScrollFrameRef.current = null;
        root.style.scrollBehavior = previousScrollBehavior;
      }
    };

    heroStackScrollFrameRef.current = window.requestAnimationFrame(step);
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
                    <a href={githubLink.href} target="_blank" rel="noreferrer" aria-label={`Open ${card.title} GitHub repository`}>
                      <GitHubIcon />
                    </a>
                  ) : null}
                  {marketplaceLink ? (
                    <a
                      href={marketplaceLink.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${card.title} Visual Studio Marketplace page`}
                    >
                      <MarketplaceIcon />
                    </a>
                  ) : null}
                </div>
              </div>
              <div className="project-case-hero__media-wrap" ref={heroMediaWrapRef}>
                <div className="project-case-hero__media">
                  <ProjectHeroImageStack card={card} images={galleryImages} />
                </div>
              </div>
            </div>
          </div>
          {heroStackCount > 1 ? (
            <button className="project-case-hero__stack-jump" type="button" onClick={scrollToHeroStack}>
              View stack <DownIcon />
            </button>
          ) : null}
        </section>

        <section className="project-case-section project-case-section--dark" id="result">
          <div className="inner">
            <div className="project-case-section__heading">
              <p>Project Detail</p>
              <h2>What the project actually contains.</h2>
            </div>
            <div className="project-case-metrics">
              <article className={`project-case-metric${card.detail.role.length > 28 ? " project-case-metric--long" : ""}`}>
                <span>Role</span>
                <strong>{card.detail.role}</strong>
                <p>제가 맡은 설계와 구현 범위입니다.</p>
              </article>
              {card.detail.period ? (
                <article className="project-case-metric">
                  <span>Period</span>
                  <strong>{card.detail.period}</strong>
                  <p>작업 기간과 프로젝트 진행 맥락입니다.</p>
                </article>
              ) : null}
              <article className={`project-case-metric${card.detail.stack.join(", ").length > 28 ? " project-case-metric--long" : ""}`}>
                <span>Stack</span>
                <strong>{card.detail.stack.slice(0, 4).join(", ")}</strong>
                <p>{card.detail.stack.slice(4).join(", ") || "핵심 구현에 사용한 주요 기술입니다."}</p>
              </article>
              {card.detail.awards?.length ? (
                <article className="project-case-metric project-case-metric--award">
                  <span>Award</span>
                  <strong className="project-case-metric__body-text">{card.detail.awards.join("\n")}</strong>
                </article>
              ) : null}
            </div>
            <ul className="project-case-outcomes">
              {card.detail.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="project-case-section" id="approach">
          <div className="inner">
            <div className="project-case-section__heading">
              <p>Approach</p>
              <h2>Why it was built this way.</h2>
            </div>
            <div className="project-case-approach">
              <article className="project-case-approach__item">
                <h3>Overview</h3>
                <p>{card.detail.overview}</p>
              </article>
              <article className="project-case-approach__item">
                <h3>Problem</h3>
                <p>{card.detail.problem}</p>
              </article>
              <article className="project-case-approach__item project-case-approach__item--wide">
                <h3>Solution</h3>
                <p>{card.detail.solution}</p>
              </article>
            </div>
          </div>
        </section>

        <ProjectScreenFlowCamera card={card} images={galleryImages} />

        <section className="project-case-section project-case-section--split project-case-section--learning" id="learning">
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
