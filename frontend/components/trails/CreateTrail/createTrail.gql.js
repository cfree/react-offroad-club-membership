import gql from 'graphql-tag';

export const CREATE_TRAIL_MUTATION = gql`
  mutation CREATE_TRAIL_MUTATION($trail: TrailInput!) {
    createTrail(trail: $trail) {
      message
    }
  }
`;
