import Gate from '../components/Login/Gate';

const ProfilePage = props => {
  return (
    <Gate>
      Profile for {props.query.user}
    </Gate>
  )
}

export default ProfilePage;
