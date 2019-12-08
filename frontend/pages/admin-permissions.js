import MemberPermissions from '../components/Admin/Roles';
import Gate from '../components/Login/Gate';
import { isAdmin, isActive } from '../lib/utils';

const PermissionsPage = () => {
  return (
    <Gate
      roleCheck={isAdmin}
      statusCheck={isActive}
      redirect="/admin-permissions"
    >
      <MemberPermissions />
    </Gate>
  );
};

export default PermissionsPage;
