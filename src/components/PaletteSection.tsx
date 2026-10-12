import { useState } from "react";

const beliefTags = [
  "Problem Solving",
  "Product Thinking",
  "System Design",
  "Performance",
  "Reliability",
  "Rapid Prototyping",
  "User Experience",
  "End-to-end Ownership",
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
            A software engineer
            <br />
            building <strong>applications &amp; tools.</strong>
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
                        빠른 구현을 넘어 문제의 원인을 분석하고, 성능과
                        유지보수성을 고려해 소프트웨어를 설계합니다.
                      </p>
                      <p>
                        프론트엔드부터 API·데이터·실행 환경까지 연결하며, 실제
                        사용 가능한 제품으로 완성하는 과정을 중요하게 생각합니다.
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
                        <strong>Software</strong> Engineering
                      </div>
                    </div>
                    <div className="belief-card__statement">
                      <span>A</span>
                      <span>product-minded</span>
                      <span>software engineer</span>
                      <span>building reliable</span>
                      <span>applications &amp; tools.</span>
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
