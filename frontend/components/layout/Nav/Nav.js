import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router'
import styled from 'styled-components';
import { clearFix } from 'polished';
import cn from 'classnames';

import User from '../../user/User';
import Logout from '../../Login/Logout';
import { isActive, isMember, isAtLeastBoardMember } from '../../../lib/utils';
import Filter from '../../Login/Filter';

const StyledList = styled.ul`
  ${clearFix()}
  margin: 15px 0 0 0;
  padding: 0;

  & > li {
    list-style: none;
    margin: 0;
    padding: 0;
    float: left;

    & > a {
      padding: 8px 10px;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.grey_light};
    }

    &.active {
      background: ${({ theme }) => theme.colors.grey_light};
      border-radius: 3px;
      a {
        color: white;
      }
    }
  }

  & > li.user {
    list-style: none;
    margin: 0;
    padding: 0;
    float: left;
    position: relative;
  }

  .user-image {
    border-radius: 50%;
    margin-left: 10px;
    cursor: pointer;
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    right: 0;
    list-style: none;
    text-align: left; 
    background: white;
    border: 1px solid ${({ theme }) => theme.colors.white_dark};
    padding: 0;
    margin: 0;
    border-radius: 2px;
    padding: 10px;
    width: 100px;
    transform: opacity 0.3s;

    &--open {
      display: block;
    }

    &:before {
      content: '';
      position: absolute;
      height: 10px;
      width: 10px;
      background: white;
      border-top: 1px solid ${({ theme }) => theme.colors.white_dark};
      border-right: 1px solid ${({ theme }) => theme.colors.white_dark};
      transform: rotate(-45deg);
      z-index: 1;
      right: 10px;
      bottom: calc(100% - 5px);
    }

    & > li {
      padding: 0;
      margin: 0;
      line-height: 1;

      a {
        color: ${({ theme }) => theme.colors.grey_light};
        padding: 5px 0;
        display: inline-block;
      }
    }
  }
`;

const Nav = ({ router, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isOpen, setIsOpen]);

  

 return (
    <nav>
      <StyledList>
        <User>
          {({ data: { myself } }) => {
            return (
              myself && (
                <>
                  <li className={router.pathname === '/' ? 'active' : ''}>
                    <Link href="/">
                      <a>Dashboard</a>
                    </Link>
                  </li>
                  {isActive(myself.accountStatus) &&
                    isMember(myself.accountType) && (
                      <li className={router.pathname === '/roster' ? 'active' : ''}>
                        <Link href="/roster">
                          <a>Roster</a>
                        </Link>
                      </li>
                    )}
                  {isActive(myself.accountStatus) && (
                    <li className={router.pathname === '/events' ? 'active' : ''}>
                      <Link href="/events">
                        <a>Events</a>
                      </Link>
                    </li>
                  )}
                  {isActive(myself.accountStatus) &&
                    isAtLeastBoardMember(myself.role) && (
                      <li className={router.pathname === '/admin' ? 'active' : ''}>
                        <Link href="/admin">
                          <a>Admin</a>
                        </Link>
                      </li>
                    )}
                  <li className="user">
                    <img onClick={handleClick} className="user-image" src={myself.avatar.smallUrl} height="30" alt="Avatar" />
                    <ul className={cn('dropdown-menu', { 'dropdown-menu--open': isOpen })}>
                      <li className={router.pathname === '/profile' ? 'active' : ''}>
                        <Link href="/profile">
                          <a>Profile</a>
                        </Link>
                      </li>
                      <li className={router.pathname === '/settings' ? 'active' : ''}>
                        <Link href="/settings/account">
                          <a>Account</a>
                        </Link>
                      </li>
                      <li>
                        <Logout />
                      </li>
                    </ul>
                  </li>
                </>
              )
            );
          }}
        </User>
      </StyledList>
    </nav>
  )
};

export default withRouter(Nav);
