import React, { useState, useCallback } from 'react';
import { Query, Mutation } from 'react-apollo';
import get from 'lodash/get';
import Link from 'next/link';

import { EXISTING_TRAIL_QUERY, EDIT_TRAIL_MUTATION } from './editTrail.gql';

import TrailForm from '../TrailForm';
import ErrorMessage from '../../utility/ErrorMessage/ErrorMessage';
import { uploadImage } from '../../../lib/utils';

const EditTrail = ({ slug: existingTrailSlug }) => {
  const [slug, setSlug] = useState(existingTrailSlug);
  const handleSubmit = useCallback(
    async (
      { id, image, newImage, ...filteredValues },
      setSubmitting,
      updateTrail,
    ) => {
      if (filteredValues.slug !== slug) {
        setSlug(filteredValues.slug);
      }

      let trailValues = {
        ...filteredValues,
        featuredImage: image,
        newFeaturedImage: null,
      };

      setSubmitting(true);

      if (newImage) {
        const cloudinaryResults = await uploadImage(newImage, 'trails');
        trailValues.newFeaturedImage = cloudinaryResults;
      }

      updateTrail({
        variables: {
          id: id,
          trail: trailValues,
        },
      });

      setSubmitting(false);
    },
    [],
  );

  return (
    <Query
      query={EXISTING_TRAIL_QUERY}
      variables={{ trailSlug: existingTrailSlug }}
    >
      {({ loading: queryLoading, error: queryError, data: queryData }) => {
        if (queryLoading) {
          return <div>Loading...</div>;
        }
        if (queryError) {
          return <ErrorMessage error={queryError} />;
        }

        const { trail } = queryData;

        if (!trail) {
          return (
            <div>
              <p>
                No trail found at this URL.{' '}
                <Link href="/admin-trails">
                  <a>View all trails</a>
                </Link>
              </p>
            </div>
          );
        }

        const initialValues = {
          id: trail.id,
          name: trail.name,
          slug: existingTrailSlug,
          description: trail.description || '',
          trailheadCoords: trail.trailheadCoords || '',
          address: trail.address || '',
          image: get(trail, 'featuredImage.url', null),
          newImage: null,
        };

        return (
          <>
            <h3>Edit Trail</h3>
            <Mutation mutation={EDIT_TRAIL_MUTATION}>
              {(
                updateTrail,
                {
                  error: mutationError,
                  loading: mutationLoading,
                  data: mutationData,
                },
              ) => {
                const successMessage = get(mutationData, 'updateTrail.message');

                return (
                  <>
                    <TrailForm
                      initialValues={initialValues}
                      onSubmit={(values, setSubmitting) =>
                        handleSubmit(values, setSubmitting, updateTrail)
                      }
                      loading={mutationLoading}
                      error={mutationError}
                      onDataChange={() => {}}
                      submitLabel="Edit Trail"
                    />
                    {successMessage && (
                      <p>
                        {successMessage}.{' '}
                        <Link href="/admin-trails">
                          <a>View trails</a>
                        </Link>
                        .
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

export default EditTrail;
