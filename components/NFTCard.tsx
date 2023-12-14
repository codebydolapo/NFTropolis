import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/items.module.css";
import { activateCheckoutPopup, saveCheckoutData } from "./reducers/action";
import { addItem } from "./reducers/action";
import { useEffect, useState, useMemo } from "react";
// import getNFTURL from '../utils/getNFTURL';
import { Matic, EthColored } from "@web3uikit/icons";
import { useAccount } from "wagmi";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@mui/material";
import toast from 'react-hot-toast';
import { Nft } from "alchemy-sdk";
import useFetchListing from "./utils/useFetchListing";
import { ethers } from "ethers";



function NFTCard({ description, name, tokenId, contract, image, raw, timeLastUpdated, twitter, deployer, collectionName }: Nft | any) {

  const dispatch = useDispatch();

  const [price, setPrice] = useState<string | number>(0)

  const { isConnected } = useAccount();

  const { listing, listingRefetch } = useFetchListing(contract.address, tokenId)


  useEffect(() => {
    listingRefetch?.()
    console.log(listing)
    setPrice(listing ? ethers.utils.formatEther(listing.price): "0")
  }, [listing])


  function handleCheckout() {
    if (isConnected) {
      dispatch(activateCheckoutPopup());
      dispatch(saveCheckoutData({
        description, 
        name, 
        tokenId, 
        contract, 
        image, 
        raw, 
        timeLastUpdated, 
        twitter, 
        deployer,
        price,
        owner: listing.seller,
        collectionName
      }))

    } else {
      toast.error("Please connect your wallet");
    }
  }

  function truncateString(length: number, str?: any): string | undefined {
    if (str?.length <= length) {
      return str; // No truncation needed
    }
    else {
      return str?.slice(0, length) + "..."; // Truncate and add ellipsis
    }
  }

  return (
    <div
      className={`md:w-[18rem] md:h-[29rem] rounded-xl bg-[#ffffff] md:m-3 relative xs:w-[48%] xs:min-h-[20rem] xs:my-5 cursor-pointer ${styles.item}`}
      onClick={() => handleCheckout()}
    >
      <div
        className={`md:w-[18rem] md:h-[18rem] rounded-tl-xl rounded-tr-xl overflow-hidden xs:w-full xs-h-[95vw]`}
      >
        <img
          className={`rounded-tl-xl rounded-tr-xl md:w-auto md:h-full xs:w-full xs:h-auto ${styles.image}`}
          alt=""
          src={image}
        />
      </div>
      <div
        className={`w-full h-[11rem] flex flex-col items-center justify-around`}
      >
        <div
          className={`w-full md:h-[30%] px-2 flex items-center justify-start xs:h-[23%]`}
        >
          <h3 className={`text-sm text-[#000] font-bold`}>{name}</h3>
        </div>
        <div
          className={`w-full md:h-[40%] px-3 flex flex-col items-start justify-center xs:h-[50%]`}
        >
          <h3 className={`md:text-sm text-[#000000e7] xs:text-xs `}>
            {truncateString(95, description)}
          </h3>
        </div>
        <div
          className={`w-full md:h-[30%] px-3 flex items-center justify-end border-t-[1px] border-grey xs:h-[23%]`}
        >
          <div className={`w-[50%] h-full flex items-center justify-start`}>
            {/* <div className={`w-[7rem] h-[2rem] rounded-md bg-[#00ff00] flex items-center justify-center`}>
                                <p className={`text-sm text-white`}>Available</p>
                            </div> */}
            <Button variant="contained" endIcon={<CheckIcon />} className={`bg-[#0080FF]`}>
              Available
            </Button>
          </div>
          <div className={`w-[50%] h-full flex items-center justify-end `}>
            <h3
              className={`md:text-base md:mx-2 font-bold text-[#0080FF] xs:text-sm sm:mx-1`}
            >
              {price ? price : 0}
            </h3>
            {/* {chain.toLowerCase() == "polygon" ?? <Matic fontSize={"1rem"} />}
           {chain.toLowerCase() == "ethereum" ?? <EthColored fontSize={"1rem"} />} */}
            <Matic fontSize={"1rem"} />
          </div>
        </div>
      </div>
      {/* <div className = {`absolute w-full h-[2rem] bottom-0 left-0 bg-[#0000ff]`}></div> */}
    </div>
    // </Link>
  );
}

export default NFTCard;
