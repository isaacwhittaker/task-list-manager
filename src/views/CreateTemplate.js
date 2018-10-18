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
  state = { owner: '', title: '', description: '', schedule: '', showSuccessAlert: false, showErrorAlert: false }

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
            <label className="control-label col-sm-2" htmlFor="owner-input">Owner:</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="owner-input" onChange={(event) => this.onChange(event, "owner")} />
            </div>
          </div>
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
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="schedule-input">Schedule:</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="schedule-input" onChange={(event) => this.onChange(event, "schedule")} />
            </div>
          </div>
          <br/>
          <button className="btn btn-primary" onClick={() => {
            var schedule = window.later.parse.text(this.state.schedule);

            if (schedule.error !== -1) {
              this.setState({ showErrorAlert: true });
            } else {
              var scheduleString = JSON.stringify(schedule);
              this.props.createTemplate({
                input: {
                  owner: this.state.owner,
                  title: this.state.title,
                  description: this.state.description,
                  schedule: scheduleString
                }
              })
              document.getElementById('owner-input').value='';
              document.getElementById('title-input').value='';
              document.getElementById('description-input').value='';
              document.getElementById('schedule-input').value='';
              this.setState({ showSuccessAlert: true });
            }
          }}>
            Create Template
          </button>
        </div>

        {
          this.state.showSuccessAlert ? 
            <div className="alert alert-success alert-dismissible" id="success-alert">
              <a href="#!" className="close" data-dismiss="alert" aria-label="close" onClick={() => this.setState({ showSuccessAlert: false })}>&times;</a>
              <strong>Success!</strong> Click to <a href="/templates" className="alert-link">view all templates</a>.
            </div>
          : null
        }

        {
          this.state.showErrorAlert ? 
            <div className="alert alert-warning alert-dismissible" id="error-alert">
              <a href="#!" className="close" data-dismiss="alert" aria-label="close" onClick={() => this.setState({ showErrorAlert: false })}>&times;</a>
              <strong>Error:</strong> Invalid schedule, see examples.
            </div>
          : null
        }

        <h3>Example Schedules:</h3>
        <p> on the first day of the week </p>
        <p> on the last day of the month </p>
        <p> on the 15th through 20th day of the month </p>
        <p> every 5 mins every weekend </p>
        <p> every 20 mins starting on the 7th min </p>
        <p> at 5:00 pm </p>
        <p> at 5:00 pm on Weds,Thurs and Fri </p>
        <p> at 5:00 pm every 1 day of March in 2014 </p>

      </div>
    );
  }
}

const CreateTemplateOffline = graphqlMutation(createTemplate, listTemplates, 'Template')(CreateTemplate);
export default CreateTemplateOffline;
