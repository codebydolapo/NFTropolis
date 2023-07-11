import Link from "next/link"
import { useDispatch } from "react-redux"
import { changeCategory } from "./reducers/action"

function LandingCards({ image, name, floorPrice }: any) {

    const dispatch = useDispatch()

    return (
        <Link href = "/marketplace">
        <div className={`lg:min-w-[15rem] lg:w-[15rem] lg:h-[15rem] md:hover:scale-[105%] ease duration-[200ms] lg:mx-3 lg:my-3 relative rounded-xl xs:my-3 xs:min-w-[98vw] xs:w-[98vw] xs:h-[98vw]`} onClick = {()=>dispatch(changeCategory(name.toLowerCase()))}>
            <img className={`w-full h-auto rounded-[inherit] cursor-pointer`} src={image} alt='' />
            <div className={`w-full h-[30%] bg-[#111111c0] absolute bottom-0 rounded-b-[inherit] flex items-center justify-center flex-col`}>
                <div className={`w-full h-1/2 flex items-center justify-between`}>
                    <div className={`w-full h-full flex items-center justify-start px-2`}>
                        <h1 className={`text-white font-extrabold lg:text-3xl xs:text-2xl`}>{name}</h1>
                        <img className={`w-5 h-5 rounded-full mx-2`} src={`/icons/verified.jpg`} alt={``} />
                    </div>
                </div>
                <div className={`w-full h-1/2 flex items-center justify-start px-2`}>
                    <h1 className={`text-white text-base`}>Floor Price: {floorPrice}</h1>
                    <img className={`w-5 h-5 rounded`} src={`/icons/ether.png`} alt={``} />
                </div>
            </div>
        </div>
        </Link>
    )
}

export default LandingCards