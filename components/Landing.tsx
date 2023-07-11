import Link from 'next/link'
import styles from '../styles/landing.module.css'
import LandingCards from './LandingCards'
import { categories } from '../data/categories.js'
import MarketplaceBody from './MarketplaceBody'

function Landing() {

    interface Props {
        image: string,
        name: string,
        floorPrice: string,
        index: string
    }


    return (
        <div className={`w-full h-[100vh] ${styles.landing}`}>
            <div className={`w-full h-full flex flex-col ${styles.backdrop}`}>
                {/* <div className={`w-full md:h-[20%] flex items-center justify-center xs:h-[10%]`}>
                    <h1 className={`md:text-4xl font-bold xs:text-xl test-center`}>Explore, Collect And Sell NFTs</h1>
                </div> */}
                {/* <Link href="/marketplace">
                    <div className={`w-full h-[80%] flex flex-wrap items-center`}>
                        {categories.map(({ image, name, index, floorPrice }: Props) => {
                            return <LandingCards
                                image={image}
                                name={name}
                                key={index}
                                floorPrice={floorPrice}
                            />
                        })}
                    </div>
                </Link> */}
                <MarketplaceBody/>
                {/* <div className={`md:w-1/2 md:h-full flex items-center justify-center md:pb-0 xs:w-[100vw] xs:min-h-[50vh] md:my-0 xs:my-5 xs:mb-7 xs:pb-8`}>
                    <div className={`w-full min-h-[40%] h-auto flex flex-col md:mb-0 md:items-start justify-center md:pl-10 xs:mb-5 xs:items-center`}>
                        <h1 className={`text-white tracking-wider text-8xl font-extrabold my-2 border-b-[5px] border-white ${styles.title}`}><b className={`text-[#1877f2]`}>E</b>nefti</h1>
                        <p className={`text-white md:text-2xl my-2 tracking-wide md:text-left xs:text-center xs:text-xl`}>Discover, Buy, Sell And Trade Extraordinary NFTs...</p>
                        <p className={`text-[#ffffffaf] text-sm my-2 font-lighter md:text-left xs:text-center`}>Enefti Is The First And Largest NFT collection In The World</p>
                        <div className={`w-full h-[3.5rem] my-4 flex items-center md:justify-start xs:justify-center`}>
                            <Link href='/collections/0x2cb5aD4e8060719781F9BaA94493B4BcD2AdF1Ba'>
                                <button className={`w-[10rem] h-[2.5rem] text-lg text-white bg-[#1877f2] mr-8 rounded-lg font-bold tracking-wide`}>Explore</button>
                            </Link>
                            <Link href='/collections/0x2cb5aD4e8060719781F9BaA94493B4BcD2AdF1Ba'>
                                <button className={`w-[10rem] h-[2.5rem] text-lg text-white bg-[#575757ec] rounded-lg font-bold tracking-wide`}>Create</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={`md:w-1/2 md:h-full flex justify-center items-start pt-10 xs:w-full xs:min-h-[50vh]`}>
                    <img className={`md:w-[50%] h-auto xs:w-[95%] rounded-tr-xl rounded-bl-xl rounded-tl-[5rem] rounded-br-[5rem] ${styles.heroImage}`} alt='' src='/images/homepageApe.webp' />
                </div> */}
            </div>
        </div>
    )
}

export default Landing

//<div className = {``}></div>