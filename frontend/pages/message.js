import Message from '../components/Message';
import Gate from '../components/login/Gate';
import { isAtLeastGuestMember } from '../lib/utils';

const MessagePage = ({ query }) => {
  const { to } = query;

  return (
    <Gate typeCheck={isAtLeastGuestMember} redirect="/message">
      <Message recipients={to} />
    </Gate>
  );
};

export default MessagePage;
