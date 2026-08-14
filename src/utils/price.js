/**
 * Utilities for court price/rate values.
 *
 * `pricePerHour` on a court can be:
 *   - a number (legacy): 250
 *   - a single-value string: "250"
 *   - a range string using "~" or "-" as a separator: "150~250" / "150 - 250"
 */

/**
 * Parses a court's pricePerHour into { min, max } numbers.
 * Accepts numbers or strings (single value or a "low~high" / "low-high" range).
 * Returns { min: null, max: null } if the value can't be parsed.
 */
export function parsePriceRange(pricePerHour) {
  if (pricePerHour == null) return { min: null, max: null }

  if (typeof pricePerHour === 'number') {
    return Number.isFinite(pricePerHour) ? { min: pricePerHour, max: pricePerHour } : { min: null, max: null }
  }

  const raw = String(pricePerHour).trim()
  if (!raw) return { min: null, max: null }

  // Split on ~ or - (with optional surrounding whitespace) to support "150~250",
  // "150-250", and "150 - 250".
  const parts = raw
    .split(/\s*[~-]\s*/)
    .map((part) => Number(part.replace(/[^\d.]/g, '')))
    .filter((n) => Number.isFinite(n))

  if (parts.length === 0) return { min: null, max: null }
  if (parts.length === 1) return { min: parts[0], max: parts[0] }

  const min = Math.min(...parts)
  const max = Math.max(...parts)
  return { min, max }
}

/** Lower bound of a court's price, used for "Cheapest price" sorting. */
export function getMinPrice(pricePerHour) {
  return parsePriceRange(pricePerHour).min
}

/** Upper bound of a court's price, used for "Most expensive" sorting. */
export function getMaxPrice(pricePerHour) {
  return parsePriceRange(pricePerHour).max
}

/**
 * Formats a court's pricePerHour for display, e.g.:
 *   250        -> "₱250/hr"
 *   "250"      -> "₱250/hr"
 *   "150~250"  -> "₱150~250/hr"
 *   "150 - 250"-> "₱150 - ₱250/hr"
 */
export function formatPriceRange(pricePerHour) {
  if (pricePerHour == null) return ''

  if (typeof pricePerHour === 'number') {
    return `₱${pricePerHour}/hr`
  }

  const raw = String(pricePerHour).trim()
  if (!raw) return ''

  const rangeMatch = raw.match(/^(\d+(?:\.\d+)?)\s*(~|-)\s*(\d+(?:\.\d+)?)$/)
  if (rangeMatch) {
    const [, low, separator, high] = rangeMatch
    return separator === '~' ? `₱${low}~${high}/hr` : `₱${low} - ₱${high}/hr`
  }

  // Single numeric string, or already-formatted text we can't confidently parse
  // as a range — prefix the currency symbol as-is.
  return `₱${raw}/hr`
}
