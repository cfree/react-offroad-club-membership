import { addDays } from 'date-fns';
import PollingPlace from '../components/voting/PollingPlace';
import Election from '../components/voting/Election';
import Gate from '../components/login/Gate';
import { isFullMember } from '../lib/utils';

const VotePage = ({ query }) => {
  return query.poll ? (
    <Gate roleCheck={isFullMember} redirect={`/vote?poll=${query.poll}`}>
      <Election id={query.poll} />
    </Gate>
  ) : (
      <Gate roleCheck={isFullMember} redirect="/vote">
      <PollingPlace />
    </Gate>
  );
};

export default VotePage;
