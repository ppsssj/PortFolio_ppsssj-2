import { useEffect, useMemo, useState, type MouseEvent as ReactMouseEvent } from "react";
import { GitHubIcon } from "./ContactIcons";
import { githubUsername } from "../data/portfolio";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type ContributionsResponse = {
  total?: {
    lastYear?: number;
  };
  contributions?: ContributionDay[];
};

type GitHubUser = {
  avatar_url: string;
};

type ActivityState = {
  avatarUrl: string;
  days: ContributionDay[];
};

type HoveredCell = {
  week: number;
  day: number;
  label: string;
  x: number;
  y: number;
};

function getTodayDateString() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const year = parts.find((part) => part.type === "year")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const day = parts.find((part) => part.type === "day")?.value ?? "";

  return `${year}-${month}-${day}`;
}

const fallbackDays = Array.from({ length: 371 }, (_, index) => {
  const today = new Date();
  const date = new Date(today);
  date.setDate(today.getDate() - (370 - index));
  const level = index % 13 === 0 ? 4 : index % 7 === 0 ? 3 : index % 5 === 0 ? 2 : index % 3 === 0 ? 1 : 0;

  return {
    date: date.toISOString().slice(0, 10),
    count: level,
    level,
  };
});

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function buildWeeks(days: ContributionDay[]) {
  const sortedDays = [...days].sort((a, b) => a.date.localeCompare(b.date)).slice(-371);
  const oldest = sortedDays[0] ? new Date(`${sortedDays[0].date}T00:00:00`) : new Date();
  const start = new Date(oldest);
  start.setDate(oldest.getDate() - oldest.getDay());

  const cells: Array<ContributionDay | null> = Array.from({ length: 53 * 7 }, () => null);

  sortedDays.forEach((day) => {
    const current = new Date(`${day.date}T00:00:00`);
    const diff = Math.floor((current.getTime() - start.getTime()) / 86400000);
    const week = Math.floor(diff / 7);
    const weekday = current.getDay();
    const index = week * 7 + weekday;

    if (index >= 0 && index < cells.length) {
      cells[index] = day;
    }
  });

  return Array.from({ length: 53 }, (_, week) => cells.slice(week * 7, week * 7 + 7));
}

function buildMonths(days: ContributionDay[]) {
  const sortedDays = [...days].sort((a, b) => a.date.localeCompare(b.date)).slice(-371);
  const oldest = sortedDays[0] ? new Date(`${sortedDays[0].date}T00:00:00`) : new Date();
  const start = new Date(oldest);
  start.setDate(oldest.getDate() - oldest.getDay());
  const monthLabels: Array<{ label: string; week: number }> = [];
  let previousMonth = -1;

  sortedDays.forEach((day) => {
    const current = new Date(`${day.date}T00:00:00`);
    const month = current.getMonth();

    if (current.getDate() <= 7 && month !== previousMonth) {
      const diff = Math.floor((current.getTime() - start.getTime()) / 86400000);
      monthLabels.push({
        label: current.toLocaleString("en-US", { month: "short" }),
        week: Math.max(0, Math.floor(diff / 7)),
      });
      previousMonth = month;
    }
  });

  return monthLabels;
}

export function GitHubActivity() {
  const [activity, setActivity] = useState<ActivityState>({
    avatarUrl: "",
    days: fallbackDays,
  });
  const [hoveredCell, setHoveredCell] = useState<HoveredCell | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadActivity() {
      const [userResult, contributionsResult] = await Promise.allSettled([
        fetchJson<GitHubUser>(`https://api.github.com/users/${githubUsername}`),
        fetchJson<ContributionsResponse>(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`),
      ]);

      if (!isMounted) {
        return;
      }

      const user = userResult.status === "fulfilled" ? userResult.value : null;
      const contributions = contributionsResult.status === "fulfilled" ? contributionsResult.value : null;
      const days = contributions?.contributions?.length ? contributions.contributions : fallbackDays;

      setActivity({
        avatarUrl: user?.avatar_url ?? "",
        days,
      });
    }

    void loadActivity();

    return () => {
      isMounted = false;
    };
  }, []);

  const weeks = useMemo(() => buildWeeks(activity.days), [activity.days]);
  const months = useMemo(() => buildMonths(activity.days), [activity.days]);
  const todayDate = useMemo(() => getTodayDateString(), []);
  const activeMonth = hoveredCell
    ? months.findLast((month, index) => hoveredCell.week >= month.week && hoveredCell.week < (months[index + 1]?.week ?? 53))
    : null;
  const updateHoveredCell = (event: ReactMouseEvent, day: ContributionDay | null, weekIndex: number, dayIndex: number) => {
    const count = day?.count ?? 0;

    setHoveredCell({
      week: weekIndex,
      day: dayIndex,
      label: `${count} ${count === 1 ? "contribution" : "contributions"} on ${day?.date ?? "empty day"}`,
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div className="github-activity" aria-label="GitHub activity">
      <div className="github-activity__viewport" aria-hidden="true">
        <div className="github-activity__chart">
          <div className="github-activity__months">
            {months.map((month) => (
              <span
                className={activeMonth?.week === month.week ? "is-active" : undefined}
                key={`${month.label}-${month.week}`}
                style={{ gridColumn: `${month.week + 1} / span 4` }}
              >
                {month.label}
              </span>
            ))}
          </div>
          <div className="github-activity__body">
            <div className="github-activity__days">
              <span className={hoveredCell?.day === 1 ? "is-active" : undefined}>Mon</span>
              <span className={hoveredCell?.day === 3 ? "is-active" : undefined}>Wed</span>
              <span className={hoveredCell?.day === 5 ? "is-active" : undefined}>Fri</span>
            </div>
            <div className="github-activity__grid">
              {weeks.map((week, weekIndex) => (
                <div className="github-activity__week" key={weekIndex}>
                  {week.map((day, dayIndex) => {
                    const isActive = hoveredCell?.week === weekIndex && hoveredCell.day === dayIndex;
                    const isToday = day?.date === todayDate;
                    const isNeighbor =
                      hoveredCell !== null &&
                      !isActive &&
                      Math.abs(hoveredCell.week - weekIndex) <= 1 &&
                      Math.abs(hoveredCell.day - dayIndex) <= 1;

                    return (
                      <span
                        className="github-activity__cell"
                        data-active={isActive || undefined}
                        data-level={day?.level ?? 0}
                        data-neighbor={isNeighbor || undefined}
                        data-today={isToday || undefined}
                        key={`${weekIndex}-${dayIndex}`}
                        onMouseEnter={(event) => updateHoveredCell(event, day, weekIndex, dayIndex)}
                        onMouseMove={(event) => updateHoveredCell(event, day, weekIndex, dayIndex)}
                        onMouseLeave={() => setHoveredCell(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a className="github-activity__summary" href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer" aria-label={`Open @${githubUsername} on GitHub`}>
        <span className="github-activity__profile" aria-hidden="true">
          {activity.avatarUrl ? <img className="github-activity__avatar" src={activity.avatarUrl} alt="" /> : <span className="github-activity__avatar" />}
          <span>@{githubUsername}</span>
        </span>
        <span className="github-activity__mark" aria-hidden="true">
          <GitHubIcon />
        </span>
      </a>

      {hoveredCell ? (
        <div
          className="github-activity__tooltip"
          style={{
            "--tooltip-x": `${hoveredCell.x}px`,
            "--tooltip-y": `${hoveredCell.y}px`,
          } as React.CSSProperties}
        >
          {hoveredCell.label}
        </div>
      ) : null}
    </div>
  );
}
