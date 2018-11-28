import { addDays } from 'date-fns';
import PollingPlace from '../components/voting/PollingPlace';
import Election from '../components/voting/Election';

const VotePage = ({ query }) =>
  query.poll ? (
    <>
      <Election id={query.poll} />
    </>
  ) : (
    <>
      <PollingPlace />
    </>
  );

export default VotePage;
