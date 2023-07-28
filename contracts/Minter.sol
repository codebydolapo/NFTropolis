// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Minter is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public tokenCount;

    mapping (address => uint256) public ownerToIndex;
    mapping (uint256 => string) public tokenURIs;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mintNFT(address recipient, string memory _tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(recipient, newTokenId);
        ownerToIndex[recipient] = newTokenId;
       tokenURIs[newTokenId] = _tokenURI; // Set the token URI to an empty string by default.
       tokenCount = newTokenId;
        return newTokenId;
    }

    // function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
    //     // require(_isOwner(msg.sender, tokenId), "NFTContract: Caller is not the token owner");
    //     tokenURIs[tokenId] = _tokenURI;
    // }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURIs[tokenId];
    }

    function getIndex(address owner) public view returns(uint256){
        return ownerToIndex[owner];
    }
}