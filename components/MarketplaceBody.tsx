import styles from "../styles/collectionsbody.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import Checkout from "./Checkout";
import { Nft, BaseNft } from "alchemy-sdk";
// import { Nft, BaseNft} from "alchemy-sdk";
import useFetchPrice from "./utils/useFetchPrice";


function MarketplaceBody() {
  const [NFTs, setNFTs] = useState<Nft[]>([]);

  const checkoutPopupState = useSelector(
    (state: { checkoutPopupState: boolean }) => {
      return state.checkoutPopupState;
    }
  );


  const NFTData = useSelector((state: { NFTData: Nft[] }) => { return state.NFTData });

  useEffect(() => {
    setNFTs(NFTData);
  }, [NFTData]);

  return (
    <>
      <div
        className={`w-full min-h-[100vh] h-auto flex flex-col items-center relative mt-[60px]`}
      >
        <div className={`w-full h-auto relative mb-[2rem]`}>
          <img
            className={`w-full h-auto`}
            alt=""
            src="/images/bannerSlim2.jpg"
          />
          <img
            className={`md:w-[15rem] h-auto absolute bottom-[-2rem] rounded-bottom md:left-[3rem] border-8 border-white rounded-xl xs:w-[7rem] xs:left-[1rem]`}
            alt=""
            src="/images/collectionImage.png"
          />
        </div>

        {/* banner up */}

        <div
          className={`md:w-[95%] min-h-1/2 h-auto flex flex-col justify-start items-center xs:w-full`}
        >
          <div className={`w-full h-[4rem] flex flex-row`}>
            <div
              className={`w-1/2 h-full flex items-center justify-start md:pl-3 xs:p-2 `}
            >
              <h1
                className={`md:text-4xl font-extrabold text-[#000000c2] xs:text-lg`}
              >
                0xDolapo: NFT Swarm
              </h1>
            </div>
          </div>

          {/* nft collection title up */}

          <div
            className={`w-full md:min-h-[2rem] md:h-auto md:mb-2 flex flex-row items-center justify-start md:px-5 xs:min-h-[2rem] xs:px-2 overflow-x-scroll ${styles.detailDiv}`}
          >
            <div
              className={`min-w-[5rem] w-auto h-[2rem] md:mr-7 flex items-end justify-start`}
            >
              <h1
                className={`md:text-[1rem] text-[#353840] overflow-hidden xs:text-[0.75rem]`}
              >
                Items<b className={`text-[#1da1f2]`}>: {NFTs.length}</b>
              </h1>
            </div>
            <div
              className={`md:min-w-[5rem] w-auto h-[2rem] mr-7 flex items-end justify-start xs:min-w-[9rem]`}
            >
              <h1
                className={`md:text-[1rem] text-[#353840] overflow-hidden xs:text-[0.75rem]`}
              >
                Created<b>: Dec 2022</b>
              </h1>
            </div>
            <div
              className={`md:min-w-[5rem] w-auto h-[2rem] md:mr-7 flex items-end justify-start xs:min-w-[9rem]`}
            >
              <h1
                className={`md:text-[1rem] text-[#353840] overflow-hidden xs:text-[0.75rem]`}
              >
                Creator Fee<b>: 0%</b>
              </h1>
            </div>
            <div
              className={`md:min-w-[5rem] w-auto h-[2rem] md:mr-7 flex items-end justify-start xs:min-w-[9rem]`}
            >
              <h1
                className={`md:text-[1rem] text-[#353840] overflow-hidden xs:text-[0.75rem]`}
              >
                Chain<b className={`text-[#1da1f2]`}>: Polygon: Mumbai</b>
              </h1>
            </div>
          </div>
        </div>

        {/* nft collection container menu up */}

        <div
          className={`w-full min-h-[50vh] h-auto flex flex-col justify-start items-center `}
        >
          {/* nft collection display settings up */}

          <div className={`w-full min-h-[70vh] h-auto flex`}>
            <div
              className={`md:w-[100%] min-h-[33rem] h-auto flex flex-wrap items-center justify-around md:px-5 xs:w-[100%] ${styles.itemsContainer}`}
            >
              {
                // !checkoutPopupState &&
                NFTs.map(({ description, raw, contract, contractMetadata, title, id, contractDeployer}: Nft | any, index) => {
                  // if (index > 6) {
                    return (
                      <NFTCard
                        description={description}
                        // tokenUri={raw.tokenUri}
                        name={title}
                        key={contractMetadata.openSea.imageUrl}
                        contract={contract}
                        // tokenId={tokenId}
                        image={contractMetadata.openSea.imageUrl}
                        raw={raw}
                        timeLastUpdated={""}
                        tokenId = {id.tokenId}
                        twitter = {contractMetadata.openSea.twitterUsername}
                        deployer = {contractDeployer}
                        collectionName = {contractMetadata.openSea.collectionName}
                      />
                    );
                  // }
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MarketplaceBody;
