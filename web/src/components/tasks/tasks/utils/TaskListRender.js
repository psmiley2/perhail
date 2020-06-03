import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
export default function TaskListRender({ list }) {
    console.log(list);
    if (list == null) {
        return <div>Loading...</div>;
    }

    return (
        <List>
            {list.tasks.map((list, index) => (
                <ListItem key={index}>
                    <ListItemText button dense>
                        {list.title}
                    </ListItemText>
                </ListItem>
            ))}
        </List>
    );
}
