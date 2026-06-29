import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { GitHubIcon, GmailIcon } from "./ContactIcons";
import { navigationItems, projectNavigationItems } from "../data/portfolio";
import { scrollToAnchor } from "../utils/anchorScroll";

function getElementBackground(element: Element | null) {
  let currentElement = element;

  while (currentElement && currentElement !== document.documentElement) {
    const background = window.getComputedStyle(currentElement).backgroundColor;

    if (background && background !== "rgba(0, 0, 0, 0)" && background !== "transparent") {
      return background;
    }

    currentElement = currentElement.parentElement;
  }

  return window.getComputedStyle(document.body).backgroundColor;
}

function isDarkColor(color: string) {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);

  if (!match) {
    return false;
  }

  const [, red, green, blue] = match.map(Number);
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

  return luminance < 0.5;
}

export function SiteHeader() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isThumbOnDark, setIsThumbOnDark] = useState(false);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingProgressRef = useRef(false);
  const isProgressNavigationRef = useRef(false);
  const moveFrameRef = useRef<number | null>(null);
  const contrastFrameRef = useRef<number | null>(null);
  const settleFrameRef = useRef<number | null>(null);
  const settleTimeoutRef = useRef<number | null>(null);
  const pendingClientXRef = useRef(0);
  const targetScrollTopRef = useRef(0);
  const isScrolled = scrollProgress > 0.5;
  const isProjectPage = window.location.pathname.startsWith("/projects/");
  const headerNavigationItems = isProjectPage ? projectNavigationItems : navigationItems;

  const getScrollableHeight = () =>
    Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight;

  const clearSettleChecks = () => {
    if (settleFrameRef.current !== null) {
      window.cancelAnimationFrame(settleFrameRef.current);
      settleFrameRef.current = null;
    }

    if (settleTimeoutRef.current !== null) {
      window.clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = null;
    }
  };

  const finishProgressNavigation = () => {
    clearSettleChecks();
    isProgressNavigationRef.current = false;
  };

  const scheduleProgressNavigationRelease = () => {
    clearSettleChecks();

    const checkIfSettled = () => {
      if (Math.abs(window.scrollY - targetScrollTopRef.current) < 2) {
        finishProgressNavigation();
        return;
      }

      settleFrameRef.current = window.requestAnimationFrame(checkIfSettled);
    };

    settleFrameRef.current = window.requestAnimationFrame(checkIfSettled);
    settleTimeoutRef.current = window.setTimeout(finishProgressNavigation, 1400);
  };

  const updateThumbContrast = (progress: number) => {
    if (contrastFrameRef.current !== null) {
      window.cancelAnimationFrame(contrastFrameRef.current);
    }

    contrastFrameRef.current = window.requestAnimationFrame(() => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      const rect = track.getBoundingClientRect();
      const x = rect.left + rect.width * (progress / 100);
      const y = rect.top + rect.height / 2;
      const elementBehindThumb = document.elementFromPoint(x, y);
      const background = getElementBackground(elementBehindThumb);

      setIsThumbOnDark(isDarkColor(background));
      contrastFrameRef.current = null;
    });
  };

  const setProgress = (nextProgress: number, shouldScroll: boolean) => {
    const clampedProgress = Math.min(100, Math.max(0, nextProgress));

    setScrollProgress(clampedProgress);
    updateThumbContrast(clampedProgress);

    if (shouldScroll) {
      const scrollableHeight = getScrollableHeight();
      const targetScrollTop = scrollableHeight * (clampedProgress / 100);

      targetScrollTopRef.current = targetScrollTop;
      isProgressNavigationRef.current = true;
      window.scrollTo({
        top: targetScrollTop,
        behavior: isDraggingProgressRef.current ? "auto" : "smooth",
      });
      scheduleProgressNavigationRelease();
    }
  };

  const moveScrollToClientX = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const rect = track.getBoundingClientRect();
    const rawProgress = ((pendingClientXRef.current - rect.left) / rect.width) * 100;

    setProgress(rawProgress, true);
    moveFrameRef.current = null;
  };

  const scheduleScrollMove = (clientX: number) => {
    pendingClientXRef.current = clientX;

    if (moveFrameRef.current !== null) {
      return;
    }

    moveFrameRef.current = window.requestAnimationFrame(moveScrollToClientX);
  };

  const navigateHome = () => {
    window.history.pushState(null, "", "/");
    window.dispatchEvent(new Event("pushstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToProjects = () => {
    window.history.pushState(null, "", "/#highlights");
    window.dispatchEvent(new Event("pushstate"));

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const target = document.getElementById("highlights");

        if (!target) {
          return;
        }

        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
      });
    });
  };

  const handleProgressPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    isDraggingProgressRef.current = true;
    setIsDraggingProgress(true);
    scheduleScrollMove(event.clientX);
  };

  const handleProgressPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingProgressRef.current) {
      return;
    }

    scheduleScrollMove(event.clientX);
  };

  const handleProgressPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    isDraggingProgressRef.current = false;
    setIsDraggingProgress(false);
  };

  useEffect(() => {
    const updateScrollProgress = () => {
      if (isDraggingProgressRef.current || isProgressNavigationRef.current) {
        return;
      }

      const scrollableHeight = getScrollableHeight();
      const nextProgress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

      setProgress(nextProgress, false);
    };

    const cancelProgressNavigation = () => {
      if (!isDraggingProgressRef.current) {
        finishProgressNavigation();
      }
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    window.addEventListener("wheel", cancelProgressNavigation, { passive: true });
    window.addEventListener("touchmove", cancelProgressNavigation, { passive: true });
    window.addEventListener("keydown", cancelProgressNavigation);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      window.removeEventListener("wheel", cancelProgressNavigation);
      window.removeEventListener("touchmove", cancelProgressNavigation);
      window.removeEventListener("keydown", cancelProgressNavigation);

      if (moveFrameRef.current !== null) {
        window.cancelAnimationFrame(moveFrameRef.current);
      }

      if (contrastFrameRef.current !== null) {
        window.cancelAnimationFrame(contrastFrameRef.current);
      }

      clearSettleChecks();
    };
  }, []);

  return (
    <header id="header">
      <div className="inner">
        <div className="c-header-main">
          <div className="header-main">
            <div className="header-main__overlay" />
            <div className="header-main__container">
              <div className="header-main__hamburger">
                <svg className="ico-svg" viewBox="0 0 20 20" width="16">
                  <use href="https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#hamburger" />
                </svg>
              </div>

              <a className="header-main__logo" href={isProjectPage ? "/" : "#creator"} aria-label="Portfolio home">
                PPsssJ
              </a>

              <nav className="nav-header-main" aria-label="Primary">
                <ul className="nav-header-main__list">
                  {headerNavigationItems.map((item) => (
                    <li className="nav-header-main__item" key={item.label}>
                      <a
                        className="nav-header-main__link"
                        href={item.href}
                        onClick={(event) => {
                          if (item.href === "/") {
                            event.preventDefault();
                            navigateHome();
                            return;
                          }

                          scrollToAnchor(event, item.href, item.scrollOffset);
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="header-main__search">
                <div
                  className={`scroll-progress-shell${isProjectPage ? " is-project-page" : ""}${isScrolled ? " is-scrolled" : ""}${isDraggingProgress ? " is-dragging" : ""}`}
                >
                  {isProjectPage ? (
                    <a
                      className="scroll-progress-back"
                      href="/#highlights"
                      onClick={(event) => {
                        event.preventDefault();
                        navigateToProjects();
                      }}
                    >
                      Home
                    </a>
                  ) : null}
                  <div
                    className={`scroll-progress${isScrolled ? " is-scrolled" : ""}${isDraggingProgress ? " is-dragging" : ""}`}
                    role="slider"
                    aria-label="Page scroll position"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(scrollProgress)}
                    tabIndex={0}
                    onPointerDown={handleProgressPointerDown}
                    onPointerMove={handleProgressPointerMove}
                    onPointerUp={handleProgressPointerUp}
                    onPointerCancel={handleProgressPointerUp}
                  >
                    <div className="scroll-progress__track" ref={trackRef}>
                      <div
                        className={`scroll-progress__thumb${isThumbOnDark ? " is-on-dark" : ""}`}
                        style={{ left: `${scrollProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="header-main__right">
                <div className="header-main__bts">
                  <a className="button button--small--rounded header-action-button" href="https://github.com/ppsssj" aria-label="GitHub">
                    <span className="header-action-button__text">GitHub</span>
                    <span className="header-action-button__icon">
                      <GitHubIcon />
                    </span>
                  </a>
                  <a
                    className="button button--small--outline--rounded header-action-button"
                    href="mailto:ppssjj020222@gmail.com"
                    aria-label="Send mail"
                  >
                    <span className="header-action-button__text">Send mail</span>
                    <span className="header-action-button__icon">
                      <GmailIcon />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
