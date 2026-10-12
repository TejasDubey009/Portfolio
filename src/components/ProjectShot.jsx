/**
 * Card art for a project: the real home page in a browser window, with the
 * phone layout leaning against it, on a stage in one of the site's own colours.
 * Both images are captures of the live pages (public/previews).
 */
export default function ProjectShot({ project }) {
  const src = (device) => `${import.meta.env.BASE_URL}previews/${project.slug}-${device}.webp`

  return (
    <div className="shot" style={{ '--stage': project.stage }}>
      <div className="shot__browser">
        <div className="shot__bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>/{project.liveUrl}</span>
        </div>
        <img
          src={src('desktop')}
          alt={`${project.title} home page on a desktop screen`}
          width="1200"
          height="800"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="shot__phone">
        <img src={src('phone')} alt="" width="390" height="844" loading="lazy" decoding="async" />
      </div>
    </div>
  )
}
