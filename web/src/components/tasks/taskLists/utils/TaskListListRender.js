import TreeItem from "@material-ui/lab/TreeItem";
import React from "react";
import { useDispatch } from "react-redux";
import { updateCurrentTaskList } from "../../../../actions";

export default function TaskListListRender({ lists }) {
    const dispatch = useDispatch();

    const handleClick = (list) => {
        dispatch(updateCurrentTaskList(list));
    };

    if (lists == null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {lists.map((list, index) => (
                <TreeItem
                    nodeId={100 + index}
                    onClick={() => handleClick(list)}
                    button
                    dense
                    label={list.title}
                ></TreeItem>
            ))}
        </>
    );
}
