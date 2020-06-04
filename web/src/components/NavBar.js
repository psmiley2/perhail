import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GridOn from "@material-ui/icons/GridOn";
import React from "react";
import Login from "./auth/Login";
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
    const classes = useStyles();

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
                    <Button color="inherit">Extensions</Button>
                    <Button color="inherit">Market</Button>
                    <Typography
                        variant="h6"
                        className={classes.title}
                    ></Typography>
                    <Login />
                </Toolbar>
            </AppBar>
        </div>
    );
}
