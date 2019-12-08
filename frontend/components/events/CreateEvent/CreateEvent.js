import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { format } from 'date-fns';
import get from 'lodash/get';
import Link from 'next/link';

import {
  SETUP_NEW_EVENT_QUERY,
  CREATE_EVENT_MUTATION,
} from './createEvent.gql';

import EventForm from '../EventForm';
import ErrorMessage from '../../utility/ErrorMessage/ErrorMessage';
import { uploadImage } from '../../../lib/utils';

class CreateEvent extends Component {
  render() {
    return (
      <Query query={SETUP_NEW_EVENT_QUERY}>
        {({ loading: queryLoading, error: queryError, data: queryData }) => {
          if (queryLoading) {
            return <div>Loading...</div>;
          }
          if (queryError) {
            return <ErrorMessage error={queryError} />;
          }

          const initialValues = {
            title: '',
            description: '',
            startDate: format(new Date(), 'YYYY-MM-DD'),
            startTime: '10:00',
            endDate: format(new Date(), 'YYYY-MM-DD'),
            endTime: '15:00',
            address: '',
            trailDifficulty: 'UNKNOWN',
            trailNotes: '',
            rallyAddress: '',
            rallyTime: '09:45',
            membersOnly: false,
            host: queryData.runLeaders[0].username,
            trail: '0',
            image: null,
            newImage: null,
          };

          return (
            <>
              <h3>Create New Event</h3>
              <Mutation mutation={CREATE_EVENT_MUTATION}>
                {(
                  createEvent,
                  {
                    error: mutationError,
                    loading: mutationLoading,
                    data: mutationData,
                  },
                ) => {
                  const successMessage = get(
                    mutationData,
                    'createEvent.message',
                  );

                  return (
                    <>
                      <EventForm
                        initialValues={initialValues}
                        onSubmit={(values, setSubmitting) =>
                          this.handleSubmit(values, setSubmitting, createEvent)
                        }
                        runLeaders={queryData.runLeaders}
                        trails={queryData.trails}
                        loading={mutationLoading}
                        error={mutationError}
                        submitLabel="Create Event"
                      />
                      {successMessage && (
                        <p>
                          {successMessage}.{' '}
                          <Link href="/events">
                            <a>View events</a>
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
  }

  handleSubmit = async (
    { startDate, endDate, image, newImage, ...filteredValues },
    setSubmitting,
    createEvent,
  ) => {
    let eventValues = {
      ...filteredValues,
      startTime: new Date(`${startDate} ${filteredValues.startTime}`),
      endTime: new Date(`${endDate} ${filteredValues.endTime}`),
      featuredImage: image,
      newFeaturedImage: null,
    };

    if (newImage) {
      const cloudinaryResults = await uploadImage(newImage, 'events');
      eventValues.newFeaturedImage = cloudinaryResults;
    }

    createEvent({
      variables: eventValues,
    });

    setSubmitting(false);
  };
}

export default CreateEvent;
