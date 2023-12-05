//this component contains the code for fetching price
import { useContractRead } from "wagmi";
import { marketplaceAddress } from "../../src/marketplaceAddress";
import marketplaceABI from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";
import _handleCreate from "../../backend/_handleCreate" //this function handles the firebase storage
import _storeListings from '../../backend/_storeListings'
require("dotenv").config()



const useFetchPrice = (address: string, tokenId: string | number) => {

    //this helps me count the number of NFTs listed inside the contract
  const {
    data: listing,
    // isError: countErrorState,
    // isFetching: countFetchingState,
    isLoading: listingLoadingState,
    isSuccess: listingSuccess,
    refetch: listingRefetch
  } =
    useContractRead({
      address: marketplaceAddress,
      abi: marketplaceABI.abi,
      functionName: "getListing",
      args: [address, tokenId]
    });

    
    return {
        listing,
        listingRefetch
    }


}

export default useFetchPrice