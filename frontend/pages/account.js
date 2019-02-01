import Account from '../components/User/Account';
import Gate from '../components/Login/Gate';

const AccountPage = props => {
  return <Gate redirect="/account">
    <h2>Account</h2>
    <Account />
  </Gate>;
};

export default AccountPage;
