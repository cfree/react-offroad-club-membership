import Admin from '../components/admin/Admin';
import Gate from '../components/login/Gate';
import { isAtLeastBoardMember, isNotLocked } from '../lib/utils';

const AdminPage = props => {
  return (
    <Gate redirect="/admin" statusCheck={isNotLocked} roleCheck={isAtLeastBoardMember}>
      <h2>Admin</h2>
      <Admin />
    </Gate>
  );
};

export default AdminPage;
