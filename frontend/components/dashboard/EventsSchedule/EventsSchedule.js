import React from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Calendar from '../../events/Calendar';

export const DASHBOARD_UPCOMING_EVENTS_QUERY = gql`
  query DASHBOARD_UPCOMING_EVENTS_QUERY {
    myself {
      id
    }
    events: getUpcomingEvents(count: 7) {
      id
      title
      startTime
      rsvps {
        member {
          id
        }
        status
      }
    }
  }
`;

const StyledEventsSchedule = styled.div`
  line-height: 1;

  ul {
    list-style: none;
    padding: 0 0 10px;
    margin: 0;
  }

  li {
    margin: 0 0 10px;
    padding: 0;
    display: flex;
    

    & > a {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  & > a {
    float: right;
  }
`;

export const StyledHr = styled.hr`
  height: 2px;
  margin: 0 0 20px;
  border: none;
  background: ${({ theme }) => theme.colors.grey_lighter};
`;

const EventsSchedule = () => {
  return (
    <StyledEventsSchedule>
      <h3 className="dashboard-heading">Events Schedule</h3>
      <Query query={DASHBOARD_UPCOMING_EVENTS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }

          if (error) {
            return <div>Error...</div>;
          }

          const { events, myself } = data;
          return (
            <>
              {events.length > 0 && (
                <>
                  <ul>
                    {events.map((event => (
                      <li key={event.id}>
                        <Calendar date={event.startTime} />
                        <Link href={`event/${event.id}`}><a>{event.title}</a></Link>
                      </li>
                    )))}
                  </ul>
                  <StyledHr />
                  <Link href="/events">
                    <a>
                      <small>See All</small>
                    </a>
                  </Link>
                </>
              )}
            </>
          );
        }}
      </Query>
    </StyledEventsSchedule>
  );
};

export default EventsSchedule;
