// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "./Minter.sol";

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;

    Minter public minter;
    mapping(uint256 => marketItem) public idToMarketItem;
    mapping(address => uint256) public listRecords;
    mapping(address => mapping(uint256 => bool)) public hasPurchased;

    uint256 public totalEarnings;
    address payable public owner;
    uint256 public listingFee = 1000000000000000; // 0.001 MATIC represented in wei
    uint256 public collectedListingFees;

    struct marketItem {
        uint256 tokenId;
        address payable seller;
        uint256 price;
        bool sold;
    }

    event Pay(address _to, address _from, uint256 _amount);

    constructor(Minter _minterAddress, address payable _owner) {
        minter = _minterAddress;
        owner = _owner;
        collectedListingFees = 0;
    }

    /**
     * @dev Mint an NFT and return its token ID.
     * 
     * @param _tokenURI is the URI of the token to be minted
     * 
     * calls the mint function on the minter contract, retrieves the token ID and returns it
     * 
     */
    function mintNFT(string memory _tokenURI) public returns (uint256) {
        uint256 tokenId = minter.mint(_tokenURI, msg.sender);
        return tokenId;
    }

    /**
     * @dev List an NFT for sale in the marketplace.
     * Only the owner of the NFT can list it.
     * 
     * @param price The listing price for the NFT.
     * @param tokenId The token ID of the NFT to be listed.
     */
    function listNFT(uint256 price, uint256 tokenId) public payable nonReentrant {
        require(price > 0, "Price should be greater than zero");
        require(msg.value >= listingFee, "Insufficient listing fee");

        address tokenOwner = minter.checkOwner(tokenId);
        require(
            tokenOwner == msg.sender,
            "Sender is not the owner of the token"
        );

        // Check if the NFT is already listed
        require(listRecords[msg.sender] != tokenId, "NFT already listed");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = marketItem(
            tokenId,
            payable(msg.sender),
            price,
            false
        );

        IERC721(minter).transferFrom(msg.sender, address(this), tokenId);
        listRecords[msg.sender] = tokenId; // Record the NFT listing
    }

    /**
     * @dev Delist an NFT from the marketplace.
     * Only the owner of the NFT can delist it, and it must not have been sold.
     * 
     * @param _tokenId The token ID of the NFT to be delisted.
     */
    function delist(uint256 _tokenId) public {
        address tokenOwner = minter.checkOwner(_tokenId);
        require(
            tokenOwner == msg.sender,
            "Sender is not the owner of the token"
        );

        marketItem storage item = idToMarketItem[_tokenId];

        require(!item.sold, "Cannot delist a sold NFT");

        IERC721(minter).transferFrom(address(this), msg.sender, _tokenId);
        delete idToMarketItem[_tokenId];
        delete listRecords[msg.sender]; // Remove the NFT listing record
    }

    /**
     * @dev Buy an NFT from the marketplace.
     * The buyer must not have already purchased the NFT.
     * The payment amount must match the NFT price.
     * 
     * @param sender The address of the current NFT owner.
     * @param recipient The address of the buyer.
     * @param tokenId The token ID of the NFT to be bought.
     */
    function buyNFT(
        address sender,
        address recipient,
        uint256 tokenId
    ) public payable nonReentrant {
        require(!hasPurchased[msg.sender][tokenId], "Already bought this NFT");

        marketItem storage item = idToMarketItem[tokenId];
        require(item.seller == sender, "Invalid seller");
        require(item.price == msg.value, "Incorrect payment amount");

        minter.sendNFT(sender, recipient, tokenId);

        listRecords[recipient] = tokenId;
        hasPurchased[msg.sender][tokenId] = true;

        emit Pay(item.seller, msg.sender, msg.value);
        totalEarnings += msg.value;

        (bool sent, ) = item.seller.call{value: msg.value}("");
        require(sent, "Payment transfer failed");

        item.sold = true;
        delist(tokenId); // Delist the NFT upon purchase
    }

    /**
     * @dev Get the total supply of NFTs in the marketplace.
     * 
     * @return The total supply of NFTs.
     */
    function getTotalSupply() public view returns (uint256) {
        return minter.totalSupply();
    }

    /**
     * @dev Get the token URL of an NFT by its token ID.
     * 
     * @param _tokenId The token ID of the NFT.
     * @return The token URL.
     */
    function getTokenURL(uint256 _tokenId) public view returns (string memory) {
        return minter.tokenURL(_tokenId);
    }

    /**
     * @dev Get the balance of an address (owner) in the marketplace.
     * 
     * @param _owner The address (owner) to check the balance of.
     * @return The balance of the address in the marketplace.
     */
    function getBalance(address _owner) public view returns (uint256) {
        return minter.getBalance(_owner);
    }

    /**
     * @dev Get an array of all the current market items listed.
     * 
     * @return An array of market item IDs.
     */
    function getAllMarketItems() public view returns (uint256[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256[] memory items = new uint256[](itemCount);

        for (uint256 i = 1; i <= itemCount; i++) {
            items[i - 1] = i;
        }

        return items;
    }
}
