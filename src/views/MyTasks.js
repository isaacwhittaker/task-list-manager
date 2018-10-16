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
        owner
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
            <div>
              <ul>

                {data.myTasks.items.map(({ description, id, owner, taskStatus, title }) => (
                  <li key={id}>
                    {title}: {description} [{taskStatus} - {owner}]
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
