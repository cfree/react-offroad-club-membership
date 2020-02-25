import Quorum from '../components/Admin/Quorum';
import Gate from '../components/Login/Gate';
import { isAtLeastBoardMember, isNotLocked } from '../lib/utils';

const AdminRosterPage = () => {
  return (
    <Gate
      roleCheck={isAtLeastBoardMember}
      statusCheck={isNotLocked}
      redirect="/admin-quorum"
    >
      <Quorum />
    </Gate>
  );
};

export default AdminRosterPage;
