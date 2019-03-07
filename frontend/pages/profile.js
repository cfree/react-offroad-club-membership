import Gate from '../components/login/Gate';

const ProfilePage = props => {
  return (
    <Gate>
      Profile for {props.query.user}
    </Gate>
  )
}

export default ProfilePage;
