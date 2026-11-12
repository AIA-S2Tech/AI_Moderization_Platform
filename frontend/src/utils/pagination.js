export const getTotalPages = (total, pageSize) =>
  total > 0 && pageSize > 0 ? Math.ceil(total / pageSize) : 0;

// "Showing 1 – 10 of 24" numbers for the current page.
export const getRange = (page, pageSize, total) => {
  if (!total || total <= 0) return { from: 0, to: 0 };
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  return { from, to };
};

// Page buttons to show, with "…" gaps for long lists.
// Always shows the first and last page plus 'siblings' pages either side of the
// current one, e.g. page 6 of 20 → [1, "…", 5, 6, 7, "…", 20].
export const getPageItems = (page, totalPages, siblings = 1) => {
  // Few pages – show them all.
  const maxButtons = siblings * 2 + 5; // first, last, current, 2 gaps
  if (totalPages <= maxButtons) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const start = Math.max(page - siblings, 2);
  const end = Math.min(page + siblings, totalPages - 1);
  const items = [1];

  // A gap that would hide only one page shows that page instead of "…".
  if (start === 3) items.push(2);
  else if (start > 3) items.push("…");
  for (let p = start; p <= end; p += 1) items.push(p);
  if (end === totalPages - 2) items.push(totalPages - 1);
  else if (end < totalPages - 2) items.push("…");

  items.push(totalPages);
  return items;
};
