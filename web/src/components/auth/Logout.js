import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions";
const Login = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(logout());
        handleClose();
        // TODO - Toast if logged out!
    };

    return (
        <div>
            <Button onClick={handleClickOpen} color="inherit">
                Logout
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Logout</DialogTitle>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <DialogContent>
                        Are you sure you want to log out?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Logout
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default Login;
