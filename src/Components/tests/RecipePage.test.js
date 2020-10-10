import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  cleanup,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import RecipePage from "../RecipePage";
import App from "../../App";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

it("renders whole component", () => {
  render(
    <Router>
      <App>
        <RecipePage />
      </App>
    </Router>
  );
});

it("component renders correct contents from api resources after route change", async () => {
  const history = createMemoryHistory();
  const { queryByTestId } = render(
    <Router history={history}>
      <App>
        <RecipePage />
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

it("Shows correct state change when edit state is toggled", async () => {
  const { queryByTestId, findByTestId } = render(
    <Router>
      <App>
        <RecipePage />
      </App>
    </Router>
  );
  const leftClick = { button: 1 };
  fireEvent.click(queryByTestId("edit-button"), leftClick);
  const resolvedBtn = findByTestId("recipe-page-edit-btn");
  expect(resolvedBtn).toBeTruthy();
});
