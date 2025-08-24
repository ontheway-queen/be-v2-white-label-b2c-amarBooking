import { useState, useMemo } from 'react';

export function usePagination<T>(data: T[], defaultPageSize: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const totalPages = Math.ceil(data.length / pageSize);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [currentPage, pageSize, data]);

  const jump = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  const changePageSize = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // reset to first page
    scrollToTop();
  };

  const resetPagination = () => {
    setCurrentPage(1);
    setPageSize(defaultPageSize); // reset to default page size
    scrollToTop();
  };

  // Function to scroll to the top of the page or specific element
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return {
    currentPage,
    totalPages,
    pageSize,
    currentData,
    jump,
    changePageSize,
    resetPagination,
  };
}
