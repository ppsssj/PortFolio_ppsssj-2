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
              <li className={isBackCardPulled ? "is-pulled" : undefined}>
                <div className="list-palette__item belief-card belief-card--back">
                  <div className="list-palette__box belief-card__box">
                    <div className="list-palette__header">
                      <div className="list-palette__name">
                        <strong>How</strong> I build products
                      </div>
                    </div>
                    <div className="belief-card__body">
                      <p>
                        빠른 프로토타이핑, 인터랙티브한 프론트엔드 구현, 실제
                        사용 흐름을 기준으로 제품을 만듭니다.
                      </p>
                      <p>
                        아이디어가 멈춰 있지 않도록 작은 실험을 빠르게 만들고,
                        사용자가 이해할 수 있는 화면과 흐름으로 정리합니다.
                      </p>
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
                      <span>product-minded</span>
                      <span>frontend builder</span>
                      <span>building interactive,</span>
                      <span>usable products.</span>
                    </div>
                    <p className="belief-card__copy"></p>
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
