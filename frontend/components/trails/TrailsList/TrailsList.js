import React, { useState } from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import get from 'lodash/get';

import ErrorMessage from '../../utility/ErrorMessage';
import { TRAILS_QUERY } from './trailsList.gql.js';
// import {
//   StyledEvents,
//   StyledEventsList,
//   StyledEvent,
// } from './eventList.styles';
// import AttendeeStatus from '../AttendeeStatus';
// import {
//   DEFAULT_EVENT_SMALL_SRC,
//   DEFAULT_AVATAR_SMALL_SRC,
// } from '../../../lib/constants';

const TrailsList = ({}) => {
  return (
    <Query query={TRAILS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <ErrorMessage error={error} />;
        }

        const { trails } = data;

        return (
          <>
            {trails.length > 0 ? (
              <ul>
                {trails.map(trail => {
                  return (
                    <li key={trail.slug}>
                      {trail.name} -{' '}
                      <Link href={`/trail/${trail.slug}/edit`}>
                        <a>Edit</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <h3>No trails yet</h3>
            )}
          </>
        );
      }}
    </Query>
  );
};

export default TrailsList;
