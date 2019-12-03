import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../../user/User';

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout {
      message
    }
  }
`;

const Logout = () => (
  <Mutation mutation={LOGOUT_MUTATION} refetchQueries={['CURRENT_USER_QUERY']}>
    {logout => (
      <a
        href="/logout"
        onClick={e => {
          e.preventDefault();
          logout();
          Router.push('/');
        }}
      >
        Logout
      </a>
    )}
  </Mutation>
);

export default Logout;
