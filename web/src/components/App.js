import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "../history";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";

export default function App() {
    return (
        <div>
            <Router history={history}>
                <NavBar />
                <div>
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}
