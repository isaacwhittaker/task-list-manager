import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import LoadingPlaceholder from './LoadingPlaceholder';
import ErrorPlaceholder from './ErrorPlaceholder';

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

class AllTemplates extends Component {
  render() {
    return (
      <Query query={listTemplates}>
        {({ loading, error, data }) => {
          if (loading) return <LoadingPlaceholder/>;
          if (error) return <ErrorPlaceholder/>;

          return (
            <div>
              <ul>

                {data.listTemplates.items.map(({ schedule, id, owner, title }) => {
                  var jsonSchedule = JSON.parse(schedule);
                  var scheduleObj = window.later.schedule(jsonSchedule);

                  return (
                    <li key={id}>
                      {title}: {scheduleObj.next(1).toString()} [{owner}]
                    </li>
                  )
                })}

              </ul>
            </div>
          )
        }}
      </Query>
    );
  }
}

export default AllTemplates;
