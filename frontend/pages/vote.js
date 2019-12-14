import { addDays } from 'date-fns';
import PollingPlace from '../components/voting/PollingPlace';
import Election from '../components/voting/Election';
import Gate from '../components/Login/Gate';
import { isFullMember } from '../lib/utils';

const VotePage = ({ query }) => {
  {
    /* <Gate roleCheck={isFullMember} redirect={`/vote?poll=${query.poll}`}>
<Gate roleCheck={isFullMember} redirect="/vote"> */
  }
  return query.poll ? (
    <Gate redirect="/vote" statusCheck={() => false}>
      <Election id={query.poll} />
    </Gate>
  ) : (
    <Gate redirect="/vote" statusCheck={() => false}>
      <PollingPlace />
    </Gate>
  );
};

export default VotePage;
