import { GitHubIcon, GmailIcon, NaverMailIcon } from "./ContactIcons";
import { connectLinks, footerGroups, navigationItems, siteMeta } from "../data/portfolio";
import { scrollToAnchor } from "../utils/anchorScroll";

const footerLinkMap: Record<string, string> = {
  ...Object.fromEntries(navigationItems.map((item) => [item.label, item.href])),
  Contact: "#contact",
};

const footerScrollOffsetMap: Record<string, number | undefined> = Object.fromEntries(
  navigationItems.map((item) => [item.label, item.scrollOffset]),
);

function getContactIcon(label: string) {
  if (label === "GitHub") {
    return <GitHubIcon />;
  }

  if (label === "Naver Mail") {
    return <NaverMailIcon />;
  }

  return <GmailIcon />;
}

export function FooterSection() {
  const isProjectPage = window.location.pathname.startsWith("/projects/");

  return (
    <footer id="footer">
      <div className="inner">
        <div className="footer__top">
          <div className="footer__identity">
            <p className="footer__logo footer__logo--small">{siteMeta.brand}</p>
            <p className="footer__signature">박성진 · Frontend Developer</p>
          </div>
          <div className="footer__wrapper">
            <div className="footer__grid">
              {footerGroups.map((group, index) => (
                <ul className="footer__menu" key={`group-${index}`}>
                  {group.map((item) => (
                    <li key={item}>
                      <a
                        href={isProjectPage ? `/${footerLinkMap[item] ?? "#contact"}` : footerLinkMap[item] ?? "#contact"}
                        onClick={(event) => scrollToAnchor(event, footerLinkMap[item] ?? "#contact", footerScrollOffsetMap[item])}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
        <div className="footer__bottom" id="contact">
          <div className="footer__left">
            <ul className="footer__nav">
              <li>
                <a className="footer-contact-link" href="mailto:ppssjj020222@gmail.com" aria-label="Gmail">
                  <span className="footer-contact-link__text">ppssjj020222@gmail.com</span>
                  <span className="footer-contact-link__icon">
                    <GmailIcon />
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__right">
            <ul className="footer__nav">
              <li>
                <strong>Connect:</strong>
              </li>
              {connectLinks.map((item) => (
                <li key={item.label}>
                  <a
                    className="footer-contact-link"
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={item.label}
                  >
                    <span className="footer-contact-link__text">{item.label}</span>
                    <span className="footer-contact-link__icon">{getContactIcon(item.label)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
