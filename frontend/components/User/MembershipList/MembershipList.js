import styled from 'styled-components';
import Link from 'next/link';

import { getMemberType } from '../../../lib/utils';

const StyledMembershipList = styled.div`
  border: 1px solid ${({ theme }) => theme.grey};
  display: grid;

  .member {
    padding: 3px 10px;

    &:nth-child(even) {
      background: tomato;
    }
  }

  .member__img {
    margin: 0 auto;
    height: 30px;
    width: 30px;
    border-radius: 100%;
    border: 1px solid black;
    position: relative;
    vertical-align: middle;
  }
`;

const defaultUser = {
  id: '12345',
  userName: 'cfree',
  firstName: 'Craig',
  lastName: 'Freeman',
  username: 'cfree',
  phone: '619-559-2580',
  email: 'craigfreeman@gmail.com',
  role: 'FULL_MEMBER',
  vehicle: {
    year: 2005,
    make: 'Jeep',
    model: 'Wrangler',
    trim: 'Unlimited',
    image: '',
  },
  titles: ['Webmaster'],
};

const MembershipList = ({ user = defaultUser }) => {
  return (
    <StyledMembershipList>
      {[1, 2, 3, 4, 5].map(id => (
        <div className="member" key={id}>
          <img
            className="member__img"
            src="/static/img/default-user.jpg"
            alt={user.firstName}
          />
          {user.firstName} {user.lastName}
          {getMemberType(user.role)}
          {user.phone}
          {user.email}
          <Link href={`/profile/${user.username}`}><a>View</a></Link>
        </div>
      ))}
    </StyledMembershipList>
  );
};

export default MembershipList;
