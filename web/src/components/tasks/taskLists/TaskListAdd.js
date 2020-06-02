import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTaskList } from "../../../actions/index";

export default function TaskListAdd() {
    const dispatch = useDispatch();
    const [taskList, setTaskList] = useState("");

    const handleSubmit = (e, taskList) => {
        e.preventDefault();

        let placeholderid = "5ed04597ac20955958395022";
        let body = {
            title: taskList,
        };
        dispatch(createTaskList(placeholderid, { title: taskList }));
        setTaskList("");
    };

    return (
        <form onSubmit={(e) => handleSubmit(e, taskList)}>
            <TextField
                id="task-list-add"
                type="text"
                label="Add A New List"
                value={taskList}
                onChange={(e) => setTaskList(e.target.value)}
            />
        </form>
    );
}
