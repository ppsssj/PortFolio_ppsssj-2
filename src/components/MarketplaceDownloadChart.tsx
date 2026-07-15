import { useEffect, useMemo, useRef, useState } from "react";

type DownloadHistoryPoint = {
  date: string;
  value: number;
};

type MarketplaceExtensionStats = {
  displayName: string;
  uniqueIdentifier: string;
  acquisition: number;
  webDownloads: number;
  installsFromVSCode: number;
  downloadHistory?: DownloadHistoryPoint[];
};

type MarketplaceStatsResponse = {
  updatedAt: string;
  extensions: Record<string, MarketplaceExtensionStats>;
};

type ChartState =
  | { status: "loading"; data: null }
  | { status: "ready"; data: MarketplaceExtensionStats; updatedAt: string }
  | { status: "error"; data: null };

type MarketplaceDownloadChartProps = {
  extensionId: string;
  marketplaceHref: string;
};

const numberFormat = new Intl.NumberFormat("en-US");
const chartWidth = 1000;
const chartHeight = 280;
const chartPadding = { top: 18, right: 8, bottom: 18, left: 8 };

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function buildChartGeometry(points: DownloadHistoryPoint[]) {
  if (!points.length) {
    return { path: "", endPoint: null };
  }

  const timestamps = points.map((point) => new Date(`${point.date}T00:00:00Z`).getTime());
  const minTime = Math.min(...timestamps);
  const maxTime = Math.max(...timestamps);
  const maxValue = Math.max(...points.map((point) => point.value), 1);
  const plotWidth = chartWidth - chartPadding.left - chartPadding.right;
  const plotHeight = chartHeight - chartPadding.top - chartPadding.bottom;

  const coordinates = points.map((point, index) => {
      const timeProgress = maxTime === minTime ? index / Math.max(points.length - 1, 1) : (timestamps[index] - minTime) / (maxTime - minTime);
      const x = chartPadding.left + timeProgress * plotWidth;
      const y = chartPadding.top + (1 - point.value / maxValue) * plotHeight;

      return { x, y };
    });

  return {
    path: coordinates.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" "),
    endPoint: coordinates.at(-1) ?? null,
  };
}

export function MarketplaceDownloadChart({ extensionId, marketplaceHref }: MarketplaceDownloadChartProps) {
  const [state, setState] = useState<ChartState>({ status: "loading", data: null });
  const [hasEntered, setHasEntered] = useState(false);
  const [prefersReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !("IntersectionObserver" in window)) {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const response = await fetch("/api/marketplace-stats");

        if (!response.ok) {
          throw new Error("Marketplace stats are unavailable.");
        }

        const stats = (await response.json()) as MarketplaceStatsResponse;
        const extension = Object.values(stats.extensions ?? {}).find((item) => item.uniqueIdentifier === extensionId);

        if (!extension?.downloadHistory?.length) {
          throw new Error("Marketplace download history is unavailable.");
        }

        if (isMounted) {
          setState({ status: "ready", data: extension, updatedAt: stats.updatedAt });
        }
      } catch {
        if (isMounted) {
          setState({ status: "error", data: null });
        }
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, [extensionId]);

  const history = state.status === "ready" ? state.data.downloadHistory ?? [] : [];
  const chartGeometry = useMemo(() => buildChartGeometry(history), [history]);
  const firstPoint = history[0];
  const lastPoint = history.at(-1);
  const total = state.status === "ready" ? state.data.acquisition : null;
  const webDownloads = state.status === "ready" ? state.data.webDownloads : null;
  const installsFromVSCode = state.status === "ready" ? state.data.installsFromVSCode : null;

  return (
    <section className="project-marketplace-downloads" id="downloads" ref={sectionRef}>
      <div className="inner">
        <div className="project-marketplace-downloads__header">
          <div>
            <p>Live on Marketplace</p>
            <h2>Cumulative downloads.</h2>
          </div>
          <a href={marketplaceHref} target="_blank" rel="noreferrer">
            View on Marketplace <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className={`project-download-chart project-download-chart--${state.status}${hasEntered ? " is-visible" : ""}`}>
          <div className="project-download-chart__summary">
            <div className="project-download-chart__metric project-download-chart__metric--total">
              <span>Total downloads</span>
              <strong>{total === null ? "--" : numberFormat.format(total)}</strong>
              <p>Web downloads + VS Code installs</p>
            </div>
            <div className="project-download-chart__metric">
              <span>Web downloads</span>
              <strong>{webDownloads === null ? "--" : numberFormat.format(webDownloads)}</strong>
              <p>Downloads from the Marketplace page</p>
            </div>
            <div className="project-download-chart__metric">
              <span>VS Code installs</span>
              <strong>{installsFromVSCode === null ? "--" : numberFormat.format(installsFromVSCode)}</strong>
              <p>Installs started inside VS Code</p>
            </div>
          </div>

          <div className="project-download-chart__visual">
            {state.status === "ready" && chartGeometry.path ? (
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label={`${state.data.displayName} cumulative downloads chart`}>
                <line
                  className="project-download-chart__baseline"
                  x1={chartPadding.left}
                  x2={chartWidth - chartPadding.right}
                  y1={chartHeight - chartPadding.bottom}
                  y2={chartHeight - chartPadding.bottom}
                />
                <path
                  className="project-download-chart__line"
                  d={chartGeometry.path}
                  pathLength="1"
                  strokeDasharray={prefersReducedMotion ? undefined : 1}
                  strokeDashoffset={prefersReducedMotion ? undefined : 1}
                >
                  {!prefersReducedMotion && hasEntered ? (
                    <animate
                      id="downloadLineReveal"
                      attributeName="stroke-dashoffset"
                      from="1"
                      to="0"
                      dur="1.45s"
                      fill="freeze"
                      calcMode="spline"
                      keyTimes="0;1"
                      keySplines="0.22 1 0.36 1"
                    />
                  ) : null}
                </path>
                {chartGeometry.endPoint && (prefersReducedMotion || hasEntered) ? (
                  <circle
                    className="project-download-chart__point"
                    cx={chartGeometry.endPoint.x}
                    cy={chartGeometry.endPoint.y}
                    r="5"
                    opacity={prefersReducedMotion ? 1 : 0}
                  >
                    {!prefersReducedMotion ? (
                      <animate
                        attributeName="opacity"
                        from="0"
                        to="1"
                        begin="downloadLineReveal.end"
                        dur="0.16s"
                        fill="freeze"
                      />
                    ) : null}
                  </circle>
                ) : null}
              </svg>
            ) : (
              <div className="project-download-chart__empty" aria-live="polite">
                {state.status === "error" ? "Marketplace data unavailable" : "Loading Marketplace data"}
              </div>
            )}
            <div className="project-download-chart__dates" aria-hidden={state.status !== "ready"}>
              <span>{firstPoint ? formatDate(firstPoint.date) : "Published"}</span>
              <span>{lastPoint ? formatDate(lastPoint.date) : "Latest"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
