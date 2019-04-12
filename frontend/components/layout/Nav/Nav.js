import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { clearFix } from 'polished';

import User from '../../user/User';
import Logout from '../../login/Logout';
import { isAtLeastBoardMember } from '../../../lib/utils';

const StyledList = styled.ul`
  ${clearFix()}
  margin: 15px 0 0 0;
  padding: 0;

  li {
    list-style: none;
    margin: 0;
    padding: 0;
    float: left;
  }

  a {
    padding: 8px 10px;
    text-transform: uppercase;
  }
`;

const Nav = () => (
  <nav>
    <StyledList>
      <User>
        {({ data: { myself } }) => {
          return myself ? (
            <>
              <li>
                <Link href="/">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="/roster">
                  <a>Roster</a>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <a>Events</a>
                </Link>
              </li>
              {isAtLeastBoardMember(myself.role) && (
                <li>
                  <Link href="/admin">
                    <a>Admin</a>
                  </Link>
                </li>
              )}
              <li>
                <Link href="/profile">
                  <a>Your Profile</a>
                </Link>
              </li>
              <li>
                <Link href="/settings/account">
                  <a>Account Settings</a>
                </Link>
              </li>
              <li>
                <Logout />
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">
                <a>Log In</a>
              </Link>
            </li>
          );
        }}
      </User>
    </StyledList>
  </nav>
);

export default Nav;
