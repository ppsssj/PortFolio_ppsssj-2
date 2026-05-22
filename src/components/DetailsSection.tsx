import { stack } from "../data/portfolio";
import { GitHubActivity } from "./GitHubActivity";

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
        <div className="github-activity-heading">
          <h2>GitHub Contributions</h2>
        </div>
        <GitHubActivity />
      </div>

    </section>
  );
}
