import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import LoadingPlaceholder from './LoadingPlaceholder';
import ErrorPlaceholder from './ErrorPlaceholder';

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

class AllTasks extends Component {
  render() {
    return (
      <Query query={allTasks}>
        {({ loading, error, data }) => {
          if (loading) return <LoadingPlaceholder/>;
          if (error) return <ErrorPlaceholder/>;

          return (
            <div className="container">
              <ul className="list-group">
                <li className="row list-group-item">
                  <h4 className="col-sm-3">Title</h4>
                  <h4 className="col-sm-3">Description</h4>
                  <h4 className="col-sm-3">Owner</h4>
                  <h4 className="col-sm-3">Status</h4>
                </li>

                {data.allTasks.items.map(({ description, id, owner, taskStatus, title }) => (
                  <li key={id} className="row list-group-item">
                    <div className="col-sm-3">{title}</div>
                    <div className="col-sm-3">{description}</div>
                    <div className="col-sm-3">{owner}</div>
                    <div className="col-sm-3">{taskStatus}</div>
                  </li>
                ))}

              </ul>
            </div>
          )
        }}
      </Query>
    );
  }
}

export default AllTasks;
