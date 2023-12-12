import { ref, set } from "firebase/database";
import { database } from "./_config"
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import { nfTropolisAddress as address } from "../src/nfTropolisAddress";


export default async function storeNFTData(image, name, description, externalLink, tokenId, address) {
    const db = database;
    console.log(address)
    try {
        const metadataResponse = await set(ref(db, `NFTs/${tokenId}`), {
            contract: {
                address
            },
            id: {
                tokenId
            },
            title: `${name} ${tokenId}`,
            description,
            tokenUri: {
                gateway: externalLink,
            },
            media: [
                {
                    gateway: externalLink,
                    thumbnail: image,
                    raw: "",//ipfs link
                    // "format": "png",
                    // "bytes": 105117
                }
            ],
            metadata: {
                name: `${name} ${tokenId}`,
                image,
                // attributes: [

                // ]
            },
            timeLastUpdated: new Date(),
            contractMetadata: {
                name: `${name}+${tokenId}`,
                symbol: "NFTR",
                totalSupply: "",
                tokenType: "ERC721",
                contractDeployer: "",
                deployedBlockNumber: "",
                openSea: {
                    floorPrice: 1.539,
                    collectionName: "NFTRopolis",
                    safelistRequestStatus: "verified",
                    imageUrl: image,
                    description,
                    externalUrl: externalLink,
                    twitterUsername: "0xdolapo",
                    discordUrl: "",
                    lastIngestedAt: new Date()
                }
            }
        })
        toast.success("Metadata uploaded successfully")
        return metadataResponse
    }

    catch (error) {
        console.log(error)
        toast.error("Metadata upload failed")
    }



}

// [{
//     "contract": {
//         "address": "0xe785e82358879f061bc3dcac6f0444462d4b5330"
//     },
//     "id": {
//         "tokenId": "44",
//         "tokenMetadata": {
//             "tokenType": "ERC721"
//         }
//     },
//     "title": "WoW #44",
//     "description": "",
//     "tokenUri": {
//         "gateway": "https://alchemy.mypinata.cloud/ipfs/QmTNBQDbggLZdKF1fRgWnXsnRikd52zL5ciNu769g9JoUP/44",
//         "raw": "ipfs://QmTNBQDbggLZdKF1fRgWnXsnRikd52zL5ciNu769g9JoUP/44"
//     },
//     "media": [
//         {
//             "gateway": "https://nft-cdn.alchemy.com/eth-mainnet/9316855d8f60a32cd44aa71f07cd7dc1",
//             "thumbnail": "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/9316855d8f60a32cd44aa71f07cd7dc1",
//             "raw": "ipfs://QmUkdJKCsV8ixm2eDLJGosH8Bntwwx942YXxfuF9yXPBzi",
//             "format": "png",
//             "bytes": 105117
//         }
//     ],
//     "metadata": {
//         "name": "WoW #44",
//         "image": "ipfs://QmUkdJKCsV8ixm2eDLJGosH8Bntwwx942YXxfuF9yXPBzi",
//         "attributes": [
//             {
//                 "value": "Green Orange",
//                 "trait_type": "Background"
//             },
//             {
//                 "value": "Medium Gold",
//                 "trait_type": "Skin Tone"
//             },
//             {
//                 "value": "Green To The Left",
//                 "trait_type": "Eyes"
//             },
//             {
//                 "value": "Freckles",
//                 "trait_type": "Facial Features"
//             },
//             {
//                 "value": "Boy Cut",
//                 "trait_type": "Hairstyle"
//             },
//             {
//                 "value": "Tunic",
//                 "trait_type": "Clothes"
//             },
//             {
//                 "value": "Spikes",
//                 "trait_type": "Earrings"
//             },
//             {
//                 "value": "Slight Smile",
//                 "trait_type": "Mouth"
//             },
//             {
//                 "value": "Purple",
//                 "trait_type": "Lips Color"
//             }
//         ]
//     },
//     "timeLastUpdated": "2023-03-30T12:11:50.505Z",
//     "contractMetadata": {
//         "name": "World Of Women",
//         "symbol": "WOW",
//         "totalSupply": "10000",
//         "tokenType": "ERC721",
//         "contractDeployer": "0xc9b6321dc216d91e626e9baa61b06b0e4d55bdb1",
//         "deployedBlockNumber": 12907782,
//         "openSea": {
//             "floorPrice": 1.539,
//             "collectionName": "World of Women",
//             "safelistRequestStatus": "verified",
//             "imageUrl": "https://i.seadn.io/gae/EFAQpIktMBU5SU0TqSdPWZ4byHr3hFirL_mATsR8KWhM5z-GJljX8E73V933lkyKgv2SAFlfRRjGsWvWbQQmJAwu3F2FDXVa1C9F?w=500&auto=format",
//             "description": "World of Women is a collection of 10,000 NFTs that gives you full access to our network of artists, creators, entrepreneurs, and executives who are championing diversity and equal opportunity on the blockchain.\n\nCreated and illustrated by Yam Karkai (@ykarkai), World of Women has made prominent appearances at Christie's, The New Yorker and Billboard.\n\nJoin us to receive exclusive access to NFT drops, experiences, and much more.\n\nThe Time is WoW.",
//             "externalUrl": "http://worldofwomen.art",
//             "twitterUsername": "worldofwomennft",
//             "discordUrl": "https://discord.gg/worldofwomen",
//             "lastIngestedAt": "2023-03-21T21:22:13.000Z"
//         }
//     }
// }]