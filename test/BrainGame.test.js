const BrainGame = artifacts.require("BrainGame");
const BrainToken = artifacts.require("BrainTokenV3");
const web3 = require("web3");

contract("Brain Game", (accounts) => {
  describe("deploy", () => {
    it("Deploy Successfully", async () => {
      const brainToken = await BrainToken.deployed();
      const brainTokenAddress = brainToken.address;
      expect(brainTokenAddress).not.equal(null);
      const brainGame = await BrainGame.deployed(brainTokenAddress);
      expect(brainGame.address).not.equal(null);
    });
  });

  describe("Brain Token Functions", () => {
    it("transfer", async () => {
      const brainToken = await BrainToken.deployed();
      const brainTokenAddress = brainToken.address;
      expect(brainTokenAddress).not.equal(null);
      const brainGame = await BrainGame.deployed(brainTokenAddress);
      expect(brainGame.address).not.equal(null);
      const player1 = accounts[1];

      let brainGameBalance = await brainToken.balanceOf(brainGame.address);
      brainGameBalance = web3.utils.fromWei(brainGameBalance, "ether");
      expect(brainGameBalance).equal("1000000");

      await brainGame.claimReward(10, { from: player1 });
      let playerBalance = await brainToken.balanceOf(player1);
      playerBalance = web3.utils.fromWei(playerBalance, "ether");
      expect(playerBalance).equal("10");
      let brainGameUpdatedBalance = await brainToken.balanceOf(
        brainGame.address
      );
      brainGameUpdatedBalance = web3.utils.fromWei(
        brainGameUpdatedBalance,
        "ether"
      );
      expect(brainGameUpdatedBalance).equal("999990");
    });
  });
});
