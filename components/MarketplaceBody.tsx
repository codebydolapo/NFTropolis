import styles from '../styles/collectionsbody.module.css'
import { StarIcon, ShareIcon, DotsHorizontalIcon } from '@heroicons/react/solid'
import { GlobeAltIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import NFTCard from './NFTCard';
import Checkout from './Checkout';
import { useDispatch } from 'react-redux';
// import { marketplaceContract } from './reducers/reducer';
// import { useState } from 'react';
import fs from "fs";
import metadata from '../data/data.json'


function MarketplaceBody() {

    let randomNumber;

    interface Props {
        name: string,
        description: string,
        image: string,
        price: string,
        index: number
    }


    const [NFTs, setNFTs] = useState(metadata)


    const category = useSelector((state: any) => { return state.category })
    const account = useSelector((state: { account: string }) => { return state.account })
    const checkoutPopupState = useSelector((state: { checkoutPopupState: boolean }) => { return state.checkoutPopupState })

    // useEffect(() => {
    //     if (account) {
    //         // for(let i = 0; i < 46; i++){
    //         //     marketplace.getTokenURL(i)
    //         //         .then((data: any) => {
    //         //             arr.push(data)
    //         //             // console.log(data)
    //         //         })
    //         // }
    //         // console.log(arr)
    //         // console.log("hello")

    //         // let architecture: Props[], digitalArt: any, nature: any, space: any
    //         category == "architecture" ? setNFTs(architecture) :
    //             category == "digitalart" ? setNFTs(digitalArt) :
    //                 category == "nature" ? setNFTs(nature) :
    //                     category == "space" ? setNFTs(space) : null
    //     }

    //     // }
    // }, [account]);



    return (
        <>{
            account || true ?
                <div className={`w-full min-h-[100vh] h-auto flex flex-col items-center`}>

                    <div className={`w-full h-auto relative mb-[2rem]`}>
                        <img className={`w-full h-auto`} alt='' src='/images/bannerSlim2.jpg' />
                        <img className={`md:w-[15rem] h-auto absolute bottom-[-2rem] rounded-bottom md:left-[3rem] border-8 border-white rounded-xl xs:w-[7rem] xs:left-[1rem]`} alt='' src='/images/collectionImage.png' />
                    </div>

                    {/* banner up */}

                    <div className={`md:w-[95%] min-h-1/2 h-auto flex flex-col justify-start items-center xs:w-full`}>
                        <div className={`w-full h-[4rem] flex flex-row`}>

                            <div className={`w-1/2 h-full flex items-center justify-start md:pl-3 xs:p-2 `}>
                                <h1 className={`md:text-4xl font-extrabold text-[#000000c2] xs:text-lg`}>0xDolapo: NFT Swarm</h1>
                            </div>

                        </div>

                        {/* nft collection title up */}

                        <div className={`w-full md:min-h-[2rem] md:h-auto md:mb-2 flex flex-row items-center justify-start md:px-5 xs:min-h-[2rem] xs:px-2 overflow-x-scroll ${styles.detailDiv}`}>
                            <div className={`min-w-[5rem] w-auto h-[2rem] md:mr-7 flex items-end justify-start`}>
                                <h1 className={`md:text-[1rem] text-[#353840] overflow-hidden xs:text-[0.75rem]`}>Items<b className={`text-[#1da1f2]`}>: {NFTs.length}</b></h1>
                            </div>
                            <div className={`md:min-w-[5rem] w-auto h-[2rem] mr-7 flex items-end justify-start xs:min-w-[9rem]`}>
                                <h1 className={`md:text-[1rem] text-[#353840] overflow-hidden xs:text-[0.75rem]`}>Created<b>: December 2022</b></h1>
                            </div>
                            <div className={`md:min-w-[5rem] w-auto h-[2rem] md:mr-7 flex items-end justify-start xs:min-w-[9rem]`}>
                                <h1 className={`md:text-[1rem] text-[#353840] overflow-hidden xs:text-[0.75rem]`}>Creator Fee<b>: 0%</b></h1>
                            </div>
                            <div className={`md:min-w-[5rem] w-auto h-[2rem] md:mr-7 flex items-end justify-start xs:min-w-[9rem]`}>
                                <h1 className={`md:text-[1rem] text-[#353840] overflow-hidden xs:text-[0.75rem]`}>Chain<b className={`text-[#1da1f2]`}>: Polygon: Mumbai</b></h1>
                            </div>

                        </div>

                    </div>


                    {/* nft collection container menu up */}


                    <div className={`w-full min-h-[50vh] h-auto flex flex-col justify-start items-center `}>

                        {/* nft collection display settings up */}

                        <div className={`w-full min-h-[70vh] h-auto flex`}>
                            <div className={`md:w-[100%] min-h-[33rem] h-auto flex flex-wrap items-center justify-around md:px-5 xs:w-[100%] relative ${styles.itemsContainer}`}>
                                {!checkoutPopupState && NFTs.map(({ description, image, name, value, index, price }: any) => {
                                    return <NFTCard
                                        description={description}
                                        image={image}
                                        name={name}
                                        key={index}
                                        index={index}
                                        price={price}
                                    />
                                })}
                                {checkoutPopupState && <Checkout />}
                            </div>
                        </div>
                    </div>

                </div> :
                <div className={`flex justify-center items-center`}>
                    <h1>404</h1>
                </div>
        }
        </>
    )
}

export default MarketplaceBody