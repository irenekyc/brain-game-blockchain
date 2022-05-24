import { useEffect, useState } from "react";
let currentIntervalId;

const stopClock = () => {
  if (currentIntervalId) {
    clearInterval(currentIntervalId);
  }
};

const CountDown = ({
  countDown,
  goToNextStep,
  shouldStopClock,
  gameStep,
  withText = false,
}) => {
  const [internalCountDown, setInternalCountDown] = useState(countDown);

  useEffect(() => {
    stopClock();
    if (!countDown) return;
    let countdownFrom = countDown;
    setInternalCountDown(countDown);
    currentIntervalId = setInterval(() => {
      countdownFrom--;
      setInternalCountDown(countdownFrom);
      if (countdownFrom < 0) {
        clearInterval(currentIntervalId);
        goToNextStep();
      }
    }, 1000);
  }, [countDown, goToNextStep]);

  useEffect(() => {
    if (shouldStopClock) {
      stopClock();
    }
  }, [shouldStopClock]);

  return (
    <span data-testid="countdown-span">
      {internalCountDown <= 0
        ? `${gameStep === 4 || gameStep === 5 ? "Times Up!" : "Start"}`
        : `${withText ? "Time left: " : ""}${internalCountDown} ${
            withText ? "s" : ""
          }`}
    </span>
  );
};

export default CountDown;
