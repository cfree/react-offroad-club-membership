import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Loading from '../../utility/Loading';
import ErrorMessage from '../../utility/ErrorMessage';

const StyledForm = styled.form``;
const Error = styled.div``;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $username: String!
  ) {
    signUp(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      username: $username
    ) {
      id
      email
      firstName
    }
  }
`;

export default class Signup extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    username: '',
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return <Mutation
      mutation={SIGNUP_MUTATION}
      variables={this.state}
    >
      {(signUp, { error, loading }) => {
        return <StyledForm method="post" a onSubmit={async e => {
              e.preventDefault();
              const res = await signUp();
              this.setState({
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                username: '',
              });
            }}>
            <h2>Sign up for an account</h2>
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="email">
                <input type="email" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.saveToState} />
              </label>
              <label htmlFor="firstName">
                <input type="text" id="firstName" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.saveToState} />
              </label>
              <label htmlFor="lastName">
                <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.saveToState} />
              </label>
              <label htmlFor="username">
                <input type="text" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.saveToState} />
              </label>
              <label htmlFor="password">
                <input type="password" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.saveToState} />
              </label>
              <button type="submit">Sign Up</button>
              <Loading loading={loading} />
            </fieldset>
          </StyledForm>;
      }}
    </Mutation>;
  }
};
