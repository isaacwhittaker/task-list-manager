import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import LoadingPlaceholder from './LoadingPlaceholder';
import ErrorPlaceholder from './ErrorPlaceholder';

const myTasks = gql`
  query MyTasks($nextToken: String) {
    myTasks(nextToken: $nextToken) {
      items {
        id
        title
        description
        taskStatus
      }
      nextToken
    }
  }
`;

class MyTasks extends Component {
  render() {
    return (
      <Query query={myTasks}>
        {({ loading, error, data }) => {
          if (loading) return <LoadingPlaceholder/>;
          if (error) return <ErrorPlaceholder/>;

          return (
            <div className="container">
              <ul className="list-group">
                <li className="row list-group-item">
                  <h4 className="col-sm-4">Title</h4>
                  <h4 className="col-sm-4">Description</h4>
                  <h4 className="col-sm-4">Status</h4>
                </li>

                {data.myTasks.items.map(({ description, id, taskStatus, title }) => (
                  <li key={id} className="row list-group-item">
                    <div className="col-sm-4">{title}</div>
                    <div className="col-sm-4">{description}</div>
                    <div className="col-sm-4">{taskStatus}</div>
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

export default MyTasks;
