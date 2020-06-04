import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGoal } from "../../actions";

const GoalAdd = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("");
    let userID = useSelector((state) => state.user.id);
    const handleSubmit = (e) => {
        e.preventDefault();

        let body = {
            title: title,
            priority: priority,
        };
        dispatch(createGoal(userID, body));
        setTitle("");
        setPriority("");
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
                id="goal-title"
                type="text"
                label="Add A New Goal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                id="goal-priority"
                type="number"
                label="Priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            />
            <br />
            <Button type="submit" color="inherit">
                Submit
            </Button>
        </form>
    );
};

export default GoalAdd;
