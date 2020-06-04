import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
export default function TaskList({ list }) {
    if (list == null) {
        return <div>Loading...</div>;
    }

    if (list._id === undefined) {
        return <div>Select a task list</div>;
    }

    return (
        <List>
            {list.tasks.map((list, index) => (
                <ListItem key={index}>
                    <ListItemText>{list.title}</ListItemText>
                </ListItem>
            ))}
        </List>
    );
}
