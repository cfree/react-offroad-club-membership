import React, { useState, useCallback } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import { roles, accountTypes, accountStatuses } from '../../../lib/constants';
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

const UPDATE_ACCOUNT_TYPE_MUTATION = gql`
  mutation UPDATE_ACCOUNT_TYPE_MUTATION(
    $accountType: AccountType
    $userId: ID!
  ) {
    updateAccountType(accountType: $accountType, userId: $userId) {
      id
      accountType
    }
  }
`;

const UPDATE_ACCOUNT_STATUS_MUTATION = gql`
  mutation UPDATE_ACCOUNT_STATUS_MUTATION(
    $accountStatus: AccountStatus
    $userId: ID!
  ) {
    updateAccountStatus(accountStatus: $accountStatus, userId: $userId) {
      id
      accountStatus
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      firstName
      lastName
      email
      role
      accountStatus
      accountType
    }
  }
`;

class UserProperty extends React.Component {
  static propTypes = {
    userId: PropTypes.string,
    userProperty: PropTypes.string,
    currentProperty: PropTypes.string,
    properties: PropTypes.object,
  };

  state = {
    selectedProperty: this.props.currentProperty,
  };

  handleChange = (e, updateCallback) => {
    this.setState({ selectedProperty: e.target.value }, updateCallback);
  };

  render() {
    const { userId, userProperty, currentProperty, properties } = this.props;
    let mutation;

    switch (userProperty) {
      case 'role':
        mutation = UPDATE_ROLE_MUTATION;
        break;
      case 'accountType':
        mutation = UPDATE_ACCOUNT_TYPE_MUTATION;
        break;
      case 'accountStatus':
        mutation = UPDATE_ACCOUNT_STATUS_MUTATION;
        break;
    }

    return (
      <Mutation
        mutation={mutation}
        variables={{
          [userProperty]: this.state.selectedProperty,
          userId,
        }}
      >
        {(updateProperty, { loading, error }) => (
          <label htmlFor={`${userProperty}-${userId}`}>
            <select
              name={`${userProperty}-${userId}`}
              id={`${userProperty}-${userId}`}
              onChange={e => {
                this.handleChange(e, updateProperty);
              }}
              defaultValue={currentProperty}
            >
              {Object.entries(properties).map(property => (
                <option key={property[0]} value={property[0]}>
                  {property[1]}
                </option>
              ))}
            </select>
            <Loading loading={loading} />
            <ErrorMessage error={error} />
          </label>
        )}
      </Mutation>
    );
  }
}

const UserRole = props => (
  <UserProperty properties={roles} userProperty="role" {...props} />
);

const UserAccountType = props => (
  <UserProperty
    properties={accountTypes}
    userProperty="accountType"
    {...props}
  />
);

const UserAccountStatus = props => (
  <UserProperty
    properties={accountStatuses}
    userProperty="accountStatus"
    {...props}
  />
);

const MemberTable = ({ allUsers }) => {
  const [userList, setUserList] = useState(allUsers);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const debouncedSetUserList = debounce(user => {
    setUserList(user);
    setLoading(false);
  }, 500);

  const filterUsers = useCallback(
    e => {
      const keyword = e.target.value.toString();
      setKeyword(keyword);
      setLoading(true);

      if (keyword) {
        debouncedSetUserList(
          allUsers.filter(
            user =>
              user.firstName.toUpperCase().includes(keyword.toUpperCase()) ||
              user.lastName.toUpperCase().includes(keyword.toUpperCase()),
          ),
        );
      } else {
        debouncedSetUserList(allUsers);
      }
    },
    [userList, debouncedSetUserList, setKeyword, setLoading],
  );

  return (
    <>
      <div>
        <h3>Filter Results</h3>
        <input value={keyword} type="search" onChange={filterUsers} />
        <Loading loading={loading} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Account Type</th>
            <th>Account Status</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(user => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>
                <UserRole userId={user.id} currentProperty={user.role} />
              </td>
              <td>
                <UserAccountType
                  userId={user.id}
                  currentProperty={user.accountType}
                />
              </td>
              <td>
                <UserAccountStatus
                  userId={user.id}
                  currentProperty={user.accountStatus}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const MemberPermissions = props => {
  return (
    <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => (
        <>
          <ErrorMessage error={error} />
          <h2>Manage Permissions</h2>
          {data.users && <MemberTable allUsers={data.users} />}
        </>
      )}
    </Query>
  );
};

export default MemberPermissions;
