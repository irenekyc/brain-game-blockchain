import "./App.css";
import { useState, useContext } from "react";
import { CONTENT_ABOUT, CONTENT_GAME } from "./constants";
import { BrainGameContext } from "./context/BrainGameContext";

import GameWidget from "./widgets/game";
import Cooldown from "./components/cool-down";
import Layout from "./components/layout";
import NavBar from "./components/nav-bar";
import Footer from "./components/footer";

function App() {
  const [content, setContent] = useState(CONTENT_ABOUT);
  const {
    warning,
    hasMetaMask,
    currentAccount,
    connectMetaMask,
    contractInstance,
    isCorrectNetwork,
    switchChainId,
    userDetails,
    userTokenBalance,
    transferToken,
  } = useContext(BrainGameContext);

  return (
    <Layout>
      <NavBar
        currentAccount={currentAccount}
        connectMetaMask={connectMetaMask}
        userTokenBalance={userTokenBalance}
        transferToken={transferToken}
      />
      <main className="container body__container">
        {content === CONTENT_ABOUT ? (
          <>
            <h1>Welcome to Brain Game</h1>
            <h2>About Brain Game</h2>
            <p>
              Brain Game is a blockchain game, built with solidity, react js and
              web3 developed by Irene K.
            </p>
            <p>You can earn Brain Token by beating the game.</p>
            <h2>Instructions</h2>
            <ul>
              <li>
                <p>
                  To play Brain Game, you have to connect your MetaMask Wallet.
                </p>
              </li>
              <li>
                <p>
                  Brain Game is built on Rinkeby Testnet, please ensure you have
                  connected to the right network
                </p>
              </li>
              <li>
                <p>
                  After each game, you will receive a certain amount of brain
                  token.
                </p>
              </li>
              <li>
                <p>
                  To receive brain token, you need to pay gas fee. If you do not
                  have Etherium in your wallet, consider going to this fauet to
                  get some.
                </p>
              </li>
            </ul>
            <button onClick={() => setContent(CONTENT_GAME)}>Start Now!</button>
          </>
        ) : (
          <>
            {warning && <p>{warning}</p>}
            {hasMetaMask && currentAccount === undefined && (
              <>
                <p>You have connect wallet to start playing</p>
                <button onClick={connectMetaMask}>Connect Wallet</button>
              </>
            )}
            {currentAccount !== undefined &&
              !contractInstance &&
              !isCorrectNetwork && (
                <>
                  <p>
                    {
                      "Brain game use Rinkeby Test Network, please switch to Rinkeby Testnet"
                    }
                  </p>
                  <button onClick={switchChainId}>Switch to Rinkeby</button>
                </>
              )}
            {currentAccount !== undefined &&
              userDetails &&
              !userDetails.canPlay && (
                <Cooldown cooldown={userDetails.cooldown} />
              )}
            {currentAccount !== undefined &&
              contractInstance &&
              userDetails &&
              userDetails.canPlay && (
                /* {userTokenBalance && <p>Your balance: {userTokenBalance}</p>} */
                <GameWidget stopGame={() => setContent(CONTENT_ABOUT)} />
              )}
          </>
        )}
      </main>
      <Footer />
    </Layout>
  );
}

export default App;
