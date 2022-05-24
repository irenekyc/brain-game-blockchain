import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Layout from "../index";

test("Render Layout", async () => {
  const layoutContent = "Some Layout content";
  render(
    <Layout>
      <p>{layoutContent}</p>
    </Layout>
  );
  const layout = screen.getByTestId("layout");
  expect(layout).toBeInTheDocument();
  expect(layout).toHaveTextContent(layoutContent);
});
