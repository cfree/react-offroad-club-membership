import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../../utility/Loading';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from '../../User/User';
// import Form from './styles/Form';
import Error from '../../utility/ErrorMessage';

const StyledForm = styled.form``;

const CHANGE_PASSWORD_MUTATION = gql`
  mutation CHANGE_PASSWORD_MUTATION(
    $password: String!
    $confirmPassword: String!
  ) {
    changePassword(password: $password, confirmPassword: $confirmPassword) {
      message
    }
  }
`;

class ChangePassword extends Component {
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
        mutation={CHANGE_PASSWORD_MUTATION}
        variables={{
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(changePassword, { error, loading, data }) => {
          console.log('data', data);

          return (
            <StyledForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await changePassword();
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Change your password</h2>
                {loading && <p>One moment...</p>}
                {data && data.changePassword && (
                  <p>{data.changePassword.message}</p>
                )}
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
                <Loading loading={loading} />
                <button type="submit">Change</button>
              </fieldset>
            </StyledForm>
          );
        }}
      </Mutation>
    );
  }
}

export default ChangePassword;
