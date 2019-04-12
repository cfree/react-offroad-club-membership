import { Component } from 'react';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Link from 'next/link';

import { UPCOMING_EVENTS_QUERY, PAST_EVENTS_QUERY } from './eventList.gql.js';
import {
  StyledEvents,
  StyledEventsList,
  StyledEvent,
} from './eventList.styles';
import AttendeeStatus from '../AttendeeStatus';

class EventList extends Component {
  state = {
    attendees: [],
  };

  getAttendees = eventId => {
    if (this.state.attendees[eventId]) {
      const attendees = [...this.state.attendees[eventId]];
      return attendees.length > 3 ? attendees.slice(0, 3) : attendees;
    }

    return [];
  };

  handleUpdateEventAttendees = eventUpdate => {
    this.setState({ attendees: eventUpdate });
  }

  render() {
    return (
      <Query
        query={this.props.upcoming ? UPCOMING_EVENTS_QUERY : PAST_EVENTS_QUERY}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error: {error.message}</div>;
          }

          const { events, myself } = data;

          return (
            <StyledEvents>
              <StyledEventsList>
                {events &&
                  events.map(event => {
                    const attendeesList = event.rsvps.filter(
                      rsvp => rsvp.status === 'GOING',
                    );

                    if (!this.state.attendees[event.id]) {
                      this.setState(state => ({
                        attendees: {
                          ...state.attendees,
                          [event.id]: attendeesList,
                        },
                      }));
                    }

                    return (
                      <StyledEvent key={event.id}>
                        <div className="event">
                          <img
                            className="event-image"
                            src="https://placekitten.com/150/100"
                            alt="Default"
                            height="100"
                            width="150"
                          />
                          <div className="event-details">
                            <div className="event-date">
                              <Link
                                href={`/event/${event.id}`}
                              >
                                <a>
                                  {format(
                                    event.startTime,
                                    'ddd, MMM D, h:mm A',
                                  )}
                                </a>
                              </Link>
                            </div>
                            <h2 className="event-title">
                              <Link
                                href={`/event/${event.id}`}
                              >
                                <a>{event.title}</a>
                              </Link>
                            </h2>
                            <div className="event-location">
                              {event.address}
                            </div>
                            <div>
                              <p>{event.description}</p>
                            </div>
                            <div className="event-meta">
                              {this.state.attendees[
                                event.id
                              ] &&
                                this.state.attendees[
                                  event.id
                                ].length > 0 && (
                                  <span className="event-attendees">
                                    {event.rsvps &&
                                      event.rsvps.length >
                                        0 && (
                                        <span className="event-attendees__avatars">
                                          {this.getAttendees(
                                            event.id,
                                          ).map(rsvp => (
                                            <i
                                              key={
                                                rsvp.member
                                                  .id
                                              }
                                            />
                                          ))}
                                        </span>
                                      )}
                                    {
                                      this.state.attendees[
                                        event.id
                                      ].length
                                    }{' '}
                                    attendees
                                  </span>
                                )}
                              <span className="event-rsvp">
                                {event.comments && (
                                  <span className="event-comment-count">
                                    12
                                  </span>
                                )}
                                <AttendeeStatus
                                  isUpcoming={this.props.upcoming}
                                  attendees={
                                    this.state.attendees
                                  }
                                  eventId={event.id}
                                  user={myself}
                                  onUpdateEventAttendees={
                                    this
                                      .handleUpdateEventAttendees
                                  }
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </StyledEvent>
                    );
                  })}
              </StyledEventsList>
            </StyledEvents>
          );
        }}
      </Query>
    );
  }
}

export default EventList;
