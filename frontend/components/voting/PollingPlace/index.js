import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { format } from 'date-fns';

const getElectionQuery = admin =>
  admin
    ? gql`
        query GET_ACTIVE_ELECTIONS_WITH_RESULTS {
          getActiveElections: getActiveElectionsWithResults {
            id
            electionName
            endTime
            races {
              id
              results {
                candidate {
                  id
                  firstName
                  lastName
                }
                count
              }
            }
          }
          getElections
        }
      `
    : gql`
        query GET_ACTIVE_ELECTIONS {
          getActiveElections {
            id
            electionName
            endTime
          }
        }
      `;

const getElectionLink = (admin, id) => (admin
  ? {
    pathname: 'elections',
    query: { edit: id },
  }
  : {
    pathname: 'vote',
    query: { poll: id },
  });

export default class PollingPlace extends Component {
  static defaultProps = {
    admin: false,
  };

  render() {
    return <>
      <h3>Polling Place</h3>
      <Query query={getElectionQuery(this.props.admin)}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error: {error.message}</div>;
          }

          return <>
              {data.getActiveElections.length <= 0 ? <div>
                  No active polls
                </div> : <>
                  ✅ Active Polls:
                  <ul>
                    {data.getActiveElections.map(election => (
                      <li key={election.id}>
                        <Link
                          href={getElectionLink(this.props.admin, election.id)}
                        >
                          <a>{election.electionName}</a>
                        </Link>
                        <br />
                        <small>
                          Ends: {format(election.endTime, 'M/D/YY')}
                        </small>
                        {election.races && <>
                          Results:
                          {election.races.map(race => {
                            return (
                              <div key={race.id}>
                                {race.results.map(result => {
                                  const key =
                                    result.candidate === null
                                      ? null
                                      : result.candidate.id;
                                  const race =
                                    result.candidate === null
                                      ? 'Abstained'
                                      : `${result.candidate.firstName} ${
                                      result.candidate.lastName
                                      }`;

                                  {
                                    /* const key = Date.now();
                              const race = ''; */
                                  }
                                  return (
                                    <div key={key}>
                                      {race}: {result.count}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </>}
                      </li>
                    ))}
                  </ul>
                </>}
            </>;
          }}
          {/* ⛔ Upcoming Polls:
        <ul>
          <li>
            2019 Runs
            <br />
            <small>Starts: 11/30/18, Ends: 1/1/19</small>
          </li>
        </ul>
        
        ⛔ Closed Polls:
        <ul>
          <li>
            2018 Executive Committee Election
            <br />
            <small>Ended 12/1/17</small>
            <Results />
          </li>
        </ul> */}
        </Query>
      </>;
  }
}
