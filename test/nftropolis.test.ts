const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTropolis", function () {
  let nfTropolis: any;
  let minter: any;
  let owner;
  let seller: any;
  let buyer: any;
  let tokenId: any;
  const price = ethers.utils.parseEther("0.0001");

  beforeEach(async function () {
    const Minter = await ethers.getContractFactory("Minter");
    minter = await Minter.deploy("MyNFT", "NFT");
    await minter.deployed();

    const NFTropolis = await ethers.getContractFactory("NFTropolis");
    [owner, seller, buyer] = await ethers.getSigners();
    nfTropolis = await NFTropolis.deploy(minter.address);
    await nfTropolis.deployed();

    // Mint an NFT and transfer it to the seller
    await minter.connect(owner).mintNFT(seller.address, "www.exampleToken.com");
    const _tokenId = await minter.getIndex(seller.address)
    tokenId = Number(_tokenId)
    // console.log(tokenId)
    // tokenId = await minter.tokenOfOwnerByIndex(seller.address, 0);
    await minter.connect(seller).approve(nfTropolis.address, 1);
  });

  it("should create a new offer", async function () {
    await nfTropolis.connect(seller).createOffer(tokenId, price);

    const offer = await nfTropolis.getOffer(1);
    // console.log(offer)
    expect(Number(offer[0])).to.equal(1);
    expect(Number(offer[1])).to.equal(tokenId);
    expect(offer[2]).to.equal(seller.address);
    expect(Number(offer[3])).to.equal(price);
    expect(offer[4]).to.be.true;
  });

  it("should buy an NFT from an offer", async function () {
    await nfTropolis.connect(seller).createOffer(tokenId, price);

    await nfTropolis.connect(buyer).buyNFT(1, { value: price });

    const offer = await nfTropolis.getOffer(1);
    expect(offer[4]).to.be.false;

    const ownerOfToken = await minter.ownerOf(tokenId);
    expect(ownerOfToken).to.equal(buyer.address);
  });

  it("should cancel an offer", async function () {
    await nfTropolis.connect(seller).createOffer(tokenId, price);

    await nfTropolis.connect(seller).cancelOffer(1);

    const offer = await nfTropolis.getOffer(1);
    expect(offer[4]).to.be.false;
  });

  it("should revert when buying with incorrect payment amount", async function () {
    await nfTropolis.connect(seller).createOffer(tokenId, price);

    await expect(nfTropolis.connect(buyer).buyNFT(1, { value: price.div(2) })).to.be.revertedWith(
      "NFTMarketplace: Incorrect payment amount"
    );
  });

  it("should revert when canceling an offer from another account", async function () {
    await nfTropolis.connect(seller).createOffer(tokenId, price);

    await expect(nfTropolis.connect(buyer).cancelOffer(1)).to.be.revertedWith(
      "NFTMarketplace: Only the seller can cancel the offer"
    );
  });

  it("should revert when buying from a non-existent offer", async function () {
    await expect(nfTropolis.connect(buyer).buyNFT(1, { value: price })).to.be.revertedWith(
      "NFTMarketplace: Offer does not exist or not active"
    );
  });

  it("should get the URI of a particular token", async()=>{
    const URI = await minter.getTokenURI(1);
    expect(URI).to.be.equal("www.exampleToken.com")
  })
});
