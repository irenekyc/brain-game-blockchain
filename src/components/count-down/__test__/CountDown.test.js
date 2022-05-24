import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import CountDown from "../index";

test("Render Countdown", async () => {
  const countDownTime = 10;
  const goToNextStep = jest.fn();
  const shouldStopClock = jest.fn();
  const gameStep = 1;
  jest.useFakeTimers();

  render(
    <CountDown
      countDown={countDownTime}
      goToNextStep={goToNextStep}
      shouldStopClock={shouldStopClock}
      gameStep={gameStep}
    />
  );

  const countdownSpan = screen.getByTestId("countdown-span");

  expect(countdownSpan).toBeInTheDocument();
  expect(countdownSpan).toHaveTextContent("10");
});
