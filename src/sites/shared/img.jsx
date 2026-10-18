// Photography is served straight from Unsplash's image CDN, which resizes and
// re-encodes on the fly. `id` is the part after "photo-" in an Unsplash URL.

const CDN = 'https://images.unsplash.com/photo-'

function photoUrl(id, { w = 1200, h, q = 72, crop } = {}) {
  if (!id) return ''
  if (id.startsWith('/') || id.startsWith('http')) return id
  const params = new URLSearchParams({ auto: 'format', fit: 'crop', w: String(w), q: String(q) })
  if (h) params.set('h', String(h))
  if (crop) params.set('crop', crop)
  return `${CDN}${id}?${params}`
}

const DEFAULT_WIDTHS = [480, 800, 1200, 1800]

/**
 * Responsive photo. `ratio` (width / height) fixes the crop and reserves the
 * box before the image arrives, so nothing shifts while the page loads.
 */
export function Photo({
  id,
  alt,
  ratio,
  sizes = '100vw',
  widths = DEFAULT_WIDTHS,
  eager = false,
  crop,
  className,
  style,
}) {
  const height = (w) => (ratio ? Math.round(w / ratio) : undefined)
  const largest = widths[widths.length - 1]
  const isDirect = id?.startsWith('/') || id?.startsWith('http')

  return (
    <img
      className={className}
      style={style}
      src={photoUrl(id, { w: largest, h: height(largest), crop })}
      srcSet={!isDirect ? widths.map((w) => `${photoUrl(id, { w, h: height(w), crop })} ${w}w`).join(', ') : undefined}
      sizes={sizes}
      width={largest}
      height={height(largest) ?? Math.round(largest * 0.66)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
    />
  )
}
