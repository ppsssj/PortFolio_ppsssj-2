import type { MouseEvent } from "react";

import { GitHubIcon, GmailIcon, NaverMailIcon } from "./ContactIcons";
import { allProjectCards, connectLinks, footerGroups, getProjectSlug, navigationItems, siteMeta } from "../data/portfolio";
import { scrollToAnchor } from "../utils/anchorScroll";
import { resetWindowScrollToTop } from "../utils/scrollReset";

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

function getFooterProjectImage(project: (typeof allProjectCards)[number]) {
  return project.previewImage ?? project.detailImages?.find((image) => !image.toLowerCase().endsWith(".gif")) ?? project.image;
}

export function FooterSection() {
  const isProjectPage = window.location.pathname.startsWith("/projects/");
  const currentProjectSlug = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1] ?? "";
  const currentProjectIndex = allProjectCards.findIndex((card) => getProjectSlug(card) === currentProjectSlug);
  const relatedProjects =
    currentProjectIndex >= 0
      ? Array.from({ length: Math.min(3, allProjectCards.length - 1) }, (_, index) => {
          const nextIndex = (currentProjectIndex + index + 1) % allProjectCards.length;

          return allProjectCards[nextIndex];
        })
      : [];

  const openProjectPage = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    resetWindowScrollToTop();
    window.history.pushState(null, "", href);
    window.dispatchEvent(new Event("pushstate"));
  };

  return (
    <footer id="footer">
      <div className="inner">
        <div className="footer__top">
          <div className="footer__identity">
            <p className="footer__logo footer__logo--small">{siteMeta.brand}</p>
            <p className="footer__signature">{siteMeta.title}</p>
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
            {isProjectPage && relatedProjects.length ? (
              <aside className="footer-projects" aria-label="More project case studies">
                <ul className="footer-projects__list">
                  {relatedProjects.map((project) => {
                    const projectSlug = getProjectSlug(project);
                    const href = `/projects/${projectSlug}`;

                    return (
                      <li key={project.title}>
                        <a className="footer-projects__link" href={href} onClick={(event) => openProjectPage(event, href)}>
                          <img src={getFooterProjectImage(project)} alt="" loading="lazy" />
                          <span>
                            <strong>{project.title}</strong>
                            <small>{project.typeLabel}</small>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </aside>
            ) : null}
          </div>
        </div>
        <div className="footer__bottom" id="contact">
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
