import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../actions";
export default function EventAdd() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    let userID = useSelector((state) => state.user.id);
    const handleSubmit = (e) => {
        e.preventDefault();

        let body = {
            title: title,
        };
        dispatch(createEvent(userID, body));
        setTitle("");
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
                id="event-title"
                type="text"
                label="Add A New Event"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </form>
    );
}
