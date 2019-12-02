import gql from 'graphql-tag';

export const UPCOMING_EVENTS_QUERY = gql`
  query UPCOMING_EVENTS_QUERY {
    myself {
      id
      firstName
      lastName
      avatar {
        smallUrl
      }
    }
    events: getUpcomingEvents {
      id
      title
      description
      startTime
      endTime
      host {
        firstName
        lastName
      }
      address
      rallyAddress
      rallyTime
      trail {
        id
        name
        avgDifficulty
      }
      rsvps {
        member {
          id
          firstName
          lastName
          avatar {
            smallUrl
          }
        }
        status
      }
    }
  }
`;

export const PAST_EVENTS_QUERY = gql`
  query PAST_EVENTS_QUERY {
    myself {
      id
      firstName
      lastName
      avatar {
        smallUrl
      }
    }
    events: getPastEvents {
      id
      title
      description
      startTime
      endTime
      host {
        firstName
        lastName
      }
      address
      rallyAddress
      rallyTime
      trail {
        id
        name
        avgDifficulty
      }
      rsvps {
        member {
          id
          firstName
          lastName
          avatar {
            smallUrl
          }
        }
        status
      }
    }
  }
`;
