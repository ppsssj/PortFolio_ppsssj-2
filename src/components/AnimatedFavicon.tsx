import { useEffect } from "react";

const letters = ["P", "S", "J"];
const horizontal = [
  { x: 24, y: 38 },
  { x: 48, y: 38 },
  { x: 72, y: 38 },
];
const vertical = [
  { x: 48, y: 17 },
  { x: 48, y: 36 },
  { x: 48, y: 55 },
];

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function getMorphProgress(elapsed: number) {
  const cycle = 4200;
  const time = elapsed % cycle;

  if (time < 900) {
    return 0;
  }

  if (time < 1750) {
    return easeInOutCubic((time - 900) / 850);
  }

  if (time < 2500) {
    return 1;
  }

  if (time < 3350) {
    return 1 - easeInOutCubic((time - 2500) / 850);
  }

  return 0;
}

function createFaviconSvg(progress: number, isDark: boolean) {
  const fill = isDark ? "#ffffff" : "#111111";
  const stroke = isDark ? "#111111" : "#ffffff";
  const text = letters
    .map((letter, index) => {
      const x = horizontal[index].x + (vertical[index].x - horizontal[index].x) * progress;
      const y = horizontal[index].y + (vertical[index].y - horizontal[index].y) * progress;

      return `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}">${letter}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 64"><rect width="96" height="64" fill="none"/><g fill="${fill}" stroke="${stroke}" stroke-width="3" paint-order="stroke fill" font-family="Arial, Helvetica, sans-serif" font-size="${(44 - 8 * progress).toFixed(2)}" font-weight="900" text-anchor="middle" dominant-baseline="central">${text}</g></svg>`;
}

function svgToDataUrl(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function AnimatedFavicon() {
  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');

    if (!favicon) {
      return;
    }

    const originalHref = favicon.href;
    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    let frameId = 0;
    let lastUpdate = 0;

    const update = (now: number) => {
      if (now - lastUpdate > 48) {
        const progress = getMorphProgress(now);

        favicon.href = svgToDataUrl(createFaviconSvg(progress, colorSchemeQuery.matches));
        lastUpdate = now;
      }

      frameId = window.requestAnimationFrame(update);
    };

    frameId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(frameId);
      favicon.href = originalHref;
    };
  }, []);

  return null;
}
