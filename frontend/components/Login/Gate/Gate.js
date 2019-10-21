import { Component } from 'react';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../User/User';
import Login from '../Login';
import Link from 'next/link';

class Gate extends Component {
  static defaultProps = {
    roleCheck: role => role,
    statusCheck: status => status,
    typeCheck: type => type,
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
                <h2>Welcome!</h2>
                <p>
                  You've reached the 4-Players of Colorado members' site. To
                  continue, please log in with your account credentials.
                </p>
                <Login redirect={this.props.redirect} />
                <p>
                  If you have not yet signed up, you must first{' '}
                  <Link href="/signup">
                    <a>register for an account</a>
                  </Link>
                  . To learn more about the club, please{' '}
                  <a href="https://4-playersofcolorado.org">
                    visit our public site
                  </a>
                  . Thanks for visiting!
                </p>
              </>
            );
          }

          const { role, accountStatus, accountType } = data.myself;

          const contactWebmasterMessage = (
            <>
              <Link href="/message?to=webmaster">
                <a>Contact the webmaster</a>
              </Link>{' '}
              for help
            </>
          );

          // Improper role
          if (this.props.roleCheck && !this.props.roleCheck(role)) {
            return <p>Your account is not authorized to view this content.</p>;
          }

          // Improper status
          if (
            this.props.statusCheck &&
            !this.props.statusCheck(accountStatus)
          ) {
            return (
              <p>
                Your account does not have the proper status to view this
                content. {contactWebmasterMessage}.
              </p>
            );
          }

          // Improper type
          if (this.props.typeCheck && !this.props.typeCheck(accountType)) {
            return (
              <p>
                You do not have the proper account type to view this content.{' '}
                {contactWebmasterMessage}.
              </p>
            );
          }

          return this.props.children;
        }}
      </Query>
    );
  }
}

export default Gate;
