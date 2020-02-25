import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import { Switch } from '@rebass/forms';

import EventList from '../components/events/EventList';
import Gate from '../components/Login/Gate';
import Filter from '../components/Login/Filter';
import { isNotLocked, isAtLeastRunMaster } from '../lib/utils';
import CreateEvent from '../components/events/CreateEvent';
import Button from '../components/common/Button';

const StyledNav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`

const StyledSwitch = styled.span`
  display: flex;
  margin: 0 0 20px;
  align-items: center;

  span {
    margin: 0 5px;
    cursor: pointer;

    button {
      float: left;
      cursor: pointer;
    }
  }
`;

const EventsSwitch = ({ onClick, off }) => {
  return (
    <StyledSwitch>
      Upcoming
      <span onClick={onClick}>
        <Switch checked={off} />
      </span>
      Past
    </StyledSwitch>
  );
}

const EventsPage = ({ query, router }) => {
  const { type } = query;
  const isNew = type === 'new';
  const [upcoming, setUpcoming] = useState(type !== 'past');
  const handleClick = useCallback(
    () => {
      setUpcoming(!upcoming);
    }, [upcoming, setUpcoming]
  );
  const redirect = `events${type ? `/${type}` : ''}`

  return (
    <Gate redirect={redirect}>
      <>
        <StyledNav>
          {!isNew && (
            <>
              <Filter roleCheck={isAtLeastRunMaster} statusCheck={isNotLocked}>
                <Button onClick={() => router.push('/events/new')}>
                  Create Event
                </Button>
              </Filter>
              <EventsSwitch onClick={handleClick} off={!upcoming} />
            </>
          )}
        </StyledNav>
        {isNew ? <CreateEvent /> : <EventList upcoming={upcoming} />}
      </>
    </Gate>
  );
};

export default withRouter(EventsPage);
