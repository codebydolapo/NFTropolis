import styles from "../styles/create.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import { Matic } from "@web3uikit/icons";
import {useAccount} from "wagmi";
import { Eth, Matic, Avax } from "@web3uikit/icons";
import _handleCreate from "../backend/_handleCreate"
import useListItem from "./utils/useListItem";
import { ViewListIcon } from "@heroicons/react/outline";
import _storeListings from "../backend/_storeListings";



function CreateBody() {

    // const { address: customerAddress } = useAccount();

    const {
        tokenId,
        price,
        priceRef,
        externalLink,
        address,
        _chain, 
        listItem,
        listNFT,
        handleNFTIdUpdate,
        handleNFTAddressUpdate,
        handleExternalLinkUpdate,
        handlePriceUpdate,
        handleChainChange 
    } = useListItem()


    // const [NFTId, setNFTId] = useState("");
    // const [price, setPrice] = useState(0);
    // const [externalLink, setExternalLink] = useState("")
    // const [NFTAddress, setNFTAddress] = useState('')
    // const [chain, setChain] = useState('Polygon');

    // const priceRef = useRef<string | number>("");


    // const handleNFTIdUpdate = (event: any) => {
    //     setNFTId(event.target.value);
    // };

    // const handleNFTAddressUpdate = (event: any) => {
    //     setNFTAddress(event.target.value);
    // };

    // const handleExternalLinkUpdate = (event: any) => {
    //     setExternalLink(event.target.value);
    // };

    // const handlePriceUpdate = (event: any) => {
    //     priceRef.current = parseInt(event.target.value)
    //     setPrice(parseInt(event.target.value));
    // };

    // const handleChainChange = (event: any) => {
    //     // const handleChainChange = (_chain: string) => {
    //     setChain(event.target.value as string);
    // }

    //this one helps me list NFTs
    //     ////////////////////
    //     const { config: listingConfig, error: listingError } = usePrepareContractWrite({
    //         address: marketplaceAddress,
    //         abi: marketplaceABI.abi,
    //         functionName: "listItem",
    //         args: [NFTAddress, NFTId, Number(ethers.utils.parseEther(`${price}`))],
    //     });

    //     const { data: listData,
    //         isLoading: isListingLoading,
    //         isSuccess: isListingSuccess,
    //         writeAsync: listNFT } = useContractWrite(listingConfig);

    //     const { data: listWaitData, isError: isListWaitError, isLoading: isListWaitLoading, isSuccess: isListWaitSuccess, } = useWaitForTransaction({
    //         hash: listData?.hash,
    //         timeout: 3_000,
    //     })
    //     //////////////////////////


    // async function listItem({ address, tokenId, _chain, price, customerAddress }: any, externalLink: string) {


    //     if (!customerAddress) {
    //         toast.error("Please connect your wallet!");
    //         return;
    //     }


    //     try {

    //         await Moralis.start({
    //             apiKey: process.env.MORALIS_API_KEY,
    //             // ...and any other configuration
    //         });

    //         // const address = "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB";

    //         const { ETHEREUM, POLYGON, AVALANCHE_TESTNET } = EvmChain;

    //         let chain;

    //         switch (_chain) {
    //             case "Ethereum":
    //                 chain = ETHEREUM
    //             case "Polygon":
    //                 chain = POLYGON
    //             case "Avalanche":
    //                 chain = AVALANCHE_TESTNET
    //             default:
    //                 chain = POLYGON;
    //         }

    //         const response: any = await Moralis.EvmApi.nft.getNFTMetadata({
    //             address,
    //             chain,
    //             tokenId,
    //         });

    //         const _response = response.toJSON().metadata
    //         const { image, name, description } = _response

    //         console.log(_response);

    //         if (response) {

    //             await _handleCreate(image, name, description, chain, price, externalLink); //fill this

    //             await listNFT?.()

    //             if (isListWaitLoading) {
    //                 console.log("Listing NFT...");
    //                 return;
    //             }

    //             if (!isListWaitError) {
    //                 console.log("NFT listed successfully!");
    //             } else {
    //                 console.log("Listing NFT failed!");
    //                 toast.success("NFT minted and listed successfully!");
    //                 return;
    //             }
    //         } else {
    //             console.log("failed to get NFT metadata")
    //         }

    //     }
    //     catch (error) {
    //         console.log(error);
    //     }


    // }



    return (
        <div className={`w-[100vw] mt-[60px] ${styles.container} animation-all transition-[500ms]`}>
            <div
                className={`w-[100%] h-[100%] md:py-[5rem] xs:py-3 overflow-y-scroll overflow-x-hidden flex flex-col items-center ${styles.backdrop}`}
            >
                <div
                    className={`md:w-[40rem] md:h-auto rounded-lg flex flex-col items-center justify-around xs:w-[100vw] xs:h-auto`}
                >

                    <div
                        className={`md:w-[90%] md:h-[3rem] rounded-lg mb-5 px-2 xs:w-[100%] xs:h-[5rem]`}
                    >
                        <h1 className={`text-white text-5xl font-extrabold`}>
                            List Your NFT
                        </h1>
                    </div>

                    <div
                        className={`md:w-[90%] px-2 flex md:items-start justify-around flex-col xs:items-center xs:w-[100%] border-b-2 border-white`}
                    >
                        <h1
                            className={`w-full text-white text-base text-left`}
                        >
                            Ethereum, Polygon, Avalanche and more...
                        </h1>
                    </div>

                    <div
                        className={`md:w-[90%] md:h-[7rem] mt-[1rem] rounded-lg px-2 flex items-start justify-around flex-col xs:w-[100%] xs:h-[10rem] animate-fadeIn duration-500 ease`}
                    >
                        <div className={`w-[100%] h-full flex items-center justify-start `}>
                            <h1
                                className={`text-white text-lg font-extrabold`}
                            >
                                NFT Address
                            </h1>
                        </div>
                        <p
                            className={`text-white text-[0.8rem] font-[500] md:my-[0.3rem]`}
                        >
                            Provide the address of your NFT
                        </p>
                        <input
                            className={`w-[98%] h-[7rem] rounded-lg border-[1px] border-[white] md:mb-3 bg-inherit outline-none px-2 text-sm text-white `}
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={handleNFTAddressUpdate}
                        />
                    </div>

                    <div
                        className={`md:w-[90%] md:h-[7rem] rounded-lg mt-[1rem] px-2 flex items-start justify-around flex-col xs:w-[100%] xs:h-[10rem] animate-fadeIn duration-500 ease`}
                    >
                        <div className={`w-[100%] h-full flex items-center justify-start `}>
                            <h1
                                className={`text-white text-lg font-extrabold`}
                            >
                                NFT ID
                            </h1>
                        </div>
                        <p
                            className={`text-white text-[0.8rem] font-[500] md:my-[0.3rem]`}
                        >
                            Provide the ID of your NFT
                        </p>
                        <input
                            className={`w-[98%] h-[7rem] rounded-lg border-[1px] border-[white] md:mb-3 bg-inherit outline-none px-2 text-sm text-white `}
                            type="Number"
                            placeholder="Id"
                            value={tokenId}
                            onChange={handleNFTIdUpdate}
                        />
                    </div>

                    {/* <div
                        className={`md:w-[90%] md:h-[7rem] rounded-lg mt-[1rem] px-2 flex items-start justify-around flex-col xs:w-[100%] xs:h-[10rem] animate-fadeIn duration-500 ease`}
                    >
                        <div className={`w-[100%] h-full flex items-center justify-start `}>
                            <h1
                                className={`text-white text-lg font-extrabold`}
                            >
                                External Link
                            </h1>
                        </div>
                        <p
                            className={`text-white text-[0.8rem] font-[500] md:my-[0.3rem]`}
                        >
                            Does your NFT have an External Link?
                        </p>
                        <input
                            className={`w-[98%] h-[7rem] rounded-lg border-[1px] border-[white] md:mb-3 bg-inherit outline-none px-2 text-sm text-white `}
                            type="text"
                            placeholder="External link"
                            value={externalLink}
                            onChange={handleExternalLinkUpdate}
                        />
                    </div> */}

                    <div
                        className={`md:w-[90%] md:h-[7rem] rounded-lg mt-[1rem] px-2 flex items-start justify-around flex-col xs:w-[100%] xs:h-[10rem] animate-fadeIn duration-500 ease`}
                    >
                        <div className={`w-[100%] h-full flex items-center justify-start `}>
                            <h1
                                className={`text-white text-lg font-extrabold`}
                            >
                                Price To Sell
                            </h1>
                        </div>
                        <p
                            className={`text-white text-[0.8rem] font-[500] md:my-[0.3rem]`}
                        >
                            State the price at which you would like to sell your NFT to potential buyers. NFTropolis will review and update our records to reflect your offer
                        </p>
                        <input
                            className={`w-[98%] h-[7rem] rounded-lg border-[1px] border-[white] md:mb-3 bg-inherit outline-none px-2 text-sm text-white `}
                            type="Number"
                            placeholder="Price"
                            value={priceRef.current}
                            onChange={handlePriceUpdate}
                        />
                    </div>

                    <div
                        className={`md:w-[88%] md:h-[4rem] rounded-lg px-2 flex items-start justify-around flex-col xs:w-[98%] xs:h-[4rem] animate-all duration-500 transition-[500ms] ease my-5 bg-white`}
                    >
                        <FormControl fullWidth variant="filled">
                            <InputLabel id="demo-simple-select-label">My NFT was deployed On: </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={_chain}
                                label="Chain"
                                onChange={handleChainChange}
                            >
                                <MenuItem value={'Polygon'}>
                                    <div className={`w-full flex items-start justify-start`}>
                                        <h1>Polygon</h1>
                                        <Matic fontSize={"1.5rem"} fontWeight={"1000"} className="mx-2" />
                                    </div>
                                </MenuItem>
                                <MenuItem value={"Ethereum"} disabled={true}>
                                    <div className={`w-full flex items-start justify-start`}>
                                        <h1>Ethereum</h1>
                                        <Eth fontSize={"1.5rem"} fontWeight={"1000"} className="mx-2" />
                                    </div>
                                </MenuItem>
                                <MenuItem value={"Avalanche"} disabled={true}>
                                    <div className={`w-full flex items-start justify-start`}>
                                        <h1>Avalanche</h1>
                                        <Avax fontSize={"1.5rem"} fontWeight={"1000"} className="mx-2" />
                                    </div>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div
                        className={`md:w-[10rem] md:h-[5rem] rounded-lg my-3 px-2 flex items-start, justify-around flex-col xs:w-[10rem] xs:h-[7rem]`}
                    >
                        <Button
                            variant="contained"
                            endIcon={<ViewListIcon className={`w-[1.5rem]`} />}
                            className={`bg-[#0080FF] capitalize text-base`}
                            onClick={() => listItem?.()}
                            // onClick={() => _storeListings(address, tokenId, price)}
                        >
                            List
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBody;
