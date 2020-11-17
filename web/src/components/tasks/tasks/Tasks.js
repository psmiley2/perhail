import Box from "@material-ui/core/Box";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskList } from "../../../actions";
import TaskAdd from "./TaskAdd";
import TaskList from "./TaskList";
export default function Tasks() {
    let userid = useSelector((state) => state.user.id);
    let currentList = useSelector((state) => state.task.currentList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTaskList(userid, currentList._id));
    }, []);

    return (
        <div>
            <Box border={3}>
                <h4>{currentList.title}:</h4>
                <TaskAdd list={currentList} />
                <TaskList list={currentList} />
            </Box>
        </div>
    );
}
