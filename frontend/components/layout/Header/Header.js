import styled from 'styled-components';
import Link from 'next/link';
import { rgba } from 'polished';

import Nav from '../Nav';
import { siteName } from '../../../config';

const StyledHeader = styled.header`
  /* border-bottom: 5px solid ${({ theme }) => theme.colors.grey_light}; */
  /* padding: 10px; */
  padding: 10px 10px 15px;

  background-repeat: no-repeat, repeat;
  background-size: cover, 100%;
  background-position: center;
  background-color: white;
  background-image: linear-gradient(
    to bottom, 
    ${rgba('white', 1)} 0%, 
    ${rgba('white', 0.5)} 80%, 
    ${rgba('white', 0.5)} 100%),
    url('/static/img/header.jpg');

  text-align: center;
  position: relative;
  /* border-bottom: 1px solid lighten(${({ theme }) => theme.colors.grey_light}, 40%); */

  &::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    height: 7px;
    background: lighten(${({ theme }) => theme.colors.grey_light}, 40%);
    background-image: linear-gradient(
      -90deg,
      rgb(75,87,103) 0%,
      rgb(206,49,44) 85%,
      rgb(255,55,45) 95%
    );
  }
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
          {/* <h1>{siteNameShort}</h1> */}
        </a>
      </Link>
      <Nav />
    </StyledNav>
  </StyledHeader>
);

export default Header;
