import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';

import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';
import {
  titles,
  offices,
  roles,
  accountStatuses,
  accountTypes,
} from '../../../lib/constants';

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

const MEMBER_ADMIN_PROFILE_QUERY = gql`
  query MEMBER_ADMIN_PROFILE_QUERY($username: String) {
    user(username: $username) {
      id
      title
      isCharterMember
      office
      role
      accountStatus
      accountType
    }
  }
`;

const USER_ADMIN_UPDATE_PROFILE_MUTATION = gql`
  mutation USER_ADMIN_UPDATE_PROFILE_MUTATION(
    $id: ID!
    $title: String
    $isCharterMember: Boolean!
    $office: String
    $role: String!
    $accountStatus: String!
    $accountType: String!
  ) {
    updateUserAdminProfileSettings(
      data: {
        title: $title
        isCharterMember: $isCharterMember
        office: $office
        role: $role
        accountStatus: $accountStatus
        accountType: $accountType
      }
      id: $id
    ) {
      message
    }
  }
`;

const userSchema = yup.object().shape({
  title: yup.string(),
  isCharterMember: yup.string().required(),
  office: yup.string(),
  role: yup.string().required(),
  accountType: yup.string().required(),
  accountStatus: yup.string().required(),
});

class AdminProfileForm extends Component {
  state = {
    userAdminForm: {},
  };

  render() {
    return (
      <Query
        query={MEMBER_ADMIN_PROFILE_QUERY}
        variables={{ username: this.props.member }}
      >
        {({ loading: queryLoading, error: queryError, data: queryData }) => {
          if (queryLoading) {
            return <div>Loading...</div>;
          }
          if (queryError) {
            return <ErrorMessage error={queryError} />;
          }

          const { user } = queryData;
          const userAdminFormValues = {
            title: user.title,
            isCharterMember: user.isCharterMember ? 'yes' : 'no',
            office: user.office,
            role: user.role,
            accountType: user.accountType,
            accountStatus: user.accountStatus,
          };

          return (
            <Mutation
              mutation={USER_ADMIN_UPDATE_PROFILE_MUTATION}
              variables={this.state.userAdminForm}
              refetchQueries={['PROFILE_QUERY']}
            >
              {(
                updateUserAdminProfile,
                {
                  error: mutationError,
                  loading: mutationLoading,
                  data: mutationData,
                },
              ) => (
                <Formik
                  initialValues={userAdminFormValues}
                  validationSchema={userSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log('VALUES', values);
                    this.setState(
                      {
                        userAdminForm: {
                          id: user.id,
                          ...values,
                          isCharterMember: values.isCharterMember === 'yes',
                        },
                      },
                      () => {
                        setSubmitting(true);
                        updateUserAdminProfile();
                        setSubmitting(false);
                      },
                    );
                  }}
                  render={formikProps => (
                    <StyledForm className="profile-form--user">
                      <form onSubmit={formikProps.handleSubmit}>
                        <StyledFormField>
                          <label className="profile-form-label" htmlFor="title">
                            Title
                          </label>
                          <div className="profile-form-field">
                            <Field
                              component="select"
                              name="title"
                              id="title"
                              defaultValue={user.title || null}
                            >
                              <option value={null}>None</option>
                              {Object.entries(titles).map((title, idx) => (
                                <option key={idx} value={title[0]}>
                                  {title[1]}
                                </option>
                              ))}
                            </Field>
                            <FormikErrorMessage name="title" component="div" />
                          </div>
                        </StyledFormField>

                        <StyledFormField>
                          <div className="profile-form-label">
                            Is Charter Member?
                          </div>
                          <div className="profile-form-field">
                            <label htmlFor="isCharterMemberYes">
                              <Field
                                type="radio"
                                id="isCharterMemberYes"
                                name="isCharterMember"
                                value="yes"
                                checked={
                                  formikProps.values.isCharterMember === 'yes'
                                }
                              />
                              Yes
                            </label>
                            <label htmlFor="isCharterMemberNo">
                              <Field
                                type="radio"
                                id="isCharterMemberNo"
                                name="isCharterMember"
                                value="no"
                                checked={
                                  formikProps.values.isCharterMember === 'no'
                                }
                              />
                              No
                            </label>
                            <FormikErrorMessage
                              name="isCharterMember"
                              component="div"
                            />
                          </div>
                        </StyledFormField>

                        <StyledFormField>
                          <label
                            className="profile-form-label"
                            htmlFor="office"
                          >
                            Office
                          </label>
                          <div className="profile-form-field">
                            <Field
                              component="select"
                              name="office"
                              id="office"
                              defaultValue={user.office || null}
                            >
                              <option value={null}>None</option>
                              {Object.entries(offices).map((office, idx) => (
                                <option key={idx} value={office[0]}>
                                  {office[1]}
                                </option>
                              ))}
                            </Field>
                            <FormikErrorMessage name="office" component="div" />
                          </div>
                        </StyledFormField>

                        <StyledFormField>
                          <label className="profile-form-label" htmlFor="role">
                            Role
                          </label>
                          <div className="profile-form-field">
                            <Field
                              component="select"
                              name="role"
                              id="role"
                              defaultValue={user.role}
                            >
                              {Object.entries(roles).map((role, idx) => (
                                <option key={idx} value={role[0]}>
                                  {role[1]}
                                </option>
                              ))}
                            </Field>
                            <FormikErrorMessage name="role" component="div" />
                          </div>
                        </StyledFormField>

                        <StyledFormField>
                          <label
                            className="profile-form-label"
                            htmlFor="accountStatus"
                          >
                            Account Status
                          </label>
                          <div className="profile-form-field">
                            <Field
                              component="select"
                              name="accountStatus"
                              id="accountStatus"
                              defaultValue={user.accountStatus}
                            >
                              {Object.entries(accountStatuses).map(
                                (accountStatus, idx) => (
                                  <option key={idx} value={accountStatus[0]}>
                                    {accountStatus[1]}
                                  </option>
                                ),
                              )}
                            </Field>
                            <FormikErrorMessage
                              name="accountStatus"
                              component="div"
                            />
                          </div>
                        </StyledFormField>

                        <StyledFormField>
                          <label
                            className="profile-form-label"
                            htmlFor="accountType"
                          >
                            Account Type
                          </label>
                          <div className="profile-form-field">
                            <Field
                              component="select"
                              name="accountType"
                              id="accountType"
                              defaultValue={user.accountType}
                            >
                              {Object.entries(accountTypes).map(
                                (accountType, idx) => (
                                  <option key={idx} value={accountType[0]}>
                                    {accountType[1]}
                                  </option>
                                ),
                              )}
                            </Field>
                            <FormikErrorMessage
                              name="accountType"
                              component="div"
                            />
                          </div>
                        </StyledFormField>

                        <div className="form-footer">
                          <button
                            type="submit"
                            disabled={
                              formikProps.errors.length === 0 ||
                              !formikProps.dirty ||
                              formikProps.isSubmitting ||
                              mutationLoading
                            }
                          >
                            Update
                          </button>
                          <Loading loading={mutationLoading} />
                          <ErrorMessage error={mutationError} />
                          {mutationData &&
                            mutationData.updateUserAdminProfileSettings.message}
                        </div>
                      </form>
                    </StyledForm>
                  )}
                />
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default AdminProfileForm;
