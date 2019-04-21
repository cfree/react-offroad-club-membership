import Message from '../components/Message';
import Gate from '../components/login/Gate';
import { isAtLeastGuestMember } from '../lib/utils';

const MessagePage = () => {
  return (
    <Gate typeCheck={isAtLeastGuestMember} redirect="/message">
      <Message />
    </Gate>
  );
};

export default MessagePage;
