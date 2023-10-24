import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../Modal";
import SidebarOverlay from "../SidebarOverlay";

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
  open: true,
  setOpen: jest.fn(),
  title: "test",
  content: "test",
  onSubmit: jest.fn(),
  loading: false,
};

describe("Modal", () => {
  beforeEach(() => {
    Intersection();
    render(<SidebarOverlay {...props} />);
  });

  it("render Overlay", () => {
    const text = screen.getAllByText("test");
    expect(text[0]).toBeInTheDocument();
    expect(text[1]).toBeInTheDocument();
  });

  it("render button", () => {
    Intersection();
    const btn = screen.getByTestId("close-overlay");
    fireEvent.click(btn);
  });

  it("render button", () => {
    Intersection();
    const btn = screen.getAllByTestId("submit-button");
    fireEvent.click(btn[0]);
    fireEvent.click(btn[1]);
  });
});
