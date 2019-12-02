import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Race from '../Race/Race';

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
          avatar {
            url
          }
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

const GET_USER_VOTE = gql`
  query GET_USER_VOTE($ballot: ID) {
    getUserVote(ballot: $ballot) {
      candidate {
        id
      }
    }
  }
`;

class Election extends Component {
  static defaultProps = {
    id: null,
  };

  getVoteId = voteInfo => {
    // Is there a vote?
    if (voteInfo.length <= 0) {
      return false;
    }

    // Was it an abstain vote?
    if (voteInfo[0].candidate === null) {
      return 1;
    }

    // It was a vote for a person
    return voteInfo[0].candidate.id;
  };

  render() {
    return (
      this.props.id !== null && (
        <Query
          query={GET_ELECTION_QUERY}
          variables={{
            id: this.props.id,
          }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading...</div>;
            }
            if (error) {
              return <div>Error: {error.message}</div>;
            }

            return (
              <>
                <h2>{data.getElection.electionName} Election</h2>

                {data.getElection.races.map(race => (
                  <Query
                    query={GET_USER_VOTE}
                    variables={{ ballot: race.id }}
                    key={race.id}
                  >
                    {({
                      loading: voteLoading,
                      error: voteError,
                      data: voteData,
                    }) => {
                      if (voteLoading) {
                        return <div>Loading...</div>;
                      }
                      if (voteError) {
                        return <div>Error: {voteError.message}</div>;
                      }

                      return (
                        <Race
                          pollId={`${data.getElection.electionName.replace(
                            ' ',
                            '_',
                          )}_${race.title.replace(' ', '_')}`}
                          userVotedFor={this.getVoteId(voteData.getUserVote)}
                          {...race}
                        />
                      );
                    }}
                  </Query>
                ))}
              </>
            );
          }}
        </Query>
      )
    );
  }
}

export default Election;
