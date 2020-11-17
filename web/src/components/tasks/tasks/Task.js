import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../../actions";
export default function Task({ t }) {
    const dispatch = useDispatch();
    const [task, setTask] = useState(t.title);
    const userid = useSelector((state) => state.user.id);
    const tasklist = useSelector((state) => state.task.currentList);
    const tasklistid = tasklist._id;
    const [checked, setChecked] = useState(t.completed);

    let changed = true;

    useEffect(() => {
        console.log("task in state", task);
        return () => {
            console.log("task", task);

            let body = {
                ...t,
                title: task,
                completed: checked,
            };
            if (changed) {
                dispatch(updateTask(userid, tasklistid, t._id, body));
            }
            console.log("umounted");
        };
    }, [task]);
    const handleCheck = (event) => {
        setChecked(event.target.checked);
        changed = true;
    };

    const handleTextChange = (e) => {
        setTask(e.target.value);
        changed = true;
    };

    return (
        <Box display="flex">
            <Checkbox
                checked={checked}
                onChange={handleCheck}
                inputProps={{ "aria-label": "primary checkbox" }}
            />
            <TextField
                id="outlined-search"
                variant="outlined"
                value={task}
                onChange={handleTextChange}
            />
        </Box>
    );
}
