import Router from 'next/router';
import Roles from '../components/Admin/Roles';
import Gate from '../components/Login/Gate';
import { isAtLeastBoardMember, isActive } from '../lib/utils';
import AdminProfileForm from '../components/user/AdminProfileForm';
import AdminOverview from '../components/user/AdminOverview';
import ProfileForm from '../components/user/ProfileForm';
import MembershipLog from '../components/user/MembershipLog';

const AdminProfilePage = ({ query }) => {
  const { user = 'self' } = query;

  return (
    <Gate
      roleCheck={isAtLeastBoardMember}
      statusCheck={isActive}
      redirect="/admin-profile"
    >
      <>
        <AdminOverview member={user} />

        {/* <div>
          <h2>Offices and Titles History</h2>
          Manual Log Entry: <input type="text" />
          (Start Date, End Date, Title/Office, User)
        </div> */}

        <MembershipLog member={user} />

        <AdminProfileForm member={user} />

        <ProfileForm member={user} isAdmin={true} />
      </>
    </Gate>
  );
};

export default AdminProfilePage;
