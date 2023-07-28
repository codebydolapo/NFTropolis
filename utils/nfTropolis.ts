import { ethers, Contract } from 'ethers';
import { nfTropolisAddress } from '../src/nfTropolisAddress'
import nfTropolisABI from '../artifacts/contracts/NFTropolis.sol/NFTropolis.json'
import { NFTropolis } from '../typechain-types/contracts/NFTropolis';



function marketplace(Window: any) {
    if (!Window) {
        alert("Please install MetaMask!");
        return;
    }

    const provider = new ethers.providers.Web3Provider(Window);
    const signer = provider.getSigner();

    const nfTropolis: NFTropolis | Contract = new ethers.Contract(
        nfTropolisAddress,
        nfTropolisABI.abi,
        provider
    );

    return nfTropolis;

};



export default marketplace