import { Component } from 'react';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Link from 'next/link';
import parse from 'html-react-parser';
import get from 'lodash/get';

import { UPCOMING_EVENTS_QUERY, PAST_EVENTS_QUERY } from './eventList.gql.js';
import {
  StyledEvents,
  StyledEventsList,
  StyledEvent,
} from './eventList.styles';
import AttendeeStatus from '../AttendeeStatus';
import { DEFAULT_EVENT_SMALL_SRC } from '../../../lib/constants';

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
  };

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
                {events.length > 0 ? (
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

                    const EVENT_IMAGE = get(
                      event,
                      'featuredImage.smallUrl',
                      DEFAULT_EVENT_SMALL_SRC,
                    );

                    return (
                      <StyledEvent key={event.id}>
                        <div className="event">
                          <img
                            className="event-image"
                            src={EVENT_IMAGE}
                            alt="Image"
                            height="100"
                            width="150"
                          />
                          <div className="event-details">
                            <div className="event-date">
                              <Link href={`/event/${event.id}`}>
                                <a>
                                  {format(
                                    event.startTime,
                                    'ddd, MMM D, h:mm A',
                                  )}
                                </a>
                              </Link>
                            </div>
                            <h2 className="event-title">
                              <Link href={`/event/${event.id}`}>
                                <a>{event.title}</a>
                              </Link>
                            </h2>
                            <Link href={`/event/${event.id}/edit`}>
                              <a>Edit</a>
                            </Link>
                            <div className="event-location">
                              {event.address}
                            </div>
                            <div>{parse(event.description)}</div>
                            <div className="event-meta">
                              {this.state.attendees[event.id] &&
                                this.state.attendees[event.id].length > 0 && (
                                  <span className="event-attendees">
                                    {event.rsvps && event.rsvps.length > 0 && (
                                      <span className="event-attendees__avatars">
                                        {this.getAttendees(event.id).map(
                                          rsvp => (
                                            <i key={rsvp.member.id} />
                                          ),
                                        )}
                                      </span>
                                    )}
                                    {this.state.attendees[event.id].length}{' '}
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
                                  attendees={this.state.attendees}
                                  eventId={event.id}
                                  user={myself}
                                  onUpdateEventAttendees={
                                    this.handleUpdateEventAttendees
                                  }
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </StyledEvent>
                    );
                  })
                ) : (
                  <h3>No events planned</h3>
                )}
              </StyledEventsList>
            </StyledEvents>
          );
        }}
      </Query>
    );
  }
}

export default EventList;
