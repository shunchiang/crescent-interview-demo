import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  waitForDomChange,
  cleanup,
} from "@testing-library/react";
import MainList from "../MainList";
import App from "../../App";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

it("renders whole component", () => {
  render(
    <Router>
      <App>
        <MainList />
      </App>
    </Router>
  );
});

it("component renders correct contents from api resources", async () => {
  const { queryByTestId } = render(
    <Router>
      <App>
        <MainList />
      </App>
    </Router>
  );
  const recipeImg = await waitForElement(() => queryByTestId("card-img-0"));
  const cardTitle = await waitForElement(() => queryByTestId("card-title-0"));
  const cardDescription = await waitForElement(() =>
    queryByTestId("card-description-0")
  );
  const recipeLink = await waitForElement(() => queryByTestId("link-btn-0"));

  expect(recipeImg).toBeTruthy();
  expect(cardTitle).toHaveTextContent("Italian Meatballs");
  expect(cardDescription).toHaveTextContent("Quick, easy and authentic.");
  expect(recipeLink).toHaveTextContent("Full Recipe");
});

it("Shows correct state change when edit mode is clicked", async () => {
  const { queryByTestId, findByTestId, debug } = render(
    <Router>
      <App>
        <MainList />
      </App>
    </Router>
  );
  const leftClick = { button: 1 };
  fireEvent.click(queryByTestId("edit-button"), leftClick);
  const resolvedBtn = findByTestId("edit-recipe-btn-3");
  await waitForDomChange();
  expect(resolvedBtn).toBeTruthy();
  debug();
});
