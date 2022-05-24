import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import Game from "../index";

import { BrainGameContext } from "../../../context/BrainGameContext";
import { act } from "react-dom/test-utils";

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

test("Render Game Widget - step 1", async () => {
  const stopGame = jest.fn();
  const gameReset = jest.fn();
  const createGameHistoryEntry = jest.fn();

  render(
    <BrainGameContext.Provider
      value={{
        gameReset,
        createGameHistoryEntry,
      }}
    >
      <Game stopGame={stopGame} />
    </BrainGameContext.Provider>
  );
  const gameHeading = screen.getByTestId("game-heading");
  expect(gameHeading).toBeInTheDocument();
  expect(gameHeading).toHaveTextContent("1. Choose a level");
  const countdownModal = screen.queryByTestId("game-step-2-countdown");
  expect(countdownModal).toBeNull();
});

test("Render Game Widget - step 2", async () => {
  const stopGame = jest.fn();
  const gameReset = jest.fn();
  const createGameHistoryEntry = jest.fn();

  render(
    <BrainGameContext.Provider
      value={{
        gameReset,
        createGameHistoryEntry,
      }}
    >
      <Game stopGame={stopGame} />
    </BrainGameContext.Provider>
  );
  const gameHeading = screen.getByTestId("game-heading");
  expect(gameHeading).toBeInTheDocument();
  expect(gameHeading).toHaveTextContent("1. Choose a level");
  const levelButtons = screen.getAllByTestId("level-button");
  expect(levelButtons).toHaveLength(3);
  act(() => {
    fireEvent(
      levelButtons[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });
  expect(gameHeading).toHaveTextContent("");
  const countdownModal = screen.queryByTestId("game-step-2-countdown");
  expect(countdownModal).toBeInTheDocument();
});
