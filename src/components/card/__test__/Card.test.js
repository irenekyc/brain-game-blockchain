import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import GameCard from "../index";

test("Render Game card", () => {
  const onClickSelect = jest.fn();
  const id = "some-id";
  const currency = "some-currency";
  render(
    <GameCard
      id={id}
      currency={currency}
      isDisabled
      isFliped={false}
      onClickSelect={onClickSelect}
    />
  );

  const gameCard = screen.getByTestId("game-card-container");
  const gameCardWrapper = screen.getByTestId("game-card-wrapper");
  const gameCardInner = screen.getByTestId("game-card-inner");
  const gameCardOuter = screen.getByTestId("game-card-outer");
  const gameCurrencyImage = screen.getByTestId("game-card-currency-image");

  expect(gameCard).toBeInTheDocument();
  expect(gameCardWrapper).toBeInTheDocument();
  expect(gameCardInner).toBeInTheDocument();
  expect(gameCardOuter).toBeInTheDocument();

  expect(gameCardWrapper).toHaveAttribute("id", id);
  expect(gameCardWrapper).toHaveAttribute("data-currency", currency);
  expect(gameCurrencyImage).toHaveAttribute(
    "src",
    `./assets/crypto-icons/${currency}.svg`
  );
});

test("Render Game card - not flipped", () => {
  const onClickSelect = jest.fn();
  const id = "some-id";
  const currency = "some-currency";
  render(
    <GameCard
      id={id}
      currency={currency}
      isDisabled
      isFliped={false}
      onClickSelect={onClickSelect}
    />
  );

  const gameCard = screen.getByTestId("game-card-container");
  const gameCardWrapper = screen.getByTestId("game-card-wrapper");
  const gameCardInner = screen.getByTestId("game-card-inner");
  const gameCardOuter = screen.getByTestId("game-card-outer");

  expect(gameCard).toBeInTheDocument();
  expect(gameCardWrapper).toBeInTheDocument();
  expect(gameCardInner).toBeInTheDocument();
  expect(gameCardOuter).toBeInTheDocument();

  expect(gameCardWrapper).toHaveClass("card--inactive");
});

test("Render Game card - flipped", () => {
  const onClickSelect = jest.fn();
  const id = "some-id";
  const currency = "some-currency";
  render(
    <GameCard
      id={id}
      currency={currency}
      isDisabled
      isFliped
      onClickSelect={onClickSelect}
    />
  );

  const gameCard = screen.getByTestId("game-card-container");
  const gameCardWrapper = screen.getByTestId("game-card-wrapper");
  const gameCardInner = screen.getByTestId("game-card-inner");
  const gameCardOuter = screen.getByTestId("game-card-outer");

  expect(gameCard).toBeInTheDocument();
  expect(gameCardWrapper).toBeInTheDocument();
  expect(gameCardInner).toBeInTheDocument();
  expect(gameCardOuter).toBeInTheDocument();

  expect(gameCardWrapper).toHaveClass("card--active");
});

test("Render Game card - when the card is not disabled, click event should be called", () => {
  const onClickSelect = jest.fn();
  const id = "some-id";
  const currency = "some-currency";
  render(
    <GameCard
      id={id}
      currency={currency}
      isDisabled={false}
      isFliped
      onClickSelect={onClickSelect}
    />
  );

  const gameCard = screen.getByTestId("game-card-container");
  const gameCardWrapper = screen.getByTestId("game-card-wrapper");
  const gameCardInner = screen.getByTestId("game-card-inner");
  const gameCardOuter = screen.getByTestId("game-card-outer");

  expect(gameCard).toBeInTheDocument();
  expect(gameCardWrapper).toBeInTheDocument();
  expect(gameCardInner).toBeInTheDocument();
  expect(gameCardOuter).toBeInTheDocument();

  fireEvent(
    gameCardWrapper,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(onClickSelect).toBeCalled();
});

test("Render Game card - when the card isdisabled, click event should not be called", () => {
  const onClickSelect = jest.fn();
  const id = "some-id";
  const currency = "some-currency";
  render(
    <GameCard
      id={id}
      currency={currency}
      isDisabled
      isFliped
      onClickSelect={onClickSelect}
    />
  );

  const gameCard = screen.getByTestId("game-card-container");
  const gameCardWrapper = screen.getByTestId("game-card-wrapper");
  const gameCardInner = screen.getByTestId("game-card-inner");
  const gameCardOuter = screen.getByTestId("game-card-outer");

  expect(gameCard).toBeInTheDocument();
  expect(gameCardWrapper).toBeInTheDocument();
  expect(gameCardInner).toBeInTheDocument();
  expect(gameCardOuter).toBeInTheDocument();

  fireEvent(
    gameCardWrapper,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(onClickSelect).not.toBeCalled();
});
