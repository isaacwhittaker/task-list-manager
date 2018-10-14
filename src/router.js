import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import MyTasks from "./views/MyTasks";
import CreateTask from "./views/CreateTask";

export default (
    <div>
        <Switch>
            <Route render={props => <div><Home {...props} /></div> } path='/' exact />
            <Route render={props => <div><MyTasks {...props} /></div> } path='/tasks' />
            <Route render={props => <div><CreateTask {...props} /></div> } path='/create' />
        </Switch>
    </div>
);
