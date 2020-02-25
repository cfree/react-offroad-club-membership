import { Formik, Field, ErrorMessage, Form } from 'formik';

import ChangeEmail from '../../Login/ChangeEmail';
import ChangePassword from '../../Login/ChangePassword';

const AccountForm = ({ token = null }) => {
  return (
    <div>
      {/* 
        <NotificationPreferences /> 

        Campaigns:
        - Member Newsletter
        - Club Announcements
        - Event Announcements

        Transactional: 
        - Event Updates (if RSVP yes)
        - Event Cancellations (if RSVP yes)
        - Password reset
        - Account created
          - To admin/board
          - To user
        - Account status change
          - Account unlocked triggers automation
          - New full member
        - Post event: Minutes have been posted
        
        Automation:
        - Welcome
          - New account welcome
          - New account helpful tips

      */}

      <div>
        <h2>Type</h2>

        <p>
          <h3>Full</h3>
        </p>
      </div>
      <div>
        <h2>Status</h2>
        
        <p>
          <h3>Active</h3>
          Your account is in good standing.
        </p>

        <p>
          <h3>Past Due</h3>
          Happy New Year! It's (year) and that means it's time to pay your membership dues. 
          Please pay before March 31st to remain on the membership roster.
          
          <button>Pay Dues</button>
        </p>
        <p>
          <h3>Lapsed</h3>
          We had to suspend your account because your membership dues had not been 
          received by March 31st. If you would like to reactivate your membership, send the 
          board a quick email.

          <button>Send Message</button>
        </p>
        <p>
          <h3>Inactive</h3>
          Your membership has lapsed due to non-payment. If you would like to become a member
          again, send the board a quick email.

          <button>Send Message</button>
        </p>

        <p>
          <h3>Resigned</h3>
          You have resigned from membership. Sorry to see you go! If you would like to become a member
          again, send the board a quick email.

          <button>Send Message</button>
        </p>

        <p>
          <h3>Removed</h3>
          You have been removed from membership. If you have any questions, please contact the 
          board.

          <button>Send Message</button>
        </p>

        <p>
          {/* Account Type: Guest */}
          <h3>Limited</h3>
          You are a guest.

          Runs Attended: 3 <small>You are allowed to attend 3 runs before we ask that you become a member</small>
          Meetings Attended: 1

          Congratulations! You are eligible for membership. If you have any questions, please contact the 
          board.

          <button>Send Message</button>
        </p>

        <p>
          {/* Account Type: Emeritus */}
          <h3>Limited</h3>
          You are an Emeritus Member.

          You have all the perks of full membership, except you do not have
          to pay annual dues and you cannot vote on club business.
        </p>

        <p>
          <h3>Locked</h3>
          Welcome! Your account is being reviewed. Please make sure your profile is filled out. If you have any questions, please contact the 
          the Webmaster.

          <button>Send Message</button>
        </p>        
      </div>

      <div>
        <h2>Dues</h2>
        
        {/* Current */}
        <p><strong>Last Paid:</strong> 1/20/2019</p>

        {/* Pay */}

      </div>

      <ChangeEmail />
      <ChangePassword />
      {/* <button>Delete my account</button> */}
    </div>
  );
};

export default AccountForm;
