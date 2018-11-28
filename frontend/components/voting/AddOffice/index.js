import React, { Component } from 'react';
import styled from 'styled-components';

const StyledOffice = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
`;

class Office extends Component {
  state = {
    availableMembers: this.props.candidates,
    candidates: [],
    title: '',
    desc: '',
  };

  static defaultProps = {
    candidates: [],
  };

  addToBallot = (candidate) => {
    // Add to list of candidates on ballot
    let updatedCandidates = [...this.state.candidates];
    updatedCandidates.push(candidate);

    // Remove from eligible members
    let updatedMembers = [...this.state.availableMembers];
    updatedMembers = updatedMembers.filter(
      member => member.id !== candidate.id,
    );

    // Update state
    this.setState({
      candidates: updatedCandidates,
      availableMembers: updatedMembers,
    });
  };

  removeFromBallot = (candidate) => {
    // Remove from candidates on ballot
    let updatedCandidates = [...this.state.candidates];
    updatedCandidates.filter(candidateOnList => candidateOnList.id !== candidate.id);

    // Add to eligible members
    const updatedMembers = [...this.state.availableMembers];
    updatedMembers.push(candidate);

    // Update state
    this.setState({
      candidates: updatedOffice,
      availableMembers: updatedMembers,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
    
    this.setState({
      candidates: [],
      title: '',
      desc: '',
    });
  }

  updateState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return <form className="Offices" onSubmit={this.handleSubmit}>
        <StyledOffice>
          <div className="Office-Picker">
            <h3>Create Ballot for Office</h3>
            <p>
              <label htmlFor="officeTitle">
                Title of Office&nbsp;
                <input type="text" name="title" id="officeTitle" value={this.state.title} onChange={this.updateState} />
              </label>
            </p>

            <p>
              <label htmlFor="officeDesc">
                Description&nbsp;
                <textarea type="text" name="desc" id="officeDesc" value={this.state.desc} onChange={this.updateState} />
              </label>
            </p>

            <div className="memberSearch">
              <h4>Eligible Candidates</h4>
              Search:
              <input type="search" />
              Sort:
              <button>⬇️</button>
              <button>⬆️</button>
              <div className="memberSearch-list">
                {this.state.availableMembers
                  .sort((a, b) => {
                    const aFirstName = a.firstName.toLowerCase();
                    const bFirstName = b.firstName.toLowerCase();

                    if (aFirstName < bFirstName) {
                      return -1;
                    }
                    if (aFirstName > bFirstName) {
                      return 1;
                    }
                    return 0;
                  })
                  .map(user => <p key={user.id}>
                      {user.firstName} {user.lastName}
                      <button type="button" onClick={() => this.addToBallot(user)} disabled={user.officeRunningFor}>
                        {user.officeRunningFor ? `Running for ${user.officeRunningFor}` : 'Add'}
                      </button>
                    </p>)}
              </div>
            </div>
          </div>
          <div className="Office-Stage">
            <h3>Candidates on Ballot</h3>
            {this.state.candidates
              .sort((a, b) => {
                const aFirstName = a.firstName.toLowerCase();
                const bFirstName = b.firstName.toLowerCase();

                if (aFirstName < bFirstName) {
                  return -1;
                }
                if (aFirstName > bFirstName) {
                  return 1;
                }
                return 0;
              })
              .map(candidate => <p key={candidate.id}>
                  {candidate.firstName} {candidate.lastName}
                  <button onClick={() => this.removeFromBallot(candidate)}>
                    x
                  </button>
                </p>)}
          </div>
        </StyledOffice>

        <button>Cancel</button>
        <button disabled={this.state.candidates.length < 1} type="submit">Save Office Ballot</button>
      </form>;
  }
}

export default Office;
