import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import get from 'lodash/get';

import { getMemberType } from '../../../lib/utils';
import {
  offices,
  DEFAULT_AVATAR_SRC,
  DEFAULT_RIG_SRC,
} from '../../../lib/constants';
import {
  StyledRigbookCard,
  StyledVehicleImg,
  StyledUserImg,
  StyledProfileActionsList,
  StyledTitles,
  StyledContent,
} from './rigbookCard.styles';

const RigbookCard = ({ user }) => {
  const RIG_SRC = get(user.rig, 'image.url');
  const AVATAR_SRC = get(user.avatar, 'url');

  return (
    <StyledRigbookCard>
      <div className="user-photos">
        <StyledVehicleImg
          src={RIG_SRC || DEFAULT_RIG_SRC}
          alt={`${user.firstName}'s Vehicle`}
        />
        <StyledUserImg
          src={AVATAR_SRC || DEFAULT_AVATAR_SRC}
          alt={user.firstName}
        />
      </div>
      <StyledContent>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        {user.office && <StyledTitles>{offices[user.office]}</StyledTitles>}
        {user.titles && <StyledTitles>{user.titles.join(', ')}</StyledTitles>}
        {user.vehicle && (
          <>
            <h3>
              {user.vehicle.year} {user.vehicle.make} {user.vehicle.model}
            </h3>
            {user.vehicle.trim && <h4>{user.vehicle.trim}</h4>}
          </>
        )}
        <h5>
          {getMemberType(user.accountType)} &bull; Joined{' '}
          {format(user.joined, 'YYYY')}
        </h5>
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
        <li>
          <Link
            href={{
              pathname: 'message',
              query: { to: user.username },
            }}
          >
            <a>Message</a>
          </Link>
        </li>
      </StyledProfileActionsList>
    </StyledRigbookCard>
  );
};

export default RigbookCard;
