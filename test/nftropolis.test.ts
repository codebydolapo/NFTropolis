import { expect } from "chai";
import { ethers } from "hardhat";

describe("Marketplace", function () {
  let marketplace: any;
  let minter: any;
  let owner: any;
  let user1: any;
  let user2: any;
  let tokenId1: number;
  let tokenId2: number;
  const listingFee = ethers.utils.parseEther("0.001");

  beforeEach(async function () {
    const Minter = await ethers.getContractFactory("Minter");
    minter = await Minter.deploy();

    const Marketplace = await ethers.getContractFactory("Marketplace");
    [owner, user1, user2] = await ethers.getSigners();
    marketplace = await Marketplace.deploy(minter.address, owner.address);

    await minter.connect(user1).mint("NFT1", user1.address);
    tokenId1 = await minter.getLatestTokenId();
    await minter.connect(user2).mint("NFT2", user2.address);
    tokenId2 = await minter.getLatestTokenId();
  });

  describe("mintNFT", function () {
    it("should mint an NFT and return its token ID", async function () {
      const result = await marketplace.connect(user1).mintNFT("NFT3");
      const tokenId = result.toNumber();
      expect(tokenId).to.be.equal(3);
    });
  });

  describe("listNFT", function () {
    it("should list an NFT for sale in the marketplace", async function () {
      await minter.connect(user1).approve(marketplace.address, tokenId1);
      const price = ethers.utils.parseEther("1.0");
      await marketplace.connect(user1).listNFT(price, tokenId1);

      const item = await marketplace.idToMarketItem(1);
      expect(item.tokenId).to.be.equal(tokenId1);
      expect(item.seller).to.be.equal(user1.address);
      expect(item.price).to.be.equal(price);
      expect(item.sold).to.be.false;

      const balance = await minter.balanceOf(marketplace.address);
      expect(balance).to.be.equal(1);
    });

    it("should not allow non-owners to list NFTs", async function () {
      const price = ethers.utils.parseEther("1.0");
      await expect(
        marketplace.connect(user2).listNFT(price, tokenId1)
      ).to.be.revertedWith("Sender is not the owner of the token");
    });
  });

  describe("delist", function () {
    it("should delist an NFT from the marketplace", async function () {
      await minter.connect(user1).approve(marketplace.address, tokenId1);
      const price = ethers.utils.parseEther("1.0");
      await marketplace.connect(user1).listNFT(price, tokenId1);

      await marketplace.connect(user1).delist(tokenId1);

      const item = await marketplace.idToMarketItem(1);
      expect(item.tokenId).to.be.equal(0);
      expect(item.seller).to.be.equal(ethers.constants.AddressZero);
      expect(item.price).to.be.equal(0);
      expect(item.sold).to.be.false;

      const balance = await minter.balanceOf(marketplace.address);
      expect(balance).to.be.equal(0);
    });

    it("should not allow non-owners to delist NFTs", async function () {
      await expect(
        marketplace.connect(user2).delist(tokenId1)
      ).to.be.revertedWith("Sender is not the owner of the token");
    });

    it("should not allow delisting a sold NFT", async function () {
      await minter.connect(user1).approve(marketplace.address, tokenId1);
      const price = ethers.utils.parseEther("1.0");
      await marketplace.connect(user1).listNFT(price, tokenId1);

      await marketplace.connect(user2).buyNFT(user1.address, user2.address, 1);

      await expect(marketplace.connect(user1).delist(tokenId1)).to.be.revertedWith(
        "Cannot delist a sold NFT"
      );
    });
  });

  describe("buyNFT", function () {
    it("should allow a user to buy an NFT from the marketplace", async function () {
      await minter.connect(user1).approve(marketplace.address, tokenId1);
      const price = ethers.utils.parseEther("1.0");
      await marketplace.connect(user1).listNFT(price, tokenId1);

      const initialBalance = await ethers.provider.getBalance(user2.address);
      await marketplace.connect(user2).buyNFT(user1.address, user2.address, 1);
      const finalBalance = await ethers.provider.getBalance(user2.address);

      const item = await marketplace.idToMarketItem(1);
      expect(item.sold).to.be.true;

      const hasPurchased = await marketplace.hasPurchased(user2.address, 1);
      expect(hasPurchased).to.be.true;

      expect(finalBalance.sub(initialBalance)).to.be.equal(price);
    });

    it("should not allow a user to buy an NFT they have already purchased", async function () {
      await minter.connect(user1).approve(marketplace.address, tokenId1);
      const price = ethers.utils.parseEther("1.0");
      await marketplace.connect(user1).listNFT(price, tokenId1);

      await marketplace.connect(user2).buyNFT(user1.address, user2.address, 1);

      await expect(
        marketplace.connect(user2).buyNFT(user1.address, user2.address, 1)
      ).to.be.revertedWith("Already bought this NFT");
    });

    it("should not allow a user to buy an NFT with an incorrect payment amount", async function () {
      await minter.connect(user1).approve(marketplace.address, tokenId1);
      const price = ethers.utils.parseEther("1.0");
      await marketplace.connect(user1).listNFT(price, tokenId1);

      await expect(
        marketplace.connect(user2).buyNFT(user1.address, user2.address, 1, {
          value: ethers.utils.parseEther("0.5"),
        })
      ).to.be.revertedWith("Incorrect payment amount");
    });

    it("should not allow a user to buy a delisted NFT", async function () {
      await minter.connect(user1).approve(marketplace.address, tokenId1);
      const price = ethers.utils.parseEther("1.0");
      await marketplace.connect(user1).listNFT(price, tokenId1);

      await marketplace.connect(user1).delist(tokenId1);

      await expect(
        marketplace.connect(user2).buyNFT(user1.address, user2.address, 1)
      ).to.be.revertedWith("Invalid seller");
    });
  });

  describe("getTotalSupply", function () {
    it("should return the total supply of NFTs in the marketplace", async function () {
      const totalSupply = await marketplace.getTotalSupply();
      expect(totalSupply).to.be.equal(0);

      await minter.connect(user1).approve(marketplace.address, tokenId1);
      const price1 = ethers.utils.parseEther("1.0");
      await marketplace.connect(user1).listNFT(price1, tokenId1);

      const newTotalSupply = await marketplace.getTotalSupply();
      expect(newTotalSupply).to.be.equal(1);
    });
  });

  describe("getTokenURL", function () {
    it("should return the token URL of an NFT", async function () {
      await minter.connect(user1).approve(marketplace.address, tokenId1);
      const price = ethers.utils.parseEther("1.0");
      await marketplace.connect(user1).listNFT(price, tokenId1);

      const tokenURL = await marketplace.getTokenURL(tokenId1);
      expect(tokenURL).to.be.equal("NFT1");
    });
  });

  describe("getBalance", function () {
    it("should return the balance of an address in the marketplace", async function () {
      const balance = await marketplace.getBalance(user1.address);
      expect(balance).to.be.equal(0);

      await minter.connect(user1).approve(marketplace.address, tokenId1);
      const price1 = ethers.utils.parseEther("1.0");
      await marketplace.connect(user1).listNFT(price1, tokenId1);

      const newBalance = await marketplace.getBalance(user1.address);
      expect(newBalance).to.be.equal(1);
    });
  });

  describe("getAllMarketItems", function () {
    it("should return an array of all the current market items listed", async function () {
      await minter.connect(user1).approve(marketplace.address, tokenId1);
      const price1 = ethers.utils.parseEther("1.0");
      await marketplace.connect(user1).listNFT(price1, tokenId1);

      await minter.connect(user2).approve(marketplace.address, tokenId2);
      const price2 = ethers.utils.parseEther("2.0");
      await marketplace.connect(user2).listNFT(price2, tokenId2);

      const marketItems = await marketplace.getAllMarketItems();
      expect(marketItems).to.have.lengthOf(2);
      expect(marketItems[0]).to.be.equal(1);
      expect(marketItems[1]).to.be.equal(2);
    });
  });
});
