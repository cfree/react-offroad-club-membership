import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../../utility/Loading';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from '../../User/User';
// import Form from './styles/Form';
import Error from '../../utility/ErrorMessage';

const StyledForm = styled.form``;

const CHANGE_EMAIL_MUTATION = gql`
  mutation CHANGE_EMAIL_MUTATION($email: String!) {
    changeEmail(email: $email) {
      message
    }
  }
`;

class ChangeEmail extends Component {
  state = {
    email: '',
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    // console.log('token', token);
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ error: queryError, loading: queryLoading, data: queryData }) => {
          if (queryError) {
            return <p>{queryError}</p>;
          }

          if (queryLoading) {
            return <p>One moment...</p>;
          }

          return (
            <Mutation
              mutation={CHANGE_EMAIL_MUTATION}
              variables={{
                email: this.state.email,
              }}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {(changeEmail, { error, loading, data }) => {
                return (
                  <StyledForm
                    method="post"
                    onSubmit={async e => {
                      e.preventDefault();
                      await changeEmail();
                    }}
                  >
                    <fieldset disabled={loading} aria-busy={loading}>
                      <h2>Change your email address</h2>
                      {loading && <p>One moment...</p>}
                      {data && data.changeEmail && (
                        <p>{data.changeEmail.message}</p>
                      )}
                      <Error error={error} />
                      <label htmlFor="email">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          defaultValue={queryData.myself.email}
                          required
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
        }}
      </Query>
    );
  }
}

export default ChangeEmail;
