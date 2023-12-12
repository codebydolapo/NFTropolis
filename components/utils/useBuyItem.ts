import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import marketplaceABI from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";
import { marketplaceAddress } from "../../src/marketplaceAddress";
import { BigNumber } from "alchemy-sdk";
import { ethers } from "ethers";
import useFetchPrice from "./useFetchPrice";
import { useEffect, useState } from "react";

function useBuyItem(nftAddress: string, tokenId: string | number, address: string): any {

    const [price, setPrice] = useState<string | number | any>("0")

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
        functionName: "buyNFT",
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
       await buyNFT?.()
    }


    return {
        purchaseItem
    }
}

export default useBuyItem