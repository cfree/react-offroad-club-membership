import styled from 'styled-components';
import Link from 'next/link';
import { siteName } from '../../../config';
import { format } from 'date-fns';
import { rgba } from 'polished';

// @include darkSection('../../../../content/assets/tracks.jpg')
const StyledFooter = styled.footer`
  background: ${({ theme }) => theme.colors.grey_light};
  color: white;
  padding: 20px;
  text-align: center;

  background-color: ${({ theme }) => theme.colors.grey_light};
  background-image: linear-gradient(
    to bottom, 
    ${({ theme }) => rgba(theme.colors.grey_light, 0.95)} 0%, 
    ${({ theme }) => rgba(theme.colors.grey_light, 0.95)} 100%);
  background-image: url('/static/img/tracks.jpg');
  background-image: linear-gradient(
    to bottom, 
    ${({ theme }) => rgba(theme.colors.grey_light, 0.95)} 0%, 
    ${({ theme }) => rgba(theme.colors.grey_light, 0.95)} 100%),
    url('/static/img/tracks.jpg');
  background-repeat: no-repeat, repeat;
  background-position: center, center top;
  background-size: contain, 25%;
  border-top: 1px solid ${({ theme }) => theme.colors.black_lighter};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black_lighter};

  img {
    border-radius: 8px;
    width: 50px;
    height: auto;
  }

  a {
    color: white;
    font-size: 15px;
    padding: 10px;
  }

  p {
    margin: 0;
  }
`;

const Footer = () => {
  return <StyledFooter>
    <img src="/static/img/logo.png" alt="Logo" />
    <p>{siteName}</p>
    <p>&copy; 1986 - {format(Date.now(), 'YYYY')}</p>
    
    <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdnyq--8m4mnyQfbrJdQYLxb3sO3OIi4glRIBwdEqP-S2Dxww/viewform?usp=sf_link" title="Report bugs">🐛</a>
  </StyledFooter>;
}

export default Footer;
