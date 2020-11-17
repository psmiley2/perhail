import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GridOn from "@material-ui/icons/GridOn";
import React from "react";
import { useSelector } from "react-redux";
import history from "../history";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Register from "./auth/Register";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    let userID = useSelector((state) => state.user.id);
    const classes = useStyles();

    const authButtons = () => {
        if (userID) {
            return <Logout />;
        } else {
            return (
                <>
                    <Login />
                    <Register />
                </>
            );
        }
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="dashboard"
                    >
                        <GridOn />
                    </IconButton>
                    <Button color="inherit" onClick={() => history.push("/build")}>Build</Button>
                    <Button color="inherit" onClick={() => history.push("/prepare")}>Prepare</Button>
                    <Button color="inherit" onClick={() => history.push("/complete")}>Complete</Button>
                    <Button color="inherit" onClick={() => history.push("/track")}>Track</Button>
                    <Typography
                        variant="h6"
                        className={classes.title}
                    ></Typography>
                    {authButtons()}
                </Toolbar>
            </AppBar>
        </div>
    );
}
