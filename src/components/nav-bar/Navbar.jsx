import "./navbar.css";

import BrainIcon from "../brain-icon";

import Identicon from "identicon.js";

const NavBar = ({
  currentAccount,
  connectMetaMask,
  userTokenBalance,
  transferToken,
}) => {
  return (
    <nav className="navbar" data-testid="nav-bar">
      <div className="container navbar__container">
        <div className="navbar__logo">
          <BrainIcon color="#f2aeb1" /> <span>Brain Game</span>
        </div>
        <div className="navbar__user">
          {currentAccount ? (
            <>
              <div
                className="navbar__user__dropdown"
                data-testid="nav-bar-user"
              >
                <img
                  className="ml-2"
                  width="30"
                  height="30"
                  src={`data:image/png;base64, ${new Identicon(
                    currentAccount,
                    30
                  ).toString()}`}
                  alt=""
                />{" "}
                <span>
                  {currentAccount.slice(0, 5) +
                    "..." +
                    currentAccount.slice(
                      currentAccount.length - 5,
                      currentAccount.length
                    )}
                </span>
                <span className="divider-white">|</span>
                <span>
                  Brain coin balance:{" "}
                  <strong data-testid="user-token-balance">
                    {userTokenBalance}
                  </strong>
                </span>
                {process.env.NODE_ENV === "development" && (
                  <button onClick={() => transferToken(1)}>Get Token</button>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={connectMetaMask}
              data-testid="nav-bar-connect-wallet-btn"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
