const { ethers } = require("hardhat");
import fs from "fs"
import metadata from "../data/data.json"
// import {nfTropolisAddress} from '../src/nfTropolisAddress'

async function main() {
    const [owner] = await ethers.getSigners();
    const Minter = await ethers.getContractFactory("Minter");
    const minter = await Minter.deploy("NFTropolis", "NFTR");

    await minter.deployed();

    // const account = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    const [account] = await ethers.getSigners();

    const NFTropolis = await ethers.getContractFactory("NFTropolis");
    const nftTropolis = await NFTropolis.deploy(minter.address);

    await nftTropolis.deployed();
    
    fs.writeFileSync("src/minterAddress.js", `export const minterAddress = "${minter.address}"`)
    fs.writeFileSync("src/nfTropolisAddress.js", `export const nfTropolisAddress = "${nftTropolis.address}"`)

    const jsonData = fs.readFileSync("data/data.json", 'utf-8')
    const parsedData = JSON.parse(jsonData);
    // console.log(parsedData[2])

    async function handleDeploy(index: number){
        const remainder = index % 3
        const price = parsedData[index].price;
        let mintHash = await minter.mintNFT(account.address, `http://localhost:3000/api/${index}`);
        console.log(`NFT minted with address ${mintHash.hash}`);
        if(remainder !== 0){
            const receipt = await nftTropolis.connect(account).createOffer((index + 1), ethers.utils.parseEther(price));
            console.log(index)
            console.log(`NFT offered with hash ${receipt.hash}`)
        }
    }

    // async function handleDeploy(index: number){
    //     let mintHash = await minter.mintNFT(account.address, `http://localhost:3000/api/${index}`);
    //     console.log(mintHash)
    // }

    
    for(let i=0; i<metadata.length; i++){
        try{
            handleDeploy(i)
        }
        catch(error){
            console.log(error)
        }
    }


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
