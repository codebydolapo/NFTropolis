import { useContractRead, useContractWrite } from "wagmi";
import { nfTropolisAddress } from "../src/nfTropolisAddress";
import nfTropolisABI from "../artifacts/contracts/NFTropolis.sol/NFTropolis.json";
import { marketplaceAddress } from "../src/marketplaceAddress";
import marketplaceABI from "../artifacts/contracts/Marketplace.sol/Marketplace.json";
import

function Abstractions(){

    const { data: countData, isError: countErrorState, isFetching: countFetchngState, isLoading: countLoadingState } = useContractRead({
        address: nfTropolisAddress,
        abi: nfTropolisABI.abi,
        functionName: "getMintedTokenCount",
        args: []
      });
    
      const { data, isError, isLoading }  = useContractWrite({
        address: nfTropolisAddress,
        abi: nfTropolisABI.abi,
        functionName: "mintNft",
        args: []
      });



    return(
        <></>
    )
}

export default Abstractions