import Box from "@material-ui/core/Box";
import React from "react";
import { useSelector } from "react-redux";
import TaskAdd from "./TaskAdd";
import TaskList from "./TaskList";

export default function Tasks() {
    let currentList = useSelector((state) => state.task.currentList);

    return (
        <div>
            <Box border={3}>
                <h4>{currentList.title}:</h4>
                <TaskAdd list={currentList} />
                <TaskList list={currentList} />
            </Box>
        </div>
    );
}
