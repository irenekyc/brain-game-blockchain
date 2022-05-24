import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import ResultBanner from "../index";
import { WON, LOST } from "../../../constants";

test("Render ResultBanner - WON", async () => {
  const transferToken = jest.fn();
  render(
    <ResultBanner
      result={WON}
      difficultyLevel="easy"
      transferToken={transferToken}
    />
  );
  const resultBanner = screen.getByTestId("result-banner");
  expect(resultBanner).toBeInTheDocument();
  expect(resultBanner).toHaveTextContent("You Won");
  const claimPrizeButton = screen.getByTestId("claim-prize-button");
  expect(claimPrizeButton).toBeInTheDocument();
});

test("Render ResultBanner - LOST", async () => {
  const transferToken = jest.fn();
  render(
    <ResultBanner
      result={LOST}
      difficultyLevel="easy"
      transferToken={transferToken}
    />
  );
  const resultBanner = screen.getByTestId("result-banner");
  expect(resultBanner).toBeInTheDocument();
  expect(resultBanner).toHaveTextContent("You Lost");
  const claimPrizeButton = screen.queryByTestId("claim-prize-button");
  expect(claimPrizeButton).toBeNull();
});

test("Render ResultBanner - transfer token function", async () => {
  const transferToken = jest.fn();
  render(
    <ResultBanner
      result={WON}
      difficultyLevel="easy"
      transferToken={transferToken}
    />
  );
  const resultBanner = screen.getByTestId("result-banner");
  expect(resultBanner).toBeInTheDocument();
  expect(resultBanner).toHaveTextContent("You Won");
  const claimPrizeButton = screen.queryByTestId("claim-prize-button");
  expect(claimPrizeButton).not.toBeNull();

  fireEvent(claimPrizeButton, new MouseEvent("click"));
  expect(transferToken).toBeCalledWith(1);
});

test("Render ResultBanner - transfer token function - with medium difficulty", async () => {
  const transferToken = jest.fn();
  render(
    <ResultBanner
      result={WON}
      difficultyLevel="medium"
      transferToken={transferToken}
    />
  );
  const resultBanner = screen.getByTestId("result-banner");
  expect(resultBanner).toBeInTheDocument();
  expect(resultBanner).toHaveTextContent("You Won");
  const claimPrizeButton = screen.queryByTestId("claim-prize-button");
  expect(claimPrizeButton).not.toBeNull();

  fireEvent(claimPrizeButton, new MouseEvent("click"));
  expect(transferToken).toBeCalledWith(5);
});
