import React from "react";
import ReactDOM from "react-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const PageLoader = (props) => {
  const classes = useStyles();
  return ReactDOM.createPortal(
    <Backdrop className={classes.backdrop} open={true}>
      <Typography color="inherit" variant="h6" style={{marginTop:'-3em'}}>
        {props.message}
      </Typography>
      <CircularProgress
        color="inherit"
        size={150}
        style={{ position: "absolute", marginLeft: "-1em", marginTop: "9em" }}
      />
      
    </Backdrop>,
    document.getElementById("loader")
  );
};

export default PageLoader;
