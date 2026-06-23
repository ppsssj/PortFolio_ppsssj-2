import { useEffect, useState } from "react";

import { GitHubIcon, GmailIcon } from "./ContactIcons";
import { navigationItems, siteMeta, type LinkItem } from "../data/portfolio";
import { scrollToAnchor } from "../utils/anchorScroll";

type FloatingMenuProps = {
  items?: LinkItem[];
  githubHref?: string;
  showMail?: boolean;
};

function HomeIcon() {
  return (
    <svg className="ico-svg menu-float__home-icon" viewBox="0 0 24 24" width="18" aria-hidden="true">
      <path d="M3.4 11.1 12 3.8l8.6 7.3-1.3 1.5-1.2-1V20h-4.3v-5.2h-3.6V20H5.9v-8.4l-1.2 1-1.3-1.5Z" />
    </svg>
  );
}

export function FloatingMenu({ items = navigationItems, githubHref = siteMeta.visitHref, showMail = true }: FloatingMenuProps) {
  const firstAnchorHref = items.find((item) => item.href.startsWith("#"))?.href ?? items[0]?.href ?? "";
  const [activeHref, setActiveHref] = useState(firstAnchorHref);

  useEffect(() => {
    const anchorItems = items.filter((item) => item.href.startsWith("#"));
    const sectionIds = anchorItems.map((item) => item.href.replace("#", ""));

    const updateActiveSection = () => {
      const viewportAnchor = window.scrollY + window.innerHeight * 0.42;
      let currentHref = anchorItems[0]?.href ?? items[0]?.href ?? "";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);

        if (section && section.offsetTop <= viewportAnchor) {
          currentHref = `#${id}`;
        }
      });

      setActiveHref(currentHref);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [firstAnchorHref, items]);

  return (
    <div className="menu-float menu-float--portfolio is-visible">
      <div className="inner">
        <div className="menu-float__inner">
          <div className="menu-float__wrapper">
            <div className="menu-float__bottom">
              <div className="menu-float__layout menu-float__layout--secondary">
                <div className="menu-float__content">
                  <div className="menu-float__progress">
                    <div className="menu-float__bar" />
                  </div>
                  <ul className="menu-float__nav">
                    {items.map((item) => {
                      const isHome = item.label.toLowerCase() === "home";

                      return (
                        <li key={item.label}>
                          <a
                            className={`menu-float__item${activeHref === item.href ? " is-active" : ""}${isHome ? " menu-float__item--home" : ""}`}
                            href={item.href}
                            aria-label={isHome ? "Home" : undefined}
                            onClick={(event) => scrollToAnchor(event, item.href, item.scrollOffset)}
                          >
                            {isHome ? (
                              <>
                                <span className="menu-float__item-label">{item.label}</span>
                                <span className="menu-float__item-icon">
                                  <HomeIcon />
                                </span>
                              </>
                            ) : (
                              item.label
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="menu-float__layout menu-float__layout--tertiary">
                <div className="menu-float__content">
                  <strong>
                    <a className="button button--medium--rounded floating-action-button" href={githubHref} target="_blank" rel="noreferrer" aria-label={siteMeta.visitLabel}>
                      <span className="floating-action-button__icon">
                        <GitHubIcon />
                      </span>
                      <span className="floating-action-button__text">{siteMeta.visitLabel}</span>
                    </a>
                  </strong>
                  {showMail ? (
                    <a
                      className="button button--medium--rounded--awwward is-custom floating-action-button"
                      href={siteMeta.secondaryCtaHref}
                      aria-label={siteMeta.secondaryCtaLabel}
                    >
                      <span className="floating-action-button__icon">
                        <GmailIcon />
                      </span>
                      <strong className="floating-action-button__text">{siteMeta.secondaryCtaLabel}</strong>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
