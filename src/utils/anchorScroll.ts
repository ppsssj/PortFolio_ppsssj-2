import type { MouseEvent } from "react";

export function scrollToAnchor(event: MouseEvent<HTMLAnchorElement>, href: string, scrollOffset = 0) {
  if (!href.startsWith("#") || scrollOffset === 0) {
    return;
  }

  const target = document.getElementById(href.slice(1));

  if (!target) {
    return;
  }

  event.preventDefault();
  const targetTop = target.getBoundingClientRect().top + window.scrollY - scrollOffset;

  window.history.pushState(null, "", href);
  window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
}
