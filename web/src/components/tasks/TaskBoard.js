import Grid from "@material-ui/core/Grid";
import React from "react";
import Tasks from "./tasks/Tasks";
export default function TaskBoard() {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Tasks />
                </Grid>
            </Grid>
        </>
    );
}
