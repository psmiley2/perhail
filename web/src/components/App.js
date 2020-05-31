import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "../history";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
export default function App() {
    return (
        <div>
            <NavBar />
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}
