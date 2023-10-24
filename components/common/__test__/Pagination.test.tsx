import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../Pagination";

const Intersection = () => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
};

const props = {
  rowsPerPage: 1,
  totalRows: 30,
  setRowsPerPage: jest.fn(),
  currentPage: 0,
  setCurrentPage: jest.fn(),
};

describe("Pagination", () => {
  beforeEach(() => {
    Intersection();
    render(<Pagination {...props} />);
  });

  it("prev button", () => {
    const btn = screen.getByTestId("prev-button");
    fireEvent.click(btn);
  });

  it("next button", () => {
    const btn = screen.getByTestId("next-button");
    fireEvent.click(btn);
  });
});
