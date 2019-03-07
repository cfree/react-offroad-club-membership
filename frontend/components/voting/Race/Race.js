import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import RigbookCard from '../../User/RigbookCard';
import {
  StyledRace,
  StyledFieldset,
  StyledBallotList,
  StyledCandidate,
  StyledVoteButton,
  StyledAbstainButton
} from './race.styles';

const SUBMIT_VOTE_MUTATION = gql`
  mutation SUBMIT_VOTE_MUTATION($vote: VoteInput!) {
    submitVote(vote: $vote) {
      message
    }
  }
`;

class Race extends Component {
  state = {
    vote: '',
    isDisabled: this.props.userVotedFor,
    submissionMessage: '',
  };

  castBallot = async (e, vote) => {
    e.preventDefault();

    if (!this.state.vote) {
      return;
    }

    // Record vote
    await vote();

    // Disable form
    this.setState({ isDisabled: true });
  };

  abstain = vote => {
    // Remove selection
    this.setState(
      {
        vote: '',
        isDisabled: true,
      },
      vote,
    );
  };

  removeBallot = (message = '') => {
    this.setState({ submissionMessage: message });
  };

  handleSelection = e => {
    this.setState({ vote: e.target.value });
  };

  render() {
    return (
      <StyledRace>
        <h2>{this.props.title}</h2>
        {this.props.decription && <p>{this.props.decription}</p>}

        <p>
          Click a candidate to select. When you are ready, click "Vote" button
          to record your selection. You may only vote for one candidate per race
          and you cannot change your vote. If you want to formally decline to
          vote for a particular race, click the "Abstain" button.
        </p>

        <Mutation
          mutation={SUBMIT_VOTE_MUTATION}
          variables={{
            vote: {
              ballot: this.props.id,
              dateTime: Date.now(),
              candidate: this.state.vote,
            },
          }}
        >
          {(submitVote, { data }) => {
            return (
              <form
                onSubmit={e => this.castBallot(e, submitVote)}
                method="post"
              >
                {data && data.submitVote.message && <h3>{data.submitVote.message}</h3>}
                <StyledFieldset
                  disabled={this.state.isDisabled}
                  aria-busy={this.state.isDisabled}
                >
                  <StyledBallotList>
                    {this.props.candidates.map(candidate => {
                      const id = `${this.props.pollId}_${candidate.id}`;
                      
                      return (
                        <li key={candidate.id}>
                          <StyledCandidate>
                            <input
                              type="radio"
                              id={id}
                              name={this.props.pollId}
                              checked={
                                this.state.vote === candidate.id ||
                                this.props.userVotedFor === candidate.id
                              }
                              value={candidate.id}
                              onChange={this.handleSelection}
                            />
                            <label htmlFor={id}>
                              <RigbookCard user={candidate} />
                            </label>
                          </StyledCandidate>
                        </li>
                      );
                    })}
                  </StyledBallotList>
                  <StyledVoteButton type="submit" disabled={!this.state.vote}>
                    Vote
                  </StyledVoteButton>
                  <StyledAbstainButton
                    type="button"
                    onClick={() => this.abstain(submitVote)}
                  >
                    Abstain
                  </StyledAbstainButton>
                </StyledFieldset>
              </form>
            );
          }}
        </Mutation>
      </StyledRace>
    );
  }
}

export default Race;
