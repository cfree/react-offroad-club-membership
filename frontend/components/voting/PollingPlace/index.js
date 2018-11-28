import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { format } from 'date-fns';

const GET_ACTIVE_ELECTIONS = gql`
  query GET_ACTIVE_ELECTIONS {
    getActiveElections {
      id
      electionName
      endTime
    }
  }
`;

export default class PollingPlace extends Component {
  render() {
    return (<>
      <h3>Polling Place</h3>
      <Query query={GET_ACTIVE_ELECTIONS}>
        {({ loading, error, data }) => {
          if (loading) { return <div>Loading...</div> }
          if (error) { return <div>Error: {error.message}</div> }

          return (<>
            ✅ Active Polls:
            {data.getActiveElections.length <= 0
              ? <div>None</div>
              : (
                <ul>
                  {data.getActiveElections.map(election => (
                    <li key={election.id}>
                      <Link
                        href={{
                          pathname: 'vote',
                          query: { poll: election.id },
                        }}
                      >
                        <a>{election.electionName}</a>
                      </Link>
                      <br/>
                      <small>Ends: {format(election.endTime, 'M/D/YY')}</small>
                    </li>
                  ))}
                </ul>
              )
            }
          </>);
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
    </>);
  }
}
