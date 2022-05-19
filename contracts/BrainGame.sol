// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BrainGame is Ownable {
    IERC20 public brainTokens;

    constructor(address _brainTokens) {
        brainTokens = IERC20(_brainTokens);
    }

    function claimReward(uint256 _tokenAmount) public{
        brainTokens.transfer(msg.sender, _tokenAmount * 10**18);
    }

    function getBalanceOf(address _inquiredAddress) public view returns(uint256){
        uint256 balance = brainTokens.balanceOf(_inquiredAddress);
        return balance;
    }
}