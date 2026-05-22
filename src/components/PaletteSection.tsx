import { useState } from "react";

const beliefTags = [
  "Creative",
  "Rapid Prototyping",
  "Fast Execution",
  "Product Focus",
  "Product Thinking",
  "AI Integration",
  "User Flow Design",
  "Initiative",
];

export function PaletteSection() {
  const [isBackCardPulled, setIsBackCardPulled] = useState(false);
  const toggleBackCard = () => setIsBackCardPulled((current) => !current);

  return (
    <section className="anchor-section" id="typography">
      <div className="block">
        <div className="heading-section sticky">
          <div className="heading-section__left">
            <h2 className="heading-section__title">Product Belief</h2>
          </div>
        </div>

        <div className="palette belief">
          <p className="palette__desc belief__intro">
            A frontend builder
            <br />
            creating <strong>usable products.</strong>
          </p>
          <div className="palette__list">
            <ul
              className="list-palette list-palette--h"
              onClickCapture={toggleBackCard}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  toggleBackCard();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <li
                className={isBackCardPulled ? "is-pulled" : undefined}
              >
                <div
                  className="list-palette__item belief-card belief-card--back"
                >
                  <div className="list-palette__box belief-card__box">
                    <div className="list-palette__header">
                      <div className="list-palette__name">
                        <strong>How</strong> I build products
                      </div>
                    </div>
                    <div className="belief-card__body">
                      <p>
                        I approach product building through rapid prototyping, interactive frontend development,
                        and practical iteration.
                      </p>
                      <p> into clear, interactive products through frontend craft, rapid iteration,
                      and a strong focus on usable experiences.</p>
                      <ul className="belief-tags">
                        {beliefTags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="list-palette__item belief-card belief-card--front">
                  <div className="list-palette__box belief-card__box">
                    <div className="list-palette__header">
                      <div className="list-palette__name">
                        <strong>Frontend</strong> Product Craft
                      </div>
                    </div>
                    <div className="belief-card__statement">
                      <span>A</span>
                      <span>frontend builder</span>
                      <span>creating</span>
                      <span>usable products.</span>
                    </div>
                    <p className="belief-card__copy">
                           
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
