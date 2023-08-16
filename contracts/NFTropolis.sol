// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTropolis is ERC721Enumerable, Ownable {
  using Strings for uint256;

  event NFTMinted(address _minter, uint256 tokenId);

  // Base URI for metadata
  string private _baseTokenURI;

  // Starting token ID
  uint256 private _tokenIdCounter;

  uint256 private constant mintingCost = 1 ether;

  constructor(
    string memory name,
    string memory symbol,
    string memory baseTokenURI
    // address marketplace
  ) ERC721(name, symbol) {
    _baseTokenURI = baseTokenURI;
    _tokenIdCounter = 0;
    // setApprovalForAll(marketplace, true);
  }

  // Override base URI
  function _baseURI() internal view override returns (string memory) {
    return _baseTokenURI;
  }

  // Mint new NFT
  // function mintNFT(address to) external payable {
  //   _tokenIdCounter++;
  //   if (msg.sender != owner()) {
  //     require(msg.value >= mintingCost, "insufficient funds");
  //   }
  //   uint256 tokenId = _tokenIdCounter;
  //   _safeMint(to, tokenId);
  //   emit NFTMinted(msg.sender, tokenId);
  // }

  function mintNFT(address to) external payable {
    require(to != address(0), "Invalid recipient address");
    // require(IERC721(address(this)).isApprovedForAll(to, msg.sender), "Not approved to mint NFT");
    if (msg.sender != owner()) {
      require(msg.value >= mintingCost, "insufficient funds");
    }
    _tokenIdCounter++;
    uint256 tokenId = _tokenIdCounter;
    _safeMint(to, tokenId);
    emit NFTMinted(msg.sender, tokenId);
  }

  // Update base URI
  function setBaseURI(string memory newBaseTokenURI) external onlyOwner {
    _baseTokenURI = newBaseTokenURI;
  }

  // Safe URI concatenation
  function concatTokenURI(
    uint256 tokenId
  ) external view returns (string memory) {
    return string(abi.encodePacked(_baseTokenURI, tokenId.toString()));
  }

  function getMintedTokenCount() external view onlyOwner returns (uint256) {
    return _tokenIdCounter;
  }
}
