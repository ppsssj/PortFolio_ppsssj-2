import { useEffect, useRef, useState } from "react";

import { creatorCredits, heroGallery, siteMeta } from "../data/portfolio";
import { getCurrentDateParts } from "../utils/currentDate";

function SpriteIcon({ id }: { id: string }) {
  return (
    <svg className="ico-svg" viewBox="0 0 20 20" width="20">
      <use href={`https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#${id}`} />
    </svg>
  );
}

function CreditBadge({ name, role, badge }: { name: string; role: string; badge?: string }) {
  const initials = badge ?? name.slice(0, 2).toUpperCase();

  return (
    <li>
      <div className="users-credits__item">
        <figure className="avatar-name">
          <div className="avatar-name__link">
            <div className="avatar-name__img avatar-name__img--placeholder">{initials}</div>
            <figcaption className="avatar-name__name">
              <strong className="link-underlined">{name}</strong>
              <span>{role}</span>
            </figcaption>
          </div>
        </figure>
      </div>
    </li>
  );
}

const stickyBrandIndexes = new Set([0, 3, 5]);

type StickyLetter = {
  char: string;
  index: number;
  left: number;
  targetLeft: number;
  top: number;
  width: number;
};

export function CreatorSection() {
  const [currentDate, setCurrentDate] = useState(() => getCurrentDateParts());
  const [stickyLetters, setStickyLetters] = useState<StickyLetter[]>([]);
  const [isBrandSticky, setIsBrandSticky] = useState(false);
  const [brandGatherProgress, setBrandGatherProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const stickyLettersRef = useRef<StickyLetter[]>([]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentDate(getCurrentDateParts());
    }, 60 * 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const measureLetters = () => {
      const measuredLetters = Array.from(stickyBrandIndexes)
        .map((index) => {
          const element = letterRefs.current[index];

          if (!element) {
            return null;
          }

          const rect = element.getBoundingClientRect();

          return {
            char: element.textContent ?? "",
            index,
            left: rect.left,
            targetLeft: rect.left,
            top: rect.top,
            width: rect.width,
          };
        })
        .filter((letter): letter is StickyLetter => Boolean(letter));

      if (measuredLetters.length > 0) {
        const totalWidth = measuredLetters.reduce((sum, letter) => sum + letter.width, 0);
        const groupedStart = window.innerWidth / 2 - totalWidth / 2;
        let nextLeft = groupedStart;

        measuredLetters.forEach((letter) => {
          letter.targetLeft = nextLeft;
          nextLeft += letter.width;
        });
      }

      stickyLettersRef.current = measuredLetters;
      setStickyLetters(measuredLetters);
    };

    const updateStickyState = () => {
      const section = sectionRef.current;
      const firstLetter = stickyLettersRef.current[0];

      if (!section || !firstLetter) {
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      const shouldStick = sectionRect.top < 0 && sectionRect.bottom > firstLetter.top + 20;
      const gatherDistance = Math.max(window.innerHeight * 0.52, 1);
      const isPastCreator = sectionRect.bottom <= firstLetter.top + 20;
      const progress = isPastCreator ? 1 : Math.min(Math.max(-sectionRect.top / gatherDistance, 0), 1);

      setIsBrandSticky(shouldStick);
      setBrandGatherProgress(sectionRect.top >= 0 ? 0 : progress);
    };

    const handleScroll = () => {
      updateStickyState();
    };

    const handleResize = () => {
      measureLetters();
      updateStickyState();
    };

    measureLetters();
    updateStickyState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="anchor-section" id="creator" ref={sectionRef}>
      <div className={`brand-sticky-letters${isBrandSticky ? " is-visible" : ""}`} aria-hidden="true">
        {stickyLetters.map((letter) => (
          <span
            className="brand-sticky-letters__item"
            key={`${letter.char}-${letter.index}`}
            style={{
              "--brand-letter-left": `${letter.left}px`,
              "--brand-letter-target-left": `${letter.targetLeft}px`,
              "--brand-letter-progress": brandGatherProgress,
              "--brand-letter-opacity": isBrandSticky ? Math.min(brandGatherProgress * 2.5, 1) : 0,
              left: `${letter.left}px`,
              top: `${letter.top}px`,
              width: `${letter.width}px`,
            } as React.CSSProperties}
          >
            {letter.char}
          </span>
        ))}
      </div>
      <div className="content-header">
        <div className="block">
          <div className="inner">
            <div className="head-site">
              <div className="head-toolbar">
                <div className="head-toolbar__left">
                  <div className="box-score">
                    <div className="box-score__top">
                      <strong>{siteMeta.date}</strong>
                    </div>
                    <div className="box-score__bottom">
                      <div className="box-score__note">
                        <strong>{currentDate.dayMonth}</strong>
                        <sub>{currentDate.year}</sub>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="head-toolbar__right">
                  <ul className="toolbar-bts">
                    <li>
                      <span className="toolbar-bts__item">
                        <SpriteIcon id="bookmark" />
                      </span>
                    </li>
                    <li>
                      <span className="toolbar-bts__item">
                        <SpriteIcon id="share" />
                      </span>
                    </li>
                    <li>
                      <a className="toolbar-bts__item" href={siteMeta.visitHref}>
                        <SpriteIcon id="link" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="c-heading text-center">
                <div className="c-heading__top">
                  <h2 className="text-default">Site of the Day - {currentDate.longDate}</h2>
                </div>
                <div className="c-heading__middle">
                  <h1 className="heading-1 hero-brand-title">
                    <a href={siteMeta.visitHref} aria-label={siteMeta.brand}>
                      {siteMeta.brand.split("").map((char, index) => (
                        <span
                          className={stickyBrandIndexes.has(index) && isBrandSticky ? "hero-brand-title__letter is-hidden" : "hero-brand-title__letter"}
                          key={`${char}-${index}`}
                          ref={(element) => {
                            letterRefs.current[index] = element;
                          }}
                          style={
                            stickyBrandIndexes.has(index)
                              ? { opacity: 1 - Math.min(brandGatherProgress * 2.5, 1) }
                              : undefined
                          }
                        >
                          {char}
                        </span>
                      ))}
                    </a>
                  </h1>
                </div>
                <div className="c-heading__bottom">
                  <p className="c-heading__description">{siteMeta.description}</p>
                  <div className="head-site__credits">
                    <div className="users-credits">
                      <ul className="users-credits__details">
                        {creatorCredits.map((credit) => (
                          <CreditBadge key={credit.name} {...credit} />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="gallery-site" data-header-floating="show">
                {heroGallery.map((image) => (
                  <li key={image}>
                    <div className="box-figure">
                      <img className="gallery-site__img" src={image} alt="Portfolio preview" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
