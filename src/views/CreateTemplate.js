import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphqlMutation } from 'aws-appsync-react';
import { v4 as uuid } from 'uuid';

const allTasks = gql`
  query AllTasks($nextToken: String) {
    allTasks(nextToken: $nextToken) {
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
  mutation CreateTask($id: ID!, $owner: String! $title: String! $taskStatus: String! $description: String!) {
    createTask(id: $id owner: $owner title: $title taskStatus: $taskStatus description: $description) {
      id
      owner
      title
      description
      taskStatus
    }
  }
`;

class CreateTemplate extends Component {
  state = { owner: '', title: '', description: '' }

  onChange(event, type) {
    this.setState({
      [type]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div>
          Owner: <span><input id="owner-input" onChange={(event) => this.onChange(event, "owner")} /></span>
        </div>
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
            owner: this.state.owner,
            title: this.state.title,
            description: this.state.description,
            taskStatus: 'Started'
          })
          document.getElementById('owner-input').value='';
          document.getElementById('title-input').value='';
          document.getElementById('description-input').value='';
        }}>
          Add
        </button>
      </div>
    );
  }
}

const CreateTemplateOffline = graphqlMutation(createTask, allTasks, 'Task')(CreateTemplate);
export default CreateTemplateOffline;
