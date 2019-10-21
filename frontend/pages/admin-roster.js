import MembershipList from '../components/Admin/MembershipList';
import Gate from '../components/Login/Gate';
import { isAtLeastBoardMember, isNotLocked } from '../lib/utils';

const AdminRosterPage = () => {
  return (
    <Gate
      roleCheck={isAtLeastBoardMember}
      statusCheck={isNotLocked}
      redirect="/admin-roster"
    >
      <MembershipList />
    </Gate>
  );
};

export default AdminRosterPage;
