import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import GameCardsContainer from "../index";

import { BrainGameContext } from "../../../context/BrainGameContext";
import { TRANSFER_PROGRESS_NULL } from "../../../constants";

jest.mock("@sanity/client", () => {
  return function sanity() {
    return {
      fetch: () => ({
        methodOne: [{}],
        methodTwo: [{}],
      }),
    };
  };
});

test("Render Game Cards Container - Step 3", async () => {
  const gameRestart = jest.fn();
  const gameReset = jest.fn();
  const transferToken = jest.fn();
  const createGameHistoryEntry = jest.fn();
  const showResult = jest.fn();
  const mockCurrencyList = [
    {
      currencyId: 1,
      currencyName: "aave",
      image: "aave.svg",
    },
    {
      currencyId: 2,
      currencyName: "abt",
      image: "abt.svg",
    },
  ];

  render(
    <BrainGameContext.Provider
      value={{
        currentAccount: "some-account",
        transferToken,
        gameReset,
        createGameHistoryEntry,
        transferProgress: TRANSFER_PROGRESS_NULL,
      }}
    >
      <GameCardsContainer
        difficultyLevel="easy"
        gameRestart={gameRestart}
        gameStep={3}
        currenciesList={mockCurrencyList}
        showResult={showResult}
      />
    </BrainGameContext.Provider>
  );

  const gameCards = screen.queryAllByTestId("game-card-container");
  expect(gameCards).toHaveLength(mockCurrencyList.length * 2);
});

test("Render Game Cards Container - Step 5", async () => {
  const gameRestart = jest.fn();
  const gameReset = jest.fn();
  const transferToken = jest.fn();
  const createGameHistoryEntry = jest.fn();
  const showResult = jest.fn();
  const mockCurrencyList = [
    {
      currencyId: 1,
      currencyName: "aave",
      image: "aave.svg",
    },
    {
      currencyId: 2,
      currencyName: "abt",
      image: "abt.svg",
    },
  ];

  render(
    <BrainGameContext.Provider
      value={{
        currentAccount: "some-account",
        transferToken,
        gameReset,
        createGameHistoryEntry,
        transferProgress: TRANSFER_PROGRESS_NULL,
      }}
    >
      <GameCardsContainer
        difficultyLevel="easy"
        gameRestart={gameRestart}
        gameStep={5}
        currenciesList={mockCurrencyList}
        showResult={showResult}
      />
    </BrainGameContext.Provider>
  );

  const gameCards = screen.queryAllByTestId("game-card-container");
  expect(gameCards).toHaveLength(mockCurrencyList.length * 2);
  const resultBanner = screen.queryByTestId("result-banner");
  expect(resultBanner).toBeInTheDocument();
});
