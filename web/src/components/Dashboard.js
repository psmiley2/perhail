import { makeStyles } from "@material-ui/core/styles";
import React from "react";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function Dashboard() {
    const classes = useStyles();
    return (
        <div className={classes.root}>Dashboard (Customized by the user)</div>
    );
}

export default Dashboard;
