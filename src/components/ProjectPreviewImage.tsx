import { useState } from "react";

import type { HighlightCard } from "../data/portfolio";

type ProjectPreviewImageProps = {
  card: HighlightCard;
};

export function ProjectPreviewImage({ card }: ProjectPreviewImageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const source = isPlaying ? card.image : card.previewImage ?? card.image;

  return (
    <img
      className="figure-rollover__file"
      src={source}
      alt={card.title}
      onMouseEnter={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(false)}
      onFocus={() => setIsPlaying(true)}
      onBlur={() => setIsPlaying(false)}
    />
  );
}
