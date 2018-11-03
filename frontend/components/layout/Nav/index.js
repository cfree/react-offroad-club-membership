import Link from 'next/link';
import styled from 'styled-components';
import { clearFix } from 'polished';

const StyledList = styled.ul`
  ${clearFix()}
  margin: 15px 0 0 0;
  padding: 0;

  li {
    list-style: none;
    margin: 0;
    padding: 0;
    float: left;
  }

  a {
    padding: 8px 10px;
    text-transform: uppercase;
  }
`;

const Nav = () => {
  return <nav>
      <StyledList>
        <li>
          <Link>
            <a>Dashboard</a>
          </Link>
        </li>
        <li>
          <Link>
          <a>Admin</a>
          </Link>
        </li>
        <li>
          <Link>
          <a>Account</a>
          </Link>
        </li>
      </StyledList>
    </nav>;
};

export default Nav;
