//this component contains the code for creating a new NFT
import { usePrepareContractWrite, useContractWrite, useAccount, useContractRead, useWaitForTransaction } from "wagmi";
import { marketplaceAddress } from "../../src/marketplaceAddress";
import marketplaceABI from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import _handleCreate from "../../backend/_handleCreate" //this function handles the firebase storage
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { useState, useRef } from "react";
import _storeListings from '../../backend/_storeListings'
require("dotenv").config()
// Importing the required modules
import { Network, Alchemy, AlchemySettings } from "alchemy-sdk"





const useListItem = () => {

    const { address: customerAddress } = useAccount();

    const [tokenId, setNFTId] = useState("");
    const [price, setPrice] = useState(0);
    const [externalLink, setExternalLink] = useState("test")
    const [address, setAddress] = useState('0x7F0abf089b143a04BEeb5038252429E746cB9754')
    const [_chain, setChain] = useState('Polygon');

    const priceRef = useRef<string | number>("");

    const { MATIC_MUMBAI, ETH_SEPOLIA } = Network


    const handleNFTIdUpdate = (event: any) => {
        setNFTId(event.target.value);
    };

    const handleNFTAddressUpdate = (event: any) => {
        setAddress(event.target.value);
    };

    const handleExternalLinkUpdate = (event: any) => {
        setExternalLink(event.target.value);
    };

    const handlePriceUpdate = (event: any) => {
        priceRef.current = parseInt(event.target.value)
        setPrice(parseInt(event.target.value));
    };

    const handleChainChange = (event: any) => {
        // const handleChainChange = (_chain: string) => {
        setChain(event.target.value as string);
    }
    //this one helps me list NFTs
    ////////////////////
    const { config: listingConfig, error: listingError } = usePrepareContractWrite({
        address: marketplaceAddress,
        abi: marketplaceABI.abi,
        functionName: "listItem",
        args: [address, tokenId, Number(ethers.utils.parseEther('1'))],
        onSuccess(data) {
            console.log('Success', data)
            _storeListings(address, tokenId, price)
        },
        onError(error){
            console.log(error)
        }
    });

    const { data: listData,
        isLoading: isListingLoading,
        isSuccess: isListingSuccess,
        // writeAsync: listNFT,
        write: listNFT,
        status: listStatus,

    } = useContractWrite(listingConfig);

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

    async function listItem() {

        if (!customerAddress) {
            toast.error("Please connect your wallet!");
            return;
        }

        try {
            await listNFT?.()

            // if (isListWaitLoading) {
            //   console.log("Listing NFT...");
            //   return;
            // }
    
            // if (!isListWaitError) {
            //   await _storeListings(address, tokenId, price) //the count is the tokenId
            //   console.log("NFT listed successfully!");
            // } else {
            //   console.log("Listing NFT failed!");
            //   // toast.success("NFT minted and listed successfully!");
            //   return;
            // }
        }
        catch (error) {
            console.log("failed to list")
            return
        }

    }

    return {
        tokenId,
        price,
        priceRef,
        externalLink,
        address,
        _chain,
        listItem,
        listNFT,
        handleNFTIdUpdate,
        handleNFTAddressUpdate,
        handleExternalLinkUpdate,
        handlePriceUpdate,
        handleChainChange
    }


}

export default useListItem