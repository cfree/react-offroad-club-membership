import { Formik, Field, ErrorMessage, Form } from 'formik';

const RigForm = () => {
  return (
    <div>
      <Formik
        initialValues={{
          image: '',
          year: 0,
          make: '',
          model: '',
          trim: '',
          name: '',
          outfitLevel: ['MODIFIED', 'STOCK'],
          mods: [],
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
            {/* <VehicleImageUploader onUpdate={() => { }} current={'meow'} /> */}

            <Field type="text" name="rigYear" />
            <ErrorMessage name="rigYear" component="div" />

            <Field type="text" name="rigMake" />
            <ErrorMessage name="rigMake" component="div" />

            <Field type="text" name="rigModel" />
            <ErrorMessage name="rigModel" component="div" />

            <Field type="text" name="rigTrim" />
            <ErrorMessage name="rigTrim" component="div" />

            <Field type="text" name="rigName" />
            <ErrorMessage name="rigName" component="div" />

            <Field type="text" name="rigOutfitLevel" />
            <ErrorMessage name="rigOutfitLevel" component="div" />

            <Field type="text" name="rigMods" />
            <ErrorMessage name="rigMods" component="div" />

            <Field type="checkbox" name="isDefault" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RigForm;
