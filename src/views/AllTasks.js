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
            <div>
              <ul>

                {data.allTasks.items.map(({ description, id, owner, taskStatus, title }) => (
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

export default AllTasks;
