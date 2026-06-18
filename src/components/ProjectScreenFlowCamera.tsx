import { useEffect, useMemo, useRef } from "react";

import type { HighlightCard } from "../data/portfolio";

type ProjectScreenFlowCameraProps = {
  card: HighlightCard;
  images: string[];
};

type CameraKeyframe = {
  x: number;
  y: number;
  scale: number;
};

const cameraLayout = [
  { x: 180, y: 150, width: 680, labelX: 180, labelY: 112 },
  { x: 940, y: 130, width: 760, labelX: 940, labelY: 92 },
  { x: 300, y: 650, width: 760, labelX: 300, labelY: 612 },
  { x: 1120, y: 720, width: 720, labelX: 1120, labelY: 682 },
  { x: 700, y: 1160, width: 760, labelX: 700, labelY: 1122 },
  { x: 1480, y: 1160, width: 660, labelX: 1480, labelY: 1122 },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(value: number) {
  const nextValue = clamp(value);

  return nextValue * nextValue * (3 - 2 * nextValue);
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

export function ProjectScreenFlowCamera({ card, images }: ProjectScreenFlowCameraProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const screenImages = images.slice(0, 6);
  const keyframes = useMemo<CameraKeyframe[]>(() => {
    const overviewFrame = { x: 1120, y: 760, scale: 0.42 };
    const frames = screenImages.map((_, index) => {
      const item = cameraLayout[index];

      return {
        x: item.x + item.width / 2,
        y: item.y + (item.width * 0.625) / 2,
        scale: index === 0 ? 1.24 : 1.36,
      };
    });

    return [overviewFrame, ...frames, overviewFrame];
  }, [screenImages]);

  useEffect(() => {
    const section = sectionRef.current;
    const board = boardRef.current;

    if (!section || !board || window.matchMedia("(max-width: 1024px)").matches) {
      return undefined;
    }

    let animationFrame = 0;

    const updateCamera = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;

        const rect = section.getBoundingClientRect();
        const scrollable = Math.max(1, rect.height - window.innerHeight);
        const progress = clamp(-rect.top / scrollable);
        const segmentCount = Math.max(1, keyframes.length - 1);
        const segmentProgress = Math.min(segmentCount - 0.0001, progress * segmentCount);
        const frameIndex = Math.floor(segmentProgress);
        const localProgress = smoothstep(segmentProgress - frameIndex);
        const from = keyframes[frameIndex];
        const to = keyframes[frameIndex + 1] ?? from;
        const currentX = lerp(from.x, to.x, localProgress);
        const currentY = lerp(from.y, to.y, localProgress);
        const currentScale = lerp(from.scale, to.scale, localProgress);
        const viewportX = window.innerWidth / 2;
        const viewportY = window.innerHeight / 2;
        const translateX = viewportX - currentX * currentScale;
        const translateY = viewportY - currentY * currentScale;

        section.style.setProperty("--screen-flow-progress", progress.toFixed(4));
        board.style.transform = `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0) scale(${currentScale.toFixed(4)})`;
      });
    };

    updateCamera();
    window.addEventListener("scroll", updateCamera, { passive: true });
    window.addEventListener("resize", updateCamera);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", updateCamera);
      window.removeEventListener("resize", updateCamera);
    };
  }, [keyframes]);

  return (
    <section className="project-screen-flow-camera" id="screens" ref={sectionRef}>
      <div className="project-screen-flow-camera__heading">
        <p>Screen Flow</p>
        <h2>Selected project screens.</h2>
      </div>
      <div className="project-screen-flow-camera__sticky">
        <div className="project-screen-flow-camera__viewport" aria-label={`${card.title} screen flow`}>
          <div className="project-screen-flow-camera__board" ref={boardRef}>
            {screenImages.map((image, index) => {
              const layout = cameraLayout[index];

              return (
                <figure
                  className="project-screen-flow-camera__item"
                  key={image}
                  style={{
                    left: `${layout.x}px`,
                    top: `${layout.y}px`,
                    width: `${layout.width}px`,
                  }}
                >
                  <figcaption style={{ left: `${layout.labelX - layout.x}px`, top: `${layout.labelY - layout.y}px` }}>
                    {String(index + 1).padStart(2, "0")}
                  </figcaption>
                  <img src={image} alt={`${card.title} screen ${index + 1}`} />
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
