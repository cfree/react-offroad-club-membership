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
  query MEMBERSHIP_QUERY {
    users(
      accountStatus: [ACTIVE]
      accountType: [FULL, ASSOCIATE, EMERITUS]
    ) {
      username
      id
      firstName
      lastName
      avatarSmall
      phone
      accountType
    }
  }
`;

const Roster = ({ user }) => {
  return (
    <Query query={MEMBERSHIP_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error: {error.message}</div>;
        }

        return (
          <StyledRoster>
            
            {data.users.map(user => (
              <RosterCard key={user.id} user={user} />
            ))}
          </StyledRoster>
        );
      }}
    </Query>
  );
};

export default Roster;
