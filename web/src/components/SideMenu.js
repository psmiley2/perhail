import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import React from "react";
import history from "../history";
import Goals from "./goals/Goals";
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
            <TreeItem
                onClick={() => history.push("/events")}
                nodeId="1"
                label="Events"
            ></TreeItem>
            <TreeItem nodeId="2" label="Tracks"></TreeItem>
            <TaskLists nodeId={`${3}`} />
            <Goals nodeId={`${4}`} />
        </TreeView>
    );
}
