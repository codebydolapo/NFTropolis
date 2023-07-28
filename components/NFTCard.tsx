import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/items.module.css'
import { activateCheckoutPopup } from './reducers/action';
import { addItem } from './reducers/action'
import { useEffect } from 'react';
import getOffer from '../utils/getOffer';

interface Collection {
    description: string,
    image: string,
    name: string,
    index: string,
    price: string
}

function NFTCard({ description, image, name, price, index }: Collection) {

    let listingStatus: any

    const dispatch = useDispatch()

    let Window: any;

    useEffect(() => {
        Window = (window as any).ethereum
    }, [])

    function handleCheckout() {
        dispatch(activateCheckoutPopup())
        dispatch(addItem({
            image,
            name,
            index,
            price,
            description
        }))
    }

    function truncateString(str: string, length: number) {
        if (str.length <= length) {
            return str; // No truncation needed
        } else {
            return str.slice(0, length) + "..."; // Truncate and add ellipsis
        }
    }

    useEffect(() => {
        temp(Window)
    }, [])

    async function temp(Window: any){
        if(Number(index) == 1){
            const offer = await getOffer(Window, index)
            console.log(offer)
        }
    }



    return (
        //  <Link href = '/item/item'>

        <div className={`md:w-[18rem] md:h-[29rem] rounded-xl bg-[#ffffff] md:m-5 relative xs:w-[95%] xs:min-h-[25rem] xs:my-5 cursor-pointer ${styles.item}`} onClick={handleCheckout}>
            <div className={`md:w-[18rem] md:h-[18rem] rounded-tl-xl rounded-tr-xl overflow-hidden xs:w-full xs-h-[95vw]`}>
                <img className={`rounded-tl-xl rounded-tr-xl md:w-auto md:h-full xs:w-full xs:h-auto ${styles.image}`} alt='' src={image} />
            </div>
            <div className={`w-full h-[11rem] flex flex-col items-center justify-around`}>
                <div className={`w-full h-[30%] px-2 flex items-center justify-start`}>
                    <h3 className={`text-sm text-[#000] font-bold`}>#{name}</h3>
                </div>
                <div className={`w-full h-[40%] px-3 flex flex-col items-start justify-center`}>
                    {/* <h3 className={`text-xs`}>Price</h3>
                    <h3 className={`text-xs font-bold`}>20ETH</h3> */}
                    <h3 className={`text-sm text-[#000000e7] overflow-hidden`}>{truncateString(description, 95)}</h3>
                </div>
                <div className={`w-full h-[30%] px-3 flex items-center justify-end border-t-[1px] border-grey`}>
                    {/* <h3 className={`text-[0.75rem] font-extralight text-[#000000d3]`}>Ends In 5 Days</h3> */}
                    <div className={`w-[50%] h-full flex items-center justify-start`}>
                        {true ?
                            <div className={`w-[7rem] h-[2rem] rounded-md bg-[#ff0000] flex items-center justify-center`}>
                                <p className={`text-sm text-white`}>Bought</p>
                            </div>
                            :
                            <div className={`w-[7rem] h-[2rem] rounded-md bg-[#00ff00] flex items-center justify-center`}>
                                <p className={`text-sm text-white`}>Available</p>
                            </div>
                        }
                    </div>
                    <div className={`w-[50%] h-full flex items-center justify-end`}>
                        <h3 className={`text-base font-bold text-[#0080FF]`}>{price}</h3>
                        <img className={`w-9 h-7 rounded-full`} src={`/icons/polygonLogo.jpg`} alt={``} />
                    </div>
                </div>
            </div>
            {/* <div className = {`absolute w-full h-[2rem] bottom-0 left-0 bg-[#0000ff]`}></div> */}
        </div>
        // </Link>
    )
}

export default NFTCard