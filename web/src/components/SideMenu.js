import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import React from "react";
import TaskLists from "./tasks/taskLists/TaskLists";

const useStyles = makeStyles({
    root: {
        height: 500,
        flexGrow: 1,
        maxWidth: 400,
    },
});

export default function SideMenu() {
    const classes = useStyles();

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            <TreeItem nodeId="1" label="Goals">
                <TreeItem nodeId="2" label="Tasls" />
                <TreeItem nodeId="3" label="Chrome" />
                <TreeItem nodeId="4" label="Webstorm" />
            </TreeItem>
            <TreeItem nodeId="100" label="Tracks">
                <TreeItem nodeId="2" label="Tasls" />
                <TreeItem nodeId="3" label="Chrome" />
                <TreeItem nodeId="4" label="Webstorm" />
            </TreeItem>
            <TaskLists />
            <TreeItem nodeId="11" label="Event Lists">
                <TreeItem nodeId="12" label="src">
                    <TreeItem nodeId="13" label="index.js" />
                    <TreeItem nodeId="14" label="tree-view.js" />
                </TreeItem>
            </TreeItem>
        </TreeView>
    );
}
