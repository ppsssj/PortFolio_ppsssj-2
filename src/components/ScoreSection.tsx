import type { CSSProperties } from "react";
import { juryVotes, scoreBreakdown, siteMeta } from "../data/portfolio";

const scoreGridStyle = { "--score-cols": 5 } as CSSProperties;

export function ScoreSection() {
  return (
    <section className="anchor-section" id="score">
      <div className="block">
        <div className="c-heading-score">
          <h2 className="heading-2">
            {siteMeta.scoreLabel} / SCORE
            <span className="c-heading-score__note">
              {" "}
              -&gt; {siteMeta.score}
              <sup>/ 10</sup>
            </span>
          </h2>
          <div className="c-heading-score__link">
            <a className="link-underlined" href="#score">
              Execution review
            </a>
          </div>
        </div>

        <div className="layout-overall">
          {scoreBreakdown.map((item) => (
            <div className="layout-overall__type" key={`${item.label}-type`}>
              {item.label}
              <strong>{item.weight}</strong>
            </div>
          ))}

          {scoreBreakdown.map((item) => (
            <div className="layout-overall__chart" key={`${item.label}-chart`}>
              <div className="layout-overall__progress">
                <div className="layout-overall__progressbar" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}

          {scoreBreakdown.map((item) => (
            <div className="layout-overall__score" key={`${item.label}-score`}>
              <strong>{item.score}</strong>
            </div>
          ))}
        </div>

        <div>
          <div className="heading-section mb-0">
            <div className="heading-section__left">
              <h2 className="heading-section__title">Votes</h2>
              <ul className="menu-tabs">
                <li className="active">Jury</li>
                <li>Community Members</li>
              </ul>
            </div>
          </div>

          <div className="content-tabs">
            <div className="content-tabs__item active">
              <div className="grid-score grid-score--titles" style={scoreGridStyle}>
                <div className="grid-score__item">Design</div>
                <div className="grid-score__item">Usability</div>
                <div className="grid-score__item">Creativity</div>
                <div className="grid-score__item">Content</div>
                <div className="grid-score__item">Overall</div>
              </div>
              <ul className="list-jury-notes">
                {juryVotes.map((vote) => (
                  <li className="list-jury-notes__item" key={vote.name}>
                    <div className="list-jury-notes__info">
                      <figure>
                        <div className="avatar-name__img avatar-name__img--placeholder">
                          {vote.name.slice(0, 2).toUpperCase()}
                        </div>
                      </figure>
                      <div className="info">
                        <div>
                          <strong>{vote.name}</strong>
                          <span className="list-jury-notes__from"> from <strong>Portfolio</strong></span>
                        </div>
                        <div className="hidden-sm">{vote.role}</div>
                      </div>
                    </div>
                    <div className="list-jury-notes__score">
                      <div className="grid-score" style={scoreGridStyle}>
                        <div className="grid-score__item">{vote.design}</div>
                        <div className="grid-score__item">{vote.usability}</div>
                        <div className="grid-score__item">{vote.creativity}</div>
                        <div className="grid-score__item">{vote.content}</div>
                        <div className="grid-score__item grid-score__item--total">{vote.total}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
