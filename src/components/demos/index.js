import ApertureDemo from './ApertureDemo'
import HeliosDemo from './HeliosDemo'
import LoomDemo from './LoomDemo'
import PrismDemo from './PrismDemo'
import VitalisDemo from './VitalisDemo'

/** Maps a project's `slug` in site.js to its interactive sandbox. */
export const demos = {
  'helios-grid': HeliosDemo,
  'aperture-vision': ApertureDemo,
  'loom-agents': LoomDemo,
  'prism-materials': PrismDemo,
  'vitalis-twin': VitalisDemo,
}
