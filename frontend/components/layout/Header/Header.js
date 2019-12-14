import styled from 'styled-components';
import Link from 'next/link';
import { rgba } from 'polished';

import Nav from '../Nav';
import { siteName } from '../../../config';

const StyledHeader = styled.header`
  border-bottom: 10px solid ${({ theme }) => theme.colors.grey_light};
  padding: 10px;

  background-repeat: no-repeat, repeat;
  background-size: cover, 100%;
  background-position: center;
  background-color: white;
  background-image: linear-gradient(
    to bottom, 
    ${rgba('white', 1)} 0%, 
    ${rgba('white', 0.8)} 80%, 
    ${rgba('white', 0.5)} 100%),
    url('/static/img/header.jpg');

  text-align: center;
  position: relative;
  border-bottom: 1px solid lighten(${({ theme }) => theme.colors.grey_light}, 40%);
 `;

const StyledNav = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  &:last-child {
    margin-left: auto;
  }

  .logo-image {
    float: left;
    width: auto;
    border-radius: 7px;
  }

  h1 {
    float: left;
    /* margin: 0 0 0 10px; */
    margin: 0;
    text-transform: uppercase;
    /* font-family: ${({ theme }) => theme.fonts.primary}; */
  }
`;

const Header = () => (
  <StyledHeader>
    <StyledNav>
      <Link href="/">
        <a>
          <img className="logo-image" src="/static/img/logo.png" alt={siteName} height="60" />
          {/* <h1>{siteName}</h1> */}
        </a>
      </Link>
      <Nav />
    </StyledNav>
  </StyledHeader>
);

export default Header;
