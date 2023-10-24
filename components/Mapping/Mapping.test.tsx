import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegulationMapping from "./RegulationMapping";
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/c-thru-ai",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
    };
  },
}));

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    BACKEND_URL: "url",
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

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

const testQueryClient = createTestQueryClient();

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

describe("Mapping", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={testQueryClient}>
        <RegulationMapping />
      </QueryClientProvider>
    );
  });

  it("renders a Mapping page", () => {
    const text = screen.getByText("Regulation Mapping");
    expect(text).toBeInTheDocument();
  });

  it("render button", () => {
    Intersection();
    const btn = screen.getByTestId("submit-button");
    fireEvent.click(btn);
  });
});
