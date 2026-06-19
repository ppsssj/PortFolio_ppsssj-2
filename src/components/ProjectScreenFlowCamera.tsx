import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import type { HighlightCard } from "../data/portfolio";

type ProjectScreenFlowCameraProps = {
  card: HighlightCard;
  images: string[];
};

type CameraKeyframe = {
  x: number;
  y: number;
  baseScale: number;
  width?: number;
  height?: number;
};

const baseCameraLayout = [
  { x: 700, y: 170, width: 1400 },
  { x: 2500, y: 170, width: 1400 },
];

function getCameraLayout(index: number, images: string[], ratios: Record<string, number>) {
  const baseItem = baseCameraLayout[index % baseCameraLayout.length];
  const rowIndex = Math.floor(index / baseCameraLayout.length);
  let rowOffset = 0;

  for (let row = 0; row < rowIndex; row += 1) {
    const rowStart = row * baseCameraLayout.length;
    const rowImages = images.slice(rowStart, rowStart + baseCameraLayout.length);
    const rowMaxHeight = rowImages.reduce((maxHeight, image, imageIndex) => {
      const layout = baseCameraLayout[imageIndex];
      const itemWidth = getScreenItemWidth(layout.width, ratios[image]);
      const itemHeight = getScreenItemHeight(itemWidth, ratios[image]);

      return Math.max(maxHeight, itemHeight);
    }, 0);

    rowOffset += Math.max(820, rowMaxHeight + 280);
  }

  return {
    ...baseItem,
    y: baseItem.y + rowOffset,
  };
}

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

function getScreenItemWidth(baseWidth: number, ratio?: number) {
  if (!ratio || ratio >= 1.35) {
    return baseWidth;
  }

  return Math.round(baseWidth * Math.max(0.62, ratio / 1.55));
}

function getScreenItemHeight(width: number, ratio?: number) {
  return ratio ? width / ratio : width * 0.625;
}

function getCameraScaleForViewport(frame: CameraKeyframe, viewportWidth: number, viewportHeight: number) {
  if (!frame.width || !frame.height) {
    return frame.baseScale;
  }

  const frameRatio = frame.width / frame.height;
  const targetWidthCoverage = viewportWidth * 0.86;
  const targetHeightCoverage = viewportHeight * 0.9;
  const fitScale = Math.min(targetWidthCoverage / frame.width, targetHeightCoverage / frame.height);

  if (frameRatio < 1.05) {
    return Math.min(frame.baseScale, Math.max(1.02, fitScale * 1.08));
  }

  return Math.min(frame.baseScale, Math.max(0.9, fitScale));
}

export function ProjectScreenFlowCamera({ card, images }: ProjectScreenFlowCameraProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});
  const screenImages = images;
  const boardHeight = useMemo(() => {
    const rowCount = Math.ceil(screenImages.length / baseCameraLayout.length);
    const lastImageIndex = Math.max(0, screenImages.length - 1);
    const lastLayout = getCameraLayout(lastImageIndex, screenImages, imageRatios);
    const lastImage = screenImages[lastImageIndex];
    const lastWidth = getScreenItemWidth(lastLayout.width, imageRatios[lastImage]);
    const lastHeight = getScreenItemHeight(lastWidth, imageRatios[lastImage]);

    return Math.max(1760, lastLayout.y + lastHeight + 320, 1760 + Math.max(0, rowCount - 1) * 860);
  }, [imageRatios, screenImages]);
  const sectionHeight = useMemo(() => {
    return Math.max(2600, boardHeight + 120, 1900 + screenImages.length * 440);
  }, [boardHeight, screenImages.length]);
  const keyframes = useMemo<CameraKeyframe[]>(() => {
    const overviewFrame = { x: 2310, y: 900, baseScale: 0.34 };
    const exitFrame = { x: 2310, y: Math.max(900, boardHeight - 220), baseScale: 0.34 };
    const frames = screenImages.map((image, index) => {
      const item = getCameraLayout(index, screenImages, imageRatios);
      const itemWidth = getScreenItemWidth(item.width, imageRatios[image]);
      const itemHeight = getScreenItemHeight(itemWidth, imageRatios[image]);

      return {
        x: item.x + itemWidth / 2,
        y: item.y + itemHeight / 2,
        baseScale: index === 0 ? 1.08 : 1.14,
        width: itemWidth,
        height: itemHeight,
      };
    });

    return [overviewFrame, ...frames, exitFrame];
  }, [boardHeight, imageRatios, screenImages]);

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
        const fromScale = getCameraScaleForViewport(from, window.innerWidth, window.innerHeight);
        const toScale = getCameraScaleForViewport(to, window.innerWidth, window.innerHeight);
        const currentScale = lerp(fromScale, toScale, localProgress);
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
    <section
      className="project-screen-flow-camera"
      id="screens"
      ref={sectionRef}
      style={{ "--screen-flow-section-height": `${sectionHeight}px` } as CSSProperties}
    >
      <div className="project-screen-flow-camera__heading">
        <p>Screen Flow</p>
        <h2>Selected project screens.</h2>
      </div>
      <div className="project-screen-flow-camera__sticky">
        <div className="project-screen-flow-camera__viewport" aria-label={`${card.title} screen flow`}>
          <div
            className="project-screen-flow-camera__board"
            ref={boardRef}
            style={{ "--screen-flow-board-height": `${boardHeight}px` } as CSSProperties}
          >
            {screenImages.map((image, index) => {
              const layout = getCameraLayout(index, screenImages, imageRatios);
              const imageRatio = imageRatios[image];
              const itemWidth = getScreenItemWidth(layout.width, imageRatio);

              return (
                <figure
                  className="project-screen-flow-camera__item"
                  key={image}
                  style={{
                    left: `${layout.x}px`,
                    top: `${layout.y}px`,
                    width: `${itemWidth}px`,
                    "--screen-image-ratio": imageRatio ? `${imageRatio}` : undefined,
                  } as CSSProperties}
                >
                  <img
                    src={image}
                    alt={`${card.title} screen ${index + 1}`}
                    onLoad={(event) => {
                      const nextRatio = event.currentTarget.naturalWidth / event.currentTarget.naturalHeight;

                      setImageRatios((currentRatios) =>
                        currentRatios[image] === nextRatio ? currentRatios : { ...currentRatios, [image]: nextRatio },
                      );
                    }}
                  />
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
