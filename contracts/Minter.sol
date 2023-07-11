//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Minter is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address marketplace;

    constructor(address _marketplaceAddress) ERC721("Enefti", "ENF") {
        marketplace = _marketplaceAddress;
    }

    function mint(
        string memory tokenURI,
        address recipient
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // setApprovalForAll(marketplace, true);

        return newItemId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function tokenURL(uint256 _tokenId) public view returns (string memory) {
        string memory tokenLink = tokenURI(_tokenId);
        return tokenLink;
    }

    function acceptNFTs(
        address sender,
        address recipient,
        uint256 tokenId
    ) public {
        transferFrom(sender, recipient, tokenId);
    }

    function sendNFT(
        address sender,
        address recipient,
        uint256 tokenId
    ) public {
        _transfer(sender, recipient, tokenId);
    }

    function getBalance(address _owner) public view returns (uint256) {
        uint256 balance = balanceOf(_owner);
        return balance;
    }

    function checkOwner(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), "Token does not exist");
        return ownerOf(tokenId);
    }
}
