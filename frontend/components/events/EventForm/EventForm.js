import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { format } from 'date-fns';
import * as yup from 'yup';
import {
  Formik,
  Field,
  ErrorMessage as FormikErrorMessage,
  Form,
} from 'formik';

import RichTextArea from '../../utility/RichTextArea';
import Loading from '../../utility/Loading/Loading';
import ErrorMessage from '../../utility/ErrorMessage/ErrorMessage';
import { trailDifficulties } from '../../../lib/constants';

const StyledForm = styled.div``;
const StyledFormField = styled.div``;

const SETUP_NEW_EVENT_QUERY = gql`
  query SETUP_NEW_EVENT_QUERY {
    runLeaders: getRunLeaders {
      username
      firstName
      lastName
    }
    trails: getTrails {
      id
      name
    }
  }
`;

const CREATE_EVENT_MUTATION = gql`
  mutation CREATE_EVENT_MUTATION(
    $title: String!
    $description: String
    $startTime: DateTime!
    $endTime: DateTime!
    $address: String
    $trailDifficulty: TrailDifficulty!
    $trailNotes: String
    $rallyAddress: String
    $rallyTime: DateTime
    $membersOnly: Boolean!
    $host: String!
    $trail: String
  ) {
    createEvent(
      event: {
        title: $title
        description: $description
        startTime: $startTime
        endTime: $endTime
        address: $address
        trailDifficulty: $trailDifficulty
        trailNotes: $trailNotes
        rallyAddress: $rallyAddress
        rallyTime: $rallyTime
        membersOnly: $membersOnly
        host: $host
        trail: $trail
      }
    ) {
      message
    }
  }
`;

const eventSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  startTime: yup
    .date()
    .min(format(new Date(), 'YYYY-MM-DD'))
    .required('Start date is required'),
  endTime: yup
    .date()
    .min(format(new Date(), 'YYYY-MM-DD'))
    .required('End date is required'),
  address: yup.string(),
  trailDifficulty: yup.string().required(),
  trailNotes: yup.string(),
  rallyAddress: yup.string(),
  rallyTime: yup
    .date()
    .min(format(new Date(), 'YYYY-MM-DD'))
    .nullable()
    .default(null),
  membersOnly: yup.boolean(),
  host: yup.string(), // ID
  trail: yup.string(), // ID
});

class EventForm extends Component {
  state = {
    startTime: format(new Date(), 'YYYY-MM-DD'),
    eventForm: {
      title: '',
      description: '',
      startTime: null,
      endTime: null,
      address: '',
      trailDifficulty: 'UNKNOWN',
      trailNotes: '',
      rallyAddress: '',
      rallyTime: null,
      membersOnly: false,
      host: '',
      trail: '',
    },
  };

  render() {
    return (
      <Query query={SETUP_NEW_EVENT_QUERY}>
        {({ loading: queryLoading, error: queryError, data: queryData }) => {
          if (queryLoading) {
            return <div>Loading...</div>;
          }
          if (queryError) {
            return <ErrorMessage error={queryError} />;
          }

          console.log('DATA', queryData);

          return (
            <>
              <h3>Create New Event</h3>
              <Mutation
                mutation={CREATE_EVENT_MUTATION}
                variables={this.state.eventForm}
              >
                {(
                  createEvent,
                  {
                    error: mutationError,
                    loading: mutationLoading,
                    data: mutationData,
                  },
                ) =>
                  mutationData ? (
                    <>{mutationData && mutationData.createEvent.message}</>
                  ) : (
                    <div>
                      <Formik
                        initialValues={this.state.eventForm}
                        validationSchema={eventSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          this.setState({ eventForm: values }, () => {
                            setSubmitting(true);
                            createEvent();
                            setSubmitting(false);
                          });
                        }}
                      >
                        {formikProps => (
                          <StyledForm className="profile-form--user">
                            <form onSubmit={formikProps.handleSubmit}>
                              <StyledFormField>
                                <label
                                  className="profile-form-label"
                                  htmlFor="title"
                                >
                                  Title
                                </label>
                                <div className="profile-form-field">
                                  <Field
                                    type="text"
                                    onChange={formikProps.handleChange}
                                    id="title"
                                    name="title"
                                  />
                                  <FormikErrorMessage
                                    name="title"
                                    component="div"
                                  />
                                </div>
                              </StyledFormField>

                              <StyledFormField>
                                <label
                                  className="profile-form-label"
                                  htmlFor="description"
                                >
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
                                  <FormikErrorMessage
                                    name="description"
                                    component="div"
                                  />
                                </div>
                              </StyledFormField>

                              <StyledFormField>
                                <label
                                  className="profile-form-label"
                                  htmlFor="startTime"
                                >
                                  Start Date
                                </label>
                                <div className="profile-form-field">
                                  <Field
                                    type="date"
                                    id="startTime"
                                    name="startTime"
                                    min={format(new Date(), 'YYYY-MM-DD')}
                                    onChange={e => {
                                      this.setState({
                                        startTime: e.target.value,
                                      });
                                      formikProps.handleChange(e);
                                    }}
                                  />
                                  <FormikErrorMessage
                                    name="startTime"
                                    component="div"
                                  />
                                </div>

                                {/* Start TIme */}
                              </StyledFormField>

                              <StyledFormField>
                                <label
                                  className="profile-form-label"
                                  htmlFor="endTime"
                                >
                                  End Date
                                </label>
                                <div className="profile-form-field">
                                  <Field
                                    type="date"
                                    id="endTime"
                                    name="endTime"
                                    min={this.state.startTime}
                                  />
                                  <FormikErrorMessage
                                    name="endTime"
                                    component="div"
                                  />
                                </div>

                                {/* End TIme */}
                              </StyledFormField>

                              <StyledFormField>
                                <label
                                  className="profile-form-label"
                                  htmlFor="address"
                                >
                                  Address
                                </label>
                                <div className="profile-form-field">
                                  <Field
                                    type="text"
                                    onChange={formikProps.handleChange}
                                    id="address"
                                    name="address"
                                  />
                                  <FormikErrorMessage
                                    name="address"
                                    component="div"
                                  />
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
                                    onChange={formikProps.handleChange}
                                  >
                                    {Object.entries(trailDifficulties).map(
                                      (diff, idx) => (
                                        <option value={diff[0]} key={idx}>
                                          {diff[1]}
                                        </option>
                                      ),
                                    )}
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
                                <label
                                  className="profile-form-label"
                                  htmlFor="rallyAddress"
                                >
                                  Rally Address
                                </label>
                                <div className="profile-form-field">
                                  <Field
                                    type="text"
                                    onChange={formikProps.handleChange}
                                    id="rallyAddress"
                                    name="rallyAddress"
                                  />
                                  <FormikErrorMessage
                                    name="rallyAddress"
                                    component="div"
                                  />
                                </div>
                              </StyledFormField>

                              <StyledFormField>
                                <label
                                  className="profile-form-label"
                                  htmlFor="rallyTime"
                                >
                                  Rally Time
                                </label>
                                <div className="profile-form-field">
                                  <Field
                                    type="date"
                                    id="rallyTime"
                                    name="rallyTime"
                                    min={format(new Date(), 'YYYY-MM-DD')}
                                  />
                                  <FormikErrorMessage
                                    name="rallyTime"
                                    component="div"
                                  />
                                </div>

                                {/* Rally Time */}
                              </StyledFormField>

                              <StyledFormField>
                                <label
                                  className="profile-form-label"
                                  htmlFor="membersOnly"
                                >
                                  Members Only?
                                </label>
                                <div className="profile-form-field">
                                  <Field
                                    type="checkbox"
                                    onChange={formikProps.handleChange}
                                    id="membersOnly"
                                    name="membersOnly"
                                    value={true}
                                  />
                                  <FormikErrorMessage
                                    name="membersOnly"
                                    component="div"
                                  />
                                </div>
                              </StyledFormField>

                              <StyledFormField>
                                <label
                                  className="profile-form-label"
                                  htmlFor="host"
                                >
                                  Run Leader
                                </label>
                                <div className="profile-form-field">
                                  <Field
                                    component="select"
                                    name="host"
                                    id="host"
                                    disabled={queryData.runLeaders.length === 1}
                                  >
                                    {queryData.runLeaders.map(leader => (
                                      <option
                                        value={leader.username}
                                        key={leader.username}
                                      >
                                        {leader.firstName} {leader.lastName}
                                      </option>
                                    ))}
                                  </Field>
                                  <FormikErrorMessage
                                    name="host"
                                    component="div"
                                  />
                                </div>
                              </StyledFormField>

                              <StyledFormField>
                                <label
                                  className="profile-form-label"
                                  htmlFor="trail"
                                >
                                  Trail
                                </label>
                                <div className="profile-form-field">
                                  <Field
                                    component="select"
                                    name="trail"
                                    id="trail"
                                    defaultValue="0"
                                  >
                                    <option value="0">None</option>
                                    {queryData.trails.map(trail => (
                                      <option value={trail.id} key={trail.id}>
                                        {trail.name}
                                      </option>
                                    ))}
                                  </Field>
                                  <FormikErrorMessage
                                    name="trail"
                                    component="div"
                                  />
                                </div>
                              </StyledFormField>

                              <div className="form-footer">
                                <button
                                  type="submit"
                                  disabled={
                                    !formikProps.dirty ||
                                    !formikProps.isValid ||
                                    formikProps.isSubmitting ||
                                    mutationLoading
                                  }
                                >
                                  Sign Up
                                </button>
                                <Loading loading={mutationLoading} />
                                <ErrorMessage error={mutationError} />
                              </div>
                            </form>
                          </StyledForm>
                        )}
                      </Formik>
                    </div>
                  )
                }
              </Mutation>
            </>
          );
        }}
      </Query>
    );
  }
}

export default EventForm;
