//this component works with the items page in pages/item/items
import {
  ClockIcon,
  XIcon,
} from "@heroicons/react/outline";
import { EyeIcon, HeartIcon, TagIcon, CashIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import styles from "../styles/checkout.module.css";
// import { marketplaceAddress } from '../src/marketplaceAddress'
import { useDispatch } from "react-redux";
import { deactivateCheckoutPopup } from "./reducers/action";
import { addItem } from "./reducers/action";
import { ethers } from "ethers";
import { nfTropolisAddress } from "../src/nfTropolisAddress";
import { saveCheckoutData } from "./reducers/action";
import { Matic } from "@web3uikit/icons";
import { Twitter } from "lucide-react";
import useBuyItem from "./utils/useBuyItem";
import { useAccount } from "wagmi";

function Checkout() {

  
  const { address } = useAccount();
  
  const dispatch = useDispatch();
  
  
  
  const {
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
    owner,
    collectionName
  } = useSelector((state: { checkoutData: any }) => {
    return state.checkoutData;
  });
  
  const { purchaseItem } = useBuyItem(contract.address, tokenId, address)


  async function handlePurchase() {
    if (address) {
      purchaseItem()
    } else {
      alert("Please Connect Wallet!");
    }
  }

  function closePopup() {
    dispatch(deactivateCheckoutPopup());
    dispatch(saveCheckoutData({}));
  }

  function truncateString(length: number, str?: any): string | undefined {
    if (str?.length <= length) {
      return str; // No truncation needed
    }
    else {
      return str?.slice(0, length) + "..."; // Truncate and add ellipsis
    }
  }


  //ADD RATING FUNCTIONALITY FROM MUI

  return (
    <div
      className={`md:w-[100%] h-auto flex md:flex-row md:mt-[30px] md:top-[5vh] bg-white xs:flex-col xs:h-[100vh] xs:w-[98%] absolute m-auto left-0 right-0 top-0 bottom-0 rounded-lg xs:top-[50px] ${styles.checkout}`}
    >
      <div
        className={`md:w-[40%] md:h-[100%] flex justify-center md:items-start pt-10 xs:w-[100%] xs:mb-4 xs:items-center xs:h-[45%] overflow-hidden `}
      >
        <img
          className={`w-[98%] h-auto rounded-xl ${styles.image}`}
          alt=""
          src={image}
        />
      </div>

      <div
        className={`md:w-[60%] md:h-[100vh] flex flex-col items-center md:justify-start md:pt-10 xs:w-[100%] xs:h-[55%] xs:overflow-scroll xs:justify-center {styles.checkoutDetails}`}
      >
        <div
          className={`w-full h-[12%] flex flex-row items-center justify-between`}
        >
          <div
            className={`w-[50%] h-full flex px-5 justify-start items-center`}
          >
            <h1
              className={`text-[#1da1f2] mr-1 md:text-xl font-bold xs:text-lg`}
            >
              0xDolapo: {collectionName}
            </h1>
            <img
              className={`md:w-8 h-auto xs:w-5`}
              alt=""
              src="/icons/verified.jpg"
            />
          </div>

          <div className={`w-[50%] h-full px-5 flex  justify-end items-center`}>
            <div
              className={`w-[12rem] h-[3rem] border-[1px] border-grey flex rounded-lg overflow-hidden`}
              onClick={closePopup}
            >
              <div
                className={`w-[75%] h-full flex items-center justify-center cursor-pointer`}
              >
                <h1>Close</h1>
              </div>
              <div
                className={`w-[25%] h-full flex items-center justify-center cursor-pointer`}
              >
                <XIcon className={`text-[#000000a1] w-[55%]`} />
              </div>
            </div>
          </div>
        </div>

        <div className={`w-full h-[12%] flex items-center justify-start px-5 `}>
          <h1 className={`text-4xl text-[#000000b6] font-extrabold`}>{name}</h1>
        </div>

        <div className={`w-full h-[12%] flex items-center justify-start px-5`}>
          <div className={`w-[25%] h-full flex items-center justify-start`}>
            <h1 className={`font-bold md:text-lg xs:text-sm text-[#000000a1]`}>
              Owned by {owner ? truncateString(6, owner) : truncateString(6, "0x00000000000000000000000")}
            </h1>
          </div>
          <div className={`w-[25%] h-full flex items-center justify-start`}>
            <EyeIcon className={`text-[#1da1f2] w-8 mr-1`} />
            <h1 className={`font-bold md:text-lg xs:text-sm text-[#000000a1]`}>
              {Math.floor(Math.random() * 1000)}K Views
            </h1>
          </div>
          <div className={`w-[25%] h-full flex items-center justify-start `}>
            <HeartIcon className={`text-[#fc0808a1] w-8 mr-1`} />
            <h1 className={`font-bold md:text-lg xs:text-sm text-[#000000a1]`}>
              {Math.floor(Math.random() * 100)} Favourites
            </h1>
          </div>
        </div>

        <div
          className={`w-[95%] h-[48%] rounded-xl border-2 border-grey flex flex-col items-center justify-around`}
        >
          <div
            className={`w-full h-[25%] px-5 flex items-center justify-start`}
          >
            <ClockIcon className={`text-[#00000059] w-6 mr-2`} />
            <h1 className={`font-bold text-base text-[#00000059]`}>
              Sale Ends At Epoch {Math.floor(Math.random() * 1000000)}
            </h1>
          </div>

          <div
            className={`w-full h-[75%] flex flex-col items-center border-[1px] border-grey `}
          >
            <div
              className={`w-full h-[40%] flex flex-col justify-around items-start px-5 bg-[#f5f5f5]`}
            >
              <h1 className={`font-bold text-base text-[#00000073]`}>
                Current Price
              </h1>
              <div className={`w-[5rem] flex items-center justify-around`}>

                <h1 className={`font-bold text-3xl text-[#000000d2] `}>
                  {price ? price : 0.000}
                </h1>
                <Matic fontSize={"2rem"} />
              </div>
            </div>

            <div
              className={`w-full h-[60%] bg-[#f5f5f5] px-5 flex justify-start items-center`}
            >
              <div
                className={`w-[12rem] h-[4rem] border-2 border-grey rounded-xl mr-2 bg-[#1da1f2] flex items-center justify-center cursor-pointer`}
              onClick={handlePurchase}
              >
                <CashIcon className={`text-white w-9 mr-2`} />
                <h1 className={`text-white text-base font-bold`}>Buy Now</h1>
              </div>
              <div
                className={`w-[12rem] h-[4rem] border-2 border-grey rounded-xl mr-2 flex items-center justify-center`}
              >
                <Twitter className={`text-[#1da1f2] w-8 mr-2`} />
                <h1 className={`text-[#1da1f2] text-base font-bold`}>
                  {twitter ? twitter : "@unknown"}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* <div className = {`w-full h-[24%]`}></div> */}
      </div>
    </div>
  );
}

export default Checkout;

//<div className = {``}></div>
