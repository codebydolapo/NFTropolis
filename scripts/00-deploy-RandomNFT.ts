const { network } = require("hardhat");
const { ethers } = require("hardhat");

const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
// const { verify } = require("../utils/verify")
// const { storeImages, storeTokenUriMetadata } = require("../utils/uploadToPinata")

const FUND_AMOUNT = "1000000000000000000000";
const imagesLocation = "./images/randomNft/";
let tokenUris = [
  "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
  "ipfs://QmYQC5aGZu2PTH8XzbJrbDnvhj3gVs7ya33H9mqUNvST3d",
  "ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm",
];
// const imageUris = [
//     "ipfs://QmSsYRx3LpDAb1GZQm7zZ1AuHZjfbPkD6J7s9r41xu1mf8",
//     "ipfs://QmYx6GsYAKnNzZ9A6NvEKV9nf1VaDzJrqDR23Y8YSkebLU",
//     "ipfs://QmUPjADFGEKmfohdTaNcWhp7VGk26h5jXDA7v3VtTnTLcW",
// ]

const BASE_FEE = "250000000000000000"; // 0.25 is this the premium in LINK?
const GAS_PRICE_LINK = 1e9; // link per gas, is this the gas lane? // 0.000000001 LINK per gas

const metadataTemplate = {
  name: "",
  description: "",
  image: "",
  attributes: [
    {
      trait_type: "Cuteness",
      value: 100,
    },
  ],
};

async function deployRandomContract() {
  const { deployer } = await ethers.getSigners();
  const chainId = network.config.chainId;

  let vrfCoordinatorV2Address, subscriptionId, vrfCoordinatorV2Mock;
  let VRFCoordinatorV2Mock;

  // if (process.env.UPLOAD_TO_PINATA == "true") {
  //     tokenUris = await handleTokenUris()
  // }

  if (chainId == 31337) {
    const _VRFCoordinatorV2Mock = await ethers.getContractFactory(
      "VRFCoordinatorV2Mock"
    );

    try {
      VRFCoordinatorV2Mock = await _VRFCoordinatorV2Mock.deploy(
        BASE_FEE,
        GAS_PRICE_LINK
      );
    } catch (error) {
      console.error(error);
    }

    // create VRFV2 Subscription
    console.log("----------------------------------------------------");
    console.log("Creating subscription!");
    vrfCoordinatorV2Address = VRFCoordinatorV2Mock.address;
    const transactionResponse = await VRFCoordinatorV2Mock.createSubscription();
    const transactionReceipt = await transactionResponse.wait();
    subscriptionId = transactionReceipt.events[0].args.subId;

    console.log("----------------------------------------------------");
    console.log("Funding subscription!");
    // Fund the subscription
    // Our mock makes it so we don't actually have to worry about sending fund
    await VRFCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT);
  } else {
    vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2;
    subscriptionId = networkConfig[chainId].subscriptionId;
  }

  console.log("----------------------------------------------------");
  console.log("Subscription created and funded!");

  console.log("----------------------------------------------------");
  console.log("Deploying contract!");
  const _randomNft = await ethers.getContractFactory("RandomNFT");
  const randomNft = await _randomNft.deploy(
    vrfCoordinatorV2Address,
    subscriptionId,
    networkConfig[chainId]["gasLane"],
    networkConfig[chainId]["callbackGasLimit"],
    // networkConfig[chainId]["mintFee"],
    "RandomNFTs",
    "RNFT",
    tokenUris
  );

  if (chainId == 31337) {
    await VRFCoordinatorV2Mock.addConsumer(subscriptionId, randomNft.address);
  }

  console.log("----------------------------------------------------");
  console.log("Success!");
}

deployRandomContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// async function handleTokenUris() {
//     // Check out https://github.com/PatrickAlphaC/nft-mix for a pythonic version of uploading
//     // to the raw IPFS-daemon from https://docs.ipfs.io/how-to/command-line-quick-start/
//     // You could also look at pinata https://www.pinata.cloud/
//     tokenUris = []
//     const { responses: imageUploadResponses, files } = await storeImages(imagesLocation)
//     for (imageUploadResponseIndex in imageUploadResponses) {
//         let tokenUriMetadata = { ...metadataTemplate }
//         tokenUriMetadata.name = files[imageUploadResponseIndex].replace(".png", "")
//         tokenUriMetadata.description = `An adorable ${tokenUriMetadata.name} pup!`
//         tokenUriMetadata.image = `ipfs://${imageUploadResponses[imageUploadResponseIndex].IpfsHash}`
//         console.log(`Uploading ${tokenUriMetadata.name}...`)
//         const metadataUploadResponse = await storeTokenUriMetadata(tokenUriMetadata)
//         tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`)
//     }
//     console.log("Token URIs uploaded! They are:")
//     console.log(tokenUris)
//     return tokenUris
// }

// module.exports.tags = ["all", "randomipfs", "main"]
