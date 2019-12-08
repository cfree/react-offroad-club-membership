import gql from 'graphql-tag';

export const TRAILS_QUERY = gql`
  query TRAILS_QUERY {
    trails: getTrails {
      id
      slug
      name
      description
      featuredImage {
        url
      }
      trailheadCoords
      # coords: Coords
      address
      avgDifficulty
      avgRatings
      currentConditions
      conditionsLastReported
      favoriteCount
      pastEvents {
        title
      }
      visitors {
        firstName
      }
    }
  }
`;
