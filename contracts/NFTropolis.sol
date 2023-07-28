// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTropolis is IERC721Receiver, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _offerIds;

    struct Offer {
        uint256 offerId;
        uint256 tokenId;
        address payable seller;
        uint256 price;
        bool active;
    }

    mapping(uint256 => Offer) private _offers;
    mapping(address => mapping(uint256 => uint256)) private _sellerToTokenOffers;

    IERC721 private _nftContract;

    event OfferCreated(
        uint256 offerId,
        uint256 tokenId,
        address seller,
        uint256 price
    );

    event OfferCancelled(uint256 offerId);

    event NFTBought(uint256 offerId, uint256 tokenId, address buyer);

    constructor(address nftContractAddress) {
        require(
            nftContractAddress != address(0),
            "NFTMarketplace: Invalid NFT contract address"
        );
        _nftContract = IERC721(nftContractAddress);
    }

    function createOffer(uint256 tokenId, uint256 price) external {
        require(
            _nftContract.ownerOf(tokenId) == msg.sender,
            "NFTMarketplace: Sender is not the owner of the token"
        );
        require(price > 0, "NFTMarketplace: Price must be greater than zero");

        _offerIds.increment();
        uint256 offerId = _offerIds.current();
        _offers[offerId] = Offer({
            offerId: offerId,
            tokenId: tokenId,
            seller: payable(msg.sender),
            price: price,
            active: true
        });
        _sellerToTokenOffers[msg.sender][tokenId] = offerId;

        emit OfferCreated(offerId, tokenId, msg.sender, price);
    }

    function cancelOffer(uint256 offerId) external {
        Offer storage offer = _offers[offerId];
        require(
            offer.active,
            "NFTMarketplace: Offer does not exist or not active"
        );
        require(
            offer.seller == msg.sender,
            "NFTMarketplace: Only the seller can cancel the offer"
        );

        delete _sellerToTokenOffers[offer.seller][offer.tokenId];
        delete _offers[offerId];

        emit OfferCancelled(offerId);
    }

    function buyNFT(uint256 offerId) external payable {
        Offer storage offer = _offers[offerId];
        require(
            offer.active,
            "NFTMarketplace: Offer does not exist or not active"
        );
        require(
            msg.value == offer.price,
            "NFTMarketplace: Incorrect payment amount"
        );

        _nftContract.safeTransferFrom(
            offer.seller,
            msg.sender,
            offer.tokenId
        );

        delete _sellerToTokenOffers[offer.seller][offer.tokenId];
        delete _offers[offerId];

        emit NFTBought(offerId, offer.tokenId, msg.sender);
    }

    function getOffer(uint256 offerId)
        external
        view
        returns (
            uint256,
            uint256,
            address,
            uint256,
            bool
        )
    {
        Offer storage offer = _offers[offerId];
        return (
            offer.offerId,
            offer.tokenId,
            offer.seller,
            offer.price,
            offer.active
        );
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
