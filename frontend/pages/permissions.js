import Permissions from '../components/Admin/Permissions';
import Gate from '../components/Login/Gate';
import { isAtLeastBoardMember, isNotLocked } from '../lib/utils';

const PermissionsPage = () => {
  return (
    <Gate roleCheck={isAtLeastBoardMember} statusCheck={isNotLocked} redirect="/permissions">
      <Permissions />
    </Gate>
  );
};

export default PermissionsPage;
