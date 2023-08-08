import minterABI from '../artifacts/contracts/Minter.sol/Minter.json'
import { minterAddress } from '../src/minterAddress'

function minter(Window: any) {
    if (!Window) {
        alert("Please install MetaMask!");
        return;
    }

    const provider = new ethers.providers.Web3Provider(Window);
    const signer = provider.getSigner();

    const _minter = new ethers.Contract(
        minterAddress,
        minterABI.abi,
        provider
    )

    return _minter

};


export default minter;