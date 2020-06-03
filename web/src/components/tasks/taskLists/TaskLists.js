import TreeItem from "@material-ui/lab/TreeItem";
import React from "react";
import TaskListAdd from "./TaskListAdd";
import TaskListList from "./TaskListList";

export default function TaskLists() {
    return (
        <div>
            <TreeItem nodeId="100" label="Task Lists">
                <TaskListAdd />
                <TaskListList />
            </TreeItem>
        </div>
    );
}
