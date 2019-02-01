import { addDays } from 'date-fns';
import PollingPlace from '../components/voting/PollingPlace';
import Election from '../components/voting/Election';
import Gate from '../components/Login/Gate';
import { isAtLeastFullMember } from '../lib/utils';

const VotePage = ({ query }) => {
  return query.poll ? (
    <Gate roleCheck={isAtLeastFullMember} redirect={`/vote?poll=${query.poll}`}>
      <Election id={query.poll} />
    </Gate>
  ) : (
    <Gate roleCheck={isAtLeastFullMember} redirect="/vote">
      <PollingPlace />
    </Gate>
  );
};

export default VotePage;
