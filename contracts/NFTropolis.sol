// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTropolis is ERC721Enumerable, Ownable {
  using Strings for uint256;

  string public baseURI;
  // string public baseExtension = ".json";
  uint256 public cost = 0.0001 ether;
  bool public paused = false;
  mapping(address => uint256) public addressMintedBalance;
  uint256[] sold;
  mapping(uint256 => bool) private NFTOwned;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  // public
  function mint(uint256 _mintAmount) public payable {
    require(!paused, "the contract is paused");
    uint256 supply = totalSupply();
    require(_mintAmount > 0, "need to mint at least 1 NFT");
    if (msg.sender != owner()) {
        require(msg.value >= cost * _mintAmount, "insufficient funds");
    }

    for (uint256 i = 1; i <= _mintAmount; i++) {
      addressMintedBalance[msg.sender]++;
      _safeMint(msg.sender, supply + i);
      NFTOwned[supply + i] = false;
    }
  }
  

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );
    
    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        // ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString()))
        : "";
  }
  
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  // function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
  //   baseExtension = _newBaseExtension;
  // }
  
  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
  
  function withdraw() public payable onlyOwner {
    // This will pay me (the owner) the contract balance.
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
  }

  function buyNFT(uint256 _tokenId)public payable{
    require(msg.value >= cost, "Insufficient funds");
    require(!NFTOwned[_tokenId], "Token already sold");

    // Transfer the NFT to the buyer
    // setApprovalForAll(msg.sender, true);
    _transfer(ownerOf(_tokenId), msg.sender, _tokenId);


    // Mark the token as owned
    NFTOwned[_tokenId] = true;
    sold.push(_tokenId);

    // Transfer the funds to the contract owner
    (bool success, ) = payable(owner()).call{value: msg.value}("");
    require(success, "Transfer failed");
  }

  function isOwned(uint256 _tokenId) public view returns (bool){
    return NFTOwned[_tokenId];
  }

}