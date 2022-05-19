//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BrainTokenV3 is ERC20 {
  address private owner;
  uint256 initialSupply = 1000000 *10**18;

  constructor( )ERC20("BrainTokenV3", "BRTV3"){
    _mint(msg.sender, initialSupply);
    owner = msg.sender;
  }

}