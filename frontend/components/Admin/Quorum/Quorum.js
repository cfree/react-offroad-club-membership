import React, { useState, useCallback } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import styled from 'styled-components';
import parse from 'html-react-parser';
import Link from 'next/link';

import ErrorMessage from '../../utility/ErrorMessage';
import Button from '../../common/Button';
import { accountTypes, DEFAULT_AVATAR_SRC, accountStatuses } from '../../../lib/constants';

const QUORUM_QUERY = gql`
  query QUORUM_QUERY {
    users(
      accountStatus: [ACTIVE, PAST_DUE]
      accountType: [FULL]
    ) {
      username
      id
      firstName
      lastName
      avatar {
        url
      }
      accountType
      accountStatus
    }
  }
`;

const StyledQuorum = styled.div`
  margin: 40px auto;

  .cols {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 20px;
  }

  table {
    margin: 0 0 20px;
  }

  th {
    text-align: left;
    padding: 10px;
  }

  thead tr {
    background: ${({ theme }) => theme.colors.grey_lighter};
  }

  tr {
    &:nth-of-type(even) {
      background: ${({ theme }) => theme.colors.white_dark};
    }
  }

  td {
    padding: 10px;
    vertical-align: middle;

    &:first-of-type {
      width: 6%;
    }

    &:nth-of-type(3) {
      width: 20%;
    }

    &:nth-of-type(4) {
      width: 20%;
    }

    &:last-of-type {
      width: 10%;
    }
  }

  img {
    border-radius: 50%;
    display: block;
  }

  button {
    margin: 0 auto;
  }
`;

const Quorum = () => {
  const [present, setPresent] = useState(0);

  const handleCheck = useCallback(
    (e) => {
      if (e.target.checked) {
        setPresent(present + 1);
      } else {
        setPresent(present - 1);
      }
    },
    [present, setPresent]
  );

  const determineQuorum = useCallback((total) => {
    const percentage = (present/total)
    const hasQuorum = percentage >= (1/3)
      ? '<span className="quorum-yes">Yes</span>'
      : '<span className="quorum-no">No</span>';

    return `${hasQuorum} (${100 * percentage}%)`;
  }, [present]);

  return (
    <Query query={QUORUM_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <ErrorMessage error={error} />;
        }

        const { users } = data;

        return (
          <StyledQuorum>
            <h2>Meeting Quorum</h2>

            <div className="cols">
              <table cellSpacing="0">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Account Type</th>
                    <th>Account Status</th>
                    <th>Present</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => {
                    const AVATAR_SRC = get(user, 'avatar.url', DEFAULT_AVATAR_SRC);
                    
                    return (
                      <tr key={user.id}>
                        <td>
                          <img
                            src={AVATAR_SRC}
                            alt={`${user.firstName} ${user.lastName}`}
                            width="50"
                            height="50"
                          />
                        </td>
                        <td><Link href={`/admin-profile/${user.username}`}><a>{user.firstName} {user.lastName}</a></Link></td>
                        <td>{accountTypes[user.accountType]}</td>
                        <td>{accountStatuses[user.accountStatus]}</td>
                        <td><input type="checkbox" onChange={handleCheck} /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div>
                <p>Total Members: {users.length}</p>
                <p>Total Present: {present}</p>

                <p>Quorum: {parse(determineQuorum(users.length))}</p>
              </div>
            </div>
            {/* <Button>Record</Button> */}
          </StyledQuorum>
        );
      }}
    </Query>
  );
};

export default Quorum;
