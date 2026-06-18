import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { getProjectSlug, highlightCards } from "../data/portfolio";
import type { HighlightCard } from "../data/portfolio";
import { ProjectPreviewImage } from "./ProjectPreviewImage";
import { resetWindowScrollToTop } from "../utils/scrollReset";

const emphasisTerms = [
  "TypeScript/JavaScript",
  "VS Code",
  "Git push, pull, commit",
  "slide-in Webview",
  "TOP/CHOP/SOP",
  "ReactFlow",
  "Runtime/Evaluator",
  "Canvas 2D",
  "MediaPipe Hands CHOP",
  "2D/3D",
  "Vault",
  "Studio",
  "AI Panel",
  "CatBoost",
  "Flask API",
  "Feature Importance",
  "24시간 프로파일",
  "텍스트 기반 탐색",
  "호출 관계",
  "데이터 흐름",
  "프레임워크 패턴",
  "성공·실패",
  "시각적 피드백",
  "실시간",
  "원인 요인",
];

const emphasisPattern = new RegExp(
  `(${emphasisTerms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "g",
);

function renderEmphasis(text: string) {
  return text.split(emphasisPattern).map((part, index) =>
    emphasisTerms.includes(part) ? (
      <strong key={`${part}-${index}`}>{part}</strong>
    ) : (
      part
    ),
  );
}

function ProjectOpenMark() {
  return (
    <span className="project-open-mark" aria-hidden="true">
      <svg className="ico-svg" viewBox="0 0 24 24" width="18">
        <path d="M6 18 18 6M9 6h9v9" />
      </svg>
    </span>
  );
}

function GitHubIcon() {
  return (
    <svg className="ico-svg" viewBox="0 0 24 24" width="18" aria-hidden="true">
      <path d="M12 2.3c-5.5 0-9.9 4.4-9.9 9.9 0 4.4 2.8 8.1 6.7 9.4.5.1.7-.2.7-.5v-1.8c-2.7.6-3.3-1.2-3.3-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.8.1-.7.4-1.1.7-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.4.3.8 1 .8 2v3c0 .3.2.6.7.5 3.9-1.3 6.7-5 6.7-9.4 0-5.5-4.4-9.9-9.9-9.9Z" />
    </svg>
  );
}

function MarketplaceIcon() {
  return (
    <svg className="ico-svg" viewBox="0 0 24 24" width="18" aria-hidden="true">
      <path d="M6.2 8.5h11.6l1 11H5.2l1-11Z" />
      <path d="M9 9V7.4a3 3 0 0 1 6 0V9" />
      <path d="m9 14.4 2-2 2 1.6 2-1.6v5.2l-2-1.6-2 1.6-2-2Z" />
    </svg>
  );
}

function ProjectDetailPanel({
  card,
  onClose,
}: {
  card: HighlightCard;
  onClose: () => void;
}) {
  const caseStudyHref = `/projects/${getProjectSlug(card)}`;
  const detailImages = useMemo(() => card.detailImages ?? [card.image], [card.detailImages, card.image]);
  const marketplaceLink = card.detail.links?.find((link) => link.label.toLowerCase() === "marketplace");
  const githubLink = card.detail.links?.find((link) => link.label.toLowerCase() === "github");
  const categoryLabel = card.category.startsWith("ELEMENT /") ? card.category : `ELEMENT / ${card.category}`;
  const previewImage = card.previewImage ?? detailImages[0] ?? card.image;
  const previewStack = detailImages.slice(0, 3);

  const openCaseStudy = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.body.style.overflow = "";
    resetWindowScrollToTop();
    window.history.pushState(null, "", caseStudyHref);
    window.dispatchEvent(new Event("pushstate"));
  };

  return (
    <motion.div
      className="project-detail-overlay"
      role="presentation"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <motion.aside
        className="project-detail"
        aria-live="polite"
        role="dialog"
        aria-modal="true"
        aria-label={`${card.title} project detail`}
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 10, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.985 }}
        transition={{ duration: 0.22, ease: [0.25, 0.8, 0.25, 1] }}
      >
        <div className="project-detail__media">
          <div className="project-detail__main-image">
            <ProjectPreviewImage card={card} image={previewImage} />
          </div>
          {previewStack.length > 1 ? (
            <div className="project-detail__mini-strip" aria-label={`${card.title} preview screens`}>
              {previewStack.map((image, index) => (
                <span className="project-detail__mini-frame" key={`${image}-${index}`}>
                  <img src={image} alt="" />
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="project-detail__content">
          <div className="project-detail__top">
            <div>
              <small>{categoryLabel}</small>
              <h3>{card.title}</h3>
            </div>
            <div className="project-detail__actions">
              <button className="project-detail__close" type="button" onClick={onClose} aria-label="Close project detail">
                <svg className="ico-svg" viewBox="0 0 24 24" width="20" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
          </div>

          <p className="project-detail__summary">{card.description}</p>

          <div className="project-detail__compact-details">
            <p>{renderEmphasis(card.detail.overview)}</p>
            <ul>
              {card.detail.highlights.slice(0, 2).map((item) => (
                <li key={item}>{renderEmphasis(item)}</li>
              ))}
            </ul>
          </div>

          <dl className="project-detail__meta project-detail__meta--preview">
            {card.detail.period ? (
              <div>
                <dt>Period</dt>
                <dd>{card.detail.period}</dd>
              </div>
            ) : null}
            <div>
              <dt>Role</dt>
              <dd>{renderEmphasis(card.detail.role)}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{renderEmphasis(card.detail.stack.slice(0, 4).join(", "))}</dd>
            </div>
          </dl>
        </div>
        <div className="project-detail__tab-stack" aria-label={`${card.title} project links`}>
          <a
            className="project-detail__tab-button project-detail__tab-button--case"
            href={caseStudyHref}
            onClick={openCaseStudy}
            aria-label={`Open ${card.title} case study page`}
          >
            <span>case</span>
            <span className="project-detail__tab-chevron" aria-hidden="true">
              &gt;
            </span>
          </a>
          {marketplaceLink ? (
            <a
              className="project-detail__tab-button project-detail__tab-button--external"
              href={marketplaceLink.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${card.title} Visual Studio Marketplace page`}
            >
              <span className="project-detail__tab-label">marketplace</span>
              <span className="project-detail__tab-logo">
                <MarketplaceIcon />
              </span>
            </a>
          ) : null}
          {githubLink ? (
            <a
              className="project-detail__tab-button project-detail__tab-button--external"
              href={githubLink.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${card.title} GitHub repository`}
            >
              <span className="project-detail__tab-label">github</span>
              <span className="project-detail__tab-logo">
                <GitHubIcon />
              </span>
            </a>
          ) : null}
        </div>
      </motion.aside>
    </motion.div>
  );
}

export function ElementsSection() {
  const [selectedCard, setSelectedCard] = useState<HighlightCard | null>(null);

  useEffect(() => {
    if (!selectedCard) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedCard]);

  return (
    <section className="anchor-section" id="highlights">
      <div className="block">
        <div className="inner">
          <div className="c-heading c-heading--small">
            <div className="c-heading__top">
              <h2 className="text-default">Projects</h2>
            </div>
            <div className="c-heading__middle">
              <h3 className="heading-5">
                See the highlights
                <br />
                of this portfolio.
              </h3>
            </div>
          </div>

          <ul className="gallery-site gallery-site--two-cols">
              {highlightCards.map((card) => {
                const isActive = selectedCard?.title === card.title;

                return (
                  <li key={card.title}>
                    <article className={`card-slide${isActive ? " is-active" : ""}`}>
                      <div className="box-figure">
                        <figure className="figure-rollover js-collectable is-large">
                          <button
                            className="figure-rollover__link figure-rollover__button"
                            type="button"
                            onClick={() => setSelectedCard(card)}
                            aria-label={`Open ${card.title} project detail`}
                            aria-expanded={selectedCard?.title === card.title}
                          >
                            <ProjectPreviewImage card={card} />
                          </button>
                          <div className="figure-rollover__hover">
                            <div className="figure-rollover__left">
                          <div className="figure-rollover__row">
                                <small>{card.typeLabel}</small>
                              </div>
                              <div className="figure-rollover__row">
                                <h3>{card.title}</h3>
                              </div>
                            </div>
                          </div>
                          <ProjectOpenMark />
                        </figure>
                      </div>
                      <div className="card-slide__info">
                        <div className="card-slide__row">
                          <h3 className="card-slide__title">
                            <button type="button" onClick={() => setSelectedCard(card)}>
                              {card.title}
                            </button>
                          </h3>
                          <div className="card-slide__data">
                            <small>from</small>
                            <button type="button" className="link-underlined" onClick={() => setSelectedCard(card)}>
                              {card.category}
                            </button>
                          </div>
                        </div>
                        <p className="card-slide__description">{card.description}</p>
                      </div>
                    </article>
                  </li>
                );
              })}
          </ul>
          <AnimatePresence>
            {selectedCard ? <ProjectDetailPanel card={selectedCard} onClose={() => setSelectedCard(null)} /> : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
