const { ethers } = require("hardhat");
import fs from "fs";

async function main() {
  try {
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy(
      "NFTropolis",
      "NFTR",
      "http://localhost:3000/api/"
    );
    await marketplace.deployed();

    // const account = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    const [account] = await ethers.getSigners();

    fs.writeFileSync(
      "src/nfTropolisAddress.js",
      `export const nfTropolisAddress = "${marketplace.address}"`
    );
  } catch (error) {
    console.log(error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
