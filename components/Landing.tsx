import Link from 'next/link'
import styles from '../styles/landing.module.css'
import LandingCards from './LandingCards'
// import { categories } from '../data/categories.js'
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
                <MarketplaceBody />
            </div>
        </div>
    )
}

export default Landing

//<div className = {``}></div>