import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHabit } from "../../actions/index";

export default function AddHabit() {
    const dispatch = useDispatch();
    const [habit, setHabit] = useState("");
    let userID = useSelector((state) => state.user.id);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createHabit(userID, { title: habit }));
        setHabit("");
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
                autoFocus
                id="habit-add"
                type="text"
                label="Add A New Habit"
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
            />
        </form>
    )
}
