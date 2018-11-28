import React from 'react'
import Link from 'next/link';
import { format } from 'date-fns';
import {
  StyledRigbookCard,
  StyledVehicleImg,
  StyledUserImg,
  StyledProfileActionsList,
  StyledTitles,
  StyledContent,
} from './styles';

const getMemberType = (role) => {
  switch (role) {
    case 'FULL_MEMBER':
    case 'RUN_LEADER':
    case 'EXECUTIVE_COMMITTEE':
    case 'ADMIN':
      return 'Full Member';
    default: 
      return role.replace('_', ' ');
  }
}

const RigbookCard = ({ user }) => {
  // const user = {
  //   firstName: 'Craig',
  //   lastName: 'Freeman',
  //   username: 'cfree',
  //   joined: '2018-12-01T00:00:00.000Z',
  //   vehicle: {
  //     year: 2005,
  //     make: 'Jeep',
  //     model: 'Wrangler',
  //     trim: 'Unlimited',
  //     image: '',
  //   }, 
  //   titles: ['Webmaster'],
  //   memberType: 'Full Member',
  // };

  return <StyledRigbookCard>
    <div className="user-photos">
      <StyledVehicleImg src="/static/img/default-vehicle.jpg" alt={`${user.firstName}'s Vehicle`} />
      <StyledUserImg src="/static/img/default-user.jpg" alt={user.firstName} />
    </div>
    <StyledContent>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      {user.vehicle && <>
        <h3>
          {user.vehicle.year} {user.vehicle.make} {user.vehicle.model}
        </h3>
        <h4>{user.vehicle.trim}</h4>
      </>}
      {/* <StyledTitles>{user.titles.join(', ')}</StyledTitles> */}
      <h5>{getMemberType(user.role)} since {format(user.joined, 'YYYY')}</h5>
    </StyledContent>
    <StyledProfileActionsList>
      <li>
        <Link
          as={`/profile/${user.username}`}
          href={{
            pathname: 'profile',
            query: { user: user.username },
          }}
        >
          <a>View Profile</a>
        </Link>
      </li>
      <li>Message</li>
    </StyledProfileActionsList>
  </StyledRigbookCard>;
}

export default RigbookCard;
