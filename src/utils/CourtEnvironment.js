import { Home, Sun, Umbrella } from 'lucide-react'

/**
 * Derives the environment-type badge info for a court from its isIndoor /
 * isOutdoor flags.
 *   - both true  -> "Indoor/Outdoor (Covered)"
 *   - indoor only -> "Indoor"
 *   - outdoor only -> "Outdoor"
 *   - neither set -> null (nothing to show)
 */
export function getCourtEnvironment(court) {
  const indoor = Boolean(court?.isIndoor)
  const outdoor = Boolean(court?.isOutdoor)

  if (indoor && outdoor) {
    return {
      label: 'Indoor/Outdoor (Covered)',
      shortLabel: 'Covered',
      icon: Umbrella,
      badgeClass: 'bg-violet-50 text-violet-700 border-violet-200',
      dotClass: 'bg-violet-500',
    }
  }
  if (indoor) {
    return {
      label: 'Indoor',
      shortLabel: 'Indoor',
      icon: Home,
      badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
      dotClass: 'bg-sky-500',
    }
  }
  if (outdoor) {
    return {
      label: 'Outdoor',
      shortLabel: 'Outdoor',
      icon: Sun,
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      dotClass: 'bg-amber-500',
    }
  }
  return null
}
