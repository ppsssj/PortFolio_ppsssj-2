import { useEffect } from "react";

const SCROLL_EASING_MS = 110;
const STOP_THRESHOLD = 0.5;

function getScrollableAncestor(target: EventTarget | null, deltaY: number) {
  let element = target instanceof Element ? target : null;

  while (element && element !== document.body && element !== document.documentElement) {
    const style = window.getComputedStyle(element);
    const canScroll = /(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight;

    if (canScroll) {
      const hasRoomAbove = deltaY < 0 && element.scrollTop > 0;
      const hasRoomBelow = deltaY > 0 && element.scrollTop + element.clientHeight < element.scrollHeight - 1;

      if (hasRoomAbove || hasRoomBelow) {
        return element;
      }
    }

    element = element.parentElement;
  }

  return null;
}

function normalizeWheelDelta(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 16;
  }

  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }

  return event.deltaY;
}

/** Adds gentle inertia to desktop wheel scrolling without changing touch or nested scrolling. */
export function useSmoothPageScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame: number | null = null;
    let targetY = window.scrollY;
    let lastTime = 0;
    let previousScrollBehavior = "";

    const maxScrollY = () =>
      Math.max(0, Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight);

    const restoreScrollBehavior = () => {
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };

    const stopAnimation = (syncTarget = true) => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
        restoreScrollBehavior();
      }

      if (syncTarget) {
        targetY = window.scrollY;
      }
    };

    const animate = (time: number) => {
      const currentY = window.scrollY;
      const distance = targetY - currentY;

      if (Math.abs(distance) <= STOP_THRESHOLD) {
        window.scrollTo({ top: targetY, behavior: "auto" });
        stopAnimation(false);
        return;
      }

      const elapsed = lastTime === 0 ? 16 : Math.min(32, time - lastTime);
      const easing = 1 - Math.exp(-elapsed / SCROLL_EASING_MS);

      lastTime = time;
      window.scrollTo({ top: currentY + distance * easing, behavior: "auto" });
      animationFrame = window.requestAnimationFrame(animate);
    };

    const handleWheel = (event: WheelEvent) => {
      if (
        reduceMotion.matches ||
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        window.getComputedStyle(document.body).overflowY === "hidden" ||
        getScrollableAncestor(event.target, event.deltaY)
      ) {
        return;
      }

      const deltaY = normalizeWheelDelta(event);

      if (!deltaY) {
        return;
      }

      event.preventDefault();
      targetY = Math.min(maxScrollY(), Math.max(0, targetY + deltaY));

      if (animationFrame === null) {
        previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        lastTime = 0;
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const handleNativeScroll = () => {
      if (animationFrame === null) {
        targetY = window.scrollY;
      }
    };

    const handleInterruption = () => stopAnimation();

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    window.addEventListener("touchstart", handleInterruption, { passive: true });
    window.addEventListener("pointerdown", handleInterruption, { passive: true });
    window.addEventListener("keydown", handleInterruption);
    window.addEventListener("resize", handleInterruption);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleNativeScroll);
      window.removeEventListener("touchstart", handleInterruption);
      window.removeEventListener("pointerdown", handleInterruption);
      window.removeEventListener("keydown", handleInterruption);
      window.removeEventListener("resize", handleInterruption);
      stopAnimation(false);
    };
  }, []);
}
