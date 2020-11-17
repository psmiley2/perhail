import { List, ListItemText } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits } from "../../actions";

export default function HabitList() {
    useEffect(() => {   
        dispatch(fetchHabits(userID));
    }, []);
    const dispatch = useDispatch();
    let list = useSelector((state) => state.habits.habits);
    let userID = useSelector((state) => state.user.id);
    

    return (
        <>
            {list.map((habit, index) => (
                <List key={index}>
                    <ListItemText>{habit.title}</ListItemText>
                </List>
            ))}
        </>
    )
}

