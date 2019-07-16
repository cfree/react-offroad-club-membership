import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import { roles } from '../../../lib/constants';
import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';

const UPDATE_ROLE_MUTATION = gql`
  mutation UPDATE_ROLE_MUTATION($role: Role, $userId: ID!) {
    updateRole(role: $role, userId: $userId) {
      id
      role
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      firstName
      email
      role
    }
  }
`;

class UserRole extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      role: PropTypes.string,
    }).isRequired,
  };

  state = {
    role: this.props.user.role,
  };

  handleRoleChange = (e, updateCallback) => {
    this.setState({ role: e.target.value }, updateCallback);
  };

  render() {
    const { user } = this.props;

    return (
      <Mutation
        mutation={UPDATE_ROLE_MUTATION}
        variables={{
          role: this.state.role,
          userId: user.id,
        }}
      >
        {(updateRole, { loading, error }) => (
          <>
            {error && (
              <tr colSpan={8}>
                <td>
                  <ErrorMessage error={error} />
                </td>
              </tr>
            )}
            <tr>
              <td>{user.firstName}</td>
              <td>{user.email}</td>
              {Object.keys(roles).map(role => (
                <td key={role}>
                  <label htmlFor={`${user.id}-role-${role}`}>
                    <input
                      id={`${user.id}-role-${role}`}
                      type="radio"
                      checked={this.state.role === role}
                      value={role}
                      onChange={e => {
                        this.handleRoleChange(e, updateRole);
                      }}
                    />
                  </label>
                </td>
              ))}
              <td>
                <Loading loading={loading} />
              </td>
            </tr>
          </>
        )}
      </Mutation>
    );
  }
}

const Roles = props => {
  return (
    <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => (
        <>
          <ErrorMessage error={error} />
          <h2>Manage Roles</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {Object.entries(roles).map(role => (
                  <th key={role[0]}>{role[1]}</th>
                ))}
                <td />
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => (
                <UserRole key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </Query>
  );
};

export default Roles;
