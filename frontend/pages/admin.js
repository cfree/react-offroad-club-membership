import Gate from '../components/Login/Gate';
import Admin from '../components/Admin';

const AdminPage = props => {
  return (
    <Gate>
      <h2>Admin</h2>
      <Admin />
    </Gate>
  );
};

export default AdminPage;
