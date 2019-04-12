import Gate from '../components/login/Gate';
import EventDetails from '../components/events/EventDetails';
import { isAtLeastGuestMember, isNotLocked } from '../lib/utils';

const EventPage = ({ query }) => {
  return (
    <Gate>
      <EventDetails id={query.id} />
    </Gate>
  );
};

export default EventPage;
