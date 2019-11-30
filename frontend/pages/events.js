import styled from 'styled-components';
import Link from 'next/link';
import { withRouter } from 'next/router';
import classNames from 'classnames';

import EventList from '../components/events/EventList';
import Gate from '../components/Login/Gate';
import { isAtLeastGuestMember, isNotLocked } from '../lib/utils';
import CreateEvent from '../components/events/CreateEvent';

const StyledEventsPage = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: 1fr 3fr;

  .active {
    font-weight: 700;
  }
`;

const EventsPage = ({ query, router }) => {
  const { type } = query;
  const isUpcoming = type !== 'past';
  const isNew = type === 'new';

  return (
    <Gate>
      <StyledEventsPage>
        <div className="events-aside">
          <ul>
            <li className={classNames({ active: isUpcoming && !isNew })}>
              <Link href="/events">
                <a>Upcoming</a>
              </Link>
            </li>
            <li className={classNames({ active: !isUpcoming && !isNew })}>
              <Link href="/events/past">
                <a>Past</a>
              </Link>
            </li>
          </ul>
          <button onClick={() => router.push('/events/new')}>
            Create Event
          </button>
        </div>
        <div>
          {isNew ? <CreateEvent /> : <EventList upcoming={isUpcoming} />}
        </div>
      </StyledEventsPage>
    </Gate>
  );
};

export default withRouter(EventsPage);
