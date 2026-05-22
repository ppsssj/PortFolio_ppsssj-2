import { marqueeItems, siteMeta } from "../data/portfolio";

export function MarqueeBar() {
  const items = Array.from({ length: 8 });

  return (
    <div className="marquee-top marquee-top--gray">
      <div className="inner">
        <div className="marquee-top__wrapper">
          <div className="marquee-top__track">
            {items.map((_, index) => (
              <div className="marquee-top__item" key={index}>
                <span>{siteMeta.brand} Portfolio Welcome</span>
                <span className="marquee-top__ico" aria-hidden="true">
                  *
                </span>
                <strong>{marqueeItems[index % marqueeItems.length]}</strong>
                <span className="marquee-top__separator" aria-hidden="true">
                  :)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
