import ResetPassword from '../components/Login/ResetPassword';

const ResetPage = ({ query }) => {
  const { token } = query;
  return token ? <ResetPassword token={token} /> : <p>No token present</p>;
};

export default ResetPage;
