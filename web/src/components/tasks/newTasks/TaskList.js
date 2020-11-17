import { List, ListItemText } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../../actions";

export default function TaskList() {
    useEffect(() => {   
        dispatch(fetchTasks(userID));
    }, []);
    const dispatch = useDispatch();
    let list = useSelector((state) => state.tasks.tasks);
    let userID = useSelector((state) => state.user.id);
    

    return (
        <>
            {list.map((task, index) => (
                <List key={index}>
                    <ListItemText>{task.title}</ListItemText>
                </List>
            ))}
        </>
    )
}

