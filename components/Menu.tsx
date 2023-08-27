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
} from "@heroicons/react/outline";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { activateHamburger, deactivateHamburger } from "./reducers/action";
// import shortenAddress from "../utils/shortenAddress"
import { ConnectButton } from "@rainbow-me/rainbowkit";

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

  const _storedAddress = useSelector((state: any) => state.connectedAddress);

  return (
    <div className={hamburgerState ? styles.menu : styles.menuActive}>
      {hamburgerState && (
        <>
          <Link href="/#home">
            <div className={`${styles.menuDiv}`} onClick={handleBurgerState}>
              <HomeIcon className={styles.ChevronUpIcon} />
              <h1>Home</h1>
            </div>
          </Link>
          <Link href="/#about">
            <div className={`${styles.menuDiv}`} onClick={handleBurgerState}>
              <PhotographIcon className={styles.ChevronUpIcon} />
              <h1>My Assets</h1>
            </div>
          </Link>
          <Link href="/#portfolio">
            <div className={`${styles.menuDiv}`} onClick={handleBurgerState}>
              <CashIcon className={styles.ChevronUpIcon} />
              <h1>Sell</h1>
            </div>
          </Link>
          <Link href="/#skills">
            <div className={`${styles.menuDiv}`} onClick={handleBurgerState}>
              <CogIcon className={styles.ChevronUpIcon} />
              <h1>Skills</h1>
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
