import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  waitForDomChange,
} from "@testing-library/react";
import FeaturedHero from "../FeaturedHero";
import App from "../../App";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

it("renders whole component correctly", () => {
  render(
    <Router>
      <FeaturedHero />
    </Router>
  );
});

it("component renders contents from api resources", async () => {
  const { queryByTestId, queryByAltText } = render(
    <Router>
      <App>
        <FeaturedHero />
      </App>
    </Router>
  );
  const resolvedElement = await waitForElement(() =>
    queryByTestId("hero-image")
  );
  const resolvedImg = await waitForElement(() =>
    queryByAltText("featured-recipe")
  );

  expect(resolvedElement).toBeTruthy();
  expect(resolvedImg).toBeInTheDocument();
});

it("Shows edit button when edit mode is clicked", async () => {
  const { queryByTestId, findByTestId } = render(
    <Router>
      <App>
        <FeaturedHero />
      </App>
    </Router>
  );
  const leftClick = { button: 1 };
  const resolvedBtn = findByTestId("edit-btn");
  fireEvent.click(queryByTestId("edit-button"), leftClick);
  await waitForDomChange();
  expect(resolvedBtn).toBeTruthy();
});
