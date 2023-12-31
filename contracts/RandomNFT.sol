// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// error RandomNFT__RangeOutOfBounds;

/**
 * @title RandomNFT
 * @dev A smart contract that mints ERC721 NFTs based on random number generation.
 */

contract RandomNFT is VRFConsumerBaseV2, ERC721URIStorage, Ownable {
  enum Breed {
    PUG,
    SHIBA_INU,
    ST_BERNARD
  }

  uint256 tokenIds;

  VRFCoordinatorV2Interface private immutable vrfCoordinatorV2;
  uint64 private immutable subscriptionId;
  bytes32 private immutable gasLane;
  uint32 private immutable callbackGasLimit;
  uint16 private constant REQUEST_CONFIRMATIONS = 3;
  uint32 private constant NUM_WORDS = 1;
  string[] internal tokenURIs;
  uint256 private constant mintingCost = 1 ether;

  mapping(uint256 => address) public requestIdToSender;

  uint256 internal constant MAX_CHANCE_VALUE = 100;

  bool private s_initialized;

  // Events
  event NftRequested(uint256 indexed requestId, address requester);
  event NftMinted(Breed breed, address minter);

  constructor(
    address _vrfCoordinatorV2,
    uint64 _subscriptionId,
    bytes32 _gasLane,
    uint32 _callbackGasLimit,
    string memory _name,
    string memory _symbol,
    string[3] memory dogTokenURIs
  ) VRFConsumerBaseV2(_vrfCoordinatorV2) ERC721(_name, _symbol) {
    vrfCoordinatorV2 = VRFCoordinatorV2Interface(_vrfCoordinatorV2);
    subscriptionId = _subscriptionId;
    gasLane = _gasLane;
    callbackGasLimit = _callbackGasLimit;
    tokenIds = 0;
    // tokenURIs = dogTokenURIs;
    _initializeContract(dogTokenURIs);
  }

  /**
   * @dev Requests a new NFT to be minted based on random number generation.
   * @return requestId The ID of the VRF request.
   */
  function requestNft() public payable returns (uint256 requestId) {
    if (msg.sender != owner()) {
      require(msg.value >= mintingCost, "Insufficient Funds");
    }
    requestId = vrfCoordinatorV2.requestRandomWords(
      gasLane,
      subscriptionId,
      REQUEST_CONFIRMATIONS,
      callbackGasLimit,
      NUM_WORDS
    );

    requestIdToSender[requestId] = msg.sender;
    emit NftRequested(requestId, msg.sender);
  }

  /**
   * @dev Callback function for VRF randomness fulfillment.
   * @param _requestId The ID of the VRF request.
   * @param randomWords Array of random words generated by VRF.
   */
  function fulfillRandomWords(
    uint256 _requestId,
    uint256[] memory randomWords
  ) internal override {
    address nftOwner = requestIdToSender[_requestId];
    tokenIds++;
    uint256 newTokenId = tokenIds;

    //ensures we always get a number between 0 - 100
    uint256 moddedRNG = randomWords[0] % MAX_CHANCE_VALUE;

    Breed dogBreed = getBreedFromModdedRNG(moddedRNG);
    _safeMint(nftOwner, newTokenId);
    _setTokenURI(newTokenId, tokenURIs[uint256(dogBreed)]);
    emit NftMinted(dogBreed, nftOwner);
  }

  /**
   * @dev Retrieves the chance array used for mapping modded RNG values to breeds.
   * @return chanceArray An array containing the chances for each breed.
   */
  function getChanceArray() public pure returns (uint256[3] memory) {
    return [10, 30, MAX_CHANCE_VALUE];
  }

  /**
   * @dev Converts a modded RNG value to a Breed enum based on chances.
   * @param _moddedRNG The modded random number.
   * @return breed The Breed enum value.
   */
  function getBreedFromModdedRNG(
    uint256 _moddedRNG
  ) public pure returns (Breed) {
    uint256 cumulativeSum = 0;
    uint256[3] memory chanceArray = getChanceArray();

    for (uint256 i = 0; i < chanceArray.length; i++) {
      if (
        _moddedRNG <= cumulativeSum &&
        _moddedRNG < cumulativeSum + chanceArray[i]
      ) {
        return Breed(i);
      }

      cumulativeSum += chanceArray[i];
    }

    revert("RangeOutOfBounds");
  }

  function tokenId() public {}

  /**
   * @dev Initializes the contract with dog token URIs.
   * @param dogTokenUris An array of URIs for dog NFTs.
   */
  function _initializeContract(string[3] memory dogTokenUris) private {
    require(!s_initialized, "Already_Initialized");

    tokenURIs = dogTokenUris;
    s_initialized = true;
  }

  /**
   * @dev Allows the contract owner to withdraw the contract's balance.
   */
  function withdraw() public onlyOwner {
    uint256 amount = address(this).balance;
    (bool success, ) = payable(msg.sender).call{ value: amount }("");
    require(success, "Transfer__Failed");
  }

  /**
   * @dev Retrieves the minting fee for the NFTs.
   * @return mintingCost The cost required to mint an NFT.
   */
  function getMintFee() public pure returns (uint256) {
    return mintingCost;
  }

  /**
   * @dev Retrieves the URI of the dog token at the given index.
   * @param index The index of the dog token URI.
   * @return uri The URI of the dog token.
   */
  function getDogTokenUris(uint256 index) public view returns (string memory) {
    return tokenURIs[index];
  }

  /**
   * @dev Checks if the contract has been initialized.
   * @return initialized True if the contract has been initialized, otherwise false.
   */
  function getInitialized() public view returns (bool) {
    return s_initialized;
  }

  /**
   * @dev Retrieves the current token counter.
   * @return count The current number of minted tokens.
   */
  function getTokenCounter() public view returns (uint256) {
    return tokenIds;
  }
}
