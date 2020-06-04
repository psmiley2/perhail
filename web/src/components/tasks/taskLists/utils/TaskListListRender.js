import TreeItem from "@material-ui/lab/TreeItem";
import React from "react";
import { useDispatch } from "react-redux";
import { updateCurrentTaskList } from "../../../../actions";
import history from "../../../../history";
export default function TaskListListRender({ lists }) {
    const dispatch = useDispatch();

    const handleClick = (list) => {
        dispatch(updateCurrentTaskList(list));
        history.push("/tasks");
    };

    if (lists == null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {lists.map((list, index) => (
                <TreeItem
                    key={index}
                    nodeId={`${index}`} // REVIEW - This needs to be fixed
                    onClick={() => handleClick(list)}
                    label={list.title}
                ></TreeItem>
            ))}
        </>
    );
}
