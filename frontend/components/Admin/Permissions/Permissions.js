import { Query, Mutation } from 'react-apollo';
import ErrorMessage from '../../utility/ErrorMessage';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEM_CREATE',
  'ITEM_UPDATE',
  'ITEM_DELETE',
  'PERMISSION_UPDATE',
];

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      firstName
      email
      permissions
    }
  }
`;

class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
  };

  state = {
    permissions: this.props.user.permissions,
  };

  handlePermissionChange = (e, updateCallback) => {
    const checkbox = e.target;
    let updatedPermissions = [...this.state.permissions];
    
    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
    }

    this.setState({ permissions: updatedPermissions }, updateCallback);
  }

  render() {
    const { user } = this.props;

    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: user.id,
        }}
      >
        {(updatePermissions, { loading, error }) => (
          <>
            {error && <tr colspan={8}><td><ErrorMessage error={error} /></td></tr>}
            <tr>
              <td>{user.firstName}</td>
              <td>{user.email}</td>
              {possiblePermissions.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <input
                      id={`${user.id}-permission-${permission}`}
                      type="checkbox"
                      checked={this.state.permissions.includes(permission)}
                      value={permission}
                      onChange={(e) => {this.handlePermissionChange(e, updatePermissions)}}
                    />
                  </label>
                </td>
              ))}
              <td>
                <button type="button" disabled={loading} onClick={updatePermissions}>
                  Updat{loading ? 'ing': 'e' }
                </button>
              </td>
            </tr>
          </>
        )}
      </Mutation>
    );
  }
}

const Permissions = props => {
  return <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => <>
          <ErrorMessage error={error} />
          <h2>Manage Permissions</h2>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                {possiblePermissions.map(permission => <th key={permission}>{permission}</th>)}
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => <UserPermissions key={user.id} user={user}/>)}
            </tbody>
          </table>
        </>}
    </Query>;
};

export default Permissions;

