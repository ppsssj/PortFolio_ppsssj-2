import type { HighlightCard } from "../data/portfolio";

type ProjectPreviewImageProps = {
  card: HighlightCard;
  image?: string;
};

export function ProjectPreviewImage({ card, image = card.image }: ProjectPreviewImageProps) {
  return (
    <img
      className="figure-rollover__file"
      src={image}
      alt={card.title}
    />
  );
}
