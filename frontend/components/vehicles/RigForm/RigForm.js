import * as yup from 'yup';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import styled from 'styled-components';

import Loading from '../../utility/Loading/Loading';
import ErrorMessage from '../../utility/ErrorMessage/ErrorMessage';
import { outfitLevel } from '../../../lib/constants';

const rigSchema = yup.object().shape({
  year: yup.string().required('Year is required'),
  make: yup.string().required('Make is required'),
  model: yup.string().required('Model is required'),
  trim: yup.string(),
  name: yup.string(),
  outfitLevel: yup.string().matches(/(0|MODIFIED|STOCK)/),
  mods: yup.string(),
});

const StyledForm = styled.div`
  padding: 20px;
  margin: 20px 0;
  background: ${({ theme }) => theme.colors.white_dark};

  .form-footer {
    text-align: center;
  }
`;

const StyledFormField = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;

  .profile-form-label {
    text-align: right;
  }

  .profile-form-field {
  }

  .profile-form-textarea {
    background: white;
  }

  [type='radio'] {
    margin-right: 5px;
  }

  label + label {
    margin-left: 10px;
  }
`;

const RigForm = ({
  initialValues,
  onSubmit,
  loading = '',
  error,
}) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={rigSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
        }}
      >
        {formikProps => (
          <StyledForm className="profile-form--user">
            <form onSubmit={formikProps.handleSubmit}>
              <StyledFormField>
                <label className="profile-form-label" htmlFor="year">
                  Year
                </label>
                <div className="profile-form-field">
                  <Field
                    type="text"
                    id="year"
                    name="year"
                  />
                  <FormikErrorMessage name="year" component="div" />
                </div>
              </StyledFormField>

              <StyledFormField>
                <label className="profile-form-label" htmlFor="make">
                  Make
                </label>
                <div className="profile-form-field">
                  <Field
                    type="text"
                    id="make"
                    name="make"
                  />
                  <FormikErrorMessage name="make" component="div" />
                </div>
              </StyledFormField>

              <StyledFormField>
                <label className="profile-form-label" htmlFor="model">
                  Model
                </label>
                <div className="profile-form-field">
                  <Field
                    type="text"
                    id="model"
                    name="model"
                  />
                  <FormikErrorMessage name="model" component="div" />
                </div>
              </StyledFormField>

              <StyledFormField>
                <label className="profile-form-label" htmlFor="trim">
                  Trim
                </label>
                <div className="profile-form-field">
                  <Field
                    type="text"
                    id="trim"
                    name="trim"
                  />
                  <FormikErrorMessage name="trim" component="div" />
                </div>
              </StyledFormField>

              <StyledFormField>
                <label className="profile-form-label" htmlFor="name">
                  Name
                </label>
                <div className="profile-form-field">
                  <Field
                    type="text"
                    id="name"
                    name="name"
                  />
                  <FormikErrorMessage name="name" component="div" />
                </div>
              </StyledFormField>

              <StyledFormField>
                <label className="profile-form-label" htmlFor="outfitLevel">
                  Outfit Level
                </label>
                <div className="profile-form-field">
                  <Field
                    component="select"
                    name="outfitLevel"
                    id="outfitLevel"
                    defaultValue={formikProps.initialValues.outfitLevel}
                  >
                    {Object.entries({ 0: 'n/a', ...outfitLevel }).map(
                      (outfitLevel, idx) => (
                        <option key={idx} value={outfitLevel[0]}>
                          {outfitLevel[1]}
                        </option>
                      ),
                    )}
                  </Field>
                  <FormikErrorMessage name="outfitLevel" component="div" />
                </div>
              </StyledFormField>

              <StyledFormField>
                <label className="profile-form-label" htmlFor="mods">
                  Mods (comma separated)
                </label>
                <div className="profile-form-field">
                  <Field
                    type="text"
                    id="mods"
                    name="mods"
                  />
                  <FormikErrorMessage name="mods" component="div" />
                </div>
              </StyledFormField>
              
              {/* <Field type="checkbox" name="isDefault" /> */}

              <div className="form-footer">
                <button
                  type="submit"
                  disabled={
                    Object.keys(formikProps.errors).length > 0 ||
                    formikProps.isSubmitting ||
                    loading
                  }
                >
                  Update
                </button>
                <Loading loading={loading} />
                <ErrorMessage error={error} />
              </div>
            </form>
          </StyledForm>
        )}
      </Formik>
    </div>
  );
};

export default RigForm;
