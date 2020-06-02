import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import PostResource from "../../common/PostResource";
export default function TaskAdd() {
    const [task, setTask] = useState("");

    const handleSubmit = (e, task) => {
        e.preventDefault();

        let placeholderid = "5ed04597ac20955958395022";
        let body = {
            title: task,
        };
        PostResource(`tasks/list/${placeholderid}`, body);
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
