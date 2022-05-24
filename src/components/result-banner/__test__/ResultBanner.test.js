import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import ResultBanner from "../index";
import { WON } from "../../../constants";

test("Render ResultBanner - WON", async () => {
  render(<ResultBanner result={WON} difficultyLevel="easy" />);
  const resultBanner = screen.getByTestId("result-banner");
  expect(resultBanner).toBeInTheDocument();
});
