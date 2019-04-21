import Roles from '../components/admin/Roles';
import Gate from '../components/login/Gate';
import { isAdmin, isNotLocked } from '../lib/utils';

const RolesPage = () => {
  return (
    <Gate roleCheck={isAdmin} statusCheck={isNotLocked} redirect="/admin-roles">
      <Roles />
    </Gate>
  );
};

export default RolesPage;
