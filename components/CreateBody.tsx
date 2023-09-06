import styles from "../styles/create.module.css";
import { useState } from "react";
// import Dropzone from 'react-dropzone'
import { useSelector, useDispatch } from "react-redux";
import { deactivateEditorPopup, activateEditorPopup, saveImage } from "./reducers/action";
import CheckIcon from "@mui/icons-material/Check";
import { PencilAltIcon } from "@heroicons/react/outline";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@mui/material";
import { EditIcon, DeleteIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import handleCreate from "../backend/handleCreate";

function CreateBody() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const editState = useSelector((state: any) => {
    return state.imageEditorPopupState;
  });

  const imagePath = useSelector((state: any) => {
    return state.editedImage;
  });

  function flipEditState() {
    editState
      ? (() => {
          dispatch(deactivateEditorPopup());
        })()
      : (() => {
          dispatch(activateEditorPopup());
        })();
  }

  const handleNameUpdate = (event: any) => {
    setName(event.target.value);
  };

  const handleDescriptionUpdate = (event: any) => {
    setName(event.target.value);
  };

  function handleDelete(){
    dispatch(saveImage(""))
    toast("Image Removed!")
  }

  return (
    <>
      <div className={`w-[100vw] mt-[60px] ${styles.container}`}>
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
              {!imagePath ? (
                <div
                  className={`md:w-[25rem] md:h-[15rem] flex flex-col items-center justify-center border-2 border-white border-dashed my-[0.25rem] rounded-lg text-white text-sm xs:w-[98vw] xs:h-[98vw] cursor-pointer`}
                  onClick={flipEditState}
                >
                  <img className={`w-[3rem] my-2`} src="/icons/upload.webp" />
                  <p>Click hotspot to upload image</p>
                </div>
              ) : (
                <div
                  className={`md:w-[25rem] md:h-[15rem] flex flex-col items-center justify-center my-[0.25rem] rounded-lg text-white text-sm xs:w-[98vw] xs:h-[98vw] cursor-pointer relative`}
                >
                  <img className={`max-w-[98%] h-auto w-auto max-h-[98%]`} src={imagePath} />
                  <div
                    className={`absolute top-0 right-0 w-[4rem] h-[2.5rem] flex items-center justify-around`}
                  >
                    <div
                      className={` bg-black rounded-full w-[1.5rem] h-[1.5rem] flex items-center justify-center border-[1px] border-white`}
                      onClick={flipEditState}
                    >
                      <Pencil />
                    </div>
                    <div
                      className={` bg-black rounded-full w-[1.5rem] h-[1.5rem] flex items-center justify-center border-[1px] border-white`}
                      onClick={handleDelete}
                    >
                      <Trash />
                    </div>
                  </div>
                </div>
              )}
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
                className={`text-white text-[0.8rem] font-[300] md:my-[0.3rem]`}
              >
                NFTropolis will include a link to this URL on this item's detail
                page, so that users can click to learn more about it. You are
                welcome to link your own webpage with more details
              </p>
              <input
                className={`w-[98%] h-[3rem] rounded-lg border-[1px] border-[white] md:my-3 bg-inherit outline-none px-2 text-sm text-white`}
                type="text"
                placeholder="Input external link here"
              />
            </div>
            <div
              className={`md:w-[90%] md:h-[10rem] rounded-lg my-3 px-2 flex items-start justify-around flex-col xs:w-[100%] xs:h-[7rem]`}
            >
              <h1
                className={`text-white text-lg font-extrabold md:my-[0.25rem]`}
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
              className={`md:w-[10rem] md:h-[5rem] rounded-lg my-3 px-2 flex items-start, justify-around flex-col xs:w-[10rem] xs:h-[7rem]`}
            >
              <Button
                variant="contained"
                endIcon={<EditIcon />}
                className={`bg-[#0080FF]`}
                onClick={() => handleCreate(imagePath, name, description)}
              >
                Create
              </Button>
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
