import React, {Component} from "react";
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import Paths from "../Content/paths.json";
import Home from "../Pages/Home";
import Game from "../Pages/Game";

class Router extends Component {
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path={Paths.HOME} component={Home}/>
                    <Route path={Paths.GAME} component={Game}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
