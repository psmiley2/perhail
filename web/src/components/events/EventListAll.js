import { List, ListItemText } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvents } from "../../actions";
export default function EventListAll() {
    const dispatch = useDispatch();
    let list = useSelector((state) => state.event.all);
    let userID = useSelector((state) => state.user.id);
    dispatch(fetchAllEvents(userID));

    return (
        <>
            {list.map((event, index) => (
                <List key={index}>
                    <ListItemText>{event.title}</ListItemText>
                </List>
            ))}
        </>
    );
}
