import { footer } from '../data/site'

const isExternal = (href) => href.startsWith('http') || href.startsWith('mailto:')
const external = (href) => (isExternal(href) ? { target: '_blank', rel: 'noreferrer' } : {})

export default function Footer() {
  return (
    <footer className="footer">
      <span className="anchor" id="contact" />

      <div className="page">
        <div className="footer__top">
          <div className="footer__contact">
            <h2 className="footer__title">{footer.contact.heading}</h2>
            <div className="footer__actions">
              {footer.contact.links.map((link, i) => (
                <a
                  className={`button button--small${i === 0 ? ' button--solid' : ''}`}
                  href={link.href}
                  key={link.label}
                  {...external(link.href)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <nav className="footer__columns" aria-label="Footer">
            {footer.columns.map((column) => (
              <div key={column.heading}>
                <h3 className="footer__heading">{column.heading}</h3>
                {column.links.map((link) => (
                  <a className="footer__link" href={link.href} key={link.label} {...external(link.href)}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <p>
            {footer.copyright.prefix} {footer.copyright.year}
          </p>
          <p>{footer.credits.text}</p>
        </div>
      </div>

      {footer.wordmark && (
        <p className="footer__wordmark" aria-hidden="true">
          {footer.wordmark}
        </p>
      )}
    </footer>
  )
}
