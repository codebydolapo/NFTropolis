import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/items.module.css'
import { activateCheckoutPopup } from './reducers/action';
import { addItem } from './reducers/action'
import { useEffect, useState, useMemo} from 'react';
// import getNFTURL from '../utils/getNFTURL';


interface Collection {
    description: string,
    image: any,
    name: string,
    index: string,
    price: string,
    isOwned: boolean
    // listingStatus: any
}

function NFTCard({ description, image, name, price}: any) {

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
            // index,
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

    useEffect(()=>{
        // if(Number(index) == 1){
            // temp()
        // }
    }, [Window])

    // async function temp(){
    //     const response = await getNFTURL(Window, index)
    //         console.log(response)
    // }




    return (
        //  <Link href = '/item/item'>

        <div className={`md:w-[18rem] md:h-[29rem] rounded-xl bg-[#ffffff] md:m-3 relative xs:w-[48%] xs:min-h-[20rem] xs:my-5 cursor-pointer ${styles.item}`} onClick={handleCheckout}>
            <div className={`md:w-[18rem] md:h-[18rem] rounded-tl-xl rounded-tr-xl overflow-hidden xs:w-full xs-h-[95vw]`}>
                <img className={`rounded-tl-xl rounded-tr-xl md:w-auto md:h-full xs:w-full xs:h-auto ${styles.image}`} alt='' src={image} />
            </div>
            <div className={`w-full h-[11rem] flex flex-col items-center justify-around`}>
                <div className={`w-full md:h-[30%] px-2 flex items-center justify-start xs:h-[23%]`}>
                    <h3 className={`text-sm text-[#000] font-bold`}>{name}</h3>
                </div>
                <div className={`w-full md:h-[40%] px-3 flex flex-col items-start justify-center xs:h-[50%]`}>
                    {/* <h3 className={`text-xs`}>Price</h3>
                    <h3 className={`text-xs font-bold`}>20ETH</h3> */}
                    <h3 className={`md:text-sm text-[#000000e7] overflow-hidden xs:text-xs`}>{truncateString(description, 95)}</h3>
                </div>
                <div className={`w-full md:h-[30%] px-3 flex items-center justify-end border-t-[1px] border-grey xs:h-[23%]`}>
                    {/* <h3 className={`text-[0.75rem] font-extralight text-[#000000d3]`}>Ends In 5 Days</h3> */}
                    <div className={`w-[50%] h-full flex items-center justify-start`}>
                           <div className={`w-[7rem] h-[2rem] rounded-md bg-[#00ff00] flex items-center justify-center`}>
                                <p className={`text-sm text-white`}>Available</p>
                            </div>
                    </div>
                    <div className={`w-[50%] h-full flex items-center justify-end`}>
                        <h3 className={`md:text-base font-bold text-[#0080FF] xs:text-sm`}>{price} MATIC</h3>
                        <img className={`md:w-9 md:h-7 rounded-full xs:w-7 xs:h-5`} src={`/icons/polygonLogo.jpg`} alt={``} />
                    </div>
                </div>
            </div>
            {/* <div className = {`absolute w-full h-[2rem] bottom-0 left-0 bg-[#0000ff]`}></div> */}
        </div>
        // </Link>
    )
}

export default NFTCard