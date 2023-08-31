import styles from "../styles/create.module.css";
import { useState } from "react";
import DropZone from "./DropZone";
// import Dropzone from 'react-dropzone'

function CreateBody() {
  const [file, setFile] = useState<any>();

  function handleChange(e: any) {
    console.log(e.target.files);
    console.log(URL.createObjectURL(e.target.files[0]));
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <div className={`w-[100vw] ${styles.container}`}>
        <div
          className={`w-[100%] h-[100%] md:py-[5rem] xs:py-3 overflow-y-scroll overflow-x-hidden flex flex-col items-center ${styles.backdrop}`}
        >
          <div
            className={`md:w-[40rem] md:h-auto rounded-lg flex flex-col items-center justify-around xs:w-[100vw] xs:h-auto`}
          >
            <div className={`md:w-[90%] md:h-[3rem] rounded-lg mb-5 px-2 xs:w-[100%] xs:h-[5rem]`}>
              <h1 className={`text-white text-5xl font-extrabold`}>
                Create New Item
              </h1>
            </div>
            <div
              className={`md:w-[90%] md:h-[20rem] rounded-lg px-2 flex md:items-start justify-around flex-col xs:items-center xs:w-[100%] xs:h-[30rem]`}
            >
              <h1 className={`w-full text-white text-lg text-left font-extrabold my-[0.25rem]`}>
                Image, Audio, Video or 3D model
              </h1>
              <p className={`w-full text-white text-left text-[0.8rem] font-[300] my-[0.3rem]`}>
                File types supported: JPG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
                GLB, GLTF. Max size: 100Mb{" "}
              </p>
              <div
                className={`md:w-[25rem] md:h-[15rem] border-2 border-white border-dashed my-[0.25rem] rounded-lg text-white text-sm xs:w-[98vw] xs:h-[98vw]`}
              >
                <DropZone/>
              </div>
            </div>
            <div
              className={`md:w-[90%] md:h-[7rem] rounded-lg my-3 px-2 flex items-start, justify-around flex-col xs:w-[100%] xs:h-[7rem] `}
            >
              <h1 className={`text-white text-lg font-extrabold my-[0.25rem]`}>
                Name
              </h1>
              <input
                className={`w-[98%] h-[3rem] rounded-lg border-[1px] border-[white] my-3 bg-inherit outline-none px-2 text-sm text-white`} type = 'text' placeholder = "Item Name"
              />
            </div>
            <div
              className={`md:w-[90%] md:h-[10rem] rounded-lg my-3 px-2 flex items-start justify-around flex-col xs:w-[100%] xs:h-[10rem]`}
            >
              <h1 className={`text-white text-lg font-extrabold md:my-[0.25rem]`}>
                External Link
              </h1>
              <p className={`text-white text-[0.8rem] font-[300] md:my-[0.3rem]`}>
                NFTropolis will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link your own webpage with more details
              </p>
              <input
                className={`w-[98%] h-[3rem] rounded-lg border-[1px] border-[white] md:my-3 bg-inherit outline-none px-2 text-sm text-white`} type = 'text' placeholder = "Input external link here"
              />
            </div>
            <div
              className={`md:w-[90%] md:h-[10rem] rounded-lg my-3 px-2 flex items-start justify-around flex-col xs:w-[100%] xs:h-[7rem]`}
            >
              <h1 className={`text-white text-lg font-extrabold md:my-[0.25rem]`}>
                Description
              </h1>
              
              <input
                className={`w-[98%] h-[5rem] rounded-lg border-[1px] border-[white] md:my-3 bg-inherit outline-none px-2 text-sm text-white`} type = 'text' placeholder = "Provide a detailed description of your item"
              />
            </div>
            
            
          </div>
        </div>
      </div>

      {/* <h2>Add Image:</h2>
      <input type="file" onChange={handleChange} />
      <img src={file} /> */}
    </>
  );
}

export default CreateBody;
