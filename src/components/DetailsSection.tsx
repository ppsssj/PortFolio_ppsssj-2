import { detailDescription, stack } from "../data/portfolio";

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

    </section>
  );
}
