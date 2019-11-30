import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import styled from 'styled-components';
import * as yup from 'yup';
import {
  Formik,
  Field,
  ErrorMessage as FormikErrorMessage,
  Form,
} from 'formik';

import Loading from '../../utility/Loading/Loading';
import ErrorMessage from '../../utility/ErrorMessage/ErrorMessage';
import { dateEighteenYearsAgo } from '../../../utilities/dates';

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

  [type='radio'] {
    margin-right: 5px;
  }

  label + label {
    margin-left: 10px;
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $username: String!
    $gender: Gender!
    $birthdate: DateTime!
  ) {
    signUp(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      username: $username
      gender: $gender
      birthdate: $birthdate
    ) {
      id
      email
      firstName
    }
  }
`;

const userSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required'),
  gender: yup.string(),
  birthdate: yup
    .date()
    .max(dateEighteenYearsAgo, 'You must be 18 years old to join')
    .required('Birthdate is required'),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .required('Must be at least 8 characters'),
});

export default class SignupForm extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    username: '',
    gender: 'MALE',
    birthdate: null,
  };

  render() {
    return (
      <>
        <h2>Sign up for an account</h2>
        <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
          {(
            signUp,
            {
              error: mutationError,
              loading: mutationLoading,
              data: mutationData,
            },
          ) =>
            mutationData ? (
              <>{mutationData && mutationData.signUp.message}</>
            ) : (
              <Formik
                initialValues={this.state}
                validationSchema={userSchema}
                onSubmit={(values, { setSubmitting }) => {
                  this.setState(values, async () => {
                    setSubmitting(true);
                    await signUp();
                    Router.push('/settings/profile');
                    setSubmitting(false);
                  });
                }}
              >
                {formikProps => (
                  <StyledForm className="profile-form--user">
                    <form onSubmit={formikProps.handleSubmit}>
                      <StyledFormField>
                        <label className="profile-form-label" htmlFor="email">
                          Email
                        </label>
                        <div className="profile-form-field">
                          <Field
                            type="email"
                            onChange={formikProps.handleChange}
                            id="email"
                            name="email"
                          />
                          <FormikErrorMessage name="email" component="div" />
                        </div>
                      </StyledFormField>

                      <StyledFormField>
                        <label
                          className="profile-form-label"
                          htmlFor="firstName"
                        >
                          First Name
                        </label>
                        <div className="profile-form-field">
                          <Field
                            type="text"
                            onChange={formikProps.handleChange}
                            id="firstName"
                            name="firstName"
                          />
                          <FormikErrorMessage
                            name="firstName"
                            component="div"
                          />
                        </div>
                      </StyledFormField>

                      <StyledFormField>
                        <label
                          className="profile-form-label"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                        <div className="profile-form-field">
                          <Field
                            type="text"
                            onChange={formikProps.handleChange}
                            id="lastName"
                            name="lastName"
                          />
                          <FormikErrorMessage name="lastName" component="div" />
                        </div>
                      </StyledFormField>

                      <StyledFormField>
                        <label className="profile-form-label" htmlFor="gender">
                          Gender
                        </label>
                        <div className="profile-form-field">
                          <Field component="select" name="gender" id="gender">
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                            <option value="UNDISCLOSED">
                              Prefer not to say
                            </option>
                          </Field>
                          <FormikErrorMessage name="gender" component="div" />
                        </div>
                      </StyledFormField>

                      <StyledFormField>
                        <label
                          className="profile-form-label"
                          htmlFor="birthdate"
                        >
                          Birthdate
                        </label>
                        <div className="profile-form-field">
                          <Field
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            max={dateEighteenYearsAgo}
                          />
                          <FormikErrorMessage
                            name="birthdate"
                            component="div"
                          />
                        </div>
                      </StyledFormField>

                      <StyledFormField>
                        <label
                          className="profile-form-label"
                          htmlFor="username"
                        >
                          Username
                        </label>
                        <div className="profile-form-field">
                          <Field
                            type="text"
                            onChange={formikProps.handleChange}
                            id="username"
                            name="username"
                          />
                          <FormikErrorMessage name="username" component="div" />
                        </div>
                      </StyledFormField>

                      <StyledFormField>
                        <label
                          className="profile-form-label"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <div className="profile-form-field">
                          <Field
                            type="password"
                            onChange={formikProps.handleChange}
                            id="password"
                            name="password"
                          />
                          <FormikErrorMessage name="password" component="div" />
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
            )
          }
        </Mutation>
      </>
    );
  }
}
