const { ethers } = require("hardhat");
import fs from "fs";
const { network } = require("hardhat");
const PRICE = ethers.utils.parseEther("1");

async function main() {
  const chainId = network.config.chainId;

  if (chainId == 31337) {
    try {
      ////////////////////////////////////////////////////
      console.log("--------------------------------------------------");
      console.log("Deploying minter!");
      const NFTropolis = await ethers.getContractFactory("NFTropolis");
      const nfTropolis = await NFTropolis.deploy(
        "NFTropolis",
        "NFTR",
        "http://localhost:3000/api/"
      );
      await nfTropolis.deployed();

      fs.writeFileSync(
        "src/nfTropolisAddress.js",
        `export const nfTropolisAddress = "${nfTropolis.address}"`
      );
      console.log("-------------------------------------------------");
      console.log(
        `minter deployed with address ${nfTropolis.address}, and written to src/nfTropolisAddress.js!`
      );

      ///////////////////////////////////////////////////////////////
      console.log("-------------------------------------------------");
      console.log("Deploying marketplace!");
      const Marketplace = await ethers.getContractFactory("Marketplace");
      const marketplace = await Marketplace.deploy();
      await marketplace.deployed();

      // const account = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
      const [account] = await ethers.getSigners();

      fs.writeFileSync(
        "src/marketplaceAddress.js",
        `export const marketplaceAddress = "${marketplace.address}"`
      );
      console.log("-------------------------------------------------");
      console.log(
        `marketplace deployed with address ${marketplace.address}, and written to src/marketplaceAddress.js!`
      );

      //////////////////////////////////////////////////////////////
      console.log("-------------------------------------------------");
      console.log("minting and listing NFTs");

      await nfTropolis.mintNFT({ value: PRICE });
      await nfTropolis.setApprovalForAll(marketplace.address, true);

      console.log("-------------------------------------------------");
      console.log("minted and listed!");
      
    } catch (error) {
      console.log("--------------------------------------------------");
      console.log("Operation failed!");
      console.log(error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
