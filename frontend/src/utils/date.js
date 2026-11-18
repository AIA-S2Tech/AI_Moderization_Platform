// Date helpers shared by tables and cards.
//
// Dates are shown in US time (US Eastern) for every user.
//  • Timestamps ("2024-10-14T20:30:00") are stored in UTC by the backend
//    (datetime.utcnow, no timezone marker), so they are read as UTC and
//    converted to US time.
//  • Plain calendar dates ("2024-10-14") have no time of day, so they are shown
//    as they are – converting them would move every date one day back.

// Change here to show another US timezone, e.g. "America/Chicago".
export const DISPLAY_TIMEZONE = "America/New_York";

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

const SHORT = { month: "2-digit", day: "2-digit", year: "numeric" }; // 10/14/2024
const MEDIUM = { month: "short", day: "numeric", year: "numeric" }; // Oct 14, 2024

const format = (value, options, fallback) => {
  if (!value) return fallback;

  let date = value;
  let timeZone = DISPLAY_TIMEZONE;
  if (!(value instanceof Date)) {
    const text = String(value).trim();
    if (DATE_ONLY.test(text)) {
      // calendar date: format the day itself, no timezone conversion
      date = new Date(`${text}T00:00:00Z`);
      timeZone = "UTC";
    } else {
      const hasTimezone = /([zZ]|[+-]\d{2}:?\d{2})$/.test(text);
      date = new Date(hasTimezone ? text : `${text}Z`); // no marker → UTC (backend utcnow)
    }
  }
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleDateString("en-US", { ...options, timeZone });
};

// "2024-10-14" (or a Date / UTC timestamp) → "10/14/2024" – repository tables.
// Empty or invalid values return the fallback ("—").
export const formatDate = (value, fallback = "—") => format(value, SHORT, fallback);

// "2026-05-20" → "May 20, 2026" – workspace Recent Artifacts.
export const formatDateMedium = (value, fallback = "—") => format(value, MEDIUM, fallback);

// Today's date in US time as "YYYY-MM-DD" – for new items (e.g. Date Added on upload).
export const todayDate = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: DISPLAY_TIMEZONE }).format(new Date());
