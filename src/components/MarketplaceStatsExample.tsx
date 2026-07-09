import { useEffect, useState } from "react";

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

type MarketplaceStatsFile = {
  updatedAt: string;
  source: string;
  publisher: string;
  summary: MarketplaceStatsSummary;
  extensions: Record<string, MarketplaceExtensionStats>;
};

type MarketplaceStatsState =
  | { status: "loading"; stats: null }
  | { status: "ready"; stats: MarketplaceStatsFile }
  | { status: "error"; stats: null };

const numberFormat = new Intl.NumberFormat("en-US");

function formatMetric(value: number) {
  return typeof value === "number" ? numberFormat.format(value) : "-";
}

export function MarketplaceStatsExample() {
  const [state, setState] = useState<MarketplaceStatsState>({ status: "loading", stats: null });

  useEffect(() => {
    let isMounted = true;

    async function loadMarketplaceStats() {
      try {
        const response = await fetch("/api/marketplace-stats");

        if (!response.ok) {
          throw new Error("Marketplace stats API is unavailable.");
        }

        const data = (await response.json()) as MarketplaceStatsFile;

        if (!data.summary || !data.extensions) {
          throw new Error("Marketplace stats JSON is missing required fields.");
        }

        if (isMounted) {
          setState({ status: "ready", stats: data });
        }
      } catch {
        if (isMounted) {
          setState({ status: "error", stats: null });
        }
      }
    }

    loadMarketplaceStats();

    return () => {
      isMounted = false;
    };
  }, []);

  if (state.status !== "ready") {
    return <p className="marketplace-stats-fallback">Marketplace data unavailable</p>;
  }

  const { stats } = state;
  const extensionEntries = Object.entries(stats.extensions);

  return (
    <aside className="marketplace-stats" aria-label="Visual Studio Marketplace lifetime stats">
      <div className="marketplace-stats__header">
        <strong>Marketplace Stats</strong>
        <span>Updated {new Date(stats.updatedAt).toLocaleDateString()}</span>
      </div>
      <dl className="marketplace-stats__grid">
        <div>
          <dt>Published Extensions</dt>
          <dd>{formatMetric(stats.summary.publishedExtensions)}</dd>
        </div>
        <div>
          <dt>Total Acquisition</dt>
          <dd>{formatMetric(stats.summary.totalAcquisition)}</dd>
        </div>
        <div>
          <dt>Web Downloads</dt>
          <dd>{formatMetric(stats.summary.totalWebDownloads)}</dd>
        </div>
        <div>
          <dt>VS Code Installs</dt>
          <dd>{formatMetric(stats.summary.totalInstallsFromVSCode)}</dd>
        </div>
        <div>
          <dt>Page Views</dt>
          <dd>{formatMetric(stats.summary.totalPageViews)}</dd>
        </div>
        <div>
          <dt>Uninstalls</dt>
          <dd>{formatMetric(stats.summary.totalUninstalls)}</dd>
        </div>
      </dl>
      <ul className="marketplace-stats__extensions">
        {extensionEntries.map(([key, extension]) => (
          <li key={key}>
            <strong>{extension.displayName}</strong>
            <span>{formatMetric(extension.acquisition)} acquisition</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
