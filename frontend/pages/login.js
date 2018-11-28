import styled from 'styled-components';
import Login from '../components/Login';
import ForgotPassword from '../components/Login/ForgotPassword';

const StyledLogin = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const LoginPage = () => {
  return (
    <StyledLogin>
      <Login />
      <ForgotPassword />
    </StyledLogin>
  )
}

export default LoginPage;
