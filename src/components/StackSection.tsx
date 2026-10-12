import { useState, type CSSProperties } from "react";
import { stackTabs } from "../data/portfolio";

const profileRowGridStyle = { "--score-cols": 4 } as CSSProperties;
const columnLabels = ["Focus", "Stack", "Level", "Note"];

function ProfileMark({ name }: { name: string }) {
  const key = name.toLowerCase();

  if (key.includes("node") || key.includes("express")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 18h24" />
        <path d="m30 14 4 4-4 4" />
        <path d="M38 30H14" />
        <path d="m18 26-4 4 4 4" />
      </svg>
    );
  }

  if (key.includes("postgres")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <ellipse cx="24" cy="12" rx="14" ry="5" />
        <path d="M10 12v24c0 2.8 6.3 5 14 5s14-2.2 14-5V12" />
        <path d="M10 24c0 2.8 6.3 5 14 5s14-2.2 14-5" />
      </svg>
    );
  }

  if (key.includes("linux") || key.includes("ec2")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="9" y="8" width="30" height="13" rx="3" />
        <rect x="9" y="27" width="30" height="13" rx="3" />
        <path d="M22 14.5h11" />
        <path d="M22 33.5h11" />
        <circle cx="15" cy="14.5" r="1.5" />
        <circle cx="15" cy="33.5" r="1.5" />
      </svg>
    );
  }

  if (key.includes("gvisor")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 6 10 11.5v10.5c0 9 5.9 16.6 14 19.5 8.1-2.9 14-10.5 14-19.5V11.5L24 6Z" />
        <rect x="18.5" y="18.5" width="11" height="11" rx="2" />
      </svg>
    );
  }

  if (key.includes("react")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="3.8" />
        <ellipse cx="24" cy="24" rx="19" ry="7" />
        <ellipse cx="24" cy="24" rx="19" ry="7" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="19" ry="7" transform="rotate(120 24 24)" />
      </svg>
    );
  }

  if (key.includes("vite")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M25 5 8 9l16 34L40 9 25 5Z" />
        <path d="m27 12-9 17h8l-2 10 8-17h-8l3-10Z" />
      </svg>
    );
  }

  if (key.includes("javascript")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="7" y="7" width="34" height="34" rx="5" />
        <path d="M18 31c1.1 1.8 2.5 2.8 4.7 2.8 2.5 0 4.1-1.2 4.1-3.6V18" />
        <path d="M31 32.5c1.2.8 2.6 1.3 4.1 1.3 2 0 3.3-.9 3.3-2.4 0-1.4-1-2.1-3.7-3.2-2.8-1.1-4.6-2.5-4.6-5.1 0-2.9 2.4-5 5.8-5 1.9 0 3.4.4 4.6 1.2" />
      </svg>
    );
  }

  if (key.includes("html") || key.includes("css")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 6h28l-2.6 31.2L24 42 12.6 37.2 10 6Z" />
        <path d="M17 15h15l-.5 6H18l.4 5h12.7l-.8 8.3L24 37l-6.3-2.7-.4-4.3" />
      </svg>
    );
  }

  if (key.includes("typescript")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="7" y="7" width="34" height="34" rx="5" />
        <path d="M15 18h16" />
        <path d="M23 18v16" />
        <path d="M32 33c1.2.6 2.4.9 3.8.9 1.7 0 2.8-.7 2.8-1.9 0-1.1-.8-1.7-3.1-2.5-2.3-.9-3.8-2-3.8-4.2 0-2.4 2-4 5-4 1.5 0 2.7.3 3.7.8" />
      </svg>
    );
  }

  if (key === "git") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M21 6 6 21a4.2 4.2 0 0 0 0 6l15 15a4.2 4.2 0 0 0 6 0l15-15a4.2 4.2 0 0 0 0-6L27 6a4.2 4.2 0 0 0-6 0Z" />
        <path d="M18 18h8a5 5 0 0 1 5 5v7" />
        <circle cx="18" cy="18" r="3" />
        <circle cx="31" cy="31" r="3" />
      </svg>
    );
  }

  if (key.includes("github")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 6C14 6 6 14.2 6 24.3c0 8.1 5.1 14.9 12.2 17.3.9.2 1.2-.4 1.2-.9v-3.5c-5 .9-6.1-2.1-6.1-2.1-.8-2-1.9-2.6-1.9-2.6-1.6-1.1.1-1.1.1-1.1 1.8.1 2.8 1.9 2.8 1.9 1.6 2.8 4.3 2 5.3 1.5.2-1.2.6-2 1.1-2.5-4-.5-8.2-2-8.2-9a7 7 0 0 1 1.9-4.9c-.2-.5-.8-2.4.2-4.9 0 0 1.5-.5 5.1 1.9A17.3 17.3 0 0 1 24 14.8c1.5 0 3 .2 4.4.6 3.5-2.4 5.1-1.9 5.1-1.9 1 2.5.4 4.4.2 4.9a7 7 0 0 1 1.9 4.9c0 7-4.2 8.5-8.2 9 .7.6 1.2 1.7 1.2 3.4v5c0 .5.3 1.1 1.2.9A18.3 18.3 0 0 0 42 24.3C42 14.2 34 6 24 6Z" />
      </svg>
    );
  }

  if (key.includes("figma")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="19" cy="12" r="6" />
        <circle cx="29" cy="12" r="6" />
        <circle cx="19" cy="24" r="6" />
        <circle cx="29" cy="24" r="6" />
        <circle cx="19" cy="36" r="6" />
      </svg>
    );
  }

  if (key.includes("code") || key.includes("postman") || key.includes("notion")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="8" y="9" width="32" height="30" rx="7" />
        <path d="m20 19-6 5 6 5" />
        <path d="m28 19 6 5-6 5" />
        <path d="m26 16-4 16" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="10" y="7" width="28" height="34" rx="4" />
      <path d="M16 17h16" />
      <path d="M16 24h16" />
      <path d="M16 31h10" />
    </svg>
  );
}

export function StackSection() {
  const [activeTab, setActiveTab] = useState(stackTabs[0].label);
  const currentTab = stackTabs.find((tab) => tab.label === activeTab) ?? stackTabs[0];
  const activeTabIndex = Math.max(
    0,
    stackTabs.findIndex((tab) => tab.label === currentTab.label),
  );

  return (
    <section className="anchor-section" id="score">
      <div className="block">
        <div>
          <div className="heading-section mb-0">
            <div className="heading-section__left">
              <h2 className="heading-section__title">Stack</h2>
              <ul className="menu-tabs">
                {stackTabs.map((tab) => (
                  <li className={tab.label === currentTab.label ? "active" : undefined} key={tab.label}>
                    <button
                      type="button"
                      className="menu-tabs__button"
                      onClick={() => setActiveTab(tab.label)}
                      aria-pressed={tab.label === currentTab.label}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="content-tabs stack-content-stage">
            <div
              className="stack-content-prism"
              style={
                {
                  "--active-tab-index": activeTabIndex,
                  "--stack-row-count": currentTab.rows.length,
                } as CSSProperties
              }
            >
              {stackTabs.map((tab, index) => {
                return (
                  <div
                    className={`content-tabs__item active stack-panel-face${tab.label === currentTab.label ? " is-active" : ""}`}
                    key={tab.label}
                    style={{ "--tab-index": index } as CSSProperties}
                    aria-hidden={tab.label === currentTab.label ? undefined : true}
                  >
                    <div className="stack-table-header">
                      <div className="stack-table-header__name">Name</div>
                      <div className="grid-score" style={profileRowGridStyle}>
                        {columnLabels.map((label) => (
                          <div className="grid-score__item" key={label}>{label}</div>
                        ))}
                      </div>
                    </div>
                    <ul className="records-list">
                      {tab.rows.map((row) => (
                        <li className="records-list__item" key={`${tab.label}-${row.name}`}>
                          <div className="records-list__info">
                            <figure>
                              <div className="avatar-name__img avatar-name__img--placeholder profile-mark">
                                <ProfileMark name={row.name} />
                              </div>
                            </figure>
                            <div className="info">
                              <div>
                                <strong>{row.name}</strong>
                                <span className="records-list__from"> from <strong>{row.source}</strong></span>
                              </div>
                              <div className="hidden-sm">{row.role}</div>
                            </div>
                          </div>
                          <div className="records-list__data" lang="en">
                            <div className="grid-score" style={profileRowGridStyle}>
                              <div className="grid-score__item">{row.focus}</div>
                              <div className="grid-score__item">{row.stack}</div>
                              <div className="grid-score__item">{row.level}</div>
                              <div className="grid-score__item grid-score__item--wide">{row.note}</div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
