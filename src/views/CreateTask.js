import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphqlMutation } from 'aws-appsync-react';
import { v4 as uuid } from 'uuid';

const myTasks = gql`
  query MyTasks($nextToken: String) {
    myTasks(nextToken: $nextToken) {
      items {
        id
        owner
        title
        description
        taskStatus
      }
      nextToken
    }
  }
`;

const createTask = gql`
  mutation CreateTask($id: ID!, $owner: String, $title: String!, $taskStatus: String!, $description: String!) {
    createTask(id: $id, owner: $owner, title: $title, taskStatus: $taskStatus, description: $description) {
      id
      owner
      title
      description
      taskStatus
    }
  }
`;

class CreateTask extends Component {
  state = { title: '', description: '', showAlert: false }

  onChange(event, type) {
    this.setState({
      [type]: event.target.value
    })
  }

  render() {
    return (
      <div className="containter">
        <div className="form-horizontal">
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="title-input">Title:</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="title-input" onChange={(event) => this.onChange(event, "title")} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="description-input">Description:</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="description-input" onChange={(event) => this.onChange(event, "description")} />
            </div>
          </div>
          <br/>
          <button className="btn btn-primary" onClick={() => {
            this.props.createTask({
              id: uuid(),
              owner: null,
              title: this.state.title,
              description: this.state.description,
              taskStatus: 'Started'
            })
            document.getElementById('title-input').value='';
            document.getElementById('description-input').value='';
            this.setState({ showAlert: true });
          }}>
            Create Task
          </button>
        </div>

        {
          this.state.showAlert ? 
            <div className="alert alert-success alert-dismissible" id="success-alert">
              <a href="#!" className="close" data-dismiss="alert" aria-label="close" onClick={() => this.setState({ showAlert: false })}>&times;</a>
              <strong>Success!</strong> Click to <a href="/tasks" className="alert-link">view all tasks</a>.
            </div>
          : null
        }
        
      </div>
    );
  }
}

const CreateTaskOffline = graphqlMutation(createTask, myTasks, 'Task')(CreateTask);
export default CreateTaskOffline;
