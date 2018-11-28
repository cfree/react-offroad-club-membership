import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Race from '../Race';

const GET_ELECTION_QUERY = gql`
  query GET_ELECTION_QUERY($id: ID!) {
    getElection(id: $id) {
      electionName
      races {
        id
        title
        candidates {
          id
          joined
          firstName
          lastName
          username
          role
          vehicle {
            year
            make
            model
            trim
            image
          }
        }
      }
    }
  }
`;

class Election extends Component {
  static defaultProps = {
    id: null
  }

  render() {
    return this.props.id !== null && <Query query={GET_ELECTION_QUERY} variables={{
      id: this.props.id
    }}>
      {({ loading, error, data }) => {
        if (loading) { return <div>Loading...</div> }
        if (error) { return <div>Error: {error.message}</div> }

        return (
          <>
            <h2>{data.getElection.electionName} Election</h2>

            {data.getElection.races.map(race => (
              <Race
                key={race.id}
                pollId={`${data.getElection.electionName.replace(' ', '_')}_${race.title.replace(' ', '_')}`}
                {...race}
              />
            ))}
          </>
        );
      }}
    </Query>;
  }
}

export default Election;
