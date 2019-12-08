import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { format } from 'date-fns';
import get from 'lodash/get';
import Link from 'next/link';

import {
  SETUP_EXISTING_EVENT_QUERY,
  EDIT_EVENT_MUTATION,
} from './editEvent.gql';

import EventForm from '../EventForm';
import ErrorMessage from '../../utility/ErrorMessage/ErrorMessage';
import { uploadImage } from '../../../lib/utils';
import UploadImagePreview from '../../common/UploadImagePreview';

class EditEvent extends Component {
  // state = {
  //   startDate: format(new Date(), 'YYYY-MM-DD'),
  //   startTime: '10:00',
  //   endDate: format(new Date(), 'YYYY-MM-DD'),
  //   endTime: '15:00',
  //   eventForm: {},
  // };

  render() {
    const { event: existingEventId } = this.props;

    return (
      <Query
        query={SETUP_EXISTING_EVENT_QUERY}
        variables={{ eventId: existingEventId }}
      >
        {({ loading: queryLoading, error: queryError, data: queryData }) => {
          if (queryLoading) {
            return <div>Loading...</div>;
          }
          if (queryError) {
            return <ErrorMessage error={queryError} />;
          }

          const { event } = queryData;
          const rallyDate = format(event.startTime, 'YYYY-MM-DD');
          const initialValues = {
            id: existingEventId,
            startDate: format(event.startTime, 'YYYY-MM-DD'),
            startTime: format(event.startTime, 'HH:mm'),
            endDate: format(event.endTime, 'YYYY-MM-DD'),
            endTime: format(event.endTime, 'HH:mm'),
            title: event.title,
            description: event.description,
            address: event.address,
            trailDifficulty: event.trailDifficulty,
            trailNotes: event.trailNotes,
            rallyAddress: event.rallyAddress,
            rallyTime: format(`${rallyDate} ${event.rallyTime}`, 'hh:mm'),
            membersOnly: event.membersOnly,
            host: event.host.username,
            trail: (event.trail && event.trail.id) || '0',
            image: get(event, 'featuredImage.url', null),
            imagePublicId: get(event, 'featuredImage.publicId', null),
            newImage: null,
          };

          return (
            <>
              <h3>Edit Event</h3>
              <Mutation mutation={EDIT_EVENT_MUTATION}>
                {(
                  updateEvent,
                  {
                    error: mutationError,
                    loading: mutationLoading,
                    data: mutationData,
                  },
                ) => {
                  const successMessage = get(
                    mutationData,
                    'updateEvent.message',
                  );

                  return (
                    <>
                      <EventForm
                        initialValues={initialValues}
                        onSubmit={(values, setSubmitting) =>
                          this.handleSubmit(values, setSubmitting, updateEvent)
                        }
                        runLeaders={queryData.runLeaders}
                        trails={queryData.trails}
                        loading={mutationLoading}
                        error={mutationError}
                        submitLabel="Edit Event"
                      />
                      {successMessage && (
                        <p>
                          {successMessage}.{' '}
                          <Link href={`/event/${existingEventId}`}>
                            <a>View event</a>
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
    updateEvent,
  ) => {
    let eventValues = {
      ...filteredValues,
      startTime: new Date(`${startDate} ${filteredValues.startTime}`),
      endTime: new Date(`${endDate} ${filteredValues.endTime}`),
      featuredImage: image,
      newFeaturedImage: null,
    };

    setSubmitting(true);

    if (newImage) {
      const cloudinaryResults = await uploadImage(newImage, 'events');
      eventValues.newFeaturedImage = cloudinaryResults;
    }

    updateEvent({
      variables: eventValues,
    });

    setSubmitting(false);
  };
}

export default EditEvent;
