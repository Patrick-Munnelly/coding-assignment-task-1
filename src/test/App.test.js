import {  screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./utils";
import App from "../App";

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;

});

it("renders watch later link", () => {
  renderWithProviders(<App />);
  const linkElement = screen.getByText(/watch later/i);
  expect(linkElement).toBeInTheDocument();
});

it("search for movies", async () => {
  renderWithProviders(<App />);
  await new Promise((r) => setTimeout(r, 5000));

  await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
  await new Promise((r) => setTimeout(r, 5000));

  await waitFor(
    () => {
      expect(
        screen.getAllByText("Through the Eyes of Forrest Gump")[0]
      ).toBeInTheDocument();
    },
    { timeout: 10000 }
  );
  await new Promise((r) => setTimeout(r, 5000));

  const viewTrailerBtn = screen.getAllByText("View Trailer")[0];
  await userEvent.click(viewTrailerBtn);
  await waitFor(
    () => {
      expect(screen.getByTestId("youtube-player")).toBeInTheDocument();
    },
    { timeout: 30000 }
  );
}, 50_000);

it("renders watch later component", async () => {
  renderWithProviders(<App />);
  const user = userEvent.setup();
  await user.click(screen.getByText(/watch later/i));
  expect(
    screen.getByText(/You have no movies saved to watch later/i)
  ).toBeInTheDocument();
});

it("renders starred component", async () => {
  renderWithProviders(<App />);
  const user = userEvent.setup();
  await user.click(screen.getByTestId("nav-starred"));
  expect(screen.getByText(/There are no starred movies/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByTestId("starred")).toBeInTheDocument();
  });
});


