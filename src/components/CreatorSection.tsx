import { creatorCredits, heroGallery, siteMeta } from "../data/portfolio";

function SpriteIcon({ id }: { id: string }) {
  return (
    <svg className="ico-svg" viewBox="0 0 20 20" width="20">
      <use href={`https://www.awwwards.com/assets/redesign/images/sprite-icons.svg?v=3#${id}`} />
    </svg>
  );
}

function CreditBadge({ name, role, badge }: { name: string; role: string; badge?: string }) {
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <li>
      <div className="users-credits__item">
        <figure className="avatar-name">
          <div className="avatar-name__link">
            <div className="avatar-name__img avatar-name__img--placeholder">{initials}</div>
            <figcaption className="avatar-name__name">
              <strong className="link-underlined">{name}</strong>
              {badge ? <sup>{badge}</sup> : null}
              <span>{role}</span>
            </figcaption>
          </div>
        </figure>
      </div>
    </li>
  );
}

export function CreatorSection() {
  return (
    <section className="anchor-section" id="creator">
      <div className="content-header">
        <div className="block">
          <div className="inner">
            <div className="head-site">
              <div className="head-toolbar">
                <div className="head-toolbar__left">
                  <div className="box-score">
                    <div className="box-score__top">
                      <strong>{siteMeta.date}</strong>
                    </div>
                    <div className="box-score__bottom">
                      <div className="box-score__note">
                        <strong>{siteMeta.score}</strong>
                        <sub>/10</sub>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="head-toolbar__right">
                  <ul className="toolbar-bts">
                    <li>
                      <span className="toolbar-bts__item">
                        <SpriteIcon id="bookmark" />
                      </span>
                    </li>
                    <li>
                      <span className="toolbar-bts__item">
                        <SpriteIcon id="share" />
                      </span>
                    </li>
                    <li>
                      <a className="toolbar-bts__item" href={siteMeta.visitHref}>
                        <SpriteIcon id="link" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="c-heading text-center">
                <div className="c-heading__top">
                  <h2 className="text-default">{siteMeta.eyebrow}</h2>
                </div>
                <div className="c-heading__middle">
                  <h1 className="heading-1 text-uppercase">
                    <a href={siteMeta.visitHref}>{siteMeta.brand}</a>
                  </h1>
                </div>
                <div className="c-heading__bottom">
                  <p className="c-heading__description">{siteMeta.description}</p>
                  <div className="head-site__credits">
                    <div className="users-credits">
                      <ul className="users-credits__details">
                        {creatorCredits.map((credit) => (
                          <CreditBadge key={credit.name} {...credit} />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="gallery-site" data-header-floating="show">
                {heroGallery.map((image) => (
                  <li key={image}>
                    <div className="box-figure">
                      <img className="gallery-site__img" src={image} alt="Portfolio preview" />
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
