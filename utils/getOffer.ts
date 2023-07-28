import marketplace from "./nfTropolis";
import { ethers, Contract } from 'ethers';
import { nfTropolisAddress } from '../src/nfTropolisAddress'
import nfTropolisABI from '../artifacts/contracts/NFTropolis.sol/NFTropolis.json'
import { NFTropolis } from '../typechain-types/contracts/NFTropolis';


async function getOffer(Window: any, index: number | string){

    const _marketplace: NFTropolis | Contract = marketplace(Window)

    const listingStatus =  await _marketplace.getOffer(index);

    // const listingStatus =  await nfTropolis.getOffer(index);

    return listingStatus
}

export default getOffer;