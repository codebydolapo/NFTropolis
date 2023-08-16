// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

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

  modifier Already_Listed(
    address _nftAddress,
    uint256 _tokenId
  ) {
    Listing memory listing = listings[_nftAddress][_tokenId];
    require(listing.price == 0, "NFT Already Listed");
    _;
  }

  modifier isOwner(
    address _nftAddress,
    uint256 _tokenId,
    address spender
  ) {
    IERC721 nft = IERC721(_nftAddress);
    address owner = nft.ownerOf(_tokenId);
    require(owner == spender, "msg.sender is not the owner");
    _;
  }

  modifier Is_Listed(address _nftAddress, uint256 _tokenId) {
    // IERC721 nft = IERC721(_nftAddress);
    Listing memory listing = listings[_nftAddress][_tokenId];
    require(listing.price > 0, "nft is not listed");
    _;
  }

  constructor() {}

  function listItem(
    address _nftAddress,
    uint256 _tokenId,
    uint256 _price
  )
    external
    Already_Listed(_nftAddress, _tokenId)
    isOwner(_nftAddress, _tokenId, msg.sender)
  {
    require(_price > 0, "Price should be greater than zero");

    IERC721 nft = IERC721(_nftAddress);

    require(
      nft.getApproved(_tokenId) != address(this),
      "Marketplace is not approved for selling NFT"
    );

    listings[_nftAddress][_tokenId] = Listing(_price, msg.sender);
    emit ItemListed(msg.sender, _nftAddress, _tokenId, _price);
  }

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
    require(msg.value >= listing.price, "insufficient funds");

    proceeds[listing.seller] += msg.value;
    delete listing;
    address seller = IERC721(_nftAddress).ownerOf(_tokenId);
    IERC721(_nftAddress).transferFrom(seller, msg.sender, _tokenId);

    emit ItemBought(msg.sender, _nftAddress, _tokenId, listing.price);
  }

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

  function withdrawProceeds() external {
    uint256 _proceeds = proceeds[msg.sender];
    require(_proceeds > 0, "NoProceeds");
    _proceeds = 0;
    (bool success, ) = payable(msg.sender).call{ value: _proceeds }("");
    require(success, "Withdrawal unsuccessful");
  }

  function getListing(address _nftAddress, uint256 _tokenId) external view returns( Listing memory) {
    return listings[_nftAddress][_tokenId];
  }

  function getProceeds() external view returns (uint256){
    return proceeds[msg.sender];
  }

  function getSeller(address _nftAddress, uint256 _tokenId) public view returns (address){
    Listing memory listing = listings[_nftAddress][_tokenId];
    return listing.seller;
  }
}
