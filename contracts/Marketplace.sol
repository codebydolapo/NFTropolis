// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title Marketplace
 * @dev A smart contract for listing, buying, and managing NFTs in a marketplace.
 */

contract Marketplace {
  struct Listing {
    uint256 price;
    address seller;
  }

  mapping(address => mapping(uint256 => Listing)) private listings;

  mapping(address => uint256) public proceeds;

  event ItemListed(
    address indexed seller,
    address indexed nftAddress,
    uint256 indexed tokenId,
    uint256 price
  );

  event Relisted(
    address indexed seller,
    address indexed nftAddress,
    uint256 indexed tokenId,
    uint256 price
  );

  event ItemBought(
    address indexed buyer,
    address indexed _nftAddress,
    uint256 indexed _tokenId,
    uint256 _price
  );

  event ListingCancelled(address indexed _nftAddress, uint256 indexed _tokenId);

  /**
   * @dev Modifier that checks whether an NFT is already listed.
   */
  modifier Already_Listed(address _nftAddress, uint256 _tokenId) {
    Listing memory listing = listings[_nftAddress][_tokenId];
    require(listing.price == 0, "Already_Listed");
    _;
  }

  /**
   * @dev Modifier that checks whether the caller is the owner of an NFT.
   */
  modifier isOwner(
    address _nftAddress,
    uint256 _tokenId,
    address spender
  ) {
    IERC721 nft = IERC721(_nftAddress);
    address owner = nft.ownerOf(_tokenId);
    require(owner == spender, "Caller_Isnt_Owner");
    _;
  }

  /**
   * @dev Modifier that checks whether an NFT is listed.
   */
  modifier Is_Listed(address _nftAddress, uint256 _tokenId) {
    // IERC721 nft = IERC721(_nftAddress);
    Listing memory listing = listings[_nftAddress][_tokenId];
    require(listing.price > 0, "Not_Listed");
    _;
  }

  /**
   * @dev Constructor to initialize the Marketplace contract.
   */
  constructor() {}

  /**
   * @dev Lists an NFT for sale in the marketplace.
   */
  function listItem(
    address _nftAddress,
    uint256 _tokenId,
    uint256 _price
  )
    external
    Already_Listed(_nftAddress, _tokenId)
    isOwner(_nftAddress, _tokenId, msg.sender)
  {
    require(_price > 0, "Listing_Price_Too_Low");

    IERC721 nft = IERC721(_nftAddress);

    require(
      nft.getApproved(_tokenId) != address(this),
      "Marketplace is not approved for selling NFT"
    );

    listings[_nftAddress][_tokenId] = Listing(_price, msg.sender);
    emit ItemListed(msg.sender, _nftAddress, _tokenId, _price);
  }

  /**
   * @dev Buys an NFT listed in the marketplace.
   */
  function buyItem(
    address _nftAddress,
    uint256 _tokenId
  )
    external
    payable
    Is_Listed(_nftAddress, _tokenId)
  // isOwner(_nftAddress, _tokenId, msg.sender)
  {
    Listing memory listing = listings[_nftAddress][_tokenId];
    require(msg.value >= listing.price, "Insufficient_Funds");

    proceeds[listing.seller] += msg.value;
    delete listing;
    address seller = IERC721(_nftAddress).ownerOf(_tokenId);
    IERC721(_nftAddress).transferFrom(seller, msg.sender, _tokenId);

    emit ItemBought(msg.sender, _nftAddress, _tokenId, listing.price);
  }

  /**
   * @dev Cancels a listing in the marketplace.
   */
  function cancelListing(
    address _nftAddress,
    uint256 _tokenId
  )
    external
    Is_Listed(_nftAddress, _tokenId)
    isOwner(_nftAddress, _tokenId, msg.sender)
  {
    delete (listings[_nftAddress][_tokenId]);
    emit ListingCancelled(_nftAddress, _tokenId);
  }

  /**
   * @dev Updates the price of a listed NFT.
   */
  function updateListing(
    address _nftAddress,
    uint256 _tokenId,
    uint256 _newPrice
  )
    external
    Is_Listed(_nftAddress, _tokenId)
    isOwner(_nftAddress, _tokenId, msg.sender)
  {
    listings[_nftAddress][_tokenId].price = _newPrice;
    emit Relisted(msg.sender, _nftAddress, _tokenId, _newPrice);
  }

  /**
   * @dev Withdraws proceeds earned by a seller.
   */
  function withdrawProceeds() external {
    uint256 _proceeds = proceeds[msg.sender];
    require(_proceeds > 0, "NoProceeds");
    _proceeds = 0;
    (bool success, ) = payable(msg.sender).call{ value: _proceeds }("");
    require(success, "Withdrawal unsuccessful");
  }

  /**
   * @dev Retrieves the listing information of an NFT.
   * @param _nftAddress address of the nft collection
   * @param _tokenId token id of the specific NFT
   */
  function getListing(
    address _nftAddress,
    uint256 _tokenId
  ) external view returns (Listing memory) {
    return listings[_nftAddress][_tokenId];
  }

  /**
   * @dev Retrieves the proceeds earned by the caller.
   */
  function getProceeds() external view returns (uint256) {
    return proceeds[msg.sender];
  }

  /**
   * @dev Retrieves the seller of a listed NFT.
   * @param _nftAddress address of the nft collection
   * @param _tokenId token id of the specific NFT
   */
  function getSeller(
    address _nftAddress,
    uint256 _tokenId
  ) public view returns (address) {
    Listing memory listing = listings[_nftAddress][_tokenId];
    return listing.seller;
  }
}
