import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import get from 'lodash/get';

import { getMemberType, isAtLeastRunLeader } from '../../../lib/utils';
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
import Filter from '../../Login/Filter';

const RigbookCard = ({ user }) => {
  const RIG_SRC = get(user, 'rig.image.url', DEFAULT_RIG_SRC);
  const AVATAR_SRC = get(user, 'avatar.url', DEFAULT_AVATAR_SRC);

  return (
    <StyledRigbookCard>
      <div className="user-photos">
        <StyledVehicleImg
          src={RIG_SRC}
          alt={`${user.firstName}'s Vehicle`}
        />
        <StyledUserImg
          src={AVATAR_SRC}
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
          {getMemberType(user.accountType)}
          {user.joined && ` • Joined ${format(user.joined, 'YYYY')}`}
        </h5>
      </StyledContent>
      <StyledProfileActionsList>
        {user.username && (
          <>
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
            <Filter roleCheck={isAtLeastRunLeader}>
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
            </Filter>
          </>
        )}
      </StyledProfileActionsList>
    </StyledRigbookCard>
  );
};

export default RigbookCard;
