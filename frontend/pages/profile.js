import Gate from '../components/Login/Gate';
import Profile from '../components/User/Profile';

const ProfilePage = ({ query }) => {
  return (
    <Gate>{query.user ? <Profile username={query.user} /> : <Profile />}</Gate>
  );
};

export default ProfilePage;
