import { useState } from "react";

import type { HighlightCard } from "../data/portfolio";

type ProjectPreviewImageProps = {
  card: HighlightCard;
  autoPlay?: boolean;
};

export function ProjectPreviewImage({ card, autoPlay = false }: ProjectPreviewImageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const source = autoPlay || isPlaying ? card.image : card.previewImage ?? card.image;

  return (
    <img
      className="figure-rollover__file"
      src={source}
      alt={card.title}
      onMouseEnter={() => {
        if (!autoPlay) {
          setIsPlaying(true);
        }
      }}
      onMouseLeave={() => {
        if (!autoPlay) {
          setIsPlaying(false);
        }
      }}
      onFocus={() => {
        if (!autoPlay) {
          setIsPlaying(true);
        }
      }}
      onBlur={() => {
        if (!autoPlay) {
          setIsPlaying(false);
        }
      }}
    />
  );
}
