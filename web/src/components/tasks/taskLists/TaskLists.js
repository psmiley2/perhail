import { Box } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import TreeItem from "@material-ui/lab/TreeItem";
import React from "react";
import TaskListAdd from "./TaskListAdd";
import TaskListList from "./TaskListList";

export default function TaskLists({ nodeId }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div>
            <TreeItem
                nodeId={nodeId}
                label={
                    <Box display="flex">
                        <Typography>Task Lists</Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClick}
                        >
                            <AddCircleOutlinedIcon />
                        </IconButton>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                        >
                            <TaskListAdd />
                        </Popover>
                    </Box>
                }
            >
                <TaskListList />
            </TreeItem>
        </div>
    );
}
