import { footer } from '../data/site'

const isExternal = (href) => href.startsWith('http') || href.startsWith('mailto:')

export default function Footer() {
  return (
    <footer className="footer">
      <span className="anchor" id="contact" />

      <div className="page">
        <div className="footer__columns">
          {footer.columns.map((column) => (
            <div key={column.heading}>
              <h2 className="footer__heading">{column.heading}</h2>
              {column.links.map((link) => (
                <a
                  className="footer__link"
                  href={link.href}
                  key={link.label}
                  {...(isExternal(link.href)
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <p>
            {footer.copyright.prefix} {footer.copyright.year}
          </p>
          <p>
            {footer.credits.prefix}{' '}
            <a href={footer.credits.author.href} target="_blank" rel="noreferrer">
              {footer.credits.author.label}
            </a>{' '}
            {footer.credits.middle}{' '}
            <a href={footer.credits.tool.href} target="_blank" rel="noreferrer">
              {footer.credits.tool.label}
            </a>
          </p>
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
