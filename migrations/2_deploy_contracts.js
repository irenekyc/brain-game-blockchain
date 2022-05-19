const BrainTokenV3 = artifacts.require("BrainTokenV3");
const BrainGame = artifacts.require("BrainGame");

module.exports = async function (deployer) {
  // Deploy Token
  await deployer.deploy(BrainTokenV3);
  const token = await BrainTokenV3.deployed();

  // Deploy Brain Game
  await deployer.deploy(BrainGame, token.address);
  const brainGame = await BrainGame.deployed();

  // Transfer all token to BrainGame
  await token.transfer(brainGame.address, "1000000000000000000000000");
};
