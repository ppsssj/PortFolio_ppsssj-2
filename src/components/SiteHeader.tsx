const headerItems = [
  { label: "Explore", href: "#creator" },
  { label: "Directory", href: "#details" },
  { label: "Academy", href: "#details", badge: "New" },
  { label: "Jobs", href: "#score" },
  { label: "Market", href: "#contact" },
];

export function SiteHeader() {
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
                <svg width="30" height="16" viewBox="0 0 30 16">
                  <path d="m18.4 0-2.803 10.855L12.951 0H9.34L6.693 10.855 3.892 0H0l5.012 15.812h3.425l2.708-10.228 2.709 10.228h3.425L22.29 0h-3.892ZM24.77 13.365c0 1.506 1.12 2.635 2.615 2.635C28.879 16 30 14.87 30 13.365c0-1.506-1.12-2.636-2.615-2.636s-2.615 1.13-2.615 2.636Z" />
                </svg>
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
                <div className="search-form">
                  <div className="search-form__field">
                    <button type="submit" className="search-form__button" aria-label="Search">
                      <svg className="ico-svg" viewBox="0 0 20 20" width="14">
                        <use href="https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#lupe" />
                      </svg>
                    </button>
                    <input className="search-form__input" type="text" placeholder="Search by Inspiration" readOnly />
                  </div>
                </div>
              </div>

              <div className="header-main__right">
                <div className="header-main__user">
                  <strong className="header-main__link hidden-sm">Log in</strong>
                  <strong className="header-main__link hidden-sm">Sign Up</strong>
                </div>
                <div className="header-main__bts">
                  <a className="button button--small--rounded" href="#details">
                    Be Pro
                  </a>
                  <a className="button button--small--outline--rounded" href="#contact">
                    Submit Website
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
