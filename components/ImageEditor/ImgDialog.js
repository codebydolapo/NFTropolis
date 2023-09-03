import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import DeleteIcon from '@material-ui/icons/Delete'
import { DeleteIcon } from "lucide-react";
import Slide from "@material-ui/core/Slide";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@mui/material";
import { saveImage } from "../reducers/action";
// import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { toast } from "react-hot-toast";

const styles = {
  appBar: {
    position: "relative",
  },
  flex: {
    flex: 1,
  },
  imgContainer: {
    position: "relative",
    flex: 1,
    padding: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ImgDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { dispatch } = this.props;
    const { classes } = this.props;

    return (
      <Dialog
        fullScreen
        open={!!this.props.img}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
      >
        <div>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.props.onClose}
                aria-label="Close"
              >
                <DeleteIcon />
              </IconButton>

              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Cropped image
              </Typography>
              <div onClick={this.props.onClose}>
                <Button
                  variant="contained"
                  endIcon={<CheckIcon />}
                  className={`bg-[#0080FF]`}
                  onClick={() => {
                    dispatch(saveImage(this.props.img));
                    toast("Image Set!");
                  }}
                >
                  Done
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <div className={classes.imgContainer}>
            <img src={this.props.img} alt="Cropped" className={classes.img} />
          </div>
        </div>
        {/*  <Button variant="contained" endIcon={<CheckIcon />} className = {`bg-[#0080FF]`}>
              Available
            </Button> */}
      </Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const mapStateToProps = (state) => ({
  editState: state.editState,
});

export default withStyles(styles)(connect(mapDispatchToProps)(ImgDialog));
// export default withStyles(styles)(ImgDialog);
