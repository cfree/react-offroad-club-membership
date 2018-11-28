import Gate from '../components/Login/Gate';
import Permissions from '../components/Admin/Permissions';

const PermissionsPage = () => {
  return (
    <Gate>
      <Permissions />
    </Gate>
  );
};

export default PermissionsPage;
