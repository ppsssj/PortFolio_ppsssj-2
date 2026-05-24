import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { highlightCards } from "../data/portfolio";
import type { HighlightCard } from "../data/portfolio";
import { ProjectPreviewImage } from "./ProjectPreviewImage";

function ProjectOpenMark() {
  return (
    <span className="project-open-mark" aria-hidden="true">
      <svg className="ico-svg" viewBox="0 0 24 24" width="18">
        <path d="M6 18 18 6M9 6h9v9" />
      </svg>
    </span>
  );
}

function ProjectDetailPanel({
  card,
  onClose,
}: {
  card: HighlightCard;
  onClose: () => void;
}) {
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
          <ProjectPreviewImage card={card} />
        </div>
        <div className="project-detail__content">
          <div className="project-detail__top">
            <div>
              <small>ELEMENT / {card.category}</small>
              <h3>{card.title}</h3>
            </div>
            <button className="project-detail__close" type="button" onClick={onClose} aria-label="Close project detail">
              <svg className="ico-svg" viewBox="0 0 24 24" width="20" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <p className="project-detail__overview">{card.detail.overview}</p>

          <dl className="project-detail__meta">
            <div>
              <dt>Role</dt>
              <dd>{card.detail.role}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{card.detail.stack.join(", ")}</dd>
            </div>
          </dl>

          <div className="project-detail__grid">
            <section>
              <h4>Problem</h4>
              <p>{card.detail.problem}</p>
            </section>
            <section>
              <h4>Solution</h4>
              <p>{card.detail.solution}</p>
            </section>
          </div>

          <ul className="project-detail__highlights">
            {card.detail.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
