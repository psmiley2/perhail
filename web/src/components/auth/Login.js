import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions";
const Login = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        handleClose();
        // TODO - Toast if logged in!
    };

    return (
        <div>
            <Button onClick={handleClickOpen} color="inherit">
                Login
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default Login;
