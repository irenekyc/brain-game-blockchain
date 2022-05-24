import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Cooldown from "../index";

test("Render Cool down test", () => {
  const cooldownHour = 10;
  render(<Cooldown cooldown={cooldownHour} />);

  const cooldown = screen.getByTestId("cooldown-text-div");

  expect(cooldown).toBeInTheDocument();
  expect(cooldown).toHaveTextContent(
    `Please come back in ${cooldownHour} hours`
  );
});
