import React, { Component } from 'react';
import RigbookCard from '../../User/RigbookCard';
import {
  StyledRace,
  StyledFieldset,
  StyledBallotList,
  StyledCandidate,
  StyledVoteButton,
  StyledAbstainButton
} from './styles';

class Race extends Component {
  state = {
    vote: '',
    isDisabled: false,
    submissionMessage: '',
  };

  castBallot = e => {
    e.preventDefault();

    if (!this.state.vote) {
      return;
    }

    // Record vote
    // AJAX

    // Disable form
    this.setState({ isDisabled: true });
  };

  abstain = () => {
    // Record vote
    // AJAX

    // Remove selection
    this.setState({ vote: '' });

    // Disable form
    this.setState({ isDisabled: true });
  };

  removeBallot = (message = '') => {
    this.setState({ submissionMessage: message });
  }

  handleSelection = e => {
    this.setState({ vote: e.target.value });
  }

  render() {
    return <StyledRace>
        <h2>{this.props.position}</h2>
        {this.props.decription && <p>{this.props.decription}</p>}

        <p>Click a candidate to select. When you are ready, click "Vote" button to record your selection. You may only vote for one candidate per race and you cannot change your vote. If you want to formally decline to vote for a particular race, click the "Abstain" button.</p>

        <form onSubmit={this.castBallot} method="post">
          {this.state.submissionMessage ? (
            <div>{this.state.submissionMessage}</div>
          ) : (
            <StyledFieldset disabled={this.state.isDisabled} aria-busy={this.state.isDisabled}>
              <StyledBallotList>
                {this.props.candidates.map(candidate => {
                  const id = `${this.props.pollId}_${candidate.id}`;

                  return <li key={candidate.id}>
                      <StyledCandidate>
                        <input type="radio" id={id} name={this.props.pollId} checked={this.state.vote === candidate.id} value={candidate.id} onChange={this.handleSelection} />
                        <label htmlFor={id}>
                          <RigbookCard user={candidate} />
                        </label>
                      </StyledCandidate>
                    </li>;
                })}
              </StyledBallotList>

              <StyledVoteButton type="submit" disabled={!this.state.vote}>
                Vote
              </StyledVoteButton>
              <StyledAbstainButton type="button" onClick={this.abstain}>
                Abstain
              </StyledAbstainButton>
            </StyledFieldset>
          )}
        </form>
      </StyledRace>;
  }
}

export default Race;
