import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskLists } from "../../../actions";
import TaskListListRender from "./utils/TaskListListRender";

export default function TaskListList() {
    const dispatch = useDispatch();
    let lists = useSelector((state) => state.task.lists);
    let userID = useSelector((state) => state.user.id);
    dispatch(fetchTaskLists(userID));
    return (
        <div>
            <TaskListListRender lists={lists} />
        </div>
    );
}
