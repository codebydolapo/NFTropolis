import React, { useState, useCallback } from "react";
// import ReactDOM from "react-dom";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { getOrientation } from "get-orientation/browser";
import ImgDialog from "./ImgDialog";
import { getCroppedImg, getRotatedImage } from "./CanvasUtils";
import { styles } from "./Styles";
import { CropIcon, ZoomInIcon, DeleteIcon, Rotate3dIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { activateEditorPopup, deactivateEditorPopup } from "../reducers/action";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";
//  import { Button } from "@mui/material";

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

const Index = ({ classes }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [rotationState, setRotationState] = useState(false);
  const [rotationStyle, setRotationStyle] = useState(
    "text-[#000] cursor-pointer"
  );
  const [zoomState, setZoomState] = useState(true);
  const [zoomStyle, setZoomStyle] = useState("text-[#1440ff] cursor-pointer");

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      try {
        // apply rotation if needed
        const orientation = await getOrientation(file);
        const rotation = ORIENTATION_TO_ANGLE[orientation];
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
        }
      } catch (e) {
        console.warn("failed to detect the orientation");
      }

      setImageSrc(imageDataUrl);
    }
  };

  const dispatch = useDispatch();

  const editState = useSelector((state) => {
    return state.imageEditorPopupState;
  });

  const selectedImage = useSelector((state) => {
    return state.imageToBeEdited;
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

  function handleZoomState() {
    if (zoomState && !rotationState) {
      setZoomState(false);
      setRotationState(true);
      setZoomStyle("text-[#000] cursor-pointer");
      setRotationStyle("text-[#1440ff] cursor-pointer");
    } else if (!zoomState && rotationState) {
      setZoomState(true);
      setRotationState(false);
      setRotationStyle("text-[#000] cursor-pointer");
      setZoomStyle("text-[#1440ff] cursor-pointer");
    }
  }

  return (
    <div className={`relative  flex-col items-center justify-center`}>
      {/* <DeleteIcon
        className={`text-[#fff] cursor-pointer my-2`}
        onClick={flipEditState}
      /> */}
      {/* <CancelIcon className={`text-white`} /> */}
      <Button
                variant="contained"
                endIcon={<CancelIcon />}
                className={`bg-[#000]`}
                onClick={flipEditState}
              >
                Go Back
              </Button>
      {imageSrc ? (
        <React.Fragment>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className={`${classes.controls} bg-white text-bold`}>
            <div
              className={`h-full flex-[0.3] flex items-center justify-around`}
            >
              {/* <DeleteIcon
                className={`text-[#1440ff] cursor-pointer`}
                onClick={flipEditState}
              /> */}
              <ZoomInIcon
                className={`${zoomStyle}`}
                onClick={handleZoomState}
              />
              <Rotate3dIcon
                className={`${rotationStyle}`}
                onClick={handleZoomState}
              />
            </div>
            {zoomState && (
              <div
                className={`${classes.sliderContainer} capitalize text-bold`}
              >
                <Typography
                  variant="overline"
                  classes={{ root: classes.sliderLabel }}
                >
                  Zoom
                </Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  classes={{ root: classes.slider }}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>
            )}
            {rotationState && (
              <div className={`${classes.sliderContainer} capitalize`}>
                <Typography
                  variant="overline"
                  classes={{ root: classes.sliderLabel }}
                >
                  Rotation
                </Typography>
                <Slider
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby="Rotation"
                  classes={{ root: classes.slider }}
                  onChange={(e, rotation) => setRotation(rotation)}
                />
              </div>
            )}
            <Button
              onClick={showCroppedImage}
              variant="contained"
              color="primary"
              classes={{ root: classes.cropButton }}
            >
              Show Result
            </Button>
          </div>
          <ImgDialog img={croppedImage} onClose={onClose} />
        </React.Fragment>
      ) : (
        <div className={`w-full h-[10rem] cursor-pointer flex items-center justify-center`}>

          <input
            type="file"
            onChange={onFileChange}
            accept="image/*"
            className={`w-full text-white`}
          />
        </div>
      )}
    </div>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

const StyledDemo = withStyles(styles)(Index);

// const rootElement = document.getElementById('root')
// ReactDOM.render(<StyledDemo />, rootElement)
export default StyledDemo;
