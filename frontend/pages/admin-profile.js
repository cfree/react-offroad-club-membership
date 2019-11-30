import Router from 'next/router';
import Roles from '../components/Admin/Roles';
import Gate from '../components/Login/Gate';
import { isAdmin, isNotLocked } from '../lib/utils';
import ProfileForm from '../components/User/ProfileForm';

const AdminProfilePage = ({ query }) => {
  const { user } = query;

  return user ? (
    <Gate statusCheck={isNotLocked} redirect="/admin-profile">
      <ProfileForm member={user} />
    </Gate>
  ) : (
    <div>Nothing to see here</div>
  );
};

export default AdminProfilePage;
