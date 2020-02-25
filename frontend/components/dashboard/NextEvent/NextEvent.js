import React, { useState, useCallback } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
import get from 'lodash/get';
import { rgba } from 'polished';
// import parse from 'html-react-parser';
import { format } from 'date-fns';

import Loading from '../../utility/Loading';
import Button from '../../common/Button';
import { DEFAULT_EVENT_SRC } from '../../../lib/constants';
import { RSVP_MUTATION } from '../../events/Rsvp';

const userStatus = (userId, event) => {
  if (!event.rsvps) {
    return 'NONE';
  }

  const rsvp = event.rsvps.find(rsvp => rsvp.member.id === userId);

  if (rsvp) {
    return rsvp.status;
  }

  return 'NONE';
};

const NEXT_EVENT_QUERY = gql`
  query NEXT_EVENT_QUERY {
    myself {
      id
    }
    event: getNextEvent {
      id
      title
      startTime
      description
      featuredImage {
        url
      }
      startTime
      endTime
      rsvps {
        member {
          id
        }
        status
      }
      host {
        firstName
        lastName
        avatar {
          url
        }
      }
      trailDifficulty
      trail {
        name
      }
    }
  }
`;

const StyledEventContainer = styled.div`
  padding-top: calc(800 / 1400 * 100%);
  height: 0;
  overflow: hidden;
  background: white;
  position: relative;

  .event-heading {
    color: white;
  }

  .event-desc {
    color: white;
  }
`;

const NextEvent = () => {
  const [attending, setAttending] = useState(null);
  const submitRsvp = useCallback((rsvp, eventId, userId, callback) => {
    setAttending(rsvp);
    callback({
      variables: {
        rsvp: {
          userId,
          eventId,
          status: rsvp ? 'GOING' : 'CANT_GO',
        }
      }
    });
  }, setAttending, attending);

  return (
    <>
      <h3 className="dashboard-heading">Next Event</h3>
      <Query query={NEXT_EVENT_QUERY}>
        {({ loading: queryLoading, error: queryError, data: queryData }) => {
          if (queryLoading) {
            return <div>Loading...</div>;
          }

          if (queryError) {
            return <div>Error</div>;
          }

          const { event, myself } = queryData;
          const userRSVP = userStatus(myself.id, event);
          const hasRSVPd = userRSVP !== 'NONE' || attending !== null;
          const isAttendingNextEvent = attending !== null ? attending : userRSVP === 'GOING';

          const featuredImage = get(event, 'featuredImage.url', DEFAULT_EVENT_SRC);
          
          const StyledEvent = styled.div`
            padding: 30px;
            background-color: ${({ theme }) => theme.colors.grey_light};
            background-image: linear-gradient(
                90deg,
                ${({ theme }) => rgba(theme.colors.grey_light, 1)} 0%,${({ theme }) => rgba(theme.colors.grey_light, 0.95)} 0%,
                ${({ theme }) => rgba(theme.colors.grey_light, 0.75)} 40%,
                ${({ theme }) => rgba(theme.colors.red, 0.5)} 65%,
                ${({ theme }) => rgba(theme.colors.red_light, 0.25)} 80%
              ),
              url(${featuredImage});
            background-size: cover;
            background-position: center center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            .event-details {
              margin: 1em 0 20px;
              width: 50%;
              color: white;

              h3 {
                font-size: 48px;
                line-height: 0.85;
                margin: 0 0 20px;

                a {
                  color: white;
                  transition: 0.3s;

                  &:hover {
                    color: silver;
                  }
                }
              }

              h4 {
                font-size: 24px;
                margin: 0;
                line-height: 1;
              }
            }
          `;

          return (
            <StyledEventContainer>
              <StyledEvent>
                <div className="event-details">
                  <h3>
                    <Link href={`/event/${event.id}`}>
                      <a>{event.title}</a>
                    </Link>
                  </h3>
                  <h4>{format(event.startTime, 'ddd, MMM D, h:mm A')}</h4>
                </div>
                <Mutation mutation={RSVP_MUTATION}>
                  {(setRsvp, { loading, error }) => (
                    <>
                      <Button
                        onClick={() => submitRsvp(true, event.id, myself.id, setRsvp)}
                        ghost 
                        selected={hasRSVPd && isAttendingNextEvent}
                      >
                        Attending
                      </Button>
                      <Button
                        onClick={() => submitRsvp(false, event.id, myself.id, setRsvp)}
                        ghost
                        selected={hasRSVPd && !isAttendingNextEvent}
                      >
                        Not Attending
                      </Button>
                      <Loading loading={loading} />
                    </>
                  )}
                </Mutation>
              </StyledEvent>   
            </StyledEventContainer>
          );
        }}
      </Query>
    </>
  );
};

export default NextEvent;
