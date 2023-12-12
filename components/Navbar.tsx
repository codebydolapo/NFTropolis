import {
  UserCircleIcon,
  CreditCardIcon,
  SearchIcon,
  XIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAccount } from "./reducers/action";
// import { ConnectButton } from "web3uikit";
import styles from "../styles/navbar.module.css";
import { activateHamburger, deactivateHamburger } from "./reducers/action";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import Dropdown from "./dropdown/Dropdown";

function Navbar() {
  const dispatch = useDispatch();

  const [connectSwitch, setconnectSwitch] = useState(false);
  const [__account, setAccount] = useState("");
  // const [network, setNetwork] = useState("")

  const [connectedStatus, setConnectedStatus] = useState<boolean | undefined>(
    false
  );

  const account: any = useSelector((state: any) => {
    state.account;
  });
  // let Window: any;

  // useEffect(() => {
  //     Window = (window as any).ethereum
  // }, [account])
  // let Window = useSelector((state: any | void)=> {state.Window})

  const _connect = () => {
    Window = (window as any).ethereum;

    if (Window == undefined) {
      console.log("please install MetaMask");
      return;
    }

    const provider = new ethers.providers.Web3Provider(Window as any);

    setConnectedStatus(true);

    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) {
          // setCurrentAccount(accounts[0])
          console.log(accounts[0]);
          dispatch(saveAccount(accounts[0]));
        }
        setAccount(accounts[0]);
      })
      .catch((e) => console.log(e));
  };

  function connectMetamask() {
    setconnectSwitch(true);
  }

  const hamburgerState = useSelector((state: any) => state.hamburgerState);
  const _storedAddress = useSelector((state: any) => state.connectedAddress);

  function handleBurgerState(event: any) {
    if (hamburgerState == false) {
      dispatch(activateHamburger());
    } else if (hamburgerState == true) {
      dispatch(deactivateHamburger());
      // Check if the click target is not a descendant of the component.
    } 
  }

  ///////////////////////////////////
  // const { address } = useAccount();
  // useEffect(() => {
  //   address ?? console.log(address);
  // }, [address]);
  //////////////////////////////////

  return (
    <div
      className={`w-full h-[60px] transition duration-[500ms] ${
        hamburgerState ? "bg-[#000]" : "bg-[#fff]"
      } flex flex-row items-center space-between md:pl-[2rem] fixed top-0 left-0 z-[100] `}
    >
      <div className={`w-[50%] h-full flex items-center justify-between`}>
        <div
          className={`md:w-[30%] h-full flex items-center md:justify-center xs:w-[100%] xs:justify-start`}
        >
          <img
            className={`md:w-[40px] h-[40px] rounded-full md:mx-2 xs:w-[40px] xs:h-[40px] xs:mx-1`}
            alt=""
            src="/icons/logo.jpg"
          />
          <h1
            className={`font-extrabold md:text-4xl ${
              hamburgerState ? "text-[#fff]" : "text-[#1c1e21ea]"
            } xs:text-2xl`}
          >
            <b className={`text-[#1da1f2]`}>NFT</b>ropolis
          </h1>
        </div>
      </div>
      <div
        className={`w-[50%] h-full flex lg:justify-end xs:justify-end  items-center`}
      >
        <div
          className={`lg:w-[25%] h-full flex md:mx-0 xs:mx-2 md:w-[40%] xs:w-[70%] justify-center items-center `}
        >
          {/* {__account ?
                        <div className={`w-[12rem] md:h-[45px] bg-[#1da1f2] rounded-lg xs:h-[45px] xs:w-[100%] flex justify-center items-around cursor-pointer`}>
                            <h1 className={`text-white lg:text-base xs:text-sm flex justify-center items-center`}>{`${__account.slice(0, 6)}...${__account.slice(38, 42)}`}</h1>
                        </div>
                        :
                        <div className={`w-[12rem] md:h-[45px] bg-[#1da1f2] rounded-lg xs:h-[45px] xs:w-[100%] flex justify-center items-around cursor-pointer`} onClick={connect}>
                            <h1 className={`text-white lg:text-base xs:text-sm flex justify-center items-center`}>Connect Wallet</h1>
                        </div>
                    } */}
          {!hamburgerState && (
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
              />
            </section>
          )}
        </div>
        <div
          className={`${styles.hamburger} md:ml-[5rem] mr-[2px]`}
          onClick={handleBurgerState}
        >
          <div
            className={`${styles.lineInactive}`}
            id={`${hamburgerState && styles.line1}`}
          ></div>
          <div
            className={`${styles.middleLineInactive}`}
            id={`${hamburgerState && styles.line2}`}
          ></div>
          <div
            className={`${styles.lineInactive}`}
            id={`${hamburgerState && styles.line3}`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
