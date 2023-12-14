import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useContractRead, useAccount } from "wagmi";
import marketplaceABI from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";
import { marketplaceAddress } from "../../src/marketplaceAddress";
import { BigNumber } from "alchemy-sdk";
import { ethers } from "ethers";
import useFetchPrice from "./useFetchListing";
import { useEffect, useState } from "react";
import { nfTropolisAddress } from "../../src/nfTropolisAddress";
import nfTropolisABI from "../../artifacts/contracts/NFTropolis.sol/NFTropolis.json";
import toast from "react-hot-toast";
import useFetchListing from "./useFetchListing";

function useBuyItem(nftAddress: string, tokenId: string | number): {
    purchaseItem: () => any
} {

    const [price, setPrice] = useState<string | number | any>("0")


    const { address: customerAddress } = useAccount();

    const {
        listing,
        listingRefetch
    } = useFetchPrice(nftAddress, tokenId)

    useEffect(() => {
        listingRefetch?.()
        setPrice(listing?.price)
    }, [])

    const {
        config: buyConfig,
    } = usePrepareContractWrite({
        address: marketplaceAddress,
        abi: marketplaceABI.abi,
        functionName: "buyItem",
        value: price,
        args: [nftAddress, tokenId],

    });

    const { data: buyData,
        // isLoading: isMintLoading,
        // isSuccess: isMintSuccess,
        // isError: isMintError,
        writeAsync: buyNFT
    } = useContractWrite(buyConfig);

    const {
        // data: mintWaitData, 
        isError: isBuyWaitError,
        isLoading: isBuyWaitLoading,
        // isSuccess: isMintWaitSuccess, 
    } =
        useWaitForTransaction({
            hash: buyData?.hash,
            timeout: 3_000,
        })



    async function purchaseItem() {
        if (listing.seller == customerAddress) {
            toast.error("You already own this NFT")
            console.log("You already own this NFT")
            return
        } else {
            await buyNFT?.()
        }
    }


    return {
        purchaseItem
    }
}

export default useBuyItem;


