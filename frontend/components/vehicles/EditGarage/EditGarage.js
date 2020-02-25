import React, { useCallback } from 'react';
import get from 'lodash/get';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../../utility/ErrorMessage/ErrorMessage';
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
      vehicle {
        id
        year
        make
        model
        trim
        name
        outfitLevel
        mods
      }
    }
  }
`;

const USER_UPDATE_RIG_MUTATION = gql`
  mutation USER_UPDATE_RIG_MUTATION(
    $id: ID,
    $year: Int!
    $make: String!
    $model: String!
    $trim: String
    $name: String
    $outfitLevel: OutfitLevel
    $mods: [String]
  ) {
    updateVehicle(
      id: $id,
      vehicle: {
        year: $year
        make: $make
        model: $model
        trim: $trim
        name: $name
        outfitLevel: $outfitLevel
        mods: $mods
      }
    ) {
      message
    }
  }
`;

const EditGarage = () => {
  const handleSubmit = useCallback(
    async (
      { id, ...vehicleValues },
      setSubmitting,
      userUpdateRig,
    ) => {
      setSubmitting(true);

      const { year, mods, ...restVehicles } = vehicleValues;

      userUpdateRig({
        variables: {
          id,
          year: parseInt(year, 10),
          mods: mods ? mods.split(', ') : '',
          ...restVehicles,
        },
      });

      setSubmitting(false);
    },
    [],
  );

  return (
    <Query query={USER_RIG}>
      {({ data: queryData, loading: queryLoading, error: queryError }) => {
        if (queryLoading) {
          return <div>Loading...</div>;
        }
        if (queryError) {
          return <ErrorMessage error={queryError} />;
        }

        const { vehicle } = queryData.user;

        const initialValues = {
          id: get(vehicle, 'id', 0),
          year: get(vehicle, 'year', null),
          make: get(vehicle, 'make', ''),
          model: get(vehicle, 'model', ''),
          trim: get(vehicle, 'trim', ''),
          name: get(vehicle, 'name', ''),
          outfitLevel: get(vehicle, 'outfitLevel', ''),
          mods: get(vehicle, 'mods', []).join(', '),
        };

        return (
          <>
            <RigUploader image={get(queryData, 'user.rig.image')} />
            <Mutation mutation={USER_UPDATE_RIG_MUTATION}>
              {(
                userUpdateRig,
                {
                  error: mutationError,
                  loading: mutationLoading,
                  data: mutationData,
                }
              ) => {
                const successMessage = get(mutationData, 'updateVehicle.message');

                return (
                  <>
                    <RigForm
                      initialValues={initialValues}
                      onSubmit={(values, setSubmitting) =>
                        handleSubmit(values, setSubmitting, userUpdateRig)
                      }
                      loading={mutationLoading}
                      error={mutationError}
                    />
                    {successMessage && (
                      <p>
                        {successMessage}.
                      </p>
                    )}
                  </>
                );
              }}
            </Mutation>
          </>
        );
      }}
    </Query>
  );
};

export default EditGarage;
