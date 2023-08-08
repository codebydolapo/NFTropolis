import marketplace from "./nfTropolis";
import { Contract } from 'ethers';
import { ethers } from "ethers";

async function getNFTURL(Window: any, index: number | string){

    try{
        const _marketplace: Contract | undefined | any = marketplace(Window)
    
        const nftAddress =  await _marketplace.tokenURI(Number(index));


        console.log("hello")
        return "hello"
    } catch(e){
        console.log(e)
    }
        
    
}

export default getNFTURL;