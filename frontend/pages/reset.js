import ResetPassword from '../components/login/ResetPassword';

const ResetPage = props => <ResetPassword token={props.query.token} />;

export default ResetPage;
