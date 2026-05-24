import type { HighlightCard } from "../data/portfolio";

type ProjectPreviewImageProps = {
  card: HighlightCard;
};

export function ProjectPreviewImage({ card }: ProjectPreviewImageProps) {
  return (
    <img
      className="figure-rollover__file"
      src={card.image}
      alt={card.title}
    />
  );
}
