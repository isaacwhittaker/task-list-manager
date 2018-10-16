import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <div>
          My Actions:
          <NavLink to="/tasks">
            <button>My Tasks</button>
          </NavLink>
          <NavLink to="/create">
            <button>Create Task</button>
          </NavLink>
        </div>
        <br/>
        <div>
          Manager Actions:
          <NavLink to="/all-tasks">
            <button>All Tasks</button>
          </NavLink>
          <NavLink to="/templates">
            <button>Templates</button>
          </NavLink>
          <NavLink to="/create-template">
            <button>Create Template</button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Home;
