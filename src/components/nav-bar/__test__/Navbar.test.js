import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import NavBar from "../index";

test("Render NavBar, when user is not connect to metamask, show connect wallet button", async () => {
  const connectMetaMask = jest.fn();
  const transferToken = jest.fn();
  const currentAccount = undefined;
  const userTokenBalance = 0;

  render(
    <NavBar
      currentAccount={currentAccount}
      connectMetaMask={connectMetaMask}
      userTokenBalance={userTokenBalance}
      transferToken={transferToken}
    />
  );
  const navbar = screen.getByTestId("nav-bar");
  expect(navbar).toBeInTheDocument();
  const connectWalletBtn = screen.getByTestId("nav-bar-connect-wallet-btn");
  expect(connectWalletBtn).toBeInTheDocument();
});

test("Render NavBar, when user is connected to metamask, show user name and balance", async () => {
  const connectMetaMask = jest.fn();
  const transferToken = jest.fn();
  const currentAccount = "1234567890abcdefg";
  const userTokenBalance = 123;

  render(
    <NavBar
      currentAccount={currentAccount}
      connectMetaMask={connectMetaMask}
      userTokenBalance={userTokenBalance}
      transferToken={transferToken}
    />
  );
  const navbar = screen.getByTestId("nav-bar");
  expect(navbar).toBeInTheDocument();
  const connectWalletBtn = screen.queryByTestId("nav-bar-connect-wallet-btn");
  expect(connectWalletBtn).toBeNull();
  const userInfo = screen.getByTestId("nav-bar-user");
  expect(userInfo).toBeInTheDocument();
  expect(userInfo).toHaveTextContent("12345");
  const tokenBalance = screen.getByTestId("user-token-balance");
  expect(tokenBalance).toHaveTextContent("123");
});
