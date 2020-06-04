import { Box } from "@material-ui/core";
import React from "react";
import EventAdd from "./EventAdd";
import EventListAll from "./EventListAll";

export default function EventBoard() {
    return (
        <Box border={3}>
            Hello
            <EventAdd />
            <EventListAll />
        </Box>
    );
}
