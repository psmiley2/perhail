import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../../actions";

export default function TaskAdd({ list }) {
    const [task, setTask] = useState("");
    const dispatch = useDispatch();
    let userID = useSelector((state) => state.user.id);

    const handleSubmit = async (e, task) => {
        e.preventDefault();

        let body = {
            title: task,
        };
        dispatch(createTask(userID, list._id, body));
        setTask("");
    };

    return (
        <form onSubmit={(e) => handleSubmit(e, task)}>
            <TextField
                id="task-add"
                type="text"
                label="Add A Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
        </form>
    );
}
