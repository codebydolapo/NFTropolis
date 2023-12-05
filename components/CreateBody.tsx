import styles from "../styles/create.module.css";
// import Dropzone from 'react-dropzone'
import { Button, FormControl, InputLabel, MenuItem, NativeSelect, Select } from "@mui/material";
import { EditIcon, RedoIcon, TrashIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import { Matic } from "@web3uikit/icons";
import { usePrepareContractWrite, useContractWrite, useAccount, useContractRead, useWaitForTransaction } from "wagmi";
import { Eth, Matic, Avax } from "@web3uikit/icons";
import _handleCreate from "../backend/_handleCreate"
// import createItem from "./utils/CreateItemFunction";
import _useCreateAndList from "./utils/_useCreateAndList";
import useCollectData from "./utils/useCollectData";


function CreateBody() {

  const { address } = useAccount();

  const {createItem} = _useCreateAndList();
  const {
    priceRef,
    file,
    filePath,
    listingStatus,
    chain,
    description, 
    name, 
    price,
    externalLink,
    flipEditState,
    handleChainChange,
    handleDescriptionUpdate,
    handleImageRepick,
    handleLinkUpdate,
    handleListingStatus,
    handleNameUpdate,
    handlePriceUpdate,
    handleImageRemove
} = useCollectData()


  return (
    <>
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
                Create New Item
              </h1>
            </div>
            <div
              className={`md:w-[90%] md:h-[20rem] rounded-lg px-2 flex md:items-start justify-around flex-col xs:items-center xs:w-[100%] xs:h-[30rem]`}
            >
              <h1
                className={`w-full text-white text-lg text-left font-extrabold my-[0.25rem]`}
              >
                Image, Audio, Video or 3D model
              </h1>
              <p
                className={`w-full text-white text-left text-[0.8rem] font-[300] my-[0.3rem]`}
              >
                File types supported: JPG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
                GLB, GLTF. Max size: 100Mb{" "}
              </p>
              {filePath ?
                <div className={`w-full h-full overflow-hidden  flex items-center justify-center relative object-contain`}>
                  {/* <img className={`w-[80%] h-auto hover:scale-[102%] transition-[500ms] object-contain max-h-full`} src={filePath} /> */}
                  <img className={`object-scale-down max-h-full drop-shadow-md rounded-md m-auto`} src={filePath} />
                  <div className={`w-[3rem] h-[5rem] absolute top-2 right-2 flex flex-col items-center justify-around bg-[#000000bb] border-2 border-white rounded-lg`}>
                    <RedoIcon className={`text-white cursor-pointer hover:scale-[130%] transition-[500ms]`} onClick={handleImageRepick} />
                    <TrashIcon className={`text-white cursor-pointer hover:scale-[130%] transition-[500ms]`} onClick={handleImageRemove} />
                  </div>
                </div>
                :
                <div
                  className={`md:w-[25rem] md:h-[15rem] flex flex-col items-center justify-center border-2 border-white border-dashed my-[0.25rem] rounded-lg text-white text-sm xs:w-[98vw] xs:h-[98vw] cursor-pointer`}
                  onClick={flipEditState}
                >
                  <img className={`w-[3rem] my-2`} src="/icons/upload.webp" />
                  <p>Click hotspot to upload image</p>
                </div>
              }
            </div>
            <div
              className={`md:w-[90%] md:h-[7rem] rounded-lg my-3 px-2 flex items-start, justify-around flex-col xs:w-[100%] xs:h-[7rem] `}
            >
              <h1 className={`text-white text-lg font-extrabold my-[0.25rem]`}>
                Name
              </h1>
              <input
                className={`w-[98%] h-[3rem] rounded-lg border-[1px] border-[white] my-3 bg-inherit outline-none px-2 text-sm text-white`}
                type="text"
                placeholder="Item Name"
                onChange={handleNameUpdate}
              />
            </div>
            <div
              className={`md:w-[90%] md:h-[10rem] rounded-lg my-3 px-2 flex items-start justify-around flex-col xs:w-[100%] xs:h-[10rem]`}
            >
              <h1
                className={`text-white text-lg font-extrabold md:my-[0.25rem]`}
              >
                External Link
              </h1>
              <p
                className={`text-white text-[0.8rem] font-[500] md:my-[0.3rem]`}
              >
                NFTropolis will include a link to this URL on this item's detail
                page, so that users can click to learn more about it. You are
                welcome to link your own webpage with more details
              </p>
              <input
                className={`w-[98%] h-[3rem] rounded-lg border-[1px] border-[white] md:my-3 bg-inherit outline-none px-2 text-sm text-white`}
                type="text"
                placeholder="Input external link here"
                onChange={handleLinkUpdate}
              />
            </div>
            <div
              className={`md:w-[90%] md:h-[10rem] rounded-lg my-3 px-2 flex items-start justify-around flex-col xs:w-[100%] xs:h-[7rem]`}
            >
              <h1
                className={`text-white text-lg font-extrabold my-[0.25rem]`}
              >
                Description
              </h1>

              <textarea
                className={`w-[98%] min-h-[7rem] rounded-lg border-[1px] border-[white] md:my-3 bg-inherit outline-none px-2 text-sm text-white`}
                placeholder="Provide a detailed description of your item"
                onChange={handleDescriptionUpdate}
              />
            </div>
            <div
              className={`md:w-[90%] md:h-[3rem] rounded-lg my-3 px-2 flex items-start justify-around flex-col xs:w-[100%] xs:h-[5rem]`}
            >
              <FormGroup>
                <FormControlLabel
                  control={<Switch
                    checked={listingStatus}
                    onChange={handleListingStatus}
                  />}
                  label="List NFT For Sale?"
                  className={`text-white text-lg font-extrabold`} />
              </FormGroup>
            </div>
            {listingStatus &&
              <>
                <div
                  className={`md:w-[90%] md:h-[10rem] rounded-lg px-2 flex items-start justify-around flex-col xs:w-[100%] xs:h-[10rem] animation-all transition-[500ms]`}
                >
                  <div className={`w-[100%] h-full flex items-center justify-start `}>
                    <h1
                      className={`text-white text-lg font-extrabold`}
                    >
                      Price To Sell
                    </h1>
                    <Matic fontSize={"1.5rem"} className={`mx-2`} />
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
                    <InputLabel id="demo-simple-select-label">Deploy On: </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={chain}
                      label="Chain"
                      onChange={handleChainChange}
                    >
                      <MenuItem value={'Polygon'} disabled={false}>
                        <div className={`w-full flex items-start justify-start`}>
                          <h1>Polygon</h1>
                          <Matic fontSize={"1.5rem"} fontWeight={"1000"} className="mx-2" />
                        </div>
                      </MenuItem>
                      <MenuItem value={"Ethereum"} disabled={false}>
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
              </>

            }
            <div
              className={`md:w-[10rem] md:h-[5rem] rounded-lg my-3 px-2 flex items-start, justify-around flex-col xs:w-[10rem] xs:h-[7rem]`}
            >
              <Button
                variant="contained"
                endIcon={<EditIcon className={`w-[1.5rem]`} />}
                className={`bg-[#0080FF] capitalize text-base`}
                // onClick={() => handleCreate(imagePath, name, description)}
                // onClick={() => handleCreate(file, name, description)}
                onClick={() => createItem({ file, name, description, chain, price, externalLink, address, listingStatus })}
              >
                Create
              </Button>
            </div>


          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBody;
