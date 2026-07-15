const SOURCE_NAME = "Visual Studio Marketplace Publisher Reports";
const PUBLISHER_NAME = "ppsssj";
const CACHE_CONTROL = "s-maxage=21600, stale-while-revalidate=86400";

const extensions = [
  {
    key: "gitEffects",
    displayName: "Git Effects",
    extensionName: "git-effects",
    uniqueIdentifier: "ppsssj.git-effects",
    releaseAfterDate: "2026-02-22T00:00:00.000Z",
  },
  {
    key: "cogic",
    displayName: "Cogic",
    extensionName: "cogic",
    uniqueIdentifier: "ppsssj.cogic",
    releaseAfterDate: "2026-04-04T00:00:00.000Z",
  },
  {
    key: "readmeMaker",
    displayName: "Readme Maker",
    extensionName: "readme-maker",
    uniqueIdentifier: "ppsssj.readme-maker",
    releaseAfterDate: "2026-04-12T00:00:00.000Z",
  },
];

function toNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const number = Number(value.replace(/,/g, ""));

    return Number.isFinite(number) ? number : 0;
  }

  return 0;
}

function buildStatsUrl(extension) {
  const publisherName = encodeURIComponent(PUBLISHER_NAME);
  const extensionName = encodeURIComponent(extension.extensionName);
  const afterDate = encodeURIComponent(extension.releaseAfterDate);

  return `https://marketplace.visualstudio.com/_apis/gallery/publishers/${publisherName}/extensions/${extensionName}/stats?aggregate=1&afterDate=${afterDate}`;
}

function buildAuthHeaders() {
  const marketplacePat = process.env.MARKETPLACE_PAT;

  if (!marketplacePat) {
    throw new Error("MARKETPLACE_PAT is missing");
  }

  const token = Buffer.from(`:${marketplacePat}`).toString("base64");

  return {
    Authorization: `Basic ${token}`,
    Accept: "application/json",
  };
}

function calculateExtensionStats(extension, responseJson) {
  if (!responseJson || typeof responseJson !== "object") {
    throw new Error("Marketplace stats response was not a JSON object");
  }

  if (!Array.isArray(responseJson.dailyStats)) {
    throw new Error("Marketplace stats response did not include dailyStats");
  }

  const totals = responseJson.dailyStats.reduce(
    (result, dailyStat) => {
      const counts = dailyStat?.counts ?? {};

      result.webDownloads += toNumber(counts.webDownloadCount);
      result.installsFromVSCode += toNumber(counts.installCount);
      result.pageViews += toNumber(counts.webPageViews);
      result.uninstalls += toNumber(counts.uninstallCount);

      return result;
    },
    {
      webDownloads: 0,
      installsFromVSCode: 0,
      pageViews: 0,
      uninstalls: 0,
    },
  );

  const downloadsByDate = responseJson.dailyStats.reduce((result, dailyStat) => {
    const statisticDate = new Date(dailyStat?.statisticDate);

    if (Number.isNaN(statisticDate.getTime())) {
      return result;
    }

    const date = statisticDate.toISOString().slice(0, 10);
    const counts = dailyStat?.counts ?? {};
    const downloads = toNumber(counts.webDownloadCount) + toNumber(counts.installCount);

    result.set(date, (result.get(date) ?? 0) + downloads);

    return result;
  }, new Map());

  let cumulativeDownloads = 0;
  const downloadHistory = Array.from(downloadsByDate.entries())
    .sort(([firstDate], [secondDate]) => firstDate.localeCompare(secondDate))
    .map(([date, downloads]) => {
      cumulativeDownloads += downloads;

      return { date, value: cumulativeDownloads };
    });

  return {
    displayName: extension.displayName,
    extensionName: extension.extensionName,
    uniqueIdentifier: extension.uniqueIdentifier,
    acquisition: totals.webDownloads + totals.installsFromVSCode,
    downloadHistory,
    ...totals,
  };
}

async function fetchExtensionStats(extension, headers) {
  const response = await fetch(buildStatsUrl(extension), { headers });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const responseJson = await response.json();

  return calculateExtensionStats(extension, responseJson);
}

function buildSummary(extensionStats) {
  return Object.values(extensionStats).reduce(
    (summary, stats) => {
      summary.totalAcquisition += stats.acquisition;
      summary.totalWebDownloads += stats.webDownloads;
      summary.totalInstallsFromVSCode += stats.installsFromVSCode;
      summary.totalPageViews += stats.pageViews;
      summary.totalUninstalls += stats.uninstalls;

      return summary;
    },
    {
      publishedExtensions: extensions.length,
      totalAcquisition: 0,
      totalWebDownloads: 0,
      totalInstallsFromVSCode: 0,
      totalPageViews: 0,
      totalUninstalls: 0,
    },
  );
}

async function getMarketplaceStats() {
  const headers = buildAuthHeaders();
  const extensionStats = {};

  for (const extension of extensions) {
    try {
      extensionStats[extension.key] = await fetchExtensionStats(extension, headers);
    } catch (error) {
      console.error(`Failed to fetch Marketplace stats for ${extension.extensionName}:`, error.message);
      throw error;
    }
  }

  return {
    updatedAt: new Date().toISOString(),
    source: SOURCE_NAME,
    publisher: PUBLISHER_NAME,
    summary: buildSummary(extensionStats),
    extensions: extensionStats,
  };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const stats = await getMarketplaceStats();

    res.setHeader("Cache-Control", CACHE_CONTROL);
    return res.status(200).json(stats);
  } catch (error) {
    if (error.message === "MARKETPLACE_PAT is missing") {
      console.error("MARKETPLACE_PAT is not configured.");
    }

    return res.status(500).json({ error: "Marketplace stats unavailable" });
  }
}
