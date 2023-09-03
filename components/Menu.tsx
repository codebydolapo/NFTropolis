import styles from "../styles/menu.module.css";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
// import { useSelector } from 'react-redux'
import {
  BookmarkIcon,
  HomeIcon,
  BriefcaseIcon,
  CogIcon,
  MicrophoneIcon,
  MailIcon,
  PhotographIcon,
  CashIcon,
  PencilAltIcon,
  ViewListIcon
} from "@heroicons/react/outline";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { activateHamburger, deactivateHamburger } from "./reducers/action";
// import shortenAddress from "../utils/shortenAddress"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

function Menu() {
  const hamburgerState = useSelector((state: any) => state.hamburgerState);

  const dispatch = useDispatch();

  function handleBurgerState() {
    if (hamburgerState == false) {
      dispatch(activateHamburger());
    } else if (hamburgerState == true) {
      dispatch(deactivateHamburger());
    }
  }

  const {address} = useAccount()

  function returnAddress(){
    if(address){
      return `${address}/assets`
    } else{
      alert("Please connect wallet!")
    }
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
          <Link href={`${address ? `${address}/assets`: null}`}>
            <div className={`${styles.menuDiv}`} onClick={handleBurgerState}>
              <PhotographIcon className={styles.ChevronUpIcon} />
              <h1>My Assets</h1>
            </div>
          </Link>
          <Link href="/create">
            <div className={`${styles.menuDiv}`} onClick={handleBurgerState}>
              <PencilAltIcon className={styles.ChevronUpIcon} />
              <h1>Create</h1>
            </div>
          </Link>
          <Link href="/#skills">
            <div className={`${styles.menuDiv}`} onClick={handleBurgerState}>
              <ViewListIcon className={styles.ChevronUpIcon} />
              <h1>List/Sell</h1>
            </div>
          </Link>
          <Link href="/#blog">
            <div className={`${styles.menuDiv}`} onClick={handleBurgerState}>
              <BookmarkIcon className={styles.ChevronUpIcon} />
              <h1>Blog</h1>
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
