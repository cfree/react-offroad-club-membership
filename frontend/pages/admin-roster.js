import MembershipList from '../components/admin/MembershipList';
import Gate from '../components/login/Gate';
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
