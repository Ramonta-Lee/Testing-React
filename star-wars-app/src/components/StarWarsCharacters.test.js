import React from "react";

import { render, fireEvent, wait } from "@testing-library/react";

import { getData as mockGetData } from "../api";

import App from "../App";
import StarWarsCharacters from "./StarWarsCharacters";

// Remember to write these the way the code is read

jest.mock("../api");

// Mock data can be placed outside of the test

mockGetData.mockResolvedValue({
  next: "Next",
  previous: "Previous",
  results: [
    {
      name: "Initial Name",
      url: "Initial Url"
    }
  ]
});

test("logo renders", () => {
  const { getByAltText } = render(<App />);
  getByAltText(/logo/i);
});

test("initial render of character names, previous, and next button", async () => {
  const { getByText } = render(<StarWarsCharacters />);

  // Testing async of the fired events of the previous and next button
  // click Button

  fireEvent.click(getByText("Previous"));
  fireEvent.click(getByText("Next"));

  await wait(() => expect(getByText(/Initial Name/i)));

  wait(() => getByText(/Next/i));
  wait(() => getByText(/Previous/i));
});

// test("renders logo, previous, and next buttons", async () => {
//   // AAA: Arrange, Act, Assert

//   const { getByAltText, getByText } = render(<App />);

//   const image = getByAltText(/logo/i);

//   const nextButton = getByText(/next/i);
//   const previousButton = getByText(/previous/i);
// });

// test("check for next button", () => {
//   const { getAllByRole } = render(<App />);
//   getAllByRole("button");
// });
