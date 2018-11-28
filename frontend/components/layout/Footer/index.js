import styled from 'styled-components';
import Link from 'next/link';
import { siteName } from '../../../config';
import { format } from 'date-fns';

const StyledFooter = styled.footer`
  background: ${({ theme }) => theme.colors.grey_light};
  color: white;
  margin-top: 70px;
  padding: 20px;
  text-align: center;

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
    <p>
      &copy; {format(Date.now(), 'YYYY')} {siteName}
    </p>
    <Link href="/">
      <a title="Report bugs">🐛</a>
    </Link>
  </StyledFooter>;
}

export default Footer;
