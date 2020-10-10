import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

import "@testing-library/jest-dom/extend-expect";

import App from "./App";

test("full app rendering/navigating", () => {
  const history = createMemoryHistory();
  history.push("/");
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(screen.getByText(/About/i)).toBeInTheDocument();
  expect(screen.getByText(/Edit Mode/i)).toBeInTheDocument();
});

test("landing on a bad page", () => {
  const history = createMemoryHistory();
  history.push("/some/bad/route");
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(screen.getByText(/404 Page Not Found/i)).toBeInTheDocument();
});
