import React from "react";
import { Router, Route, hashHistory } from 'react-router';
import {Layout} from "./layout/layout";
import {TestComponent} from "./test-route/test-route";

export class MainRoutes extends React.Component {

    render() {
        return (
            <Router history={hashHistory}
                    onUpdate={() => window.scrollTo(0, 0)}
            >
                <Route path="/" component={Layout}>
                    <Route path="/test" component={TestComponent}/>
                </Route>
            </Router>
        );
    }
}