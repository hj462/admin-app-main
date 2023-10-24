import { fireEvent, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Geography from "./Geography";
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/geography",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
    };
  },
}));

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

describe("Geography", () => {
  beforeEach(() => {
    render(<Geography />);
  });
  it("renders a geography page", () => {
    const text = screen.getByText(
      "Which of the following regulatory geographies will you be working on?"
    );
    expect(text).toBeInTheDocument();
  });

  it("check btn", () => {
    const btn = screen.getByTestId("submit-button");
    fireEvent.click(btn);
  });

  it("radio button", () => {
    const btn = screen.getByTestId("radio-test") as HTMLInputElement;
    expect(btn.checked).toBeFalsy();
    fireEvent.click(btn);
    expect(btn.checked).toBeTruthy();
  });
});
