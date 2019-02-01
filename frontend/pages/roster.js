import Roster from '../components/User/Roster';
import Gate from '../components/Login/Gate';
import { isAtLeastAssociateMember, isActive } from '../lib/utils';

const RosterPage = props => {
  return <Gate roleCheck={isAtLeastAssociateMember} statusCheck={isActive} redirect="/roster">
    <h2>Membership Roster</h2>
    Rigbook / List
    <Roster />
  </Gate>;
};

export default RosterPage;
