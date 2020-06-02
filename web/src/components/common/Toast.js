import Snackbar from "@material-ui/core/Snackbar";
import React from "react";
import ReactDOM from "react-dom";

export default function Toast({ message, key }) {
    const [state, setState] = React.useState({
        open: true,
        vertical: "bottom",
        horizontal: "right",
    });
    const { vertical, horizontal, open } = state;
    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return ReactDOM.createPortal(
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message={message}
            key={key}
        />,
        document.querySelector("#toast")
    );
}
