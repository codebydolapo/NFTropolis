//this component contains the code for fetching price
import { useContractRead } from "wagmi";
import { marketplaceAddress } from "../../src/marketplaceAddress";
import marketplaceABI from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";
import _handleCreate from "../../backend/_handleCreate" //this function handles the firebase storage
import _storeListings from '../../backend/_storeListings'
require("dotenv").config()
import { nfTropolisAddress } from "../../src/nfTropolisAddress";


const useFetchListing = (address: string, tokenId: string | number): {
  // Specify the types of values returned
  // data: {price: string, seller: string};
  listing: {price: string, seller: string} | any;
  listingRefetch: () => void | any;
}=> {

    //this helps me count the number of NFTs listed inside the contract
  const {
    data: listing,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    refetch: listingRefetch
  } =
    useContractRead({
      address: marketplaceAddress,
      abi: marketplaceABI.abi,
      functionName: "getListing",
      args: [address, tokenId]
    });

    
    return {
      // data: listing as Listing | null, // Cast response to expected type
      listing,
      listingRefetch,
    }


}

export default useFetchListing