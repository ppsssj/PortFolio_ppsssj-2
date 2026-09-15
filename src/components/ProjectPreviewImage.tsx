import type { HighlightCard } from "../data/portfolio";

type ProjectPreviewImageProps = {
  card: HighlightCard;
  image?: string;
  fetchPriority?: "high" | "low";
  loading?: "eager" | "lazy";
};

export function ProjectPreviewImage({
  card,
  image = card.image,
  fetchPriority,
  loading,
}: ProjectPreviewImageProps) {
  return (
    <img
      className="figure-rollover__file"
      src={image}
      alt={card.title}
      decoding="async"
      fetchPriority={fetchPriority}
      loading={loading}
    />
  );
}
