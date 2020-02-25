import Admin from '../components/Admin/Admin';
import Gate from '../components/Login/Gate';
import { isAtLeastBoardMember, isActive } from '../lib/utils';

const AdminPage = props => {
  return (
    <Gate redirect="/admin" statusCheck={isActive} roleCheck={isAtLeastBoardMember}>
      <h2>Admin Dashboard</h2>
      <Admin />
    </Gate>
  );
};

export default AdminPage;
