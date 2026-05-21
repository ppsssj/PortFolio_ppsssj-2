import { connectLinks, footerGroups, siteMeta } from "../data/portfolio";

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
                      <a href="#contact">{item}</a>
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
                <a href="mailto:hello@example.com">hello@example.com</a>
              </li>
              <li>
                <a href="#creator">Back to top</a>
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
                  <a href={item.href} target="_blank" rel="noreferrer">
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
