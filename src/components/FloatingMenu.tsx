import { navigationItems, siteMeta } from "../data/portfolio";

export function FloatingMenu() {
  return (
    <div className="menu-float menu-float--portfolio is-visible">
      <div className="inner">
        <div className="menu-float__inner">
          <div className="menu-float__wrapper">
            <div className="menu-float__bottom">
              <div className="menu-float__layout menu-float__layout--primary">
                <div className="menu-float__content">
                  <a className="menu-float__logo" href="#creator" aria-label="Portfolio home">
                    <span>PP</span>
                  </a>
                </div>
              </div>

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
                    <a className="button button--medium--rounded" href={siteMeta.visitHref}>
                      Visit Site
                    </a>
                  </strong>
                  <a className="button button--medium--rounded--awwward is-custom" href={siteMeta.secondaryCtaHref}>
                    <strong>Vote for Awwwards Honors</strong>
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
