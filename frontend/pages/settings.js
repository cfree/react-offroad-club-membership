import Account from '../components/user/Account';
import Gate from '../components/login/Gate';

const AccountPage = props => {
  return <Gate redirect="/account">
    <h2>Account</h2>
    <Account />
  </Gate>;
};

export default AccountPage;
