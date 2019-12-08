import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';

import { eventSchema } from './eventForm.schema';
import RichTextArea from '../../utility/RichTextArea';
import Loading from '../../utility/Loading/Loading';
import ErrorMessage from '../../utility/ErrorMessage/ErrorMessage';
import { trailDifficulties } from '../../../lib/constants';
import EventImageUploader from '../EventImageUploader';
import UploadImagePreview from '../../common/UploadImagePreview';

const StyledForm = styled.div``;
const StyledFormField = styled.div``;

const EventForm = ({
  initialValues,
  onSubmit,
  runLeaders = [],
  trails = [],
  loading = '',
  error,
  startDate,
  onDataChange,
  submitLabel = 'Submit',
}) => {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={eventSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
        }}
      >
        {formikProps => {
          console.log('FORMIK PROPS', formikProps);
          return (
            <StyledForm className="profile-form--user">
              <form onSubmit={formikProps.handleSubmit}>
                <StyledFormField>
                  <label className="profile-form-label" htmlFor="title">
                    Title
                  </label>
                  <div className="profile-form-field">
                    <Field type="text" id="title" name="title" />
                    <FormikErrorMessage name="title" component="div" />
                  </div>
                </StyledFormField>

                <StyledFormField>
                  <label className="profile-form-label" htmlFor="description">
                    Description
                  </label>
                  <div className="profile-form-field">
                    <Field id="description" name="description">
                      {({ field }) => (
                        <RichTextArea
                          value={field.value}
                          onChange={field.onChange(field.name)}
                        />
                      )}
                    </Field>
                    <FormikErrorMessage name="description" component="div" />
                  </div>
                </StyledFormField>

                <StyledFormField>
                  <label className="profile-form-label" htmlFor="startDate">
                    Start Date
                  </label>
                  <div className="profile-form-field">
                    <Field
                      type="date"
                      id="startDate"
                      name="startDate"
                      min={format(new Date(), 'YYYY-MM-DD')}
                      onChange={e => {
                        onDataChange({
                          startDate: e.target.value,
                        });
                        formikProps.handleChange(e);
                      }}
                    />
                    <FormikErrorMessage name="startDate" component="div" />

                    <Field
                      type="time"
                      id="startTime"
                      name="startTime"
                      onChange={e => {
                        onDataChange({
                          startTime: e.target.value,
                        });
                        formikProps.handleChange(e);
                      }}
                    />
                    <FormikErrorMessage name="startTime" component="div" />
                  </div>
                </StyledFormField>

                <StyledFormField>
                  <label className="profile-form-label" htmlFor="endTime">
                    End Date
                  </label>
                  <div className="profile-form-field">
                    <Field
                      type="date"
                      id="endDate"
                      name="endDate"
                      min={startDate}
                      onChange={e => {
                        onDataChange({
                          endDate: e.target.value,
                        });
                        formikProps.handleChange(e);
                      }}
                    />
                    <FormikErrorMessage name="endDate" component="div" />

                    <Field
                      type="time"
                      id="endTime"
                      name="endTime"
                      onChange={e => {
                        onDataChange({
                          endTime: e.target.value,
                        });
                        formikProps.handleChange(e);
                      }}
                    />
                    <FormikErrorMessage name="endTime" component="div" />
                  </div>
                </StyledFormField>

                <StyledFormField>
                  <label className="profile-form-label" htmlFor="address">
                    Address
                  </label>
                  <div className="profile-form-field">
                    <Field type="text" id="address" name="address" />{' '}
                    <small>
                      <i>(optional)</i>
                    </small>
                    <FormikErrorMessage name="address" component="div" />
                  </div>
                </StyledFormField>

                <StyledFormField>
                  <label
                    className="profile-form-label"
                    htmlFor="trailDifficulty"
                  >
                    Trail Difficulty
                  </label>
                  <div className="profile-form-field">
                    <Field
                      component="select"
                      name="trailDifficulty"
                      id="trailDifficulty"
                      defaultValue={formikProps.initialValues.trailDifficulty}
                    >
                      {Object.entries(trailDifficulties).map((diff, idx) => (
                        <option value={diff[0]} key={idx}>
                          {diff[1]}
                        </option>
                      ))}
                    </Field>
                    <FormikErrorMessage
                      name="trailDifficulty"
                      component="div"
                    />
                  </div>
                </StyledFormField>

                {/* <StyledFormField>
                                <label
                                  className="profile-form-label"
                                  htmlFor="trailNotes"
                                >
                                  Trail Notes
                                </label>
                                <div className="profile-form-field">
                                  <Field
                                    type="text"
                                    onChange={formikProps.handleChange}
                                    id="trailNotes"
                                    name="trailNotes"
                                  />
                                  <FormikErrorMessage
                                    name="trailNotes"
                                    component="div"
                                  />
                                </div>
                              </StyledFormField> */}

                <StyledFormField>
                  <label className="profile-form-label" htmlFor="rallyAddress">
                    Rally Place
                  </label>
                  <div className="profile-form-field">
                    <Field type="text" id="rallyAddress" name="rallyAddress" />
                    <FormikErrorMessage name="rallyAddress" component="div" />
                  </div>
                </StyledFormField>

                <StyledFormField>
                  <label className="profile-form-label" htmlFor="rallyTime">
                    Rally Time
                  </label>
                  <div className="profile-form-field">
                    <Field type="time" id="rallyTime" name="rallyTime" />
                    <FormikErrorMessage name="rallyTime" component="div" />
                  </div>
                </StyledFormField>

                <StyledFormField>
                  <label className="profile-form-label" htmlFor="membersOnly">
                    Members Only?
                  </label>
                  <div className="profile-form-field">
                    <Field
                      type="checkbox"
                      id="membersOnly"
                      name="membersOnly"
                      value={true}
                    />
                    <FormikErrorMessage name="membersOnly" component="div" />
                  </div>
                </StyledFormField>

                <StyledFormField>
                  <label className="profile-form-label" htmlFor="host">
                    Run Leader
                  </label>
                  <div className="profile-form-field">
                    <Field
                      component="select"
                      name="host"
                      id="host"
                      disabled={runLeaders.length === 1}
                      defaultValue={formikProps.initialValues.host}
                    >
                      {runLeaders.map((leader, idx) => (
                        <option value={leader.username} key={leader.username}>
                          {leader.firstName} {leader.lastName}
                        </option>
                      ))}
                    </Field>
                    <FormikErrorMessage name="host" component="div" />
                  </div>
                </StyledFormField>

                <StyledFormField>
                  <label className="profile-form-label" htmlFor="trail">
                    Trail
                  </label>
                  <div className="profile-form-field">
                    <Field
                      component="select"
                      name="trail"
                      id="trail"
                      defaultValue={formikProps.initialValues.trail}
                    >
                      {[{ id: 0, name: 'None' }, ...trails].map(trail => (
                        <option value={trail.id} key={trail.id}>
                          {trail.name}
                        </option>
                      ))}
                    </Field>
                    <FormikErrorMessage name="trail" component="div" />
                  </div>
                </StyledFormField>

                {(!formikProps.values.trail ||
                  formikProps.values.trail === '0') && (
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
                )}

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

export default EventForm;
