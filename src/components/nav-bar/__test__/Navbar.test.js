import { render, screen } from "@testing-library/react";
import { TestProvider } from "../../../utlis/TestProvider";

import "@testing-library/jest-dom";
import NavBar from "../index";

test("Render NavBar", async () => {
  const connectMetaMask = jest.fn();
  const transferToken = jest.fn();

  render(
    <TestProvider
      value={{
        currentAccount: undefined,
        connectMetaMask,
        userTokenBalance: 0,
        transferToken,
      }}
    >
      <NavBar />
    </TestProvider>
  );
  const navbar = screen.getByTestId("nav-bar");
  expect(navbar).toBeInTheDocument();
});
