import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/editModal.module.css";
import StyledDemo from "./ImageEditor/StyledDemo";
import { useState } from "react";
import { Button } from "@mui/material";
import { CheckIcon, TrashIcon} from "lucide-react";
import CancelIcon from "@mui/icons-material/Cancel";
import { deactivateEditorPopup, activateEditorPopup, saveFile, saveFilePath } from "./reducers/action";



function ImageEditModal() {
  const dispatch = useDispatch();

  const editState = useSelector((state: any) => {
    return state.imageEditorPopupState;
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

  // const [file, setFile] = useState("");
  const [filePath, setFilePath] = useState("")

  // Handles input change event and updates state
  function handleChange(event: any) {
    const file = event.target.files[0]
    setFilePath(URL.createObjectURL(file))
    dispatch(saveFile(file))
    dispatch(saveFilePath(URL.createObjectURL(file)))
  }

  return (
    <div
      className={`w-[100vw] bg-[#000] absolute xs:top-[50px] flex items-center justify-center m-auto top-0 bottom-0 left-0 right-0 ${styles.editorContainer}`}
    >
      {editState && (
        <div
          className={`md:w-[30rem] md:h-[30rem] h-auto flex md:flex-col md:top-[5vh] xs:flex-col xs:h-[100vh] xs:w-[98%] items-center justify-center m-auto top-0 bottom-0 left-0 right-0`}
        >
          <div className={`w-full h-[25rem] bg-black relative`}>
            {/* <StyledDemo /> */}
            <input type="file" accept="image/*" onChange={handleChange} className={`w-full text-white`} />
            <div className={`w-full h-full overflow-hidden  flex items-center justify-center relative`}>
              <img className={`w-[80%] h-auto hover:scale-[102%] transition-[500ms]`} src={filePath} />

              <div className={`w-full h-[3rem] flex items-center justify-around absolute bottom-0`} >
                {/* <button className={`text-white bg-[#1da1f2] w-[40%] h-[2.5rem] rounded-lg`}>Upload to Firebase</button> */}
                {/* <button className={`text-white border-2 border-[#1da1f2] w-[40%] h-full rounded-lg`} onClick={flipEditState}>Go back</button> */}
                <Button
                  variant="contained"
                  endIcon={ <TrashIcon /> }
                  className={`border-2 border-[#1da1f2] w-[45%] h-[2.5rem] text-xs`}
                  onClick={flipEditState}
                >
                Go Back
                </Button>
                <Button
                  variant="contained"
                  disabled = {filePath ? false: true}
                  endIcon={ <CheckIcon /> }
                  className={`border-[#1da1f2] w-[45%] h-[2.5rem] text-xs`}
                  onClick={flipEditState}
                >
                 Okay
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageEditModal;
