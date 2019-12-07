import get from 'lodash/get';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import RigForm from '../RigForm';
import RigUploader from '../RigUploader';

const USER_RIG = gql`
  query USER_RIG {
    user {
      id
      rig {
        image {
          publicId
          url
        }
      }
    }
  }
`;

const EditGarage = () => {
  return (
    <div>
      {/* <RigForm /> */}
      <Query query={USER_RIG}>
        {({ data }) => {
          console.log(data);
          return <RigUploader image={get(data, 'user.rig.image')} />;
        }}
      </Query>
    </div>
  );
};

export default EditGarage;
