import { ethers, Contract } from 'ethers';
import { nfTropolisAddress } from '../src/nfTropolisAddress'
import nfTropolisABI from '../artifacts/contracts/NFTropolis.sol/NFTropolis.json'
import { NFTropolis } from '../typechain-types/contracts/NFTropolis';
import { useSelector } from 'react-redux';


function marketplace(Window: any) {

    if (!Window) {
        console.log("Please install MetaMask!");
        return;
    } 
        const provider = new ethers.providers.Web3Provider(Window);
        const signer = provider.getSigner();
    
        const nfTropolis: Contract = new ethers.Contract(
            nfTropolisAddress,
            nfTropolisABI.abi,
            // provider
            signer
        );
    
    return nfTropolis;
    


};



export default marketplace