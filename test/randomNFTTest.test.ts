// We are going to skimp a bit on these tests...

import {
  expect,
  ethers,
  network,
  deployments,
  developmentChains,
  networkConfig
} from "./index";

describe("Random IPFS NFT Unit Tests", function () {
  const BASE_FEE = "250000000000000000"; // 0.25 is this the premium in LINK?
  const GAS_PRICE_LINK = 1e9; // link per gas, is this the gas lane? // 0.000000001 LINK per gas

  const chainId = network.config.chainId;

  let vrfCoordinatorV2Address: any,
    subscriptionId: any,
    vrfCoordinatorV2Mock: any,
    VRFCoordinatorV2Mock: any,
    deployer: any,
    randomNft: any,
    tester: any;

    let tokenUris = [
        "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
        "ipfs://QmYQC5aGZu2PTH8XzbJrbDnvhj3gVs7ya33H9mqUNvST3d",
        "ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm",
      ];

  beforeEach(async () => {
    [deployer, tester] = await ethers.getSigners();

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

    //create VRFV2 Subscription
    console.log("----------------------------------------------------");
    console.log("Creating subscription!");
    vrfCoordinatorV2Address = VRFCoordinatorV2Mock.address;
    const transactionResponse = await VRFCoordinatorV2Mock.createSubscription();
    const transactionReceipt = await transactionResponse.wait();
    subscriptionId = transactionReceipt.events[0].args.subId;

    console.log("----------------------------------------------------");
    console.log("Funding subscription!");

    const _randomNft = await ethers.getContractFactory("RandomNFT");
    randomNft = await _randomNft.deploy(
      vrfCoordinatorV2Address,
      subscriptionId,
      networkConfig[chainId]["gasLane"],
      networkConfig[chainId]["callbackGasLimit"],
      // networkConfig[chainId]["mintFee"],
      "RandomNFTs",
      "RNFT",
      tokenUris
    );

    console.log("----------------------------------------------------");
    console.log("Adding consumer!");
    await VRFCoordinatorV2Mock.addConsumer(subscriptionId, randomNft.address);

    console.log("----------------------------------------------------");
    console.log("Consumer added, All set to go!");
  });

  describe("constructor", () => {
    it("sets starting values correctly", async function () {
      const dogTokenUriZero = await randomNft.getDogTokenUris(0);
      const isInitialized = await randomNft.getInitialized();
      expect(dogTokenUriZero).to.includes("ipfs://");
      expect(isInitialized).to.equal(true);
    });
  });

  describe("requestNft", () => {

    it("fails if payment isn't sent with the request", async function () {
      await expect(randomNft.connect(tester).requestNft()).to.be.revertedWith("Insufficient Funds");
    });

    // it("reverts if payment amount is less than the mint fee", async function () {
    //   const fee = await randomNft.getMintFee();
    //   await expect(
    //     randomNft.requestNft({
    //       value: fee.sub(ethers.utils.parseEther("0.001")),
    //     })
    //   ).to.be.revertedWith("randomNft__NeedMoreETHSent");
    // });
    it("emits an event and kicks off a random word request", async function () {
      const fee = await randomNft.getMintFee();
      expect(await randomNft.requestNft({ value: fee.toString() })).to.emit(
        randomNft,
        "NftRequested"
      );
    });
  });

  // describe("fulfillRandomWords", () => {
  //   it("mints NFT after random number is returned", async function () {
  //     await new Promise<void>(async (resolve, reject) => {
  //       randomNft.once("NftMinted", async () => {
  //         try {
  //           const tokenUri = await randomNft.tokenURI("0");
  //           const tokenCounter = await randomNft.getTokenCounter();
  //           expect.equal(tokenUri.toString().includes("ipfs://"), true);
  //           expect.equal(tokenCounter.toString(), "1");
  //           resolve();
  //         } catch (e) {
  //           console.log(e);
  //           reject(e);
  //         }
  //       });
  //       try {
  //         const fee = await randomNft.getMintFee();
  //         const requestNftResponse = await randomNft.requestNft({
  //           value: fee.toString(),
  //         });
  //         const requestNftReceipt = await requestNftResponse.wait(1);
  //         await VRFCoordinatorV2Mock.fulfillRandomWords(
  //           requestNftReceipt.events[1].args.requestId,
  //           randomNft.address
  //         );
  //       } catch (e) {
  //         console.log(e);
  //         reject(e);
  //       }
  //     });
  //   });
  // });
//   describe("getBreedFromModdedRng", () => {
//     it("should return pug if moddedRng < 10", async function () {
//       const expectedValue = await randomNft.getBreedFromModdedRng(7);
//       expect.equal(0, expectedValue);
//     });
//     it("should return shiba-inu if moddedRng is between 10 - 39", async function () {
//       const expectedValue = await randomNft.getBreedFromModdedRng(21);
//       expect.equal(1, expectedValue);
//     });
//     it("should return st. bernard if moddedRng is between 40 - 99", async function () {
//       const expectedValue = await randomNft.getBreedFromModdedRng(77);
//       expect.equal(2, expectedValue);
//     });
//     it("should revert if moddedRng > 99", async function () {
//       await expect(randomNft.getBreedFromModdedRng(100)).to.be.revertedWith(
//         "randomNft__RangeOutOfBounds"
//       );
//     });
//   });
});
