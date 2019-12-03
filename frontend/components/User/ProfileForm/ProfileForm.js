import { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Formik,
  Field,
  ErrorMessage as FormikErrorMessage,
} from 'formik';
import * as yup from 'yup';
import { format } from 'date-fns';
import styled from 'styled-components';

import AvatarUploader from '../../common/AvatarUploader';
// import RigUploader from '../../common/RigUploader';
import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';
import { states, DEFAULT_AVATAR_SRC } from '../../../lib/constants';
import { formatPhone } from '../../../lib/utils';
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

const MEMBER_PROFILE_QUERY = gql`
  query MEMBER_PROFILE_QUERY($username: String) {
    user(username: $username) {
      id
      firstName
      lastName
      username
      gender
      birthdate
      joined
      avatar {
        id
        signature
        publicId
        url
        smallUrl
      }
      contactInfo {
        id
        street
        city
        state
        zip
        phone
      }
      preferences {
        id
        emergencyContactName
        emergencyContactPhone
        photoPermissions
        showPhoneNumber
      }
    }
  }
`;

const SELF_PROFILE_QUERY = gql`
  query SELF_PROFILE_QUERY {
    user {
      id
      firstName
      lastName
      username
      gender
      birthdate
      joined
      avatar {
        id
        signature
        publicId
        url
        smallUrl
      }
      contactInfo {
        id
        street
        city
        state
        zip
        phone
      }
      preferences {
        id
        emergencyContactName
        emergencyContactPhone
        photoPermissions
        showPhoneNumber
      }
    }
  }
`;

const USER_UPDATE_PROFILE_MUTATION = gql`
  mutation USER_UPDATE_PROFILE_MUTATION(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $username: String!
    $gender: String!
    $birthdate: DateTime!
    $joined: DateTime!
    $contactInfoId: ID!
    $street: String!
    $city: String!
    $state: String!
    $zip: String!
    $phone: String!
    $preferencesId: ID!
    $emergencyContactName: String!
    $emergencyContactPhone: String!
    $showPhoneNumber: Boolean!
  ) {
    updateUserProfileSettings(
      data: {
        firstName: $firstName
        lastName: $lastName
        username: $username
        gender: $gender
        birthdate: $birthdate
        joined: $joined
        contactInfoId: $contactInfoId
        street: $street
        city: $city
        state: $state
        zip: $zip
        phone: $phone
        preferencesId: $preferencesId
        emergencyContactName: $emergencyContactName
        emergencyContactPhone: $emergencyContactPhone
        showPhoneNumber: $showPhoneNumber
      }
      id: $id
    ) {
      message
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
  joined: yup.date().max(format(new Date(), 'YYYY-MM-DD')),
  phone: yup
    .string()
    .matches(
      new RegExp(/[0-9]{3}-[0-9]{3}-[0-9]{4}/),
      'Use proper format: 303-555-5555',
    )
    .required('Phone number is required'),
  showPhoneNumber: yup.string().required(),
  street: yup.string().required('Street is required'),
  city: yup.string().required('City is required'),
  state: yup.string(),
  zip: yup
    .string()
    .matches(
      new RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/),
      "Use proper format: '80206' or '80206-1919'",
    )
    .required('Zip code is required'),
  emergencyContactName: yup
    .string()
    .required('Emergency contact name is required'),
  emergencyContactPhone: yup
    .string()
    .matches(
      new RegExp(/[0-9]{3}-[0-9]{3}-[0-9]{4}/),
      'Use proper format: 303-555-5555',
    )
    .required('Emergency contact phone number is required'),
});

class ProfileForm extends Component {
  state = {
    userForm: {},
  };

  render() {
    const { member } = this.props;
    const isSelf = !member || member === 'self';
    const query = isSelf ? SELF_PROFILE_QUERY : MEMBER_PROFILE_QUERY;

    return (
      <Query query={query} variables={{ username: this.props.member }}>
        {({ loading: queryLoading, error: queryError, data: queryData }) => {
          if (queryLoading) {
            return <div>Loading...</div>;
          }
          if (queryError) {
            return <ErrorMessage error={queryError} />;
          }

          const { isAdmin = false } = this.props;

          const userFormValues = {
            firstName: queryData.user.firstName || '',
            lastName: queryData.user.lastName || '',
            username: queryData.user.username || '', // admin
            gender: queryData.user.gender || 'MALE',
            birthdate:
              (queryData.user.birthdate &&
                format(queryData.user.birthdate, 'YYYY-MM-DD')) ||
              null, // admin
            joined:
              (queryData.user.joined &&
                format(queryData.user.joined, 'YYYY-MM-DD')) ||
              null, // admin
            phone:
              (queryData.user.contactInfo &&
                queryData.user.contactInfo.phone &&
                formatPhone(queryData.user.contactInfo.phone)) ||
              '',
            showPhoneNumber:
              queryData.user.preferences &&
              !queryData.user.preferences.showPhoneNumber
                ? 'no'
                : 'yes',
            street:
              (queryData.user.contactInfo &&
                queryData.user.contactInfo.street) ||
              '',
            city:
              (queryData.user.contactInfo && queryData.user.contactInfo.city) ||
              '',
            state:
              (queryData.user.contactInfo &&
                queryData.user.contactInfo.state) ||
              'CO',
            zip:
              (queryData.user.contactInfo && queryData.user.contactInfo.zip) ||
              '',
            emergencyContactName:
              (queryData.user.preferences &&
                queryData.user.preferences.emergencyContactName) ||
              '',
            emergencyContactPhone:
              (queryData.user.preferences &&
                queryData.user.preferences.emergencyContactPhone &&
                formatPhone(
                  queryData.user.preferences.emergencyContactPhone,
                )) ||
              '',
          };

          return (
            <>
              {isSelf ? (
                <AvatarUploader image={queryData.user.avatar} />
              ) : (
                <img
                  src={
                    (queryData.user.avatar && queryData.user.avatar.url) ||
                    DEFAULT_AVATAR_SRC
                  }
                  width="100"
                  height="100"
                  alt="Avatar"
                />
              )}

              {/* {isSelf ? (
                <RigUploader image={queryData.user.rig} />
              ) : (
                <img
                  src={
                    (queryData.user.rig && queryData.user.rig.url) ||
                    DEFAULT_RIG_SRC
                  }
                  width="660"
                  alt="Rig"
                />
              )} */}

              <Mutation
                mutation={USER_UPDATE_PROFILE_MUTATION}
                variables={this.state.userForm}
                refetchQueries={['PROFILE_QUERY']}
              >
                {(
                  userUpdateProfile,
                  {
                    error: mutationError,
                    loading: mutationLoading,
                    data: mutationData,
                  },
                ) => (
                  <Formik
                    initialValues={userFormValues}
                    validationSchema={userSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      this.setState(
                        prevProps => ({
                          userForm: {
                            ...values,
                            id: queryData.user.id,
                            contactInfoId: queryData.user.contactInfo.id,
                            showPhoneNumber: values.showPhoneNumber === 'yes',
                            phone: values.phone.split('-').join(''),
                            preferencesId: queryData.user.preferences.id,
                            emergencyContactPhone: values.emergencyContactPhone
                              .split('-')
                              .join(''),
                          },
                        }),
                        () => {
                          setSubmitting(true);
                          userUpdateProfile();
                          setSubmitting(false);
                        },
                      );
                    }}
                    render={formikProps => (
                      <StyledForm className="profile-form--user">
                        <form onSubmit={formikProps.handleSubmit}>
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
                              <FormikErrorMessage
                                name="lastName"
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
                                disabled={!isAdmin}
                              />
                              <FormikErrorMessage
                                name="username"
                                component="div"
                              />
                            </div>
                          </StyledFormField>

                          <StyledFormField>
                            <label
                              className="profile-form-label"
                              htmlFor="gender"
                            >
                              Gender
                            </label>
                            <div className="profile-form-field">
                              <Field
                                component="select"
                                name="gender"
                                id="gender"
                              >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                                <option value="UNDISCLOSED">
                                  Prefer not to say
                                </option>
                              </Field>
                              <FormikErrorMessage
                                name="gender"
                                component="div"
                              />
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
                                disabled={!isAdmin}
                              />
                              <FormikErrorMessage
                                name="birthdate"
                                component="div"
                              />
                            </div>
                          </StyledFormField>

                          {isAdmin && (
                            <StyledFormField>
                              <label
                                className="profile-form-label"
                                htmlFor="joined"
                              >
                                Date Joined
                              </label>
                              <div className="profile-form-field">
                                <Field
                                  type="date"
                                  id="joined"
                                  name="joined"
                                  max={format(new Date(), 'YYYY-MM-DD')}
                                />
                                <FormikErrorMessage
                                  name="joined"
                                  component="div"
                                />
                              </div>
                            </StyledFormField>
                          )}

                          <StyledFormField>
                            <label
                              className="profile-form-label"
                              htmlFor="phone"
                            >
                              Phone Number
                            </label>
                            <div className="profile-form-field">
                              <Field
                                type="text"
                                inputMode="numeric"
                                placeholder="ex: 303-555-5555"
                                id="phone"
                                name="phone"
                              />
                              <FormikErrorMessage
                                name="phone"
                                component="div"
                              />
                            </div>
                          </StyledFormField>

                          <StyledFormField>
                            <div className="profile-form-label">
                              Display phone number in profile?
                            </div>
                            <div className="profile-form-field">
                              <label htmlFor="showPhoneNumberYes">
                                <Field
                                  type="radio"
                                  id="showPhoneNumberYes"
                                  name="showPhoneNumber"
                                  value="yes"
                                  checked={
                                    formikProps.values.showPhoneNumber === 'yes'
                                  }
                                />
                                Yes
                              </label>
                              <label htmlFor="showPhoneNumberNo">
                                <Field
                                  type="radio"
                                  id="showPhoneNumberNo"
                                  name="showPhoneNumber"
                                  value="no"
                                  checked={
                                    formikProps.values.showPhoneNumber === 'no'
                                  }
                                />
                                No
                              </label>
                              <FormikErrorMessage
                                name="showPhoneNumber"
                                component="div"
                              />
                            </div>
                          </StyledFormField>

                          <StyledFormField>
                            <label
                              className="profile-form-label"
                              htmlFor="street"
                            >
                              Street Address
                            </label>
                            <div className="profile-form-field">
                              <Field type="text" id="street" name="street" />
                              <FormikErrorMessage
                                name="street"
                                component="div"
                              />
                            </div>
                          </StyledFormField>

                          <StyledFormField>
                            <label
                              className="profile-form-label"
                              htmlFor="city"
                            >
                              City
                            </label>
                            <div className="profile-form-field">
                              <Field type="text" id="city" name="city" />
                              <FormikErrorMessage name="city" component="div" />
                            </div>
                          </StyledFormField>

                          <StyledFormField>
                            <label
                              className="profile-form-label"
                              htmlFor="state"
                            >
                              State
                            </label>
                            <div className="profile-form-field">
                              <Field component="select" id="state" name="state">
                                {Object.entries(states).map(
                                  ([abbrev, state]) => (
                                    <option key={abbrev} value={abbrev}>
                                      {state}
                                    </option>
                                  ),
                                )}
                              </Field>
                              <FormikErrorMessage
                                name="state"
                                component="div"
                              />
                            </div>
                          </StyledFormField>

                          <StyledFormField>
                            <label className="profile-form-label" htmlFor="zip">
                              Zip Code
                            </label>
                            <div className="profile-form-field">
                              <Field
                                type="text"
                                placeholder="ex: 80206"
                                inputMode="numeric"
                                id="zip"
                                name="zip"
                              />
                              <FormikErrorMessage name="zip" component="div" />
                            </div>
                          </StyledFormField>

                          <StyledFormField>
                            <label
                              className="profile-form-label"
                              htmlFor="emergencyContactName"
                            >
                              Emergency Contact Name
                            </label>
                            <div className="profile-form-field">
                              <Field
                                type="text"
                                id="emergencyContactName"
                                name="emergencyContactName"
                              />
                              <FormikErrorMessage
                                name="emergencyContactName"
                                component="div"
                              />
                            </div>
                          </StyledFormField>

                          <StyledFormField>
                            <label
                              className="profile-form-label"
                              htmlFor="emergencyContactPhone"
                            >
                              Emergency Contact Phone Number
                            </label>
                            <div className="profile-form-field">
                              <Field
                                type="text"
                                inputMode="numeric"
                                placeholder="ex: 303-555-5555"
                                id="emergencyContactPhone"
                                name="emergencyContactPhone"
                              />
                              <FormikErrorMessage
                                name="emergencyContactPhone"
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
                              Submit
                            </button>
                            <Loading loading={mutationLoading} />
                            <ErrorMessage error={mutationError} />
                            {mutationData &&
                              mutationData.updateUserProfileSettings.message}
                          </div>
                        </form>
                      </StyledForm>
                    )}
                  />
                )}
              </Mutation>
            </>
          );
        }}
      </Query>
    );
  }
}

export default ProfileForm;
