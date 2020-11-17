import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import Task from "./Task";
export default function TaskList({ list }) {
    if (list == null) {
        return <div>Loading...</div>;
    }

    if (list._id === undefined) {
        return <div>Select a task list</div>;
    }

    return (
        <List>
            {list.tasks.map((t, index) => (
                <ListItem key={index}>
                    <Task t={t} />
                </ListItem>
            ))}
        </List>
    );
}
