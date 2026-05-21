import { detailDescription, highlightCards, stack } from "../data/portfolio";

export function DetailsSection() {
  return (
    <section className="anchor-section" id="details">
      <div className="block">
        <div className="heading-section sticky">
          <div className="heading-section__left">
            <h2 className="heading-section__title">Technologies &amp; Tools</h2>
          </div>
        </div>

        <ul className="list-tags">
          {stack.map((item) => (
            <li key={item}>
              <strong>
                <a className="button button--tag" href="#details">
                  {item}
                </a>
              </strong>
            </li>
          ))}
        </ul>

      </div>

      <div className="block">
        <div className="c-heading c-heading--small">
          <div className="c-heading__top">
            <h2 className="text-default">Description</h2>
          </div>
          <div className="c-heading__middle">
            <h3 className="heading-6">{detailDescription}</h3>
          </div>
        </div>
      </div>

      <div className="block">
        <div className="c-heading c-heading--small">
          <div className="c-heading__top">
            <h2 className="text-default">Inside look</h2>
          </div>
          <div className="c-heading__middle">
            <h3 className="heading-5">
              Discover more
              <br />
              details of this portfolio.
            </h3>
          </div>
        </div>
        <ul className="gallery-site gallery-site--two-cols">
          {highlightCards.slice(0, 1).map((card) => (
            <li key={`inside-${card.title}`}>
              <article className="card-slide">
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
                <div className="card-slide__info">
                  <div className="card-slide__row">
                    <h3 className="card-slide__title">
                      <a href={card.href}>Great element</a>
                    </h3>
                    <div className="card-slide__data">
                      <small>from</small>
                      <a href={card.href} className="link-underlined">
                        Desktop thumbnail
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
