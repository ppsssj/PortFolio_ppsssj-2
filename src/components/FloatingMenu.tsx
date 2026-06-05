import { useEffect, useState } from "react";

import { GitHubIcon, GmailIcon } from "./ContactIcons";
import { navigationItems, siteMeta } from "../data/portfolio";
import { scrollToAnchor } from "../utils/anchorScroll";

export function FloatingMenu() {
  const [activeHref, setActiveHref] = useState(navigationItems[0]?.href ?? "");

  useEffect(() => {
    const sectionIds = navigationItems.map((item) => item.href.replace("#", ""));

    const updateActiveSection = () => {
      const viewportAnchor = window.scrollY + window.innerHeight * 0.42;
      let currentHref = navigationItems[0]?.href ?? "";

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
  }, []);

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
                    {navigationItems.map((item) => (
                      <li key={item.label}>
                        <a
                          className={`menu-float__item${activeHref === item.href ? " is-active" : ""}`}
                          href={item.href}
                          onClick={(event) => scrollToAnchor(event, item.href, item.scrollOffset)}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="menu-float__layout menu-float__layout--tertiary">
                <div className="menu-float__content">
                  <strong>
                    <a className="button button--medium--rounded floating-action-button" href={siteMeta.visitHref} aria-label={siteMeta.visitLabel}>
                      <span className="floating-action-button__icon">
                        <GitHubIcon />
                      </span>
                      <span className="floating-action-button__text">{siteMeta.visitLabel}</span>
                    </a>
                  </strong>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
