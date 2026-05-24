import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const headerItems = [
  { label: "Home", href: "#creator" },
  { label: "Projects", href: "#highlights" },
  { label: "Belief", href: "#typography" },
  { label: "Details", href: "#details" },
  { label: "Index", href: "#score" },
];

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
  const isScrolled = scrollProgress > 0.5;

  const updateThumbContrast = (progress: number) => {
    window.requestAnimationFrame(() => {
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
    });
  };

  const moveScrollToClientX = (clientX: number) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const rect = track.getBoundingClientRect();
    const rawProgress = ((clientX - rect.left) / rect.width) * 100;
    const nextProgress = Math.min(100, Math.max(0, rawProgress));
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

    setScrollProgress(nextProgress);
    updateThumbContrast(nextProgress);
    window.scrollTo({ top: scrollableHeight * (nextProgress / 100), behavior: "auto" });
  };

  const handleProgressPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    isDraggingProgressRef.current = true;
    setIsDraggingProgress(true);
    moveScrollToClientX(event.clientX);
  };

  const handleProgressPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingProgressRef.current) {
      return;
    }

    moveScrollToClientX(event.clientX);
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
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      const clampedProgress = Math.min(100, Math.max(0, nextProgress));

      setScrollProgress(clampedProgress);
      updateThumbContrast(clampedProgress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
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

              <a className="header-main__logo" href="#creator" aria-label="Portfolio home">
                PPsssJ
              </a>

              <nav className="nav-header-main" aria-label="Primary">
                <ul className="nav-header-main__list">
                  {headerItems.map((item) => (
                    <li className="nav-header-main__item" key={item.label}>
                      <a className="nav-header-main__link" href={item.href}>
                        {item.label}
                        {item.badge ? (
                          <span className="budget-tag budget-tag--small--solid--black anim-shiny">
                            <span>{item.badge}</span>
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="header-main__search">
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

              <div className="header-main__right">
                <div className="header-main__bts">
                  <a className="button button--small--rounded" href="https://github.com/ppsssj">
                    GitHub
                  </a>
                  <a className="button button--small--outline--rounded" href="mailto:ppssjj020222@gmail.com">
                    Send mail
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
