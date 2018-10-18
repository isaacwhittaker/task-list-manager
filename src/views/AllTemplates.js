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
            <div className="container">
              <ul className="list-group">
                <li className="row list-group-item">
                  <h4 className="col-sm-4">Title</h4>
                  <h4 className="col-sm-4">Next Scheduled Occurance</h4>
                  <h4 className="col-sm-4">Owner</h4>
                </li>

                {data.listTemplates.items.map(({ schedule, id, owner, title }) => {
                  var jsonSchedule = JSON.parse(schedule);
                  var scheduleObj = window.later.schedule(jsonSchedule);

                  return (
                    <li key={id} className="row list-group-item">
                      <div className="col-sm-4">{title}</div>
                      <div className="col-sm-4">{scheduleObj.next(1).toString()}</div>
                      <div className="col-sm-4">{owner}</div>
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
