//this component contains the code for creating a new NFT

import { usePrepareContractWrite, useContractWrite, useAccount, useContractRead, useWaitForTransaction } from "wagmi";
import { nfTropolisAddress } from "../../src/nfTropolisAddress";
import nfTropolisABI from "../../artifacts/contracts/NFTropolis.sol/NFTropolis.json";
import { marketplaceAddress } from "../../src/marketplaceAddress";
import marketplaceABI from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import _handleCreate from "../../backend/_handleCreate" //this function handles the firebase storage
import _storeListings from "../../backend/_storeListings";




const useCreateAndList = ()=>{
    
   //////////////////////////////

  ///////////////////
  //this helps me mint NFTs
  const {
    config: mintConfig,
    // error: mintError 
  } = usePrepareContractWrite({
    address: nfTropolisAddress,
    abi: nfTropolisABI.abi,
    functionName: "mintNFT",
    args: [],
    
  });

  const { data: mintData,
    // isLoading: isMintLoading,
    // isSuccess: isMintSuccess,
    // isError: isMintError,
    writeAsync: mintNFT } = useContractWrite(mintConfig);

  const {
    // data: mintWaitData, 
    isError: isMintWaitError,
    isLoading: isMintWaitLoading,
    // isSuccess: isMintWaitSuccess, 
  } =
    useWaitForTransaction({
      hash: mintData?.hash,
      timeout: 3_000,
    })


  //this helps me count the number of NFTs listed inside the contract
  const {
    data: count,
    // isError: countErrorState,
    // isFetching: countFetchingState,
    isLoading: countLoadingState,
    isSuccess: countSuccess,
    refetch: countRefetch
  } =
    useContractRead({
      address: nfTropolisAddress,
      abi: nfTropolisABI.abi,
      functionName: "getMintedTokenCount",
      // args: []
    });


  //this one helps me list NFTs
  ////////////////////
  const {
    config: listingConfig,
    // error: listingError 
  } = usePrepareContractWrite({
    address: marketplaceAddress,
    abi: marketplaceABI.abi,
    functionName: "listItem",
    args: [nfTropolisAddress, count, Number(ethers.utils.parseEther("1"))],
  });

  const {
    data: listData,
    // isLoading: isListingLoading,
    // isSuccess: isListingSuccess,
    writeAsync: listNFT } = useContractWrite(listingConfig);

  const {
    // data: listWaitData, 
    isError: isListWaitError,
    isLoading: isListWaitLoading,
    // isSuccess: isListWaitSuccess, 
  }
    =
    useWaitForTransaction({
      hash: listData?.hash,
      timeout: 3_000,
    })
  //////////////////////////


  async function createItem({ file, name, description, chain, price, externalLink, address, listingStatus }: any) {


    if (!address) {
      toast.error("Please connect your wallet!");
      return;
    }

    try {
      ///////////this helps me upload to firebase
      toast("NFT minting is in progress...")
      const createSuccess = await _handleCreate(file, name, description, externalLink, address);
      if (createSuccess) {
        toast("NFT data upload success!")
        toast("Minting now, please wait")
      }
      else {
        toast("NFT data upload failed!")
        return
      };


      if (isMintWaitLoading) {
        console.log("NFT minting is in progress...");
        return;
      }

      if (!isMintWaitError) {
        console.log("NFT minted successfully!");
        toast.success("NFT minted successfully!");
      } else {
        console.log("NFT minting failed!");
        toast.error("NFT minting failed!");
        return;
      }

      if (createSuccess) {
        await mintNFT?.()
      }
      else {
        toast("NFT minting failed!")
        return;
      }
      //////////////////////////////////////////




      await countRefetch?.()

      if (countLoadingState) {
        console.log("Getting minted token count...");
        return;
      }

      if (countSuccess) {
        console.log("Minted token count:", Number(count));
      } else {
        console.log("Getting minted token count failed!");
        return;
      }
      /////////////////////////






      //listing now, if the customer wants to list NFTs
      if (listingStatus && !isMintWaitError) {

        await listNFT?.()

        if (isListWaitLoading) {
          console.log("Listing NFT...");
          return;
        }

        if (!isListWaitError) {
          await _storeListings(address, count, price) //the count is the tokenId
          console.log("NFT listed successfully!");
        } else {
          console.log("Listing NFT failed!");
          // toast.success("NFT minted and listed successfully!");
          return;
        }
      }
      return;

      /////////////////////////////////////
      ///////////////////////////
    }
    catch (error) {
      console.log(error);
    }


  }


  return {createItem}


}

export default useCreateAndList;