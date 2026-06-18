import type { HighlightCard } from "../data/portfolio";
import { ProjectPreviewImage } from "./ProjectPreviewImage";

type ProjectHeroImageStackProps = {
  card: HighlightCard;
  images: string[];
};

type ProjectHeroImageStackCardProps = {
  card: HighlightCard;
  image: string;
  index: number;
};

function ProjectHeroImageStackCard({ card, image, index }: ProjectHeroImageStackCardProps) {
  return (
    <figure
      className={`project-case-hero__stack-card${index === 0 ? " is-base" : ""}`}
      style={{
        zIndex: index + 1,
      }}
      data-stack-index={index}
    >
      <ProjectPreviewImage card={card} image={image} />
    </figure>
  );
}

export function ProjectHeroImageStack({ card, images }: ProjectHeroImageStackProps) {
  const stackImages = images.slice(0, 5);

  return (
    <div className="project-case-hero__image-stage">
      {stackImages.map((image, index) => (
        <ProjectHeroImageStackCard
          key={`${image}-${index}`}
          card={card}
          image={image}
          index={index}
        />
      ))}
    </div>
  );
}
