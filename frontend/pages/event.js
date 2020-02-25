import Gate from '../components/Login/Gate';
import EventDetails from '../components/events/EventDetails';
import { isAtLeastGuestMember, isNotLocked } from '../lib/utils';

const EventPage = ({ query }) => {
  return (
    <Gate redirect={`/event/${query.id}`}>
      <EventDetails id={query.id} />
    </Gate>
  );
};

export default EventPage;
