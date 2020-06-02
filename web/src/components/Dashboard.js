import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import SideMenu from "./SideMenu";
import Tasks from "./tasks/tasks/Tasks";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function Dashboard() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <SideMenu />
                </Grid>
                <Grid item xs={3}>
                    <Tasks />
                </Grid>
            </Grid>
        </div>
    );
}

export default Dashboard;
