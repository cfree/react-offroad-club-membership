import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Calendar from '../../events/Calendar';
import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';
import { sortByDateDesc } from '../../../lib/utils';
// import { membershipLogMessages } from '../../../lib/constants';

const MEMBERSHIP_LOG_QUERY = gql`
  query MEMBERSHIP_LOG_QUERY($username: String) {
    user(username: $username) {
      id
      membershipLog {
        id
        time
        message
        messageCode
      }
    }
  }
`;

const MembershipLog = ({ member }) => {
  return (
    <>
      <h2>Membership Log</h2>
      <Query query={MEMBERSHIP_LOG_QUERY} variables={{ username: member }}>
        {({ loading: queryLoading, error: queryError, data: queryData }) => {
          if (queryLoading) {
            return <div>Loading...</div>;
          }
          if (queryError) {
            return <ErrorMessage error={queryError} />;
          }

          const { user } = queryData;

          return (
            <>
              {/*
                Any time an account is created
                Any time a role, status, or type changes
                Any time dues are received
                Any time an office changes
                Any time a title changes
              */}
              {/* Manual Log Entry: <input type="text" />
              (Date, Event) */}
              <div className="membership-log">
                {user.membershipLog && user.membershipLog.length > 0 ? (
                  <ul>
                    {user.membershipLog
                      .sort(sortByDateDesc('time'))
                      .map(entry => (
                        <li key={entry.id}>
                          <Calendar date={entry.time} />
                          {entry.message}

                          {entry.link && (
                            <Link href={entry.link}>
                              <a>></a>
                            </Link>
                          )}
                          {/* {isAdmin && (
                            <button onClick={removeLogEntry()}>Delete</button>
                          )} */}
                        </li>
                      ))}
                  </ul>
                ) : (
                  <span>No items found...</span>
                )}
              </div>
            </>
          );
        }}
      </Query>
    </>
  );
};

export default MembershipLog;
