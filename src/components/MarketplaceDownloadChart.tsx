import { useEffect, useMemo, useState } from "react";

type DownloadHistoryPoint = {
  date: string;
  value: number;
};

type MarketplaceExtensionStats = {
  displayName: string;
  uniqueIdentifier: string;
  acquisition: number;
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

function buildChartPath(points: DownloadHistoryPoint[]) {
  if (!points.length) {
    return "";
  }

  const timestamps = points.map((point) => new Date(`${point.date}T00:00:00Z`).getTime());
  const minTime = Math.min(...timestamps);
  const maxTime = Math.max(...timestamps);
  const maxValue = Math.max(...points.map((point) => point.value), 1);
  const plotWidth = chartWidth - chartPadding.left - chartPadding.right;
  const plotHeight = chartHeight - chartPadding.top - chartPadding.bottom;

  return points
    .map((point, index) => {
      const timeProgress = maxTime === minTime ? index / Math.max(points.length - 1, 1) : (timestamps[index] - minTime) / (maxTime - minTime);
      const x = chartPadding.left + timeProgress * plotWidth;
      const y = chartPadding.top + (1 - point.value / maxValue) * plotHeight;

      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export function MarketplaceDownloadChart({ extensionId, marketplaceHref }: MarketplaceDownloadChartProps) {
  const [state, setState] = useState<ChartState>({ status: "loading", data: null });

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
  const chartPath = useMemo(() => buildChartPath(history), [history]);
  const firstPoint = history[0];
  const lastPoint = history.at(-1);
  const total = state.status === "ready" ? state.data.acquisition : null;

  return (
    <section className="project-marketplace-downloads" id="downloads">
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

        <div className={`project-download-chart project-download-chart--${state.status}`}>
          <div className="project-download-chart__summary">
            <span>Total downloads</span>
            <strong>{total === null ? "--" : numberFormat.format(total)}</strong>
            <p>Web downloads + VS Code installs</p>
          </div>

          <div className="project-download-chart__visual">
            {state.status === "ready" && chartPath ? (
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label={`${state.data.displayName} cumulative downloads chart`}>
                <line
                  className="project-download-chart__baseline"
                  x1={chartPadding.left}
                  x2={chartWidth - chartPadding.right}
                  y1={chartHeight - chartPadding.bottom}
                  y2={chartHeight - chartPadding.bottom}
                />
                <path className="project-download-chart__line" d={chartPath} pathLength="1" />
                {lastPoint ? (
                  <circle
                    className="project-download-chart__point"
                    cx={chartWidth - chartPadding.right}
                    cy={chartPadding.top}
                    r="5"
                  />
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
