export type CurrentDateParts = {
  dayMonth: string;
  longDate: string;
  year: string;
};

export function getCurrentDateParts(): CurrentDateParts {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).formatToParts(now);

  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";
  const year = parts.find((part) => part.type === "year")?.value ?? "";

  return {
    dayMonth: `${month}.${day}`,
    longDate: new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Seoul",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(now),
    year,
  };
}
