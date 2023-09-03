// const express = require("express");
// const app = express();

// const PORT = 5001;
// const moralis = require("moralis").default;
// const cors = require("cors");
// require("dotenv").config({ path: ".env" });

// app.use(cors);
// app.use(express.json());

// const moralisApiKey = process.env.MY_API_KEY;

// app.get("./getnftdata", async (req, res) => {
//   try {
//     const { query } = req;

//     if (typeof query.contractAddress === "string") {
//       const response = await moralis.EvmApi.nft.getNFTTrades({
//         address: query.contractAddress,
//         chain: "0xaa36a7", //eth sepolia chain
//       });
//       return res.status(200).json(response);
//     } else {
//       const nftData = [];

//       for (let i = 0; i < query.contractAddress.length; i++) {
//         const response = await moralis.moralis.EvmApi.nft.getNFTTrades({
//           address: query.contractAddress[i],
//           chain: "0xaa36a7", //eth mainnet chain
//         });
//         nftData.push(response);
//       }

//       const response = { nftData };
//       return res.status(200).json(response);
//     }
//   } catch (e) {
//     console.log("something went wrong");
//     console.log(e);
//     return res.status(400).json();
//   }
// });

// app.get("./getcontractnft", async (req, res) => {
//   try {
//     const { query } = req;

//     const chain = query.chain;

//     const response = await moralis.EvmApi.nft.getContractNFTs({
//       address: query.contractAddress,
//       format: "decimal",
//       chain, //eth mainnet chain
//     });
//   } catch (e) {
//     console.log("something went wrong");
//     console.log(e);
//     return res.status(400).json();
//   }
// });

// app.get("/getnfts", async (req, res) => {
//   try {
//     const { query } = req;

//     const response = await moralis.EvmApi.nft.getWalletNFTs({
//       address: query.address,
//       chain: query.chain,
//     });

//     return res.status(200).json(response);
//   } catch (e) {
//     console.log(`Something went wrong ${e}`);
//     return res.status(400).json();
//   }
// });

// moralis
//   .start({
//     apiKey: moralisApiKey,
//   })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Application listening a port ${PORT}`);
//     });
//   });
