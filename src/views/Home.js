import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <NavLink to={`/tasks`}>
          <button>Tasks</button>
        </NavLink>
        <NavLink to={`/create`}>
          <button>Create Task</button>
        </NavLink>
      </div>
    );
  }
}

export default Home;
