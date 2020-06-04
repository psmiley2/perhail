import TreeItem from "@material-ui/lab/TreeItem";
import React from "react";
import GoalAdd from "./GoalAdd";
import GoalList from "./GoalList";

const Goals = ({ nodeId }) => {
    return (
        <div>
            <TreeItem nodeId={nodeId} label="Goals">
                <GoalAdd />
                <GoalList />
            </TreeItem>
        </div>
    );
};

export default Goals;
