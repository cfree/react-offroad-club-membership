import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../User';
import Login from '../';

const Gate = props => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        if (loading) { return <p>Loading...</p> }
        if (!data.myself) {
          return (
            <>
              <p>Please sign in.</p>
              <Login />
            </>
          );
        }
        return props.children;
      }}
    </Query>
  )
}

export default Gate;
