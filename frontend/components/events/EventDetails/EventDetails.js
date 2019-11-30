import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { format, getTime, distanceInWordsToNow } from 'date-fns';
import parse from 'html-react-parser';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

import { trailDifficulties, trailConditions } from '../../../lib/constants';
import Calendar from '../Calendar';
import Rsvp from '../Rsvp';
import { StyledEventHeader, StyledDetails } from './eventDetails.styles';
import Filter from '../../Login/Filter';
import { isAtLeastRunMaster } from '../../../lib/utils';

const EVENT_QUERY = gql`
  query EVENT_QUERY($eventId: ID!) {
    myself {
      id
      firstName
      lastName
      avatarSmall
    }
    event: getEvent(eventId: $eventId) {
      title
      description
      host {
        id
        firstName
        lastName
        avatarSmall
      }
      startTime
      endTime
      rsvps {
        member {
          id
          firstName
          lastName
          avatarSmall
        }
        status
      }
      address
      trail {
        id
        slug
        name
        address
        avgDifficulty
        avgRatings
        currentConditions
        conditionsLastReported
        favoriteCount
      }
      rallyAddress
      rallyTime
    }
  }
`;

export default class EventDetails extends Component {
  onMapImgError = e => {
    e.target.src = '/static/img/default-map.png';
  };

  render() {
    const { id: eventId } = this.props;

    return (
      <Query query={EVENT_QUERY} variables={{ eventId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error: {error.message}</div>;
          }

          const { event, myself } = data;

          const isPastEvent = Date.now() > getTime(event.startTime);

          const attendees = event.rsvps.filter(rsvp => rsvp.status === 'GOING');

          const attendeeCount = attendees.length;

          const userStatus = () => {
            const rsvp = event.rsvps.find(rsvp => rsvp.member.id === myself.id);

            if (rsvp) {
              return rsvp.status;
            }

            return 'NONE';
          };

          const encodedRallyAddress = encodeURIComponent(
            event.rallyAddress || event.address || 'Colorado',
          );

          const encodedAddress = encodeURIComponent(
            event.address || 'Colorado',
          );

          return (
            <>
              {!isPastEvent && (
                <Filter roleCheck={isAtLeastRunMaster}>
                  <Link href={`/event/${eventId}/edit`}>
                    <a>Edit</a>
                  </Link>
                </Filter>
              )}
              <StyledEventHeader>
                <div className="event__calendar">
                  <Calendar date={event.startTime} />
                </div>
                <div className="event__info">
                  <div className="event__date">
                    {isPastEvent
                      ? 'Past Event'
                      : format(event.startTime, 'dddd, MMMM D, YYYY')}
                  </div>
                  <h2 className="event__title">{event.title}</h2>
                  {event.host.firstName && (
                    <div className="event__leader">
                      <img src="/static/img/default-user.jpg" height="30" />
                      Hosted by {event.host.firstName}
                    </div>
                  )}
                </div>
                <div className="event__rsvp">
                  <Rsvp
                    userId={myself.id}
                    userStatus={userStatus()}
                    eventId={this.props.id}
                    attendeeCount={attendeeCount}
                    pastEvent={isPastEvent}
                  />
                </div>
              </StyledEventHeader>
              <StyledDetails>
                <div className="event__columns">
                  <section className="event__section">
                    <img
                      src="https://s3.us-west-2.amazonaws.com/images-prod.trailsoffroad.com/trails/299/highlights/resized_2017-08-11_12.30.25-2_3.jpg"
                      alt={event.title}
                    />
                  </section>
                  <section className="event__section" aria-label="Description">
                    {parse(event.description)}
                  </section>
                  {event.trail ? (
                    <section>
                      <h3>Trail Information</h3>
                      <p>
                        <strong>{event.trail.name}</strong>
                        {/* <button id={event.trail.id}>
                      {event.trail.name}
                      </button> */}
                      </p>
                      {(event.trailDifficulty || event.trailNotes) && (
                        <>
                          <h4>Run Leader Notes</h4>
                          <p>
                            {event.trailDifficulty && (
                              <>
                                <strong>Difficulty</strong>:{' '}
                                {trailDifficulties[event.trailDifficulty]}
                                <br />
                              </>
                            )}
                            {event.trailNotes && (
                              <>
                                <strong>Comments</strong>: {event.trailNotes}
                              </>
                            )}
                          </p>
                        </>
                      )}
                      {(event.trail.avgDifficulty ||
                        event.trail.avgRatings ||
                        event.trail.favoriteCount ||
                        event.trail.conditionsLastReported) && (
                        <>
                          <h4>Member Notes</h4>
                          <p>
                            {event.trail.avgDifficulty && (
                              <>
                                <strong>Difficulty</strong>:{' '}
                                {trailDifficulties[event.trail.avgDifficulty]}
                                <br />
                              </>
                            )}
                            {!Number.isNaN(event.trail.avgRatings) && (
                              <>
                                <strong>Quality Rating</strong>:{' '}
                                {event.trail.avgRatings > 0 ? (
                                  <>{event.trail.avgRatings}/5</>
                                ) : (
                                  <>None</>
                                )}
                                <br />
                              </>
                            )}
                            <strong>Favorites</strong>:{' '}
                            {event.trail.favoriteCount}
                            <br />
                            <strong>Conditions</strong>:{' '}
                            {trailConditions[event.trail.currentConditions] ||
                              'Unknown'}
                            <br />
                            <small>
                              Last reported:{' '}
                              {distanceInWordsToNow(
                                event.trail.conditionsLastReported,
                              ) || 'Never'}
                            </small>
                          </p>
                        </>
                      )}
                    </section>
                  ) : (
                    <p>
                      <strong>Address</strong>: {event.address || 'n/a'}
                    </p>
                  )}
                  <section className="event__section">
                    <h3>Attendees</h3>
                    <div className="card">
                      <strong>{event.host.firstName}</strong>
                    </div>
                    {attendees
                      .filter(attendee => attendee.member.id !== event.host.id)
                      .map(attendee => (
                        <div key={attendee.member.id} className="card">
                          {attendee.member.firstName}
                        </div>
                      ))}
                  </section>
                  {isPastEvent && (
                    <section className="event__section">
                      <h3>Photos</h3>
                      <form>
                        <input type="file" />
                      </form>
                    </section>
                  )}
                  {event.comments && (
                    <section className="event__section">
                      <h3>Comments</h3>
                      <hr />
                      <form>
                        <textarea />
                      </form>
                    </section>
                  )}
                  <p className="event__section">
                    <button>See More Events</button>
                  </p>
                </div>
                <aside className="event__aside">
                  <div className="event__aside-wrapper">
                    <p>
                      <strong>Start</strong>:{' '}
                      {format(event.startTime, 'M/D/YY h:mm A')}
                      <br />
                      <strong>End</strong>:{' '}
                      {format(event.endTime, 'M/D/YY h:mm A')}
                    </p>

                    {(event.rallyTime || event.rallyAddress) && (
                      <p>
                        {event.rallyTime && (
                          <>
                            <strong>Rally Time</strong>:{' '}
                            {format(event.rallyTime, 'h:mm A')}
                            <br />
                          </>
                        )}
                        {event.rallyAddress && (
                          <>
                            <strong>Rally Point</strong>: {event.rallyAddress}
                          </>
                        )}
                      </p>
                    )}
                    {(event.rallyAddress || event.address) && (
                      <p>
                        <Link
                          href={`https://www.google.com/maps/search/?api=1&query=${encodedRallyAddress}`}
                        >
                          <a>
                            <img
                              width="250"
                              height="100"
                              src={`https://maps.googleapis.com/maps/api/staticmap?zoom=8&size=500x200&maptype=roadmap&markers=size:mid%7Ccolor:red%7C${encodedAddress}&key=${publicRuntimeConfig.env.GOOGLE_MAPS_API_KEY}`}
                              alt={`${event.title} map`}
                              onError={this.onMapImgError}
                            />
                          </a>
                        </Link>
                        <br />
                        <small>
                          (
                          <Link
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodedRallyAddress}`}
                          >
                            <a>Directions</a>
                          </Link>
                          )
                        </small>
                      </p>
                    )}
                  </div>
                </aside>
              </StyledDetails>
            </>
          );
        }}
      </Query>
    );
  }
}
