import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from '../..User/User';
// import Form from './styles/Form';
import Error from '../../utility/ErrorMessage';

const StyledForm = styled.form``;

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      firstName
    }
  }
`;

class ResetPassword extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
  };
  static defaultProps = {
    token: '',
  };
  state = {
    password: '',
    confirmPassword: '',
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.token,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(resetPassword, { error, loading, called }) => (
          <StyledForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await resetPassword();
              Router.push('/');
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset your password</h2>
              {called && !error && <p>One moment...</p>}
              <Error error={error} />
              <label htmlFor="password">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="confirmPassword">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.saveToState}
                />
              </label>

              <button type="submit">Reset</button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default ResetPassword;
