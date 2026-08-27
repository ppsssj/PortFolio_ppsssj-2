import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { motion } from "framer-motion";

import { featuredProjectCard, getProjectSlug, highlightCards } from "../data/portfolio";
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

function DetailIcon() {
  return (
    <svg className="ico-svg project-detail__detail-icon" viewBox="0 0 24 24" width="18" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="m15 15 5 5" />
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
  const categoryLabel = card.category;
  const previewImage = card.previewImage ?? detailImages[0] ?? card.image;
  const modalImageSeedRef = useRef(Date.now());
  const initialModalImage = detailImages[0] ?? previewImage;
  const openCaseStudy = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.body.style.overflow = "";
    resetWindowScrollToTop();
    window.history.pushState(null, "", caseStudyHref);
    window.dispatchEvent(new Event("pushstate"));
  };
  const previewImages = useMemo(
    () => [
      initialModalImage,
      ...detailImages.filter((image) => image !== initialModalImage),
      ...(previewImage !== initialModalImage && !detailImages.includes(previewImage) ? [previewImage] : []),
    ],
    [detailImages, initialModalImage, previewImage],
  );
  const actionLinks = useMemo<Array<{
    ariaLabel: string;
    className: string;
    href: string;
    icon: ReactNode;
    label: string;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    external?: boolean;
  }>>(
    () => [
      {
        ariaLabel: `Open ${card.title} case study page`,
        className: "project-detail__tab-button project-detail__tab-button--case",
        href: caseStudyHref,
        icon: <DetailIcon />,
        label: "detail",
        onClick: openCaseStudy,
      },
      ...(marketplaceLink
        ? [
            {
              ariaLabel: `Open ${card.title} Visual Studio Marketplace page`,
              className: "project-detail__tab-button project-detail__tab-button--external",
              href: marketplaceLink.href,
              icon: <MarketplaceIcon />,
              label: "market",
              external: true,
            },
          ]
        : []),
      ...(githubLink
        ? [
            {
              ariaLabel: `Open ${card.title} GitHub repository`,
              className: "project-detail__tab-button project-detail__tab-button--external",
              href: githubLink.href,
              icon: <GitHubIcon />,
              label: "github",
              external: true,
            },
          ]
        : []),
    ],
    [card.title, caseStudyHref, githubLink, marketplaceLink],
  );
  const mobileActionLinks = useMemo(() => {
    const order = ["detail", "github", "market"];

    return [...actionLinks].sort((first, second) => order.indexOf(first.label) - order.indexOf(second.label));
  }, [actionLinks]);
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);
  const selectedPreviewImage = previewImages[selectedPreviewIndex] ?? previewImage;
  const selectedDisplayImage = selectedPreviewImage.toLowerCase().endsWith(".gif")
    ? `${selectedPreviewImage}?modal=${modalImageSeedRef.current}-${selectedPreviewIndex}`
    : selectedPreviewImage;
  const visiblePreviewItems = previewImages
    .map((image, index) => {
      const rawOffset = selectedPreviewIndex - index;
      const wrappedOffset =
        Math.abs(rawOffset) > previewImages.length / 2 ? rawOffset - Math.sign(rawOffset) * previewImages.length : rawOffset;

      return {
        image,
        index,
        offset: wrappedOffset,
      };
    })
    .filter(({ offset }) => Math.abs(offset) <= 2)
    .sort((a, b) => a.offset - b.offset);

  useEffect(() => {
    setSelectedPreviewIndex(0);
  }, [previewImages]);

  const movePreview = (direction: -1 | 1) => {
    setSelectedPreviewIndex((currentIndex) => (currentIndex + direction + previewImages.length) % previewImages.length);
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
      <div className="project-detail-stage" onClick={(event) => event.stopPropagation()}>
        <motion.aside
          className="project-detail"
          aria-live="polite"
          role="dialog"
          aria-modal="true"
          aria-label={`${card.title} project detail`}
          initial={{ opacity: 0, y: 10, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.985 }}
          transition={{ duration: 0.22, ease: [0.25, 0.8, 0.25, 1] }}
        >
          <div className="project-detail__media">
            <div className="project-detail__main-image">
              <ProjectPreviewImage card={card} image={selectedDisplayImage} />
            </div>
            {previewImages.length > 1 ? (
              <div className="project-detail__preview-bar" aria-label={`${card.title} preview screens`}>
                <button
                  className="project-detail__preview-nav project-detail__preview-nav--prev"
                  type="button"
                  onClick={() => movePreview(-1)}
                  aria-label="Previous preview"
                >
                  {"<"}
                </button>
                <div className="project-detail__previews">
                  {visiblePreviewItems.map(({ image, index, offset }) => (
                    <button
                      className={`project-detail__preview-shell${index === selectedPreviewIndex ? " is-active" : ""}${
                        offset < 0 ? " is-before" : ""
                      }${offset > 0 ? " is-after" : ""}`}
                      type="button"
                      key={`${image}-${index}`}
                      onClick={() => setSelectedPreviewIndex(index)}
                      aria-label={`Show preview ${index + 1}`}
                      aria-pressed={index === selectedPreviewIndex}
                      style={
                        {
                          "--preview-offset": offset,
                          "--preview-distance": Math.abs(offset),
                          zIndex: 10 - Math.abs(offset),
                        } as CSSProperties
                      }
                    >
                      <span className="project-detail__preview">
                        <img src={image} alt="" />
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  className="project-detail__preview-nav project-detail__preview-nav--next"
                  type="button"
                  onClick={() => movePreview(1)}
                  aria-label="Next preview"
                >
                  {">"}
                </button>
              </div>
            ) : null}
          </div>
          <div className="project-detail__content">
            <div className="project-detail__top">
              <div>
                <small>{categoryLabel}</small>
                <div className="project-detail__title-row">
                  <h3>{card.title}</h3>
                  <div className="project-detail__mobile-links" aria-label={`${card.title} project links`}>
                    {mobileActionLinks.map((action) => (
                      <a
                        className="project-detail__mobile-link"
                        href={action.href}
                        target={action.external ? "_blank" : undefined}
                        rel={action.external ? "noreferrer" : undefined}
                        onClick={action.onClick}
                        aria-label={action.ariaLabel}
                        key={action.ariaLabel}
                      >
                        {action.icon}
                      </a>
                    ))}
                  </div>
                </div>
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
        </motion.aside>
        <div className="project-detail__tab-stack" aria-label={`${card.title} project links`}>
          {actionLinks.map((action) => (
            <a
              className={action.className}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noreferrer" : undefined}
              onClick={action.onClick}
              aria-label={action.ariaLabel}
              key={action.ariaLabel}
            >
              <span className="project-detail__tab-logo">
                {action.icon}
              </span>
              <span className="project-detail__tab-text" aria-hidden="true">
                {action.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedProject({
  card,
  onOpen,
}: {
  card: HighlightCard;
  onOpen: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <article className="card-slide card-slide--featured">
      <div className="box-figure">
        <figure className="figure-rollover js-collectable is-large">
          <button
            className="figure-rollover__link figure-rollover__button"
            type="button"
            onClick={onOpen}
            aria-label={`Open ${card.title} project detail`}
          >
            <ProjectPreviewImage card={card} />
          </button>
          <ProjectOpenMark />
        </figure>
      </div>
      <div className="card-slide__info">
        <div className="card-slide__row">
          <h3 className="card-slide__title">
            <button type="button" onClick={onOpen}>
              {card.title}
            </button>
          </h3>
          <div className="card-slide__data">
            <small>from</small>
            <button type="button" className="link-underlined" onClick={onOpen}>
              {card.category}
            </button>
          </div>
        </div>
        <p className="card-slide__description">{card.description}</p>
      </div>
    </article>
  );
}

export function ElementsSection() {
  const openProjectPage = (card: HighlightCard) => {
    const caseStudyHref = `/projects/${getProjectSlug(card)}`;

    resetWindowScrollToTop();
    window.history.pushState(null, "", caseStudyHref);
    window.dispatchEvent(new Event("pushstate"));
  };

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

          <FeaturedProject
            card={featuredProjectCard}
            onOpen={() => openProjectPage(featuredProjectCard)}
          />

          <ul className="gallery-site gallery-site--two-cols">
              {highlightCards.map((card) => {
                return (
                  <li key={card.title}>
                    <article className="card-slide">
                      <div className="box-figure">
                        <figure className="figure-rollover js-collectable is-large">
                          <button
                            className="figure-rollover__link figure-rollover__button"
                            type="button"
                            onClick={() => openProjectPage(card)}
                            aria-label={`Open ${card.title} project detail`}
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
                            <button type="button" onClick={() => openProjectPage(card)}>
                              {card.title}
                            </button>
                          </h3>
                          <div className="card-slide__data">
                            <small>from</small>
                            <button type="button" className="link-underlined" onClick={() => openProjectPage(card)}>
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
        </div>
      </div>
    </section>
  );
}
