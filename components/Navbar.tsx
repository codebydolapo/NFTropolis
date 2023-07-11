import { UserCircleIcon, CreditCardIcon, SearchIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { saveAccount } from './reducers/action'
import { marketplaceAddress } from '../src/marketplaceAddress'
import { minterAddress } from '../src/minterAddress'
// import minterABI from '../artifacts/contracts/Minter.sol/Minter.json'
// import marketplaceABI from '../artifacts/contracts/Marketplace.sol/Marketplace.json'
import { saveMarketplaceContract, saveMinterContract, saveAccount } from './reducers/action'
// import { Marketplace } from '../typechain-types/contracts/Marketplace'
// import { Minter } from '../typechain-types/contracts/Minter'
// import { useDisconnect, useAddress, useMetamask } from '@thirdweb-dev/react'


function Navbar() {



    const dispatch = useDispatch()

    const [connectSwitch, setconnectSwitch] = useState(false)
    const [account, setAccount] = useState("")
    // const [network, setNetwork] = useState("")



    // useEffect(() => {
    //     let Window: any = window
    //     if (connectSwitch && Window.ethereum !== undefined) {
    //         setAccount("")
    //         dispatch(saveAccount(""))
    //         dispatch(saveMarketplaceContract(null))
    //         dispatch(saveMinterContract(null))

    //         let provider = Window.ethereum
    //         let ethersProvider = new ethers.providers.Web3Provider(provider);

    //         Window.ethereum.request({ method: "eth_requestAccounts" })
    //             .then((accounts: any) => {
    //                 setAccount(accounts[0])
    //                 dispatch(saveAccount(accounts[0]))
    //                 console.log(accounts[0])
    //             })
    //             .catch((err: any) => console.log(err))

    //         let signer = ethersProvider.getSigner()

    //         // const minter: any | undefined = new ethers.Contract(minterAddress, minterABI.abi, signer)
    //         // const marketplace: any | undefined = new ethers.Contract(marketplaceAddress, marketplaceABI.abi, signer)


    //         if (marketplace) {
    //             dispatch(saveMarketplaceContract(marketplace))
    //             dispatch(saveMinterContract(minter))
    //             // console.log(marketplace)
    //             // console.log(account)
    //         }

    //     } else if (connectSwitch && Window.ethereum == undefined) {
    //         alert("Please Download Metamask")
    //     }
    //     setconnectSwitch(false)
    // }, [connectSwitch])



    function connectMetamask() {
        setconnectSwitch(true)
    }


    return (
        <div className={`w-full h-[60px] flex flex-row space-between md:pl-[4rem] md:pr-[2rem]`}>
            <div className={`w-[55%] h-full flex items-center justify-between`}>
                <div className={`md:w-[30%] h-full flex items-center md:justify-center xs:w-[100%] xs:justify-start`}>
                    <img className={`md:w-[40px] h-[40px] rounded-full md:mx-2 xs:w-[40px] xs:h-[40px] xs:mx-1`} alt='' src='/icons/logo.jpg' />
                    <h1 className={`font-extrabold md:text-5xl text-[#1c1e21ea] xs:text-2xl`}><b className={`text-[#1da1f2]`}>E</b>nefti</h1>
                </div>
                <div className={`w-[67%] h-[80%] flex items-center justify-between border-2 border-grey rounded-lg md:visible xs:hidden`}>
                    <div className={`w-[3rem] h-full flex justify-center items-center cursor-pointer`}>
                        <SearchIcon className={`w-[1.5rem] text-[#1c1e21c5] `} />
                    </div>
                    <input className={`w-auto min-w-[80%] h-full outline-0 border-0 pl-3`} placeholder='Search for colections, lists and NFTs' />
                    <div className={`w-[3rem] h-full flex justify-center items-center cursor-pointer`}>
                        <XIcon className={`w-[1.5rem] text-[#1c1e21c5]`} />
                    </div>
                </div>
            </div>
            <div className={`w-[45%] h-full flex md:justify-center xs:justify-end`}>
                <div className={`md:w-[75%] h-full flex justify-between xs:w-0`}>
                    <Link href='/'>
                        <div className={`w-[24%] h-full flex items-center justify-center cursor-pointer`}>
                            <h1 className={`lg:text-[0.9rem] hover:scale-[102%] ease font-extrabold text-[#1c1e21e0] xs:text-[0rem]`}>Home</h1>
                        </div>
                    </Link>
                    <Link href='/marketplace'>
                        <div className={`w-[24%] h-full flex items-center justify-center cursor-pointer`}>
                            <h1 className={`lg:text-[0.9rem] hover:scale-[102%] ease font-extrabold text-[#1c1e21e0] xs:text-[0rem]`}>Marketplace</h1>
                        </div>
                    </Link>
                    <div className={`w-[24%] h-full flex items-center justify-center cursor-pointer`}>
                        <h1 className={`lg:text-[0.9rem] hover:scale-[102%] ease font-extrabold text-[#1c1e21e0] xs:text-[0rem]`}>Create</h1>
                    </div>
                    {/* <div className={`w-[24%] h-full flex items-center justify-center cursor-pointer`}>
                        <h1 className={`md:text-[0.9rem] font-extrabold text-[#1c1e21e0] xs:text-[0rem]`}>CREATE</h1>
                    </div> */}
                </div>
                <div className={`md:w-[25%] h-full flex md:mx-0 xs:mx-2 xs:w-full justify-center items-center `}>
                    {account !== "" ?
                        <div className={`w-[12rem] md:h-[45px] bg-[#1da1f2] rounded-lg xs:h-[45px] xs:w-[100%] flex justify-center items-around cursor-pointer`} onClick={connectMetamask}>
                            <h1 className={`text-white lg:text-base xs:text-sm flex justify-center items-center`}>{`${account.slice(0, 6)}...${account.slice(38, 42)}`}</h1>
                        </div>
                        :
                        <div className={`w-[12rem] md:h-[45px] bg-[#1da1f2] rounded-lg xs:h-[45px] xs:w-[100%] flex justify-center items-around cursor-pointer`} onClick={connectMetamask}>
                            <h1 className={`text-white lg:text-base xs:text-sm flex justify-center items-center`}>Connect Wallet</h1>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar