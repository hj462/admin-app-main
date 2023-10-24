import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../Modal";

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
  title: "",
  open: true,
  setOpen: jest.fn(),
  ModalContent: "",
  update: false,
  formSubmit: jest.fn(),
  showFooterButtons: true,
  deleteRow: false,
};

describe("Modal", () => {
  beforeEach(() => {
    Intersection();
    render(<Modal {...props} />);
  });

  it("render Modal", () => {
    const text = screen.getByText("Add another requirement");
    expect(text).toBeInTheDocument();
  });

  it("render button", () => {
    const btn = screen.getAllByTestId("submit-button");
    fireEvent.click(btn[0]);
    fireEvent.click(btn[1]);
  });

  it("modal open", () => {
    const btn = screen.getByTestId("modal-open");
    fireEvent.click(btn);
  });
});
