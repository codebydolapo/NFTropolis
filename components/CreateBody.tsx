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
      <div className={`w-full border-2 border-black ${styles.container}`}>
        <div
          className={`w-[100%] h-[100%] flex justify-center overflow-scroll py-[10rem]  ${styles.backdrop}`}
        >
          <div
            className={`w-[40rem] min-h-[40rem] rounded-lg flex flex-col items-center justify-around`}
          >
            <div className={`w-[90%] h-[5rem] rounded-lg my-3 px-2`}>
              <h1 className={`text-white text-5xl font-extrabold`}>
                Create New Item
              </h1>
            </div>
            <div
              className={`w-[90%] h-[30rem] rounded-lg my-3 px-2 flex items-start, justify-around flex-col`}
            >
              <h1 className={`text-white text-lg font-extrabold my-[0.25rem]`}>
                Image, Audio, Video or 3D model
              </h1>
              <p className={`text-white text-[0.8rem] font-[300] my-[0.3rem]`}>
                File types supported: JPG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
                GLB, GLTF. Max size: 100Mb{" "}
              </p>
              <div
                className={`w-[25rem] h-[15rem] border-2 border-white border-dashed my-[0.25rem] rounded-lg text-white text-sm`}
              >
                <DropZone/>
              </div>
            </div>
            <div
              className={`w-[90%] h-[15rem] rounded-lg my-3 px-2 flex items-start, justify-around flex-col`}
            >
              <h1 className={`text-white text-lg font-extrabold my-[0.25rem]`}>
                Name
              </h1>
              <input
                className={`w-[98%] h-[3rem] rounded-lg border-[1px] border-[white] my-3 bg-inherit outline-none px-2 text-sm text-white`} type = 'text' placeholder = "Item Name"
              />
            </div>
            <div
              className={`w-[90%] h-[15rem] rounded-lg my-3 px-2 flex items-start, justify-around flex-col`}
            >
              <h1 className={`text-white text-lg font-extrabold my-[0.25rem]`}>
                External Link
              </h1>
              <p className={`text-white text-[0.8rem] font-[300] my-[0.3rem]`}>
                NFTropolis will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link your own webpage with more details
              </p>
              <input
                className={`w-[98%] h-[3rem] rounded-lg border-[1px] border-[white] my-3 bg-inherit outline-none px-2 text-sm text-white`} type = 'text' placeholder = "Input external link here"
              />
            </div>
            <div
              className={`w-[90%] h-[15rem] rounded-lg my-3 px-2 flex items-start, justify-around flex-col`}
            >
              <h1 className={`text-white text-lg font-extrabold my-[0.25rem]`}>
                Description
              </h1>
              
              <input
                className={`w-[98%] h-[5rem] rounded-lg border-[1px] border-[white] my-3 bg-inherit outline-none px-2 text-sm text-white`} type = 'text' placeholder = "Provide a detailed description of your item"
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
