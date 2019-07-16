import {
  Formik,
  Field,
  ErrorMessage,
  Form,
} from 'formik';

const AccountForm = () => {
  return (
    <div>
      <Formik
        initialValues={{
          memEmail: '',
        }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />

            {/* Email Preferences */}
            {/* Password change */}

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <button>Password reset</button>
      <button>Delete my account</button>
    </div>
  );
};

export default AccountForm;
