import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { format } from 'date-fns';

import ErrorMessage from '../../utility/ErrorMessage';

const ADMIN_OVERVIEW_QUERY = gql`
  query ADMIN_OVERVIEW_QUERY($username: String!) {
    user(username: $username) {
      id
      createdAt
      joined
      lastLogin
    }
    duesLastReceived: getDuesLastReceived(username: $username) {
      time
    }
    meetings: getUserEvents(username: $username, eventType: MEETING) {
      id
      startTime
    }
    runs: getUserEvents(username: $username, eventType: RUN) {
      id
      startTime
    }
  }
`;

const AdminOverview = ({ member }) => {
  return (
    <Query query={ADMIN_OVERVIEW_QUERY} variables={{ username: member }}>
      {({ loading: queryLoading, error: queryError, data: queryData }) => {
        if (queryLoading) {
          return <div>Loading...</div>;
        }
        if (queryError) {
          return <ErrorMessage error={queryError} />;
        }

        const { user, duesLastReceived, meetings, runs } = queryData;

        return (
          <div>
            <h2>Overview</h2>
            <ul>
              <li>
                <strong>Date account created:</strong>{' '}
                {format(user.createdAt, 'M-D-YYYY')}
              </li>
              <li>
                <strong>Last login:</strong>{' '}
                {user.lastLogin && format(user.lastLogin, 'M-D-YYYY')}
              </li>
              <li>
                <strong>Runs attended:</strong> {runs.length || '0'}{' '}
                {runs.length > 0 && (
                  <>{`last: ${format(runs[0].startTime, 'M-D-YYYY')}`}</>
                )}
              </li>
              <li>
                <strong>Meetings attended:</strong> {meetings.length || '0'}{' '}
                {meetings.length > 0 && (
                  <>{`last: ${format(meetings[0].startTime, 'M-D-YYYY')}`}</>
                )}
              </li>
              {user.joined ? (
                <>
                  <li>
                    <strong>Date joined:</strong>{' '}
                    {user.joined ? format(user.joined, 'M-D-YYYY') : 'n/a'}
                  </li>

                  <li>
                    <strong>Dues last received:</strong>{' '}
                    {duesLastReceived &&
                      format(duesLastReceived.time, 'M-D-YYYY')}
                  </li>
                </>
              ) : (
                <li>
                  <strong>Eligible for membership:</strong>{' '}
                  {runs.length &&
                  runs.length > 0 &&
                  meetings &&
                  meetings.length > 0
                    ? 'Yes'
                    : 'No'}
                </li>
              )}
            </ul>
          </div>
        );
      }}
    </Query>
  );
};

export default AdminOverview;
