import './badge.css'

/**
 * The one link back to the portfolio. Hidden when the site is embedded in the
 * portfolio's own preview frame, where it would only be noise.
 */
export default function PortfolioBadge() {
  const embedded = window.self !== window.top
  if (embedded) return null

  return (
    <a className="portfolio-badge" href={`${import.meta.env.BASE_URL}#projects`}>
      <span aria-hidden="true">←</span>
      <span>
        Concept site by <b>Tejaswi Dubey</b>
      </span>
    </a>
  )
}
