import TreeItem from "@material-ui/lab/TreeItem";
import React from "react";
import TaskListAdd from "./TaskListAdd";
import TaskListList from "./TaskListList";

export default function TaskLists({ nodeId }) {
    return (
        <div>
            <TreeItem nodeId={nodeId} label="Task Lists">
                <TaskListAdd />
                <TaskListList />
            </TreeItem>
        </div>
    );
}
