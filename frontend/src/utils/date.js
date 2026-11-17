// Date helpers shared by tables and cards.
//
// Dates are shown in US time (MM/DD/YYYY, US Eastern) for every user.
//  • Timestamps ("2024-10-14T20:30:00") are stored in UTC by the backend
//    (datetime.utcnow, no timezone marker), so they are read as UTC and
//    converted to US time.
//  • Plain calendar dates ("2024-10-14") have no time of day, so they are shown
//    as they are – converting them would move every date one day back.

// Change here to show another US timezone, e.g. "America/Chicago".
export const DISPLAY_TIMEZONE = "America/New_York";

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

const DATE_FORMAT = { month: "2-digit", day: "2-digit", year: "numeric" };

// "2024-10-14" (or a Date / UTC timestamp) → "10/14/2024", as shown in the repository mockups.
// Empty or invalid values return the fallback ("—").
export const formatDate = (value, fallback = "—") => {
  if (!value) return fallback;

  if (!(value instanceof Date) && DATE_ONLY.test(String(value).trim())) {
    const [year, month, day] = String(value).trim().split("-");
    return `${month}/${day}/${year}`;
  }

  let date = value;
  if (!(value instanceof Date)) {
    const text = String(value).trim();
    const hasTimezone = /([zZ]|[+-]\d{2}:?\d{2})$/.test(text);
    date = new Date(hasTimezone ? text : `${text}Z`); // no marker → UTC (backend utcnow)
  }
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleDateString("en-US", { ...DATE_FORMAT, timeZone: DISPLAY_TIMEZONE });
};

// Today's date in US time as "YYYY-MM-DD" – for new items (e.g. Date Added on upload).
export const todayDate = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: DISPLAY_TIMEZONE }).format(new Date());
