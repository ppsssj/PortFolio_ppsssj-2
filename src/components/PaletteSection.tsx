import { palette } from "../data/portfolio";

export function PaletteSection() {
  return (
    <section className="anchor-section" id="typography">
      <div className="block">
        <div className="heading-section sticky">
          <div className="heading-section__left">
            <h2 className="heading-section__title">Color Palette</h2>
          </div>
        </div>

        <div className="palette">
          <p className="palette__desc">
            This portfolio uses a restrained
            <br />
            palette of <strong>{palette.length}</strong> colors
          </p>
          <div className="palette__list">
            <ul className="list-palette list-palette--h">
              {palette.map((color) => (
                <li key={color.value}>
                  <div
                    className="list-palette__item"
                    style={{ background: color.value, color: color.text }}
                  >
                    <div className="list-palette__box">
                      <div className="list-palette__header">
                        <div className="list-palette__name">
                          <strong>HEX</strong> {color.value}
                        </div>
                        <div className="list-palette__bts">
                          <a href="#typography" aria-label={`Search ${color.value}`}>
                            <span className="list-palette__bt" style={{ color: color.text }}>
                              <svg className="ico-svg" viewBox="0 0 20 20" width="20">
                                <use href="https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#lupe" />
                              </svg>
                            </span>
                          </a>
                        </div>
                      </div>
                      <div className="list-palette__footer">
                        <span className="list-palette__aa">Aa</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
