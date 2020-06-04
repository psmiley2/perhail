import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

export default function GoalDetail() {
    let currentGoal = useSelector((state) => state.goal.currentGoal);
    return (
        <Box border={3}>
            <h4>{currentGoal.title}</h4>
            <h4>Priority => {currentGoal.priority}</h4>
        </Box>
    );
}
