import { highlightCards } from "../data/portfolio";

export function ElementsSection() {
  return (
    <section className="anchor-section" id="highlights">
      <div className="block">
        <div className="inner">
          <div className="c-heading c-heading--small">
            <div className="c-heading__top">
              <h2 className="text-default">Elements</h2>
            </div>
            <div className="c-heading__middle">
              <h3 className="heading-5">
                See the highlights
                <br />
                of this portfolio.
              </h3>
            </div>
          </div>

          <ul className="gallery-site gallery-site--two-cols">
            {highlightCards.map((card) => (
              <li key={card.title}>
                <article className="card-slide">
                  <div className="box-figure">
                    <figure className="figure-rollover js-collectable is-large">
                      <a className="figure-rollover__link" href={card.href} aria-label={card.title}>
                        <img className="figure-rollover__file" src={card.image} alt={card.title} />
                      </a>
                      <div className="figure-rollover__hover">
                        <div className="figure-rollover__left">
                          <div className="figure-rollover__row">
                            <small>ELEMENT</small>
                          </div>
                          <div className="figure-rollover__row">
                            <h3>{card.title}</h3>
                          </div>
                        </div>
                      </div>
                    </figure>
                  </div>
                  <div className="card-slide__info">
                    <div className="card-slide__row">
                      <h3 className="card-slide__title">
                        <a href={card.href}>{card.title}</a>
                      </h3>
                      <div className="card-slide__data">
                        <small>from</small>
                        <a href={card.href} className="link-underlined">
                          {card.category}
                        </a>
                      </div>
                    </div>
                    <p className="card-slide__description">{card.description}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
