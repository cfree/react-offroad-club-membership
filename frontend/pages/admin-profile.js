import Router from 'next/router';
import Roles from '../components/Admin/Roles';
import Gate from '../components/Login/Gate';
import { isAtLeastBoardMember, isActive } from '../lib/utils';
import AdminProfileForm from '../components/User/AdminProfileForm';
import ProfileForm from '../components/User/ProfileForm';

const AdminProfilePage = ({ query }) => {
  const { user = 'self' } = query;

  return (
    <Gate
      roleCheck={isAtLeastBoardMember}
      statusCheck={isActive}
      redirect="/admin-profile"
    >
      <>
        <AdminProfileForm member={user} />
        <ProfileForm member={user} isAdmin={true} />
      </>
    </Gate>
  );
};

export default AdminProfilePage;
