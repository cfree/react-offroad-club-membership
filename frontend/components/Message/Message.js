import React from 'react';

const Message = () => {
  return (
    <div>
      <h3>Send a Message</h3>
      <form>
        <div>
          <select>
            <option value="officers">Officers</option>
            <option value="membership">Membership</option>
          </select>
        </div>
        <div>
          <textarea />
        </div>
        <button>Send</button>
      </form>
    </div>
  );
};

export default Message;
