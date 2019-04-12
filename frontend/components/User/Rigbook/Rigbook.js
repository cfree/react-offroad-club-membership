import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import RigbookCard from '../RigbookCard';

const StyledRigbook = styled.ul`
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  grid-gap: 10px;
`;

const RIGBOOK_QUERY = gql`
  query RIGBOOK_QUERY(
    $president: Office!
    $vicePresident: Office!
    $secretary: Office!
    $treasurer: Office!
  ) {
    president: getOfficer(office: $president) {
      username
      id
      email
      firstName
      lastName
      avatarSmall
      joined
      titles
      office
      accountType
      vehicle {
        make
        model
        year
        trim
      }
    }
    vicePresident: getOfficer(office: $vicePresident) {
      username
      id
      email
      firstName
      lastName
      avatarSmall
      joined
      titles
      office
      accountType
      vehicle {
        make
        model
        year
        trim
      }
    }
    secretary: getOfficer(office: $secretary) {
      username
      id
      email
      firstName
      lastName
      avatarSmall
      joined
      titles
      office
      accountType
      vehicle {
        make
        model
        year
        trim
      }
    }
    treasurer: getOfficer(office: $treasurer) {
      username
      id
      email
      firstName
      lastName
      avatarSmall
      joined
      titles
      office
      accountType
      vehicle {
        make
        model
        year
        trim
      }
    }
    membership: getMembers(accountTypes: [FULL, EMERITUS]) {
      username
      id
      email
      firstName
      lastName
      avatarSmall
      joined
      titles
      accountType
      vehicle {
        make
        model
        year
        trim
      }
    }
  }
`;

const Rigbook = () => {
  return (
    <div>
      <Query
        query={RIGBOOK_QUERY}
        variables={{
          president: 'PRESIDENT',
          vicePresident: 'VICE_PRESIDENT',
          secretary: 'SECRETARY',
          treasurer: 'TREASURER',
        }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error: {error.message}</div>;
          }

          console.log('OFFICERS', data);

          return (
            <>
              <h3>Officers</h3>
              <StyledRigbook>
                {data.president.id && <RigbookCard key={data.president.id} user={data.president} />}
                {data.vicePresident.id && <RigbookCard key={data.vicePresident.id} user={data.vicePresident} />}
                {data.secretary.id && <RigbookCard key={data.secretary.id} user={data.secretary} />}
                {data.treasurer.id && <RigbookCard key={data.treasurer.id} user={data.treasurer} />}
              </StyledRigbook>

              <h3>Membership</h3>
              <StyledRigbook>
                {data.membership && data.membership.map(member => (
                  <RigbookCard key={member.id} user={member} />
                ))}
              </StyledRigbook>
            </>
          );
        }}
      </Query>
    </div>
  );
}

export default Rigbook;
