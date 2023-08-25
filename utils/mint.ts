import { sanityClient } from "../sanity/client";
import marketplaceAddress from '../src/marketplaceAddress'
import nfTropolisAddress from '../src/nfTropolisAddress'

export async function mint(nft: any) {
  try{
    const result = sanityClient.create(nft);
    return result;


const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy();
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

  } catch(error){
    console.log(error)
  }
}
