import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../../actions";

export default function AddTask() {
    const dispatch = useDispatch();
    const [task, setTask] = useState("");
    let userID = useSelector((state) => state.user.id);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createTask(userID, { title: task }));
        setTask("");
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
                autoFocus
                id="task-add"
                type="text"
                label="Add A New Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
        </form>
    )
}
