import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Navbar from "../Navbar";
import App from "../../App";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

it("renders whole component", () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );
});

it("renders individual elements", () => {
  const { queryByTestId } = render(
    <Router>
      <Navbar />
    </Router>
  );
  expect(queryByTestId("nav-container")).toBeTruthy();
  expect(queryByTestId("logo")).toBeTruthy();
  expect(queryByTestId("link")).toBeTruthy();
  expect(queryByTestId("edit-button")).toBeTruthy();
});

it("elements contain correct text content", () => {
  const { queryByTestId } = render(
    <Router>
      <Navbar />
    </Router>
  );
  expect(queryByTestId("link")).toHaveTextContent("About");
  expect(queryByTestId("edit-button")).toHaveTextContent("Edit Mode");
});

it("edit button changes state on click", () => {
  const { queryByTestId } = render(
    <Router>
      <App>
        <Navbar />
      </App>
    </Router>
  );
  const leftClick = { button: 1 };
  fireEvent.click(queryByTestId("edit-button"), leftClick);
  expect(queryByTestId("edit-button")).toHaveTextContent("Exit Edit");
});
