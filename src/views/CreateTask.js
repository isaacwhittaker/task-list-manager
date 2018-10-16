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
  state = { title: '', description: '' }

  onChange(event, type) {
    this.setState({
      [type]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div>
          Title: <span><input id="title-input" onChange={(event) => this.onChange(event, "title")} /></span>
        </div>
        <div>
          Description: <span><input id="description-input" onChange={(event) => this.onChange(event, "description")} /></span>
        </div>
        <br/>
        <button onClick={() => {
          this.props.createTask({
            id: uuid(),
            owner: null,
            title: this.state.title,
            description: this.state.description,
            taskStatus: 'Started'
          })
          document.getElementById('title-input').value='';
          document.getElementById('description-input').value='';
        }}>
          Add
        </button>
      </div>
    );
  }
}

const CreateTaskOffline = graphqlMutation(createTask, myTasks, 'Task')(CreateTask);
export default CreateTaskOffline;
