import Gate from '../components/login/Gate';
import EditAccount from '../components/user/EditAccount';
import EditProfile from '../components/user/EditProfile';

const SettingsPage = ({ query }) => {
  const isAccountPage = query.settings === 'account';

  return (
    <Gate redirect="/settings">
      <h2>{isAccountPage ? 'Account' : 'Profile'} Settings</h2>
      {isAccountPage ? <EditAccount /> : <EditProfile />}
    </Gate>
  );
};

export default SettingsPage;
