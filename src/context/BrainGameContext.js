import { createContext, useEffect, useState } from "react";
import Web3 from "web3";
import Contract from "../contracts/BrainGame.json";
import {
  TRANSFER_PROGRESS_PENDING,
  TRANSFER_PROGRESS_NULL,
} from "../constants";

export const BrainGameContext = createContext();
export const BrainGameContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(undefined);
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [contractInstance, setContractInstance] = useState(undefined);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(undefined);
  const [web3Instance, setWeb3Instance] = useState(undefined);
  const [userTokenBalance, setUserTokenBalance] = useState(0);
  const [warning, setWarning] = useState(null);
  const [transferSucceed, setTransferSucceed] = useState(false);
  const [transferProgress, setTransferProgress] = useState(
    TRANSFER_PROGRESS_NULL
  );

  // check and load contractInstance
  const loadContract = async () => {
    const web3 = new Web3(window.web3.currentProvider);
    window.web3 = web3;
    setWeb3Instance(web3);
    const networkId = await web3.eth.net.getId();

    const contractData = Contract.networks[networkId];

    if (contractData) {
      const address = contractData.address;
      // https://web3js.readthedocs.io/en/v1.7.0/web3-eth-contract.html#eth-contract
      const contract = new web3.eth.Contract(Contract.abi, address);
      setContractInstance(contract);
      setIsCorrectNetwork(networkId !== address);
    }
  };

  useEffect(() => {
    // check if browser has etherum
    if (typeof window.ethereum !== "undefined") {
      setHasMetaMask(true);
      loadContract();
    } else {
      setWarning(
        "MetaMask is not installed. Please install MetaMask to proceed"
      );
      setHasMetaMask(false);
    }
  }, []);

  useEffect(() => {
    const loadBalance = async () => {
      if (contractInstance && currentAccount) {
        let tokenBalance = await contractInstance.methods
          .getBalanceOf(currentAccount)
          .call();
        tokenBalance = Web3.utils.fromWei(tokenBalance, "ether");
        setUserTokenBalance(tokenBalance);
      }
    };
    if (!contractInstance || !currentAccount || !web3Instance) return;
    loadBalance();
  }, [contractInstance, currentAccount, web3Instance]);

  // check and prompt correct network
  const switchChainId = async () => {
    window.ethereum
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }],
        // rinkeby test network
      })
      .then(() => loadContract())
      .catch((error) => console.log(error));
  };

  const transferToken = async (tokenAmount) => {
    if (contractInstance && currentAccount) {
      contractInstance.methods
        .claimReward(tokenAmount)
        .send({
          from: currentAccount,
        })
        .on("transactionHash", () =>
          setTransferProgress(TRANSFER_PROGRESS_PENDING)
        )
        .then(() => {
          reloadBalance();
          setTransferProgress(TRANSFER_PROGRESS_NULL);
        })
        .catch(() => setTransferProgress(TRANSFER_PROGRESS_NULL));
    }
  };

  const connectMetaMask = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);
  };

  const reloadBalance = async () => {
    if (contractInstance && currentAccount) {
      let tokenBalance = await contractInstance.methods
        .getBalanceOf(currentAccount)
        .call();
      tokenBalance = Web3.utils.fromWei(tokenBalance, "ether");
      setUserTokenBalance(tokenBalance);
    }
  };

  const gameReset = async () => {
    setTransferSucceed(undefined);
  };

  return (
    <BrainGameContext.Provider
      value={{
        currentAccount,
        hasMetaMask,
        contractInstance,
        switchChainId,
        transferToken,
        connectMetaMask,
        userTokenBalance,
        isCorrectNetwork,
        warning,
        transferSucceed,
        gameReset,
        transferProgress,
      }}
    >
      {children}
    </BrainGameContext.Provider>
  );
};
