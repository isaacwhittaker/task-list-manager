import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphqlMutation } from 'aws-appsync-react';

const listTemplates = gql`
  query ListTemplates($nextToken: String) {
    listTemplates(nextToken: $nextToken) {
      items {
        id
        owner
        title
        description
        schedule
      }
      nextToken
    }
  }
`;

const createTemplate = gql`
  mutation CreateTemplate($input: CreateTemplateInput!) {
    createTemplate(input: $input) {
      id
      owner
      title
      description
      schedule
    }
  }
`;

class CreateTemplate extends Component {
  state = { owner: '', title: '', description: '', schedule: '' }

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
        <div>
          Schedule: <span><input id="schedule-input" onChange={(event) => this.onChange(event, "schedule")} /></span>
        </div>
        <br/>
        <button onClick={() => {
          this.props.createTemplate({
            input: {
              owner: this.state.owner,
              title: this.state.title,
              description: this.state.description,
              schedule: this.state.schedule
            }
          })
          document.getElementById('owner-input').value='';
          document.getElementById('title-input').value='';
          document.getElementById('description-input').value='';
          document.getElementById('schedule-input').value='';
        }}>
          Add
        </button>
      </div>
    );
  }
}

const CreateTemplateOffline = graphqlMutation(createTemplate, listTemplates, 'Template')(CreateTemplate);
export default CreateTemplateOffline;
