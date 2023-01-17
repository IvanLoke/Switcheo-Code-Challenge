// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
pragma solidity >=0.4.22 <0.9.0;

contract BalanceContract {
    struct TokenInfo {
        address tokenaddress;
        uint256 balance;
    }

    function getBalances(address walletAddress, address[] memory tokenAddresses)
        public
        view
        returns (TokenInfo[] memory)
    {
        TokenInfo[] memory tokenAmounts;
        for (uint256 i = 0; i < tokenAddresses.length; i++) {
            IERC20 token = IERC20(tokenAddresses[i]);
            uint256 balance = token.balanceOf(walletAddress);
            TokenInfo memory _tokenAmount = TokenInfo(
                tokenAddresses[i],
                balance
            );
            tokenAmounts[i] = _tokenAmount;
        }
        return tokenAmounts;
    }
}
