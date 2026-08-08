/**
 * Utilities for deriving a court's live Open/Closed status from its
 * scheduled `openingTime` / `closingTime` (24-hour "HH:MM" strings),
 * compared against the user's current local time.
 */

/**
 * Parses a "HH:MM" 24-hour time string into minutes-since-midnight.
 * Returns null if the value is missing or malformed.
 */
function toMinutes(time) {
  if (typeof time !== 'string') return null
  const match = /^(\d{1,2}):(\d{2})$/.exec(time.trim())
  if (!match) return null

  const hours = Number(match[1])
  const minutes = Number(match[2])
  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 24 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null
  }

  return hours * 60 + minutes
}

/**
 * Determines whether a court is currently open based on its scheduled
 * opening/closing times and the given reference time (defaults to now).
 *
 * Handles:
 *  - Standard same-day windows (e.g. 06:00 - 22:00)
 *  - Windows that close at/after midnight (e.g. 16:00 - 00:00, 06:00 - 02:00)
 *  - 24/7 courts, where openingTime === closingTime (e.g. "00:00" - "00:00")
 *
 * Falls back to `true` (Open) if opening/closing times are missing or
 * cannot be parsed, so existing data without hours still renders sensibly.
 */
export function isCourtOpen(openingTime, closingTime, referenceDate = new Date()) {
  const openMinutes = toMinutes(openingTime)
  const closeMinutes = toMinutes(closingTime)

  if (openMinutes === null || closeMinutes === null) {
    return true
  }

  // Opening time equals closing time -> court operates 24 hours a day.
  if (openMinutes === closeMinutes) {
    return true
  }

  const nowMinutes = referenceDate.getHours() * 60 + referenceDate.getMinutes()

  if (closeMinutes > openMinutes) {
    // Normal same-day window, e.g. 06:00 - 22:00
    return nowMinutes >= openMinutes && nowMinutes < closeMinutes
  }

  // Overnight window that wraps past midnight, e.g. 16:00 - 00:00 or 06:00 - 02:00
  return nowMinutes >= openMinutes || nowMinutes < closeMinutes
}

/**
 * Convenience helper: derives the Open/Closed status directly from a
 * court object (expects `openingTime` / `closingTime` fields).
 */
export function getCourtStatus(court, referenceDate = new Date()) {
  return isCourtOpen(court?.openingTime, court?.closingTime, referenceDate) ? 'open' : 'closed'
}