import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import Link from 'next/link';
import Loading from '../../utility/Loading';
import ErrorMessage from '../../utility/ErrorMessage';
import CURRENT_USER_QUERY from '../../user/User';
import { assertResolveFunctionsPresent } from 'graphql-tools';

const StyledForm = styled.form``;
const Error = styled.div``;

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      firstName
    }
  }
`;

export default class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={LOGIN_MUTATION}
        variables={this.state}
        refetchQueries={['CURRENT_USER_QUERY']}
      >
        {(login, { error, loading }) => {
          return (
            <StyledForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await login();

                Router.push(this.props.redirect || '/');
              }}
            >
              <h3>Login</h3>
              <ErrorMessage error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="username">
                  <input
                    type="username"
                    id="username"
                    name="username"
                    placeholder="User"
                    value={this.state.username}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Login</button>
                <Loading loading={loading} />
                <br />
                <Link href="/password-reset">
                  <a>Forgot password?</a>
                </Link>
              </fieldset>
            </StyledForm>
          );
        }}
      </Mutation>
    );
  }
}
