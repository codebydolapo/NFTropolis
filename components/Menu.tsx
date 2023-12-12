import styles from "../styles/menu.module.css";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
// import { useSelector } from 'react-redux'
import {
  BookmarkIcon,
  HomeIcon,
  LockClosedIcon,
  BriefcaseIcon,
  CogIcon,
  MicrophoneIcon,
  MailIcon,
  PhotographIcon,
  CashIcon,
  PencilAltIcon,
  ViewListIcon,
  OfficeBuildingIcon,
  CreditCardIcon
} from "@heroicons/react/outline";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { activateHamburger, deactivateHamburger } from "./reducers/action";
// import shortenAddress from "../utils/shortenAddress"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/router'

function Menu() {
  const hamburgerState = useSelector((state: any) => state.hamburgerState);

  const router = useRouter();

  const dispatch = useDispatch();

  const { address } = useAccount();


  function handleBurgerState() {
    if (hamburgerState == false) {
      dispatch(activateHamburger());
    } else if (hamburgerState == true) {
      dispatch(deactivateHamburger());
    }
  }

  const handleRefresh = () => {
    if (address) {
      router.push(`${address}/assets`)
    } else {
      toast.error("Please connect your wallet!");
    }
  };

  function handleAssetsLinking(){
    handleRefresh()
    handleBurgerState() 
  }

  return (
    <div className={hamburgerState ? styles.menu : styles.menuActive}>
      {hamburgerState && (
        <>
          <Link href="/">
            <div className={`${styles.menuDiv}`} onClick={handleBurgerState}>
              <HomeIcon className={styles.ChevronUpIcon} />
              <h1>Home</h1>
            </div>
          </Link>
          <Link href="/list">
            <div className={`${styles.menuDiv}`} onClick={handleBurgerState}>
              <ViewListIcon className={styles.ChevronUpIcon} />
              <h1>List/Sell</h1>
            </div>
          </Link>
          {/* <Link onClick = {handleRefresh}> */}
            <div className={`${styles.menuDiv}`} onClick={handleAssetsLinking}>
              <PhotographIcon className={styles.ChevronUpIcon} />
              <h1>My Assets</h1>
            </div>
          {/* </Link> */}
          <Link href="/create">
            <div className={`${styles.menuDiv}`} onClick={handleBurgerState}>
              <LockClosedIcon className={styles.ChevronUpIcon} />
              {/* <PencilAltIcon className={styles.ChevronUpIcon} /> */}
              <h1>Create</h1>
            </div>
          </Link>
          <Link href="/faucet">
            <div className={`${styles.menuDiv}`} onClick={handleBurgerState}>
              <CreditCardIcon className={styles.ChevronUpIcon} />
              <h1>Faucet</h1>
            </div>
          </Link>
          <Link href="">
            <div className={`${styles.menuDiv}`} onClick={handleBurgerState}>
              <MailIcon className={styles.ChevronUpIcon} />
              <h1>Contact</h1>
            </div>
          </Link>
          <section
            className={`w-[12rem] h-[45px] lg:text-sm xs:text-xs flex justify-center items-center rounded-lg text-[#fff]`}
          >
            <ConnectButton
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              showBalance={{
                smallScreen: false,
                largeScreen: false,
              }}
              // label = "Connect"
            />
          </section>
        </>
      )}
    </div>
  );
}

export default Menu;
