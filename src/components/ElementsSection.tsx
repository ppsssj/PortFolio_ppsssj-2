import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { highlightCards } from "../data/portfolio";
import type { HighlightCard } from "../data/portfolio";
import { ProjectPreviewImage } from "./ProjectPreviewImage";

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
    <svg className="ico-svg" viewBox="0 0 24 24" width="20" aria-hidden="true">
      <path d="M12 2.3c-5.5 0-9.9 4.4-9.9 9.9 0 4.4 2.8 8.1 6.7 9.4.5.1.7-.2.7-.5v-1.8c-2.7.6-3.3-1.2-3.3-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.8.1-.7.4-1.1.7-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.4.3.8 1 .8 2v3c0 .3.2.6.7.5 3.9-1.3 6.7-5 6.7-9.4 0-5.5-4.4-9.9-9.9-9.9Z" />
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
  const detailImages = useMemo(() => card.detailImages ?? [card.image], [card.detailImages, card.image]);
  const githubLink = card.detail.links?.find((link) => link.label.toLowerCase() === "github");
  const categoryLabel = card.category.startsWith("ELEMENT /") ? card.category : `ELEMENT / ${card.category}`;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = detailImages[activeImageIndex] ?? detailImages[0];
  const visiblePreviewItems = useMemo(() => {
    if (detailImages.length <= 1) {
      return [];
    }

    const previousIndex = (activeImageIndex - 1 + detailImages.length) % detailImages.length;
    const nextIndex = (activeImageIndex + 1) % detailImages.length;

    if (detailImages.length === 2) {
      return [
        { image: detailImages[activeImageIndex], imageIndex: activeImageIndex, position: "active" },
        { image: detailImages[nextIndex], imageIndex: nextIndex, position: "after" },
      ];
    }

    return [
      { image: detailImages[previousIndex], imageIndex: previousIndex, position: "before" },
      { image: detailImages[activeImageIndex], imageIndex: activeImageIndex, position: "active" },
      { image: detailImages[nextIndex], imageIndex: nextIndex, position: "after" },
    ];
  }, [activeImageIndex, detailImages]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [detailImages, card.title]);

  const showPreviousImage = () => {
    setActiveImageIndex((index) => (index - 1 + detailImages.length) % detailImages.length);
  };

  const showNextImage = () => {
    setActiveImageIndex((index) => (index + 1) % detailImages.length);
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
            <ProjectPreviewImage card={card} image={activeImage} />
          </div>
          {detailImages.length > 1 ? (
            <div className="project-detail__preview-bar">
              <button
                className="project-detail__preview-nav"
                type="button"
                onClick={showPreviousImage}
                aria-label={`Show previous ${card.title} image`}
              >
                &lt;
              </button>
              <div className="project-detail__previews" aria-label={`${card.title} image previews`}>
                {visiblePreviewItems.map(({ image, imageIndex, position }) => {
                  const isActive = activeImageIndex === imageIndex;

                  return (
                    <motion.button
                      layout
                      key={`${image}-${imageIndex}`}
                      className={`project-detail__preview-shell is-${position}${isActive ? " is-active" : ""}`}
                      type="button"
                      onClick={() => setActiveImageIndex(imageIndex)}
                      aria-label={`Show ${card.title} preview ${imageIndex + 1}`}
                      aria-pressed={isActive}
                      transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="project-detail__preview">
                        <img src={image} alt="" />
                      </span>
                    </motion.button>
                  );
                })}
              </div>
              <button
                className="project-detail__preview-nav"
                type="button"
                onClick={showNextImage}
                aria-label={`Show next ${card.title} image`}
              >
                &gt;
              </button>
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
              {githubLink ? (
                <a
                  className="project-detail__github"
                  href={githubLink.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${card.title} GitHub repository`}
                  title="Open GitHub repository"
                >
                  <GitHubIcon />
                </a>
              ) : null}
              <button className="project-detail__close" type="button" onClick={onClose} aria-label="Close project detail">
                <svg className="ico-svg" viewBox="0 0 24 24" width="20" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
          </div>

          <div className="project-detail__body">
            <p className="project-detail__overview">{renderEmphasis(card.detail.overview)}</p>

            <div className="project-detail__grid">
              <section>
                <h4>Problem</h4>
                <p>{renderEmphasis(card.detail.problem)}</p>
              </section>
              <section>
                <h4>Solution</h4>
                <p>{renderEmphasis(card.detail.solution)}</p>
              </section>
            </div>

            <ul className="project-detail__highlights">
              {card.detail.highlights.map((item) => (
                <li key={item}>{renderEmphasis(item)}</li>
              ))}
            </ul>

            <dl className="project-detail__meta">
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
                <dd>{renderEmphasis(card.detail.stack.join(", "))}</dd>
              </div>
            </dl>
          </div>
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
