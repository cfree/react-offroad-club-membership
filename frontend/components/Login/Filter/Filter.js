import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../user/User/User';

const Filter = ({
  children,
  roleCheck = role => role,
  statusCheck = status => status,
  typeCheck = type => type,
}) => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        // Improper role and status
        if (
          roleCheck(data.myself.role) &&
          statusCheck(data.myself.accountStatus) &&
          typeCheck(data.myself.accountType)
        ) {
          return children;
        }

        return null;
      }}
    </Query>
  );
};

export default Filter;
