import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import App from "./App";

import { BrainGameContext } from "./context/BrainGameContext";

jest.mock("@sanity/client", () => {
  return function sanity() {
    return {
      fetch: () => ({
        methodOne: [{}],
        methodTwo: [{}],
      }),
    };
  };
});

test("Render App - first page", async () => {
  const gameReset = jest.fn();
  const transferToken = jest.fn();
  const createGameHistoryEntry = jest.fn();
  const connectMetaMask = jest.fn();
  const switchChainId = jest.fn();
  const contractInstance = null;
  const isCorrectNetwork = null;
  const userDetails = {};
  const userTokenBalance = 0;

  render(
    <BrainGameContext.Provider
      value={{
        currentAccount: undefined,
        transferToken,
        gameReset,
        createGameHistoryEntry,
        warning: null,
        hasMetaMask: false,
        connectMetaMask,
        contractInstance,
        isCorrectNetwork,
        switchChainId,
        userTokenBalance,
        userDetails,
      }}
    >
      <App />
    </BrainGameContext.Provider>
  );

  // All sections should be shown
  const navBar = screen.getByTestId("nav-bar");
  expect(navBar).toBeInTheDocument();
  const main = screen.getByTestId("main");
  expect(main).toBeInTheDocument();
  const footer = screen.getByTestId("footer");
  expect(footer).toBeInTheDocument();

  // Render welcome content
  const welcomeHeading = screen.getByTestId("welcome-heading");
  expect(welcomeHeading).toBeInTheDocument();
  expect(welcomeHeading).toHaveTextContent("Welcome to Brain Game");
  const welcomeAboutHeading = screen.getByTestId("welcome-about");
  expect(welcomeAboutHeading).toBeInTheDocument();
  expect(welcomeAboutHeading).toHaveTextContent("About Brain Game");
  const startButton = screen.getByTestId("start-button");
  expect(startButton).toBeInTheDocument();
});

test("Render App - connecting page -  no etherum detected", async () => {
  const gameReset = jest.fn();
  const transferToken = jest.fn();
  const createGameHistoryEntry = jest.fn();
  const connectMetaMask = jest.fn();
  const switchChainId = jest.fn();
  const contractInstance = null;
  const isCorrectNetwork = null;
  const userDetails = {};
  const userTokenBalance = 0;

  render(
    <BrainGameContext.Provider
      value={{
        currentAccount: undefined,
        transferToken,
        gameReset,
        createGameHistoryEntry,
        warning: "some warning",
        hasMetaMask: false,
        connectMetaMask,
        contractInstance,
        isCorrectNetwork,
        switchChainId,
        userTokenBalance,
        userDetails,
      }}
    >
      <App />
    </BrainGameContext.Provider>
  );

  // Click on start button

  const startButton = screen.getByTestId("start-button");
  expect(startButton).toBeInTheDocument();
  fireEvent(
    startButton,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  const warningMessage = screen.getByTestId("warning-message");
  expect(warningMessage).toBeInTheDocument();
  expect(warningMessage).toHaveTextContent("some warning");
});

test("Render App - connecting page -  etherum detected and ask to connect wallet", async () => {
  const gameReset = jest.fn();
  const transferToken = jest.fn();
  const createGameHistoryEntry = jest.fn();
  const connectMetaMask = jest.fn();
  const switchChainId = jest.fn();
  const contractInstance = null;
  const isCorrectNetwork = null;
  const userDetails = {};
  const userTokenBalance = 0;

  render(
    <BrainGameContext.Provider
      value={{
        currentAccount: undefined,
        transferToken,
        gameReset,
        createGameHistoryEntry,
        warning: null,
        hasMetaMask: true,
        connectMetaMask,
        contractInstance,
        isCorrectNetwork,
        switchChainId,
        userTokenBalance,
        userDetails,
      }}
    >
      <App />
    </BrainGameContext.Provider>
  );

  // Click on start button

  const startButton = screen.getByTestId("start-button");
  expect(startButton).toBeInTheDocument();
  fireEvent(
    startButton,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  const connectWalletPrompt = screen.getByTestId("connect-wallet-prompt");
  const connectWalletButton = screen.getByTestId("connect-wallet-button");
  expect(connectWalletButton).toBeInTheDocument();
  expect(connectWalletPrompt).toBeInTheDocument();
});

test("Render App - connecting page -  etherum detected , wallet connected but not on the same network, should shown switch to Rinkey prompt", async () => {
  const gameReset = jest.fn();
  const transferToken = jest.fn();
  const createGameHistoryEntry = jest.fn();
  const connectMetaMask = jest.fn();
  const switchChainId = jest.fn();
  const contractInstance = undefined;
  const isCorrectNetwork = false;
  const userDetails = {};
  const userTokenBalance = 0;

  render(
    <BrainGameContext.Provider
      value={{
        currentAccount: "123456789246578asddfas",
        transferToken,
        gameReset,
        createGameHistoryEntry,
        warning: null,
        hasMetaMask: true,
        connectMetaMask,
        contractInstance,
        isCorrectNetwork,
        switchChainId,
        userTokenBalance,
        userDetails,
      }}
    >
      <App />
    </BrainGameContext.Provider>
  );

  // Click on start button
  const startButton = screen.getByTestId("start-button");
  expect(startButton).toBeInTheDocument();
  fireEvent(
    startButton,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  const connectWalletPrompt = screen.queryByTestId("connect-wallet-prompt");
  const connectWalletButton = screen.queryByTestId("connect-wallet-button");
  expect(connectWalletButton).toBeNull();
  expect(connectWalletPrompt).toBeNull();
  const connectRinkebyPrompt = screen.queryByTestId("connect-rinkeby-prompt");
  const connectRinkebyButton = screen.queryByTestId("connect-rinkeby-button");
  expect(connectRinkebyButton).not.toBeNull();
  expect(connectRinkebyPrompt).not.toBeNull();
});

test("Render App - connecting page -  etherum detected , wallet connected same network, should show Game Widget", async () => {
  const gameReset = jest.fn();
  const transferToken = jest.fn();
  const createGameHistoryEntry = jest.fn();
  const connectMetaMask = jest.fn();
  const switchChainId = jest.fn();
  const contractInstance = { something: "true" };
  const isCorrectNetwork = true;
  const userDetails = {
    canPlay: true,
  };
  const userTokenBalance = 0;

  render(
    <BrainGameContext.Provider
      value={{
        currentAccount: "123456789246578asddfas",
        transferToken,
        gameReset,
        createGameHistoryEntry,
        warning: null,
        hasMetaMask: true,
        connectMetaMask,
        contractInstance,
        isCorrectNetwork,
        switchChainId,
        userTokenBalance,
        userDetails,
      }}
    >
      <App />
    </BrainGameContext.Provider>
  );

  // Click on start button
  const startButton = screen.getByTestId("start-button");
  expect(startButton).toBeInTheDocument();
  fireEvent(
    startButton,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  const connectWalletPrompt = screen.queryByTestId("connect-wallet-prompt");
  const connectWalletButton = screen.queryByTestId("connect-wallet-button");
  expect(connectWalletButton).toBeNull();
  expect(connectWalletPrompt).toBeNull();
  const connectRinkebyPrompt = screen.queryByTestId("connect-rinkeby-prompt");
  const connectRinkebyButton = screen.queryByTestId("connect-rinkeby-button");
  expect(connectRinkebyButton).toBeNull();
  expect(connectRinkebyPrompt).toBeNull();
  const gameWidgetHeading = screen.queryByTestId("game-heading");
  expect(gameWidgetHeading).toBeInTheDocument();
  const cooldownMessage = screen.queryByTestId("cooldown-text-div");
  expect(cooldownMessage).toBeNull();
});

test("Render App - connecting page -  etherum detected , wallet connected same network, user cooldown period is less than 24 hours, should show cool down message", async () => {
  const gameReset = jest.fn();
  const transferToken = jest.fn();
  const createGameHistoryEntry = jest.fn();
  const connectMetaMask = jest.fn();
  const switchChainId = jest.fn();
  const contractInstance = { something: "true" };
  const isCorrectNetwork = true;
  const userDetails = {
    canPlay: false,
  };
  const userTokenBalance = 0;

  render(
    <BrainGameContext.Provider
      value={{
        currentAccount: "123456789246578asddfas",
        transferToken,
        gameReset,
        createGameHistoryEntry,
        warning: null,
        hasMetaMask: true,
        connectMetaMask,
        contractInstance,
        isCorrectNetwork,
        switchChainId,
        userTokenBalance,
        userDetails,
      }}
    >
      <App />
    </BrainGameContext.Provider>
  );

  // Click on start button
  const startButton = screen.getByTestId("start-button");
  expect(startButton).toBeInTheDocument();
  fireEvent(
    startButton,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  const connectWalletPrompt = screen.queryByTestId("connect-wallet-prompt");
  const connectWalletButton = screen.queryByTestId("connect-wallet-button");
  expect(connectWalletButton).toBeNull();
  expect(connectWalletPrompt).toBeNull();
  const connectRinkebyPrompt = screen.queryByTestId("connect-rinkeby-prompt");
  const connectRinkebyButton = screen.queryByTestId("connect-rinkeby-button");
  expect(connectRinkebyButton).toBeNull();
  expect(connectRinkebyPrompt).toBeNull();
  const gameWidgetHeading = screen.queryByTestId("game-heading");
  expect(gameWidgetHeading).toBeNull();
  const cooldownMessage = screen.queryByTestId("cooldown-text-div");
  expect(cooldownMessage).toBeInTheDocument();
});
