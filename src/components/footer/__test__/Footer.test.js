import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Footer from "../index";

test("Render Footer", async () => {
  render(<Footer />);
  const footer = screen.getByTestId("footer");
  expect(footer).toBeInTheDocument();
});
