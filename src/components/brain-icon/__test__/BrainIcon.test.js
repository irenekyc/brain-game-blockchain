import { render, screen } from "@testing-library/react";

import BrainIcon from "../index";

test("Render BrainIcon by default, should be white in color", () => {
  render(<BrainIcon />);

  const brainIcon = screen.getByTestId("brain-icon");
  const g = brainIcon.querySelector("g");
  const gColor = g.getAttribute("fill");
  expect(gColor).toBe("#fff");
});

test("Render BrainIcon with custom color", () => {
  const customColor = "#000";
  render(<BrainIcon color={customColor} />);

  const brainIcon = screen.getByTestId("brain-icon");
  const g = brainIcon.querySelector("g");
  const gColor = g.getAttribute("fill");
  expect(gColor).toBe(customColor);
});
