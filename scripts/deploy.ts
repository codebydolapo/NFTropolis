// const { ethers } = require("hardhat");
// import fs from "fs"
// import metadata from "../data/data.json"
// // import {nfTropolisAddress} from '../src/nfTropolisAddress'

// async function main() {
//     const NFTropolis = await ethers.getContractFactory("NFTropolis");
//     const nfTropolis = await NFTropolis.deploy("NFTropolis", "NFTR", "http://localhost:3000/api/");
//     await nfTropolis.deployed();

//     // const account = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
//     const [account] = await ethers.getSigners();

//     const price = ethers.utils.parseEther("0.0001");

    
//     fs.writeFileSync("src/nfTropolisAddress.js", `export const nfTropolisAddress = "${nfTropolis.address}"`)

//     const jsonData = fs.readFileSync("data/data.json", 'utf-8')
//     const parsedData = JSON.parse(jsonData);
//     // console.log(parsedData.length)
//     // console.log("hello")


//     async function handleDeploy(index: number){
//         let mintHash = await nfTropolis.mint(1, { from: account.address, value: price});
//         console.log(`NFT ${index} minted with address ${mintHash.hash}`);
//     }

    
//     for(let i=1; i<=parsedData.length; i++){
//         try{
//             handleDeploy(i)
//         }
//         catch(error){
//             console.log(error)
//         }
//     }


// }


// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });
