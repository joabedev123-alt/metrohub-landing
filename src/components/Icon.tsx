import arrowRight from 'bootstrap-icons/icons/arrow-right.svg?raw'
import boxSeam from 'bootstrap-icons/icons/box-seam.svg?raw'
import building from 'bootstrap-icons/icons/building.svg?raw'
import calendar2Check from 'bootstrap-icons/icons/calendar2-check.svg?raw'
import check2Circle from 'bootstrap-icons/icons/check2-circle.svg?raw'
import diagram3 from 'bootstrap-icons/icons/diagram-3.svg?raw'
import envelope from 'bootstrap-icons/icons/envelope.svg?raw'
import exclamationCircle from 'bootstrap-icons/icons/exclamation-circle.svg?raw'
import exclamationTriangle from 'bootstrap-icons/icons/exclamation-triangle.svg?raw'
import geoAlt from 'bootstrap-icons/icons/geo-alt.svg?raw'
import hourglassSplit from 'bootstrap-icons/icons/hourglass-split.svg?raw'
import infoCircle from 'bootstrap-icons/icons/info-circle.svg?raw'
import list from 'bootstrap-icons/icons/list.svg?raw'
import send from 'bootstrap-icons/icons/send.svg?raw'
import shieldCheck from 'bootstrap-icons/icons/shield-check.svg?raw'
import shop from 'bootstrap-icons/icons/shop.svg?raw'
import telephone from 'bootstrap-icons/icons/telephone.svg?raw'
import truck from 'bootstrap-icons/icons/truck.svg?raw'
import xLg from 'bootstrap-icons/icons/x-lg.svg?raw'

/** Bootstrap Icons, inlined as SVG so only the icons in use are shipped. */
const ICONS = {
  'arrow-right': arrowRight,
  'box-seam': boxSeam,
  'building': building,
  'calendar2-check': calendar2Check,
  'check2-circle': check2Circle,
  'diagram-3': diagram3,
  'envelope': envelope,
  'exclamation-circle': exclamationCircle,
  'exclamation-triangle': exclamationTriangle,
  'geo-alt': geoAlt,
  'hourglass-split': hourglassSplit,
  'info-circle': infoCircle,
  'list': list,
  'send': send,
  'shield-check': shieldCheck,
  'shop': shop,
  'telephone': telephone,
  'truck': truck,
  'x-lg': xLg,
} as const

export type IconName = keyof typeof ICONS

type IconProps = {
  name: IconName
  className?: string
}

export function Icon({ name, className = '' }: IconProps) {
  return <span aria-hidden="true" className={`bi-icon ${className}`} dangerouslySetInnerHTML={{ __html: ICONS[name] }} />
}
