import { connectLinks, footerGroups, siteMeta } from "../data/portfolio";

const footerLinkMap: Record<string, string> = {
  Home: "#creator",
  Projects: "#highlights",
  "Product Belief": "#typography",
  "Tech Stack": "#details",
  "Build Index": "#score",
  Details: "#details",
};

export function FooterSection() {
  return (
    <footer id="footer">
      <div className="inner">
        <div className="footer__top">
          <p className="footer__logo footer__logo--small">{siteMeta.brand}</p>
          <div className="footer__wrapper">
            <div className="footer__grid">
              {footerGroups.map((group, index) => (
                <ul className="footer__menu" key={`group-${index}`}>
                  {group.map((item) => (
                    <li key={item}>
                      <a href={footerLinkMap[item] ?? "#contact"}>{item}</a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
        <div className="footer__bottom" id="contact">
          <div className="footer__left">
            <ul className="footer__nav">
              <li>
                <a href="mailto:ppssjj020222@gmail.com">ppssjj020222@gmail.com</a>
              </li>
            </ul>
          </div>
          <div className="footer__right">
            <ul className="footer__nav">
              <li>
                <strong>Connect:</strong>
              </li>
              {connectLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target={item.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
