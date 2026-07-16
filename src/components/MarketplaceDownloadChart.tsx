import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";

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

type ChartPoint = DownloadHistoryPoint & {
  x: number;
  y: number;
};

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

function buildChartPoints(points: DownloadHistoryPoint[]): ChartPoint[] {
  if (!points.length) {
    return [];
  }

  const timestamps = points.map((point) => new Date(`${point.date}T00:00:00Z`).getTime());
  const minTime = Math.min(...timestamps);
  const maxTime = Math.max(...timestamps);
  const maxValue = Math.max(...points.map((point) => point.value), 1);
  const plotWidth = chartWidth - chartPadding.left - chartPadding.right;
  const plotHeight = chartHeight - chartPadding.top - chartPadding.bottom;

  return points.map((point, index) => {
    const timeProgress = maxTime === minTime ? index / Math.max(points.length - 1, 1) : (timestamps[index] - minTime) / (maxTime - minTime);
    const x = chartPadding.left + timeProgress * plotWidth;
    const y = chartPadding.top + (1 - point.value / maxValue) * plotHeight;

    return { ...point, x, y };
  });
}

function buildChartPath(points: ChartPoint[]) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
}

export function MarketplaceDownloadChart({ extensionId, marketplaceHref }: MarketplaceDownloadChartProps) {
  const [state, setState] = useState<ChartState>({ status: "loading", data: null });
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);

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
  const chartPoints = useMemo(() => buildChartPoints(history), [history]);
  const chartPath = useMemo(() => buildChartPath(chartPoints), [chartPoints]);
  const activePoint = activePointIndex === null ? null : chartPoints[activePointIndex] ?? null;
  const firstPoint = history[0];
  const lastPoint = history.at(-1);
  const total = state.status === "ready" ? state.data.acquisition : null;
  const webDownloads = state.status === "ready" ? state.data.webDownloads : null;
  const installsFromVSCode = state.status === "ready" ? state.data.installsFromVSCode : null;

  function selectNearestPoint(event: PointerEvent<HTMLDivElement>) {
    if (!chartPoints.length) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = ((event.clientX - bounds.left) / bounds.width) * chartWidth;
    const nearestIndex = chartPoints.reduce((bestIndex, point, index) =>
      Math.abs(point.x - pointerX) < Math.abs(chartPoints[bestIndex].x - pointerX) ? index : bestIndex,
    0);

    setActivePointIndex(nearestIndex);
  }

  function navigatePoints(event: KeyboardEvent<HTMLDivElement>) {
    if (!chartPoints.length || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    setActivePointIndex((currentIndex) => {
      const startingIndex = currentIndex ?? chartPoints.length - 1;
      return Math.min(Math.max(startingIndex + direction, 0), chartPoints.length - 1);
    });
  }

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
            {state.status === "ready" && chartPath ? (
              <div
                className="project-download-chart__canvas"
                role="img"
                tabIndex={0}
                onPointerMove={selectNearestPoint}
                onPointerLeave={() => setActivePointIndex(null)}
                onFocus={() => setActivePointIndex((currentIndex) => currentIndex ?? chartPoints.length - 1)}
                onBlur={() => setActivePointIndex(null)}
                onKeyDown={navigatePoints}
                aria-label={`${state.data.displayName} cumulative downloads chart. Hover over the graph or use the left and right arrow keys to inspect each date.${activePoint ? ` ${formatDate(activePoint.date)}: ${numberFormat.format(activePoint.value)} downloads.` : ""}`}
              >
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} aria-hidden="true">
                  <line
                    className="project-download-chart__baseline"
                    x1={chartPadding.left}
                    x2={chartWidth - chartPadding.right}
                    y1={chartHeight - chartPadding.bottom}
                    y2={chartHeight - chartPadding.bottom}
                  />
                  <path className="project-download-chart__line" d={chartPath} />
                  {activePoint ? (
                    <g className="project-download-chart__active-point">
                      <line
                        x1={activePoint.x}
                        x2={activePoint.x}
                        y1={chartPadding.top}
                        y2={chartHeight - chartPadding.bottom}
                      />
                      <circle cx={activePoint.x} cy={activePoint.y} r="5" />
                    </g>
                  ) : null}
                </svg>
                {activePoint ? (
                  <div
                    className="project-download-chart__tooltip"
                    data-edge={activePoint.x < 120 ? "left" : activePoint.x > chartWidth - 120 ? "right" : "center"}
                    data-side={activePoint.y < 80 ? "bottom" : "top"}
                    style={{
                      "--tooltip-x": `${(activePoint.x / chartWidth) * 100}%`,
                      "--tooltip-y": `${(activePoint.y / chartHeight) * 100}%`,
                    } as CSSProperties}
                    aria-hidden="true"
                  >
                    <span>{formatDate(activePoint.date)}</span>
                    <strong>{numberFormat.format(activePoint.value)} downloads</strong>
                  </div>
                ) : null}
              </div>
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
