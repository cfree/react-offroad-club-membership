import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    myself {
      id
      username
      email
      firstName
      role
      accountStatus
      accountType
      avatar {
        url
        smallUrl
      }
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = { children: PropTypes.func.isRequired };

export default User;
