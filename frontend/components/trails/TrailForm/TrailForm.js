import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';

import { trailSchema } from './trailForm.schema';
import RichTextArea from '../../utility/RichTextArea';
import Loading from '../../utility/Loading/Loading';
import ErrorMessage from '../../utility/ErrorMessage/ErrorMessage';
import UploadImagePreview from '../../common/UploadImagePreview';

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

const createSlug = title => {
  return encodeURI(
    title
      .toLowerCase()
      .replace(' ', '-')
      .replace("'", ''),
  );
};

const TrailForm = ({
  initialValues,
  onSubmit,
  loading = '',
  error,
  submitLabel = 'Submit',
}) => {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={trailSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
        }}
      >
        {formikProps => {
          return (
            <StyledForm className="profile-form--user">
              <form onSubmit={formikProps.handleSubmit}>
                <StyledFormField>
                  <label className="profile-form-label" htmlFor="name">
                    Name
                  </label>
                  <div className="profile-form-field">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      onChange={e => {
                        formikProps.setFieldValue(
                          'slug',
                          createSlug(e.target.value),
                        );
                        formikProps.handleChange(e);
                      }}
                    />
                    <FormikErrorMessage name="name" component="div" />
                  </div>
                </StyledFormField>

                <StyledFormField>
                  <label className="profile-form-label" htmlFor="slug">
                    URL Slug
                  </label>
                  <div className="profile-form-field">
                    <Field typ="text" id="slug" name="slug" />
                    <small>
                      Ex: 4-playersofcolorado.org/trail/
                      <strong>{formikProps.values.slug}</strong>
                    </small>
                    <FormikErrorMessage name="slug" component="div" />
                  </div>
                </StyledFormField>

                <StyledFormField>
                  {formikProps.values.newImage && (
                    <UploadImagePreview file={formikProps.values.newImage} />
                  )}

                  {!formikProps.values.newImage && initialValues.image && (
                    <img src={initialValues.image} alt="" width="400" />
                  )}
                  <label className="profile-form-label" htmlFor="newImage">
                    Featured Image
                  </label>
                  <div className="profile-form-field">
                    <Field
                      name="newImage"
                      id="newImage"
                      component={({ field, form }) => (
                        <input
                          id="file"
                          name="file"
                          type="file"
                          onChange={event => {
                            form.setFieldValue(
                              'newImage',
                              event.currentTarget.files[0],
                            );
                          }}
                        />
                      )}
                    />
                    <FormikErrorMessage name="newImage" component="div" />
                  </div>
                </StyledFormField>

                <StyledFormField>
                  <label className="profile-form-label" htmlFor="description">
                    Description
                  </label>
                  <div className="profile-form-field profile-form-textarea">
                    <Field id="description" name="description">
                      {({ field }) => (
                        <RichTextArea
                          defaultText={formikProps.initialValues.description}
                          value={field.value}
                          onChange={field.onChange(field.name)}
                        />
                      )}
                    </Field>
                  </div>
                </StyledFormField>

                <StyledFormField>
                  <label
                    className="profile-form-label"
                    htmlFor="trailheadCoords"
                  >
                    Trailhead Coordinates (Longitude, Latitude)
                  </label>
                  <div className="profile-form-field">
                    <Field
                      type="text"
                      id="trailheadCoords"
                      name="trailheadCoords"
                      placeholder="Ex: 40.811850,-105.590210"
                    />
                    <FormikErrorMessage
                      name="trailheadCoords"
                      component="div"
                    />
                  </div>
                </StyledFormField>

                <StyledFormField>
                  <label className="profile-form-label" htmlFor="address">
                    Address
                  </label>
                  <div className="profile-form-field">
                    <Field type="text" id="address" name="address" />
                    <FormikErrorMessage name="address" component="div" />
                  </div>
                </StyledFormField>

                <div className="form-footer">
                  <button
                    type="submit"
                    disabled={
                      Object.keys(formikProps.errors).length > 0 ||
                      formikProps.isSubmitting ||
                      loading
                    }
                  >
                    {submitLabel}
                  </button>
                  <Loading loading={loading} />
                  <ErrorMessage error={error} />
                </div>
              </form>
            </StyledForm>
          );
        }}
      </Formik>
    </>
  );
};

export default TrailForm;
