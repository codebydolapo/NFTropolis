// const { ethers } = require("hardhat");
// const { expect } = require("chai");


// const NFT = artifacts.require("./NFT.sol");

describe("NFT", () => {
    let _nfTropolis: any;
    let minter: any;
    let owner: any;
    let seller: any;
    let buyer: any;
    let tokenId: any;
    const price = ethers.utils.parseEther("0.0001");
  

    beforeEach(async () => {
        const _NFTropolis = await ethers.getContractFactory("_NFTropolis");
        _nfTropolis = await _NFTropolis.deploy("NFTropolis", "NFTR", "http://localhost:3000/api/", "http://localhost:3000/api/",);
        await _nfTropolis.deployed();
        [owner, seller, buyer] = await ethers.getSigners();
        // console.log(seller.address)
    });

  it("can mint an NFT", async () => {
    await _nfTropolis.connect(seller).mint(1, { from: seller.address, value: price});
    expect(await _nfTropolis.ownerOf(1)).to.equal(seller.address);
    const uri = await _nfTropolis.tokenURI(1);
    expect(await _nfTropolis.tokenURI(1)).to.equal(`http://localhost:3000/api/${1}`);
  });

  it("fails to mint an NFT with insufficient funds", async () => {
    await expect( _nfTropolis.connect(seller).mint(1, { from: seller.address, value: ethers.utils.parseEther("0.00001") })).to.be.revertedWith("insufficient funds");
  });

//   it("fails to mint an NFT from an address that is not whitelisted", async () => {
//     _nfTropolis.setWhitelisted([buyer]);
//     await expect(
//       _nfTropolis.mint(1, { from: seller })
//     ).toThrow(new Error("Caller is not whitelisted"));
//   });

//   it("can reveal an NFT", async () => {
//     const tokenId = await _nfTropolis.mint(1, { from: buyer });
//     await _nfTropolis.reveal().transact({ from: minter });
//     const uri = await _nfTropolis.tokenURI(tokenId);
//     expect(uri).toStartWith("https://hashlips.design/nft/");
//     expect(uri).toEndWith("revealed.json");
//   });

//   it("can withdraw funds", async () => {
//     const balanceBefore = await _nfTropolis.balance();
//     const amount = ethers.utils.parseEther("1");
//     await _nfTropolis.withdraw().transact({ from: minter });
//     const balanceAfter = await _nfTropolis.balance();
//     expect(balanceAfter).toEqual(balanceBefore - amount);
//   });

});
