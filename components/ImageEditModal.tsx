import { UseSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch, useSelector } from "react-redux";
import EasyCrop from "./easycrop/EasyCrop";
import { BackspaceIcon } from "@heroicons/react/outline";
import styles from "../styles/editModal.module.css";
import { activateEditorPopup, deactivateEditorPopup } from "./reducers/action";
import StyledDemo from "./test/StyledDemo";

function ImageEditModal() {
  const dispatch = useDispatch();

  const editState = useSelector((state: any) => {
    return state.imageEditorPopupState;
  });

  // const selectedImage = useSelector((state: any) => {
  //   return state.imageToBeEdited;
  // });

  // function flipEditState() {
  //   editState
  //     ? (() => {
  //         dispatch(deactivateEditorPopup());
  //       })()
  //     : (() => {
  //         dispatch(activateEditorPopup());
  //       })();
  // }

  return (
    <div
      className={`w-[100vw] bg-[#000] absolute xs:top-[50px] flex items-center justify-center m-auto top-0 bottom-0 left-0 right-0 ${styles.editorContainer}`}
    >
      {editState && (
        <div
          className={`md:w-[35rem] md:h-[30rem] h-auto flex md:flex-col md:top-[5vh] xs:flex-col xs:h-[100vh] xs:w-[98%] items-center justify-center m-auto top-0 bottom-0 left-0 right-0`}
        >
          <div className={`w-full h-[30rem] bg-black relative`}>
            <StyledDemo />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageEditModal;
