import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskLists } from "../../../actions";
import TaskListRender from "./utils/TaskListRender";

export default function TaskListList() {
    const dispatch = useDispatch();
    let placeholderid = "5ed04597ac20955958395022";
    dispatch(fetchTaskLists(placeholderid));
    let lists = useSelector((state) => state.task.lists);
    return (
        <div>
            <TaskListRender lists={lists} />
        </div>
    );
}
