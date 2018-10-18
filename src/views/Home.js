import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';

class Home extends Component {

  state = { isManager: false }

  async componentWillMount() {
    let user = await Auth.currentAuthenticatedUser();
    let accessGroups = user.signInUserSession.accessToken.payload['cognito:groups'];
    if (accessGroups.indexOf("ManagerGroup") > -1) {
      this.setState({ isManager: true });
    }
  }

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

        { this.state.isManager ?
            <div>
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
          : null
        }

      </div>
    );
  }
}

export default Home;
