import { expect, ethers } from "./index";

describe("Nft marketplace Unit Tests", function () {
  let marketplace: any,
    nfTropolis: any,
    owner: any,
    customer: any,
    customer2: any;
  const PRICE = ethers.utils.parseEther("1");
  const TOKEN_ID = 1;

  beforeEach(async () => {
    [owner, customer, customer2] = await ethers.getSigners();

    const Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy();
    await marketplace.deployed();

    const NFTropolis = await ethers.getContractFactory("NFTropolis");
    nfTropolis = await NFTropolis.deploy(
      "NFTropolis",
      "NFTR",
      "http://localhost:3000/api/"
    );
    await nfTropolis.deployed();

    const txReceipt = await nfTropolis
      .connect(customer)
      .mintNFT({ value: PRICE });
    await nfTropolis
      .connect(customer)
      .setApprovalForAll(marketplace.address, true);
    // console.log(await nfTropolis.getMintedTokenCount());
  });

  describe("listItem", function () {
    it("emits an event after listing an item", async function () {
      expect(
        await marketplace
          .connect(customer)
          .listItem(nfTropolis.address, TOKEN_ID, PRICE)
      ).to.emit("ItemListed");
    });

    it("exclusively items that haven't been listed", async function () {
      await marketplace
        .connect(customer)
        .listItem(nfTropolis.address, TOKEN_ID, PRICE);

      await expect(
        marketplace
          .connect(customer)
          .listItem(nfTropolis.address, TOKEN_ID, PRICE)
      ).to.be.revertedWith("Already_Listed");
    });

    it("exclusively allows owners to list", async function () {
      // nftmarketplace = marketplace.connect(customer);
      // await nfTropolis.approve(customer.address, TOKEN_ID);
      await expect(
        marketplace
          .connect(customer2)
          .listItem(nfTropolis.address, TOKEN_ID, PRICE)
      ).to.be.revertedWith("Caller_Isnt_Owner");
    });

    // it("needs approvals to list item", async function () {
    //   await nfTropolis.approve(ethers.constants.AddressZero, TOKEN_ID);
    //   await expect(
    //     nftmarketplace.connect(customer).listItem(nfTropolis.address, TOKEN_ID, PRICE)
    //   ).to.be.revertedWith("NotApprovedFormarketplace");
    // });

    it("Updates listing with seller and price", async function () {
      await marketplace
        .connect(customer)
        .listItem(nfTropolis.address, TOKEN_ID, PRICE);
      const listing = await marketplace.getListing(
        nfTropolis.address,
        TOKEN_ID
      );
      expect(listing.price.toString()).to.equal(PRICE.toString());
      expect(listing.seller.toString()).to.equal(customer.address);
    });

    it("reverts if the price is 0", async () => {
      const ZERO_PRICE = ethers.utils.parseEther("0");
      await expect(
        marketplace
          .connect(customer)
          .listItem(nfTropolis.address, TOKEN_ID, ZERO_PRICE)
      ).revertedWith("Listing_Price_Too_Low");
    });
  });
  describe("cancelListing", function () {
    it("reverts if there is no listing", async function () {
      await expect(
        marketplace
          .connect(customer)
          .cancelListing(nfTropolis.address, TOKEN_ID)
      ).to.be.revertedWith("Not_Listed");
    });

    it("reverts if anyone but the owner tries to call", async function () {
      await marketplace
        .connect(customer)
        .listItem(nfTropolis.address, TOKEN_ID, PRICE);
      // await nfTropolis.approve(customer.address, TOKEN_ID)
      await expect(
        marketplace
          .connect(customer2)
          .cancelListing(nfTropolis.address, TOKEN_ID)
      ).to.be.revertedWith("Caller_Isnt_Owner");
    });

    it("emits event and removes listing", async function () {
      await marketplace
        .connect(customer)
        .listItem(nfTropolis.address, TOKEN_ID, PRICE);
      expect(
        await marketplace
          .connect(customer)
          .cancelListing(nfTropolis.address, TOKEN_ID)
      ).to.emit("ListingCancelled");
      const listing = await marketplace.getListing(
        nfTropolis.address,
        TOKEN_ID
      );
      expect(listing.price.toString()).to.equal("0");
    });
  });

  describe("buyItem", function () {
    it("reverts if the item isnt listed", async function () {
      await expect(
        marketplace.connect(customer2).buyItem(nfTropolis.address, TOKEN_ID)
      ).to.be.revertedWith("Not_Listed");
    });

    it("reverts if the price isnt met", async function () {
      await marketplace
        .connect(customer)
        .listItem(nfTropolis.address, TOKEN_ID, PRICE);
      await expect(
        marketplace.connect(customer).buyItem(nfTropolis.address, TOKEN_ID)
      ).to.be.revertedWith("Insufficient_Funds");
    });
    
    it("transfers the nft to the buyer and updates internal proceeds record", async function () {
      await marketplace
        .connect(customer)
        .listItem(nfTropolis.address, TOKEN_ID, PRICE);
      const seller = await nfTropolis.ownerOf("1");
      expect(
        await marketplace
          .connect(customer2)
          .buyItem(nfTropolis.address, TOKEN_ID, { value: PRICE })
      ).to.emit("ItemBought");
      const newOwner = await nfTropolis.ownerOf(TOKEN_ID);
      const ownerProceeds = await marketplace.connect(customer).getProceeds();
      expect(newOwner.toString()).to.equal(customer2.address);
      expect(ownerProceeds.toString()).to.equal(PRICE.toString());
    });
  });

  describe("updateListing", function () {
    it("must be owner and listed", async function () {
      await expect(
        marketplace.updateListing(nfTropolis.address, TOKEN_ID, PRICE)
      ).to.be.revertedWith("Not_Listed");
      await marketplace
        .connect(customer)
        .listItem(nfTropolis.address, TOKEN_ID, PRICE);
      await expect(
        marketplace
          .connect(customer2)
          .updateListing(nfTropolis.address, TOKEN_ID, PRICE)
      ).to.be.revertedWith("Caller_Isnt_Owner");
    });

    it("updates the price of the item", async function () {
      const updatedPrice = ethers.utils.parseEther("2");
      await marketplace
        .connect(customer)
        .listItem(nfTropolis.address, TOKEN_ID, PRICE);
      expect(
        await marketplace
          .connect(customer)
          .updateListing(nfTropolis.address, TOKEN_ID, updatedPrice)
      ).to.emit("Relisted");
      const listing = await marketplace.getListing(
        nfTropolis.address,
        TOKEN_ID
      );
      expect(listing.price.toString()).to.equal(updatedPrice.toString());
    });
  });
  describe("withdrawProceeds", function () {
    it("doesn't allow 0 proceed withdrawls", async function () {
      await expect(
        marketplace.connect(customer).withdrawProceeds()
      ).to.be.revertedWith("NoProceeds");
    });
    // it("withdraws proceeds", async function () {
    //   await marketplace
    //     .connect(customer)
    //     .listItem(nfTropolis.address, TOKEN_ID, PRICE);
    //   await marketplace
    //     .connect(customer2)
    //     .buyItem(nfTropolis.address, TOKEN_ID, { value: PRICE });

    //   const ownerProceedsBefore = await marketplace
    //     .connect(customer)
    //     .getProceeds();
    //   const ownerBalanceBefore = await customer.getBalance();
    //   const txResponse = await marketplace.connect(customer).withdrawProceeds();
    //   const transactionReceipt = await txResponse.wait(1);
    //   const { gasUsed, effectiveGasPrice } = transactionReceipt;
    //   const gasCost = gasUsed.mul(effectiveGasPrice);
    //   const ownerBalanceAfter = await owner.getBalance();

    //   expect(ownerBalanceAfter.add(gasCost).toString()).to.equal(
    //     ownerProceedsBefore.add(ownerBalanceBefore).toString()
    //   );
    // });
  });
});
