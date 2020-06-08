import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTaskList } from "../../../actions/index";

export default function TaskListAdd() {
    const dispatch = useDispatch();
    const [taskList, setTaskList] = useState("");
    let userID = useSelector((state) => state.user.id);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createTaskList(userID, { title: taskList }));
        setTaskList("");
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
                autoFocus
                id="task-list-add"
                type="text"
                label="Add A New List"
                value={taskList}
                onChange={(e) => setTaskList(e.target.value)}
            />
        </form>
    );
}
