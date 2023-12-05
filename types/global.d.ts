declare global {

  interface NFT {
    file?: string,
    external_url?: string,
    name?: string, 
    description?: string, 
    chain?: string, 
    price?: string | number, 
    priceToSell?: string | number, 
    externalLink?: string,
    address?: `0x${string}` | string | undefined,
    listingStatus?: boolean,
    NFTAddress?: `0x${string}` | string | undefined,
    NFTId?: string | undefined,
    customerAddress?: `0x${string}` | string | undefined
    tokenId: string | number,
    nfts?:{
    name?: string, 
    description?: string, 
    chain?: string, 
    priceToSell?: string | number, 
    external_url?: string,
    fileURL: string,
    tokenId: string | number,
    }[]
  }

  interface Listing{
    nftAddress?: string | any, 
    tokenId?: string | undefined | any,
    address?: `0x${string}` | string | undefined,
    chain: string | EvmChainish | undefined, 
    price: string | number | undefined,
  }
}



export { }