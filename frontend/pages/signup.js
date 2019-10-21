import styled from 'styled-components';
import SignupForm from '../components/Login/SignupForm';

const StyledSignup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = () => (
  <StyledSignup>
    <SignupForm />
  </StyledSignup>
);

export default SignupPage;
