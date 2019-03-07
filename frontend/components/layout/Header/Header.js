import styled from 'styled-components';
import Link from 'next/link';

import Nav from '../Nav';
import { siteName } from '../../../config';

const StyledHeader = styled.header`
  border-bottom: 10px solid ${({ theme }) => theme.colors.grey_light};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  &:last-child {
    margin-left: auto;
  }

  img {
    float: left;
    width: auto;
  }

  h1 {
    float: left;
    margin: 0 0 0 10px;
    text-transform: uppercase;
  }
 `;

const Header = () => (
  <StyledHeader>
    <Link href="/">
      <a>
        <img src="/static/img/logo.png" alt={siteName} height="60" />
        <h1>{siteName}</h1>
      </a>
    </Link>
    <Nav />
  </StyledHeader>
);

export default Header;
