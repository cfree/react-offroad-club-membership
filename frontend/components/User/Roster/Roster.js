import { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Link from 'next/link';

import RosterCard from '../RosterCard';

const StyledRoster = styled.div`
  border: 1px solid ${({ theme }) => theme.grey};
  display: grid;
`;

const MEMBERSHIP_QUERY = gql`
  query MEMBERSHIP_QUERY(
    $accountStatus: [AccountStatus]
    $accountType: [AccountType]
    $role: [Role],
    $office: [Office],
    $title: [Title],
  ) {
    users(
      accountStatus: $accountStatus,
      accountType: $accountType,
      role: $role,
      office: $office,
      title: $title,
    ) {
      username
      id
      firstName
      lastName
      avatarSmall
      accountType
      contactInfo {
        phone
      }
    }
  }
`;

export class Roster extends Component {
  static defaultProps = {
    filters: {
      accountStatus: ['ACTIVE'],
      accountType: ['FULL', 'ASSOCIATE', 'EMERITUS'],
      role: [],
      office: [],
      title: [],
    },
  }

  render() {
    const { filters } = this.props;

    return (
      <Query
        query={MEMBERSHIP_QUERY}
        variables={filters}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error: {error.message}</div>;
          }

          return (
            <StyledRoster>
              <strong>Name</strong>
              <strong>Account Type</strong>
              <strong>Phone</strong>
              {data.users.map(user => (
                <RosterCard key={user.id} user={user} />
              ))}
            </StyledRoster>
          );
        }}
      </Query>
    );
  }
};

export default Roster;
