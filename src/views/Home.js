import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <h4>My Actions:</h4>
        </div>
        <div className="row">   
          <div className="btn-group btn-group-justified col-sm-6">
            <NavLink to="/tasks" type="button" className="btn btn-primary">My Tasks</NavLink>
            <NavLink to="/create" type="button" className="btn btn-primary">Create Task</NavLink>
          </div>
        </div>
        <br/>
        <div className="row">
          <h4>Manager Actions:</h4>
        </div>
        <div className="row">
          <div className="btn-group btn-group-justified col-sm-6">
            <NavLink to="/all-tasks" type="button" className="btn btn-primary">All Tasks</NavLink>
            <NavLink to="/templates" type="button" className="btn btn-primary">Templates</NavLink>
            <NavLink to="/create-template" type="button" className="btn btn-primary">Create Template</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
