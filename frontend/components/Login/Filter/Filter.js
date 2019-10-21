import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../User/User';

const Filter = ({
  children,
  roleCheck = role => role,
  statusCheck = status => status,
  typeCheck = type => type,
}) => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, error, loading }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        // Improper role and status
        if (
          data.myself &&
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
