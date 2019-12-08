import gql from 'graphql-tag';

export const SETUP_EXISTING_EVENT_QUERY = gql`
  query SETUP_EXISTING_EVENT_QUERY($eventId: ID!) {
    event: getEvent(eventId: $eventId) {
      title
      description
      featuredImage {
        url
        publicId
      }
      host {
        id
        firstName
        lastName
        avatar {
          smallUrl
        }
        username
      }
      startTime
      endTime
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
      address
      trailDifficulty
      trailNotes
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

export const EDIT_EVENT_MUTATION = gql`
  mutation EDIT_EVENT_MUTATION(
    $id: ID!
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
    $featuredImage: String #publicId
    $newFeaturedImage: CloudinaryImageInput
  ) {
    updateEvent(
      id: $id
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
        featuredImage: $featuredImage #publicId
        newFeaturedImage: $newFeaturedImage
      }
    ) {
      message
    }
  }
`;
