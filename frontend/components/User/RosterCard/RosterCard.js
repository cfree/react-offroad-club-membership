import styled from 'styled-components';
import Link from 'next/link';
import { getMemberType, getPhoneNumber } from '../../../lib/utils';

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
  return (
    <StyledRosterCard>
      <img
        className="member__img"
        src="/static/img/default-user.jpg"
        alt={user.firstName}
      />
      <span>{user.firstName} {user.lastName}</span>
      <span>{getMemberType(user.accountType)}</span>
      <span>{getPhoneNumber(user.phone)}</span >
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
    </StyledRosterCard>
  );
};

export default RosterCard;
