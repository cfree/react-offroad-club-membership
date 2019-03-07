import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { format, addWeeks } from 'date-fns';
import Router from 'next/router';
import AddOffice from '../AddOffice';

const ELECTION_CANDIDATES_QUERY = gql`
  query ELECTION_CANDIDATES_QUERY {
    electionCandidates(
      roles: [FULL_MEMBER, ADMIN, BOARD_MEMBER, RUN_LEADER]
      accountStatus: ACTIVE
    ) {
      id
      firstName
      lastName
      avatarSmall
    }
  }
`;

const SUBMIT_ELECTION_MUTATION = gql`
  mutation SUBMIT_ELECTION_MUTATION($election: ElectionInput!) {
    submitElection(election: $election) {
      id
    }
  }
`;

class CreateElection extends Component {
  state = {
    title: '',
    startTime: format(Date.now(), 'YYYY-MM-DD'),
    endTime: format(addWeeks(Date.now(), 2), 'YYYY-MM-DD'),
    races: [],
  };

  updateOffices = office => {
    office.id = Date.now();
    this.setState({ races: [...this.state.races, office] });
  };

  updateState = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = async submit => {
    await submit();
    Router.push('/admin');
    // @TODO Refetch queries?
  };

  render() {
    return (
      <Query query={ELECTION_CANDIDATES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error: {error.message}</div>;
          }

          const { electionCandidates } = data;

          return (<>
            <h3>Create New Election</h3>

            <p>
              <label htmlFor="title">
                Title&nbsp;
                <input
                  name="title"
                  id="title"
                  value={this.state.title}
                  onChange={this.updateState}
                  type="text"
                />
              </label>
            </p>

            <p>
              <label htmlFor="startDate">
                Start Time&nbsp;
                <input
                  name="startDate"
                  id="startDate"
                  defaultValue={this.state.startTime}
                  min={format(Date.now(), 'YYYY-MM-DD')}
                  onChange={this.updateState}
                  type="date"
                  id="startDate"
                  pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                />
              </label>

              <label htmlFor="endDate">
                End Date&nbsp;
                <input
                  name="endDate"
                  id="endDate"
                  defaultValue={this.state.endTime}
                  onChange={this.updateState}
                  type="date"
                  id="endDate"
                  pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                />
              </label>
            </p>

            {this.state.races.map(race => (
              <div key={race.id}>
                {race.title}
                {race.candidates.map(candidate => (
                  <span key={candidate.id}>{candidate.firstName}</span>
                ))}
              </div>
            ))}

            <AddOffice
              candidates={electionCandidates}
              handleSubmit={this.updateOffices}
            />

            <button>Cancel</button>

            <Mutation
              mutation={SUBMIT_ELECTION_MUTATION}
              variables={{
                election: {
                  electionName: this.state.title,
                  startTime: this.state.startTime,
                  endTime: this.state.endTime,
                  races: this.state.races.map(race => {
                    delete race.id;
                    race.candidates = race.candidates.map(candidate => ({ id: candidate.id }));
                    return race;
                  }),
                }
              }}
            >
              {submitElection => (
                <button
                  type="button"
                  onClick={() => this.handleSubmit(submitElection)}
                >
                  Create Election
                </button>
              )}
            </Mutation>
          </>);
        }}
      </Query>
    );
  }
}

export default CreateElection;
