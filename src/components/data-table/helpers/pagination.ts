export const generatePaginationPages = (
  currentPage: number,
  maxPages: number,
) => {
  if (maxPages <= 5) {
    return Array.from({ length: maxPages }, (_, i) => i + 1);
  }

  const pages: (number | null)[] = [];

  const add = (page: number | null) => {
    if (pages[pages.length - 1] !== page) {
      pages.push(page);
    }
  };

  // Always include first page
  add(1);

  // Determine middle window
  let start = Math.max(2, currentPage - 1);
  let end = Math.min(maxPages - 1, currentPage + 1);

  // Adjust window near edges
  if (currentPage <= 3) {
    start = 2;
    end = 4;
  }

  if (currentPage >= maxPages - 2) {
    start = maxPages - 3;
    end = maxPages - 1;
  }

  // Left gap
  if (start > 2) {
    add(null);
  }

  // Middle pages
  for (let i = start; i <= end; i++) {
    add(i);
  }

  // Right gap
  if (end < maxPages - 1) {
    add(null);
  }

  // Always include last page
  add(maxPages);

  return pages;
};
