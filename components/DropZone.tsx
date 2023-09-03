import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowLeftIcon, PencilAltIcon } from "@heroicons/react/outline";
import styles from "../styles/dropzone.module.css";
import {
  deactivateEditorPopup,
  activateEditorPopup,
  saveImage,
} from "./reducers/action";
import { useDispatch, useSelector } from "react-redux";

function DropZone() {
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState("");

  //this fetches the state of the image editing modal
  const editState = useSelector((state: any) => {
    return state.imageEditorPopupState;
  });
  //everything from here is library code
  const onDrop = useCallback((acceptedFiles: any[]) => {
    // Do something with the files
    let reader = new FileReader();
    acceptedFiles.forEach((file: Blob) => {
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        setSelectedImage(URL.createObjectURL(file));
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, preventDropOnDocument: editState, noClick: editState, noDrag: editState, maxFiles: 1});

  //this one changes the fancy dashes around the image picker
  const activateDashes =
    "h-[100%] w-[100%] border-2 border-dashed flex items-center justify-center cursor-pointer rounded-lg";
  const deactivateDashes =
    "h-[100%] w-[100%] flex items-center justify-center cursor-pointer";

  //this flips the states
  function flipEditState(e: { preventDefault: () => void }) {
    e.preventDefault();
    editState
      ? (() => {
          dispatch(deactivateEditorPopup());
          dispatch(saveImage(""));
        })()
      : (() => {
          dispatch(activateEditorPopup());
          dispatch(saveImage(selectedImage));
        })();
  }

  return (
    <>
      <div
        {...getRootProps()}
        className={selectedImage ? deactivateDashes : activateDashes}
      >
        {!editState && <input {...getInputProps()} />}

        {selectedImage ? (
          <div
            className={`w-[100%] h-[100%] flex items-center justify-center relative `}
          >
            <img
              src={selectedImage}
              className={`max-w-[95%] max-h-[95%] border-[1px] border-white`}
              alt=""
            />
            <PencilAltIcon
              className={` ${styles.ChevronUpIcon} `}
              onClick={flipEditState}
            />
          </div>
        ) : (
          <div
            className={`w-[70%] h-[70%] flex flex-col items-center justify-center`}
          >
            <img
              className={`md:w-[50px] rounded-full m-2 xs:w-[70px]`}
              alt=""
              src="/icons/upload.webp"
            />
            <p className={`text-center text-sm`}>
              Drag and drop some files here, or click to select files
            </p>
          </div>
        )}
      </div>
      )
    </>
  );
}

export default DropZone;
