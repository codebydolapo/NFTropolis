import type { NextPage } from "next";
import { ethers } from "ethers";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Landing from "../components/Landing";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nfTropolisAddress } from "../src/nfTropolisAddress";
import nfTropolisABI from "../artifacts/contracts/NFTropolis.sol/NFTropolis.json";
import { marketplaceAddress } from "../src/marketplaceAddress";
import marketplaceABI from "../artifacts/contracts/Marketplace.sol/Marketplace.json";
// import { minterAddress } from '../src/minterAddress'
import metadata from "../data/data.json";
import { saveNFTData, saveWindow } from "../components/reducers/action";
import { client } from "../sanity/sanity.config";
import Menu from "../components/Menu";
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useAccount,
} from "wagmi";
import getCount from "../components/hooks/useCount";
import MarketplaceBody from "../components/MarketplaceBody";

const Home = ({ nfts }: any) => {
  const [_effectState, setEffectState] = useState(true);
  let Window: any;
  const dispatch = useDispatch();

  // let dataArray: any[] = [];

  useEffect(() => {
    Window = (window as any).ethereum;
    // console.log(nfts);
    dispatch(saveNFTData(nfts))
  }, []);

  const { address } = useAccount();

  const {
    data,
    isError: countErrorState,
    isFetching: countFetchingState,
    isLoading: countLoadingState,
  } = useContractRead({
    address: nfTropolisAddress,
    abi: nfTropolisABI.abi,
    functionName: "getMintedTokenCount",
    // args: []
  });

  const { config, error } = usePrepareContractWrite({
    address: nfTropolisAddress,
    abi: nfTropolisABI.abi,
    functionName: "mintNFT",
    args: [],
  });

  const {
    data: mintData,
    isLoading,
    isSuccess,
    write,
  } = useContractWrite(config);

  useEffect(() => {
    console.log(Number(data));
    isSuccess ?? console.log(mintData);
    // }, [countFetchingState])
  }, [isSuccess]);

  
  useEffect(() => {
    // startUp();
    setEffectState(false);
    // const {data}: any = getCount();
    // console.log(data)
    // address ?? console.log(data)
  }, []);

  return (
    <div className={`font-montserrat ${styles.container}`}>
      <Head>
        <title>NFTropolis | Create</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <MarketplaceBody />
      <Menu />
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const propertyQuery = `*[_type == "mintedNFTs"][]{
    image,
    url{
    current
    },
  name,
    description[0]{
    children[0]{
      text
    }
    },
  price
  }`;

  //`https://zpwvjwqc.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22property%22%5D%5B${"tokenId"}%5D`

  const nfts: Metadata | undefined = await client.fetch(propertyQuery);

  // const metadata = {
  //   name: nfts?.name,
  //   image: nfts?.image,
  //   description: nfts?.description,
  //   external_url: nfts?.external_url
  // };

  return {
    props: {
      nfts,
      // name: nfts?.name,
      // image: nfts?.image,
      // description: nfts?.description,
    },
  };
}
//https://nftstorage.link/ipfs/bafybeigvgzoolc3drupxhlevdp2ugqcrbcsqfmcek2zxiw5wctk3xjpjwy/amazing.gif
