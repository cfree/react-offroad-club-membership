import { Component } from 'react';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../User';
import Login from '../';

class Gate extends Component {
  static defaultProps = {
    roleCheck: role => role,
    statusCheck: status => status,
    redirect: '/',
  };

  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) {
            return <p>Loading...</p>;
          }

          // Logged out
          if (!data.myself) {
            return (
              <>
                <p>Please sign in.</p>
                <Login redirect={this.props.redirect} />
              </>
            );
          }

          const { role, accountStatus } = data.myself;

          // Improper role
          if (!this.props.roleCheck(role)) {
            return (
              <p>
                Your account is not authorized to view this content. Contact the
                webmaster for help.
              </p>
            );
          }

          // Improper status
          if (!this.props.statusCheck(accountStatus)) {
            return <p>
                Your account does not have the proper status to view
                this content. Contact the webmaster for help.
              </p>;
          }

          return this.props.children;
        }}
      </Query>
    );
  }
}

export default Gate;
