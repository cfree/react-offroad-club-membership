import Roles from '../components/Admin/Roles';
import Gate from '../components/Login/Gate';
import { isAdmin, isNotLocked } from '../lib/utils';

const RolesPage = () => {
  return (
    <Gate roleCheck={isAdmin} statusCheck={isNotLocked} redirect="/admin-roles">
      <Roles />
    </Gate>
  );
};

export default RolesPage;
