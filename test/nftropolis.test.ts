import {expect, ethers} from './index'

describe("NFTropolis", function () {
  let nfTropolis: any;
  let owner: any;
  let customer: any;
  let buyer: any;
  let tokenId: any;
  const price = ethers.utils.parseEther("0.0001");

  beforeEach(async function () {
    [owner, customer] = await ethers.getSigners()
    const NFTropolis = await ethers.getContractFactory("NFTropolis");
    nfTropolis = await NFTropolis.deploy("NFTropolis", "NFTR", "http://localhost:3000/api/")
    await nfTropolis.deployed()
    // console.log(owner)
  });

  it("should mint a new NFT for the caller if they have enough funds", async () => {
    // Mint an NFT for the first account
    await nfTropolis.connect(owner).mintNFT(owner.address);

    const _count = await nfTropolis.getMintedTokenCount();
    const count = Number(_count)

    // The caller should now have one NFT
    const _owner = await nfTropolis.ownerOf(count);
    expect(_owner).to.equal(owner.address);

    // The NFT should have the correct metadata
    const tokenURI = await nfTropolis.tokenURI(count);
    expect(tokenURI).to.equal("http://localhost:3000/api/1");
  });

  it("should not mint a new NFT for the caller if they do not have enough funds", async () => {

    // Try to mint an NFT for the first account
   await expect(nfTropolis.connect(customer).mintNFT(customer.address, {value: ethers.utils.parseEther("0.5")})).to.be.revertedWith("insufficient funds");

    // The caller should still have zero NFTs
    const tokenIds = await nfTropolis.balanceOf(customer.address);
    expect(Number(tokenIds)).to.equal(0);
  });


  it("should return the correct concatTokenURI", async () => {
    // Mint an NFT for the first account
    await nfTropolis.connect(owner).mintNFT(owner.address);

    const _count = await nfTropolis.getMintedTokenCount();
    const count = Number(_count)

    // Get the concatTokenURI for token ID 1
    const concatTokenURI = await nfTropolis.concatTokenURI(count);

    // The concatTokenURI should be correct
    expect(concatTokenURI).to.equal("http://localhost:3000/api/1");
  });
});