import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { setSession } from "../actions";
import BuildContainer from "../components/build/BuildContainer";
import history from "../history";
import CompleteContainer from "./complete/CompleteContainer";
import Dashboard from "./Dashboard";
import EventBoard from "./events/EventBoard";
import GoalBoard from "./goals/GoalBoard";
import NavBar from "./NavBar";
import PrepareContainer from "./prepare/PrepareContainer";
import TaskBoard from "./tasks/TaskBoard";
import TestAuth from "./TestAuth";
import TrackContainer from "./track/TrackContainer";

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSession());
    }, []);

    return (
        <Box>
            <Router history={history}>
                <NavBar />
                <Box display="flex" flexDirection="row">
                    {/* <SideMenu /> */}
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/tasks" exact component={TaskBoard} />
                        <Route path="/goals" exact component={GoalBoard} />
                        <Route path="/events" exact component={EventBoard} />
                        <Route path="/auth" exact component={TestAuth} />
                        <Route path="/build" exact component={BuildContainer} />
                        <Route path="/prepare" exact component={PrepareContainer} />
                        <Route path="/complete" exact component={CompleteContainer} />
                        <Route path="/track" exact component={TrackContainer} />
                    </Switch>
                </Box>
            </Router>
        </Box>
    );
}
