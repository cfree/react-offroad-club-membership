import gql from 'graphql-tag';

export const SETUP_NEW_EVENT_QUERY = gql`
  query SETUP_NEW_EVENT_QUERY {
    runLeaders: getRunLeaders {
      username
      firstName
      lastName
    }
    trails: getTrails {
      id
      name
    }
  }
`;

export const CREATE_EVENT_MUTATION = gql`
  mutation CREATE_EVENT_MUTATION(
    $title: String!
    $description: String
    $startTime: DateTime!
    $endTime: DateTime!
    $address: String
    $trailDifficulty: TrailDifficulty!
    $trailNotes: String
    $rallyAddress: String
    $rallyTime: DateTime
    $membersOnly: Boolean
    $host: String!
    $trail: String
  ) {
    createEvent(
      event: {
        title: $title
        description: $description
        startTime: $startTime
        endTime: $endTime
        address: $address
        trailDifficulty: $trailDifficulty
        trailNotes: $trailNotes
        rallyAddress: $rallyAddress
        rallyTime: $rallyTime
        membersOnly: $membersOnly
        host: $host
        trail: $trail
      }
    ) {
      message
    }
  }
`;
