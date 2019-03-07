import Permissions from '../components/admin/Permissions';
import Gate from '../components/login/Gate';
import { isAtLeastBoardMember, isNotLocked } from '../lib/utils';

const PermissionsPage = () => {
  return (
    <Gate roleCheck={isAtLeastBoardMember} statusCheck={isNotLocked} redirect="/permissions">
      <Permissions />
    </Gate>
  );
};

export default PermissionsPage;
