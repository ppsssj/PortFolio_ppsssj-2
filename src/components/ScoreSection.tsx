import { useEffect, useRef, useState, type CSSProperties } from "react";
import { profileTableTabs } from "../data/portfolio";

const profileRowGridStyle = { "--score-cols": 4 } as CSSProperties;
const dateColumnTabs = new Set(["Awards", "Activities", "Certification"]);
const numberFormat = new Intl.NumberFormat("en-US");

type MarketplaceExtensionStats = {
  displayName: string;
  extensionName: string;
  uniqueIdentifier: string;
  acquisition: number;
  webDownloads: number;
  installsFromVSCode: number;
  pageViews: number;
  uninstalls: number;
};

type MarketplaceStatsSummary = {
  publishedExtensions: number;
  totalAcquisition: number;
  totalWebDownloads: number;
  totalInstallsFromVSCode: number;
  totalPageViews: number;
  totalUninstalls: number;
};

type MarketplaceStatsResponse = {
  updatedAt: string;
  source: string;
  publisher: string;
  summary: MarketplaceStatsSummary;
  extensions: Record<string, MarketplaceExtensionStats>;
};

type MarketplaceStatsState =
  | { status: "loading"; data: null }
  | { status: "ready"; data: MarketplaceStatsResponse }
  | { status: "error"; data: null };

const marketplaceProjectOrder = [
  {
    key: "gitEffects",
    displayName: "Git Effects",
    descriptor: "Git workflow UX",
    logo: "/assets/GitEffects/logo.svg",
  },
  {
    key: "cogic",
    displayName: "Cogic",
    descriptor: "AST code graph",
    logo: "/assets/Cogic/logo.svg",
  },
  {
    key: "readmeMaker",
    displayName: "Readme Maker",
    descriptor: "README automation",
    logo: "/assets/README%20MAKER/logo.png",
  },
];

function formatMetric(value: number) {
  return numberFormat.format(Math.round(value));
}

function formatUpdatedAt(value?: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function buildMarketplaceMetrics(data: MarketplaceStatsResponse | null) {
  const maxAcquisition = Math.max(
    ...marketplaceProjectOrder.map((project) => data?.extensions[project.key]?.acquisition ?? 0),
    1,
  );

  return marketplaceProjectOrder.map((project) => {
    const stats = data?.extensions[project.key];

    return {
      label: stats?.displayName ?? project.displayName,
      descriptor: project.descriptor,
      logo: project.logo,
      tag: "Acquisition",
      value: stats?.acquisition ?? 0,
      webDownloads: stats?.webDownloads ?? 0,
      installsFromVSCode: stats?.installsFromVSCode ?? 0,
      pageViews: stats?.pageViews ?? 0,
      max: maxAcquisition,
      suffix: "",
    };
  });
}

function ProfileMark({ name }: { name: string }) {
  const key = name.toLowerCase();

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

  if (key.includes("award") || key.includes("competition") || key.includes("paper")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M15 7h18v9a9 9 0 0 1-18 0V7Z" />
        <path d="M15 11H9v4a7 7 0 0 0 7 7" />
        <path d="M33 11h6v4a7 7 0 0 1-7 7" />
        <path d="M24 25v8" />
        <path d="M17 39h14" />
        <path d="m19 33 5-3 5 3" />
      </svg>
    );
  }

  if (key.includes("researcher") || key.includes("aics")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M19 8h10" />
        <path d="M22 8v12L12 37a3 3 0 0 0 2.6 4h18.8A3 3 0 0 0 36 37L26 20V8" />
        <path d="M17 32h14" />
        <circle cx="23" cy="36" r="2" />
      </svg>
    );
  }

  if (key.includes("lead") || key.includes("staff") || key.includes("club")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="14" r="6" />
        <circle cx="13" cy="24" r="5" />
        <circle cx="35" cy="24" r="5" />
        <path d="M13 34c2.5-4 6.2-6 11-6s8.5 2 11 6" />
        <path d="M6 38c1.4-4 4-6 8-6" />
        <path d="M42 38c-1.4-4-4-6-8-6" />
      </svg>
    );
  }

  if (key.includes("intern") || key.includes("innovation")) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 6v7" />
        <path d="M12 12l5 5" />
        <path d="M36 12l-5 5" />
        <path d="M16 27a8 8 0 1 1 16 0c0 3-1.6 5-3.5 6.8-1.2 1.1-1.5 2.3-1.5 4.2h-6c0-1.9-.3-3.1-1.5-4.2C17.6 32 16 30 16 27Z" />
        <path d="M20 42h8" />
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

export function ScoreSection() {
  const [activeTab, setActiveTab] = useState(profileTableTabs[0].label);
  const [hasAnimatedScore, setHasAnimatedScore] = useState(false);
  const [scoreProgress, setScoreProgress] = useState(0);
  const [marketplaceStats, setMarketplaceStats] = useState<MarketplaceStatsState>({ status: "loading", data: null });
  const scoreSectionRef = useRef<HTMLElement>(null);
  const currentTab = profileTableTabs.find((tab) => tab.label === activeTab) ?? profileTableTabs[0];
  const activeTabIndex = Math.max(
    0,
    profileTableTabs.findIndex((tab) => tab.label === currentTab.label),
  );
  const marketplaceData = marketplaceStats.status === "ready" ? marketplaceStats.data : null;
  const marketplaceMetrics = buildMarketplaceMetrics(marketplaceData);
  const totalAcquisition = marketplaceData?.summary.totalAcquisition ?? 0;
  const updatedAtLabel = formatUpdatedAt(marketplaceData?.updatedAt);

  useEffect(() => {
    const section = scoreSectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimatedScore(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadMarketplaceStats() {
      try {
        const response = await fetch("/api/marketplace-stats");

        if (!response.ok) {
          throw new Error("Marketplace stats API is unavailable.");
        }

        const data = (await response.json()) as MarketplaceStatsResponse;

        if (!data.summary || !data.extensions) {
          throw new Error("Marketplace stats response is missing required fields.");
        }

        if (isMounted) {
          setMarketplaceStats({ status: "ready", data });
        }
      } catch {
        if (isMounted) {
          setMarketplaceStats({ status: "error", data: null });
        }
      }
    }

    loadMarketplaceStats();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasAnimatedScore) {
      return;
    }

    let animationFrame = 0;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);

      setScoreProgress(easedProgress);

      if (rawProgress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [hasAnimatedScore]);

  return (
    <section className="anchor-section" id="score" ref={scoreSectionRef}>
      <div className="block">
        <div className="c-heading-score">
          <h2 className="heading-2">
            MARKET / STATS
            <span className="c-heading-score__note">
              <span className="c-heading-score__arrow">-&gt;</span>
              <span className="c-heading-score__value">
                {marketplaceStats.status === "ready" ? formatMetric(totalAcquisition * scoreProgress) : "--"}
              </span>
              <sup>ACQUISITION</sup>
            </span>
          </h2>
          <div className="c-heading-score__link">
            <a className="link-underlined" href="#score">
              {marketplaceStats.status === "error" ? "Marketplace data unavailable" : "3 Published VS Code Extensions"}
            </a>
            {updatedAtLabel ? (
              <span className="c-heading-score__updated">Updated {updatedAtLabel} from Publisher Reports</span>
            ) : null}
          </div>
        </div>

        <div className="layout-overall layout-overall--marketplace" style={{ "--overall-cols": marketplaceMetrics.length } as CSSProperties}>
          {marketplaceMetrics.map((item) => {
            const progressWidth = item.max > 0 ? Math.min((item.value / item.max) * 100 * scoreProgress, 100) : 0;
            const metricValue = marketplaceStats.status === "ready" ? formatMetric(item.value * scoreProgress) : "--";

            return (
              <div className="layout-overall__item" key={item.label}>
                <div className="layout-overall__type">
                  <span className="layout-overall__project">
                    <span className="layout-overall__logo" aria-hidden="true">
                      <img src={item.logo} alt="" />
                    </span>
                    <span className="layout-overall__project-copy">
                      <strong>{item.label}</strong>
                      <span>{item.descriptor}</span>
                    </span>
                  </span>
                  <strong>{item.tag}</strong>
                </div>
                <div className="layout-overall__metric">
                  <div className="layout-overall__chart">
                    <div className="layout-overall__progress">
                      <div className="layout-overall__progressbar" style={{ width: `${progressWidth}%` }} />
                    </div>
                  </div>
                  <div className="layout-overall__score">
                    <strong>{metricValue}{item.suffix}</strong>
                  </div>
                </div>
                <ul className="layout-overall__details">
                  <li>
                    <span>Web downloads</span>
                    <strong>{marketplaceStats.status === "ready" ? formatMetric(item.webDownloads * scoreProgress) : "--"}</strong>
                  </li>
                  <li>
                    <span>VS Code installs</span>
                    <strong>{marketplaceStats.status === "ready" ? formatMetric(item.installsFromVSCode * scoreProgress) : "--"}</strong>
                  </li>
                  <li>
                    <span>Page views</span>
                    <strong>{marketplaceStats.status === "ready" ? formatMetric(item.pageViews * scoreProgress) : "--"}</strong>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>

        <div>
          <div className="heading-section mb-0">
            <div className="heading-section__left">
              <h2 className="heading-section__title">Stack</h2>
              <ul className="menu-tabs">
                {profileTableTabs.map((tab) => (
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
              {profileTableTabs.map((tab, index) => {
                const tabLevelColumnLabel = dateColumnTabs.has(tab.label) ? "Date" : "Level";

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
                        <div className="grid-score__item">Focus</div>
                        <div className="grid-score__item">Stack</div>
                        <div className="grid-score__item">{tabLevelColumnLabel}</div>
                        <div className="grid-score__item">Note</div>
                      </div>
                    </div>
                    <ul className="list-jury-notes">
                      {tab.rows.map((row) => (
                        <li className="list-jury-notes__item" key={`${tab.label}-${row.name}`}>
                          <div className="list-jury-notes__info">
                            <figure>
                              <div className="avatar-name__img avatar-name__img--placeholder profile-mark">
                                <ProfileMark name={row.name} />
                              </div>
                            </figure>
                            <div className="info">
                              <div>
                                <strong>{row.name}</strong>
                                <span className="list-jury-notes__from"> from <strong>{row.source}</strong></span>
                              </div>
                              <div className="hidden-sm">{row.role}</div>
                            </div>
                          </div>
                          <div className="list-jury-notes__score">
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
