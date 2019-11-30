import styled from 'styled-components';
import Link from 'next/link';
import {
  getMemberType,
  getPhoneNumber,
  isAtMostRunmaster,
  isAtLeastBoardMember,
} from '../../../lib/utils';
import Filter from '../../Login/Filter';

const StyledRosterCard = styled.div`
  padding: 5px 10px;
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 30px 1fr 1fr 1fr auto auto;

  &:nth-child(even) {
    background: tomato;
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

const RosterCard = ({ user }) => {
  const { phone } = user.contactInfo || { phone: '' };

  return (
    <StyledRosterCard>
      <img
        className="member__img"
        src="/static/img/default-user.jpg"
        alt={user.firstName}
      />
      <span>
        {user.firstName} {user.lastName}
      </span>
      <span>{getMemberType(user.accountType)}</span>
      {phone !== null && <span>{getPhoneNumber(phone)}</span>}
      <Link
        href={{
          pathname: 'message',
          query: { to: user.username },
        }}
      >
        <a>Message</a>
      </Link>
      <Link href={`/profile/${user.username}`}>
        <a>View</a>
      </Link>
      <Filter roleCheck={isAtLeastBoardMember}>
        <Link href={`/admin-profile/${user.username}`}>
          <a>Edit</a>
        </Link>
      </Filter>
    </StyledRosterCard>
  );
};

export default RosterCard;
