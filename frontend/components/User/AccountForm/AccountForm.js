import { Formik, Field, ErrorMessage, Form } from 'formik';

import ChangeEmail from '../../Login/ChangeEmail';
import ChangePassword from '../../Login/ChangePassword';

const AccountForm = ({ token = null }) => {
  console.log('account form', token);
  return (
    <div>
      {/* <EmailPreferences /> */}
      <ChangeEmail />
      <ChangePassword />
      {/* <button>Delete my account</button> */}
    </div>
  );
};

export default AccountForm;
