import Message from '../components/Message';
import Gate from '../components/Login/Gate';
import { isAtLeastGuestMember } from '../lib/utils';

const MessagePage = ({ query }) => {
  const { to } = query;

  return (
    <Gate typeCheck={isAtLeastGuestMember} redirect={`/message${to ? `/to=${to}` : ''}`}>
      <Message recipients={to} />
    </Gate>
  );
};

export default MessagePage;
