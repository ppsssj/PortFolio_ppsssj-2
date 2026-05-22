import { navigationItems, siteMeta } from "../data/portfolio";

function GitHubIcon() {
  return (
    <svg className="ico-svg" viewBox="0 0 24 24" width="18" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.34 1.11 2.91.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.95.68 1.92v2.85c0 .27.18.59.69.49A10.19 10.19 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="ico-svg" viewBox="0 0 24 24" width="18" aria-hidden="true">
      <path d="M4 6h16v12H4V6Zm1.5 1.5L12 12.4l6.5-4.9M5.5 16.5l4.7-4M18.5 16.5l-4.7-4" />
    </svg>
  );
}

export function FloatingMenu() {
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
                        <a className="menu-float__item" href={item.href}>
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
                    <a className="button button--medium--rounded" href={siteMeta.visitHref} aria-label={siteMeta.visitLabel}>
                      <GitHubIcon />
                      {siteMeta.visitLabel}
                    </a>
                  </strong>
                  <a
                    className="button button--medium--rounded--awwward is-custom"
                    href={siteMeta.secondaryCtaHref}
                    aria-label={siteMeta.secondaryCtaLabel}
                  >
                    <MailIcon />
                    <strong>{siteMeta.secondaryCtaLabel}</strong>
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
