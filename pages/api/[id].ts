// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ref, get, child } from "firebase/database";
import { database } from "../../backend/_config"
require("dotenv").config()
// Importing the required modules
import { Network, Alchemy, AlchemySettings, Nft } from "alchemy-sdk"

// Configuring Alchemy SDK with your API key and network
const settings: AlchemySettings | any = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI
};

// Creating an Alchemy instance to make calls to the Alchemy API
const alchemy = new Alchemy(settings);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const dbRef = ref(database);

  let nfts: Nft[] = [];

  get(child(dbRef, `NFTs/`)).then(async (snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      //returns the collected data in array format
      for (let i = 0; i < Object.keys(snapshot.val()).length; i++) {
        const key = Object.keys(snapshot.val())[i];
        nfts.push(snapshot.val()[key]);
      }

      console.log(nfts)
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  setTimeout(() => {
    if(id != "all"){
      res.status(200).json(nfts[Number(id) - 1])
    } else {
      res.status(200).json(nfts)
    }
  }, 5000);


}