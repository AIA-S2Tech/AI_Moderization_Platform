export const getTotalPages = (total, pageSize) =>
  total > 0 && pageSize > 0 ? Math.ceil(total / pageSize) : 0;

// "Showing 1 – 10 of 24" numbers for the current page.
export const getRange = (page, pageSize, total) => {
  if (!total || total <= 0) return { from: 0, to: 0 };
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  return { from, to };
};
