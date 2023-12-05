// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NFTropolis
 * @dev A smart contract for minting and managing NFTs.
 */

contract NFTropolis is ERC721Enumerable, Ownable {
  using Strings for uint256;

  event NFTMinted(address _minter, uint256 tokenId);

  // Base URI for metadata
  string private _baseTokenURI;

  // Starting token ID
  uint256 private _tokenIdCounter;

  uint256 private constant mintingCost = 1 ether;

/**
     * @dev Constructor to initialize the NFTropolis contract.
     * @param name The name of the NFT token.
     * @param symbol The symbol of the NFT token.
     * @param baseTokenURI The base URI for token metadata.
     */
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

 /**
     * @dev Override for the base URI of the tokens.
     * @return The base URI for token metadata.
     */
  // Override base URI
  function _baseURI() internal view override returns (string memory) {
    return _baseTokenURI;
  }

/**
     * @dev Mints a new NFT.
     */
  function mintNFT() external payable {
    require(msg.sender != address(0), "Invalid_Recipient");
    // require(IERC721(address(this)).isApprovedForAll(to, msg.sender), "Not approved to mint NFT");
    if (msg.sender != owner()) {
      require(msg.value >= mintingCost, "Insufficient_Funds");
    }
    _tokenIdCounter++;
    uint256 tokenId = _tokenIdCounter;
    _safeMint(msg.sender, tokenId);
    emit NFTMinted(msg.sender, tokenId);
  }

 /**
     * @dev Sets the base URI for token metadata.
     * @param newBaseTokenURI The new base URI to be set.
     */
  // Update base URI
  function setBaseURI(string memory newBaseTokenURI) external onlyOwner {
    _baseTokenURI = newBaseTokenURI;
  }

/**
     * @dev Concatenates the token URI with the base URI.
     * @param tokenId The ID of the token.
     * @return The concatenated token URI.
     */
  // Safe URI concatenation
  function concatTokenURI(
    uint256 tokenId
  ) external view returns (string memory) {
    return string(abi.encodePacked(_baseTokenURI, tokenId.toString()));
  }

 /**
     * @dev Retrieves the count of minted tokens.
     * @return The count of minted tokens.
     */
  function getMintedTokenCount() external view onlyOwner returns (uint256) {
    return _tokenIdCounter;
  }
}
