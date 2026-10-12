import { useEffect, useRef, useState, type CSSProperties } from "react";

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
    logo: "/assets/GitEffects/icon.png",
    marketplaceUrl: "https://marketplace.visualstudio.com/items?itemName=ppsssj.git-effects",
  },
  {
    key: "cogic",
    displayName: "Cogic",
    descriptor: "AST code graph",
    logo: "/assets/Cogic/logo.svg",
    marketplaceUrl: "https://marketplace.visualstudio.com/items?itemName=ppsssj.cogic",
  },
  {
    key: "readmeMaker",
    displayName: "Readme Maker",
    descriptor: "README automation",
    logo: "/assets/README%20MAKER/logo.png",
    marketplaceUrl: "https://marketplace.visualstudio.com/items?itemName=ppsssj.readme-maker",
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
      marketplaceUrl: project.marketplaceUrl,
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

export function MarketplaceStatsSection() {
  const [hasAnimatedScore, setHasAnimatedScore] = useState(false);
  const [scoreProgress, setScoreProgress] = useState(0);
  const [marketplaceStats, setMarketplaceStats] = useState<MarketplaceStatsState>({ status: "loading", data: null });
  const marketSectionRef = useRef<HTMLElement>(null);
  const marketplaceData = marketplaceStats.status === "ready" ? marketplaceStats.data : null;
  const marketplaceMetrics = buildMarketplaceMetrics(marketplaceData);
  const totalAcquisition = marketplaceData?.summary.totalAcquisition ?? 0;
  const updatedAtLabel = formatUpdatedAt(marketplaceData?.updatedAt);

  useEffect(() => {
    const section = marketSectionRef.current;

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
    <section className="anchor-section" id="market" ref={marketSectionRef}>
      <div className="block">
        <div className="score-marketplace-sticky-area">
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
              <a className="link-underlined" href="#market">
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
                  <a
                    className="layout-overall__project"
                    href={item.marketplaceUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${item.label} on Visual Studio Marketplace`}
                  >
                    <span className="layout-overall__logo" aria-hidden="true">
                      <img src={item.logo} alt="" />
                    </span>
                    <span className="layout-overall__project-copy">
                      <strong>{item.label}</strong>
                      <span>{item.descriptor}</span>
                    </span>
                  </a>
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
        </div>
      </div>
    </section>
  );
}
