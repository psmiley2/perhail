import { Box } from "@material-ui/core";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "../history";
import Dashboard from "./Dashboard";
import EventBoard from "./events/EventBoard";
import GoalBoard from "./goals/GoalBoard";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";
import TaskBoard from "./tasks/TaskBoard";

export default function App() {
    return (
        <Box>
            <Router history={history}>
                <NavBar />
                <Box display="flex" flexDirection="row">
                    <SideMenu />
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/tasks" exact component={TaskBoard} />
                        <Route path="/goals" exact component={GoalBoard} />
                        <Route path="/events" exact component={EventBoard} />
                    </Switch>
                </Box>
            </Router>
        </Box>
    );
}
