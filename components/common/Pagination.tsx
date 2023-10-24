import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

type paginationTypes = {
  rowsPerPage: number;
  totalRows: number;
  setRowsPerPage: (value: any) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
};

export default function Pagination({
  rowsPerPage,
  totalRows,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
}: paginationTypes) {
  const pageNumbers: number[] = [];

  const [pageCount, setPageCount] = useState(1);

  const setFirstPage = () => {
    if (totalRows <= 5) {
      setCurrentPage(0);
      setPageCount(1);
    }
  };

  useEffect(() => {
    setFirstPage();
  }, [totalRows]);

  const NextPageHandle = () => {
    if (rowsPerPage == 5) {
      setCurrentPage(currentPage + 5);
      setPageCount(pageCount + 1);
    } else if (rowsPerPage == 10) {
      setCurrentPage(currentPage + 10);
      setPageCount(pageCount + 1);
    } else {
      setCurrentPage(currentPage + 15);
      setPageCount(pageCount + 1);
    }
  };
  const PrevPageHandle = () => {
    if (currentPage == 1) {
      setCurrentPage(1);
    } else if (rowsPerPage == 5) {
      setPageCount(pageCount - 1);
      setCurrentPage(currentPage - 5);
    } else if (rowsPerPage == 10) {
      setCurrentPage(currentPage - 10);
      setPageCount(pageCount - 1);
    } else {
      setCurrentPage(currentPage - 15);
      setPageCount(pageCount - 1);
    }
  };

  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  var TotalPages = Object.keys(pageNumbers).length;

  return (
    <div className="flex font-inter items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500">
            {currentPage + 1 * rowsPerPage - rowsPerPage + 1} -{" "}
            {currentPage + 1 * rowsPerPage > totalRows
              ? totalRows
              : currentPage + 1 * rowsPerPage}{" "}
            of {totalRows}
          </p>
        </div>
        <div className="flex items-center">
          <div className="mr-5 flex items-center">
            <p className="mr-2 text-gray-500 text-xs font-medium">
              Rows per page:
            </p>
            <select
              className="text-gray-500 text-xs font-medium"
              onChange={(e) => {
                setRowsPerPage(e.target.value);
                setCurrentPage(0);
                setPageCount(1);
              }}
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
            </select>
          </div>

          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className={`${
                pageCount == 1 ? "pointer-events-none" : "pointer-events-auto"
              } relative inline-flex items-center rounded-md border border-gray-300 bg-white w-6 h-5 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-2`}
              onClick={PrevPageHandle}
              data-testid="prev-button"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>

            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center justify-center w-8 h-5 text-sm font-medium text-gray-500 focus:z-20"
            >
              {pageCount} / {TotalPages}
            </a>

            <a
              href="#"
              className={`${
                pageCount == TotalPages
                  ? "pointer-events-none"
                  : "pointer-events-auto"
              } relative inline-flex items-center rounded-md border border-gray-300 bg-white w-6 h-5 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-2`}
              onClick={NextPageHandle}
              data-testid="next-button"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
