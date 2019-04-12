import Gate from '../components/login/Gate';
import Profile from '../components/user/Profile';

const ProfilePage = ({ query }) => {
  return (
    <Gate>
      {query.user ? <Profile username={query.user} /> : <Profile />}
    </Gate>
  );
}

export default ProfilePage;
