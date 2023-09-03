import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import {
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CropIcon } from "lucide-react";
import { withStyles } from '@material-ui/core/styles'
import { getOrientation } from 'get-orientation/browser'
import ImgDialog from './ImgDialog'
import { getCroppedImg, getRotatedImage } from './canvasUtils'
import { styles } from './styles'
// import { useAuth } from '../../context/AuthContext';
// import getCroppedImg from './CropImage';
// import {useAuth} from "../../context/AuthContext"
// import submitButton from "./inputs/SubmitButton"
// import uploadFile from '../../firebase/uploadFile'
// import {updateProfile} from "firebase/auth"
// import deleteFile from '../../firebase/deleteFile'
// import updateUserRecords from "../../firebase/updateUserRecords"

const EasyCrop = ({ photoURL, setOpenCrop, setPhotoURL, setFile }: any) => {
  // const { setAlert, setLoading } = useAuth();
  const [crop, setCrop] = useState<any>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<any>(1);
  const [rotation, setRotation] = useState<any>(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const cropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // const cropImage = async () => {
  //   // setLoading(true);
  //   try {
  //     const { file, url }: any = await getCroppedImg(
  //       photoURL,
  //       croppedAreaPixels,
  //       rotation
  //     );
  //     setPhotoURL(url);
  //     setFile(file);
  //     setOpenCrop(false);
  //   } catch (error) {
  //     // setAlert({
  //     //   isAlert: true,
  //     //   severity: 'error',
  //     //   message: error.message,
  //     //   timeout: 5000,
  //     //   location: 'modal',
  //     // });
  //     console.log(error);
  //   }

  //   // setLoading(false);
  // };
  return (
    <>
      <DialogContent
        dividers
        sx={{
          background: '#333',
          position: 'relative',
          height: 400,
          width: 'auto',
          minWidth: { sm: 500 },
        }}
      >
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', mx: 3, my: 2 }}>
        <Box sx={{ width: '100%', mb: 1 }}>
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>
          <Box>
            <Typography>Rotation: {rotation + '°'}</Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenCrop(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<CropIcon />}
            onClick={cropImage}
          >
            Crop
          </Button>
        </Box>
      </DialogActions>
    </>
  );
};

export default EasyCrop;

function zoomPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}
