import { sanityClient } from "../sanity/client"


export async function mint(nft: any) {
    const result = sanityClient.create(nft);
    return result;
  }