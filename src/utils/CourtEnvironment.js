import { Home, Sun, Umbrella } from 'lucide-react'

/**
 * Derives the environment-type badge info for a court from its isIndoor /
 * isOutdoor flags.
 *   - both true  -> "Indoor/Outdoor (Covered)"
 *   - indoor only -> "Indoor"
 *   - outdoor only -> "Outdoor"
 *   - neither set -> null (nothing to show)
 *
 * All variants share the same high-contrast dark, semi-transparent pill
 * container (matching the Open/Closed badge treatment) and differ only by
 * icon + accent text color.
 */
const CONTAINER_CLASS = 'bg-slate-900/85 backdrop-blur-md border border-white/10'

export function getCourtEnvironment(court) {
  const indoor = Boolean(court?.isIndoor)
  const outdoor = Boolean(court?.isOutdoor)

  if (indoor && outdoor) {
    return {
      label: 'Indoor/Outdoor (Covered)',
      shortLabel: 'Covered',
      icon: Umbrella,
      textClass: 'text-purple-400',
      containerClass: CONTAINER_CLASS,
    }
  }
  if (indoor) {
    return {
      label: 'Indoor',
      shortLabel: 'Indoor',
      icon: Home,
      textClass: 'text-sky-400',
      containerClass: CONTAINER_CLASS,
    }
  }
  if (outdoor) {
    return {
      label: 'Outdoor',
      shortLabel: 'Outdoor',
      icon: Sun,
      textClass: 'text-amber-400',
      containerClass: CONTAINER_CLASS,
    }
  }
  return null
}

