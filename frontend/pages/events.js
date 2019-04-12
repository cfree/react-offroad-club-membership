import styled from 'styled-components';
import Link from 'next/link';
import EventList from '../components/events/EventList';
import Gate from '../components/login/Gate';
import classNames from 'classnames';
import { isAtLeastGuestMember, isNotLocked } from '../lib/utils';

const StyledEventsPage = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: 1fr 3fr;

  .active {
    font-weight: 700;
  }
`;

const EventsPage = ({ query }) => {
  const isUpcoming = query.type !== 'past';

  return (
    <Gate>
      <StyledEventsPage>
        <div className="events-aside">
          <ul>
            <li className={classNames({ active: isUpcoming })}>
              <Link href="/events">
                <a>Upcoming</a>
              </Link>
            </li>
            <li className={classNames({ active: !isUpcoming })}>
              <Link href="/events/past">
                <a>Past</a>
              </Link>
            </li>
          </ul>
        </div>
        <EventList upcoming={isUpcoming} />
      </StyledEventsPage>
    </Gate>
  );
}

export default EventsPage;
