import ResetPassword from '../components/Login/ResetPassword';

const ResetPage = props => <ResetPassword token={props.query.token} />;

export default ResetPage;
