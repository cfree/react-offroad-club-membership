import React, { useState, useCallback } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';
import { getUploadLocation } from '../../../lib/utils';

const UPDATE_EVENT_IMAGE = gql`
  mutation UPDATE_EVENT_IMAGE($data: ImageUpdateInput!) {
    updateAvatar(data: $data) {
      message
    }
  }
`;

const DELETE_EVENT_IMAGE = gql`
  mutation DELETE_EVENT_IMAGE($avatar: CloudinaryImageInput!) {
    deleteAvatar(avatar: $avatar) {
      message
    }
  }
`;

const uploadImage = async file => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', getUploadLocation('events'));

  const res = await fetch(
    'https://api.cloudinary.com/v1_1/fourplayers/image/upload',
    {
      method: 'POST',
      body: data,
    },
  );

  return res.json();
};

const defaultImage = {
  id: null,
  publicId: null,
  url: null,
  smallUrl: null,
};

const EventImageUploader = ({ image }) => {
  const initialImage = {
    id: (image && image.id) || defaultImage.id,
    publicId: (image && image.publicId) || defaultImage.publicId,
    url: (image && image.url) || defaultImage.url,
    smallUrl: (image && image.smallUrl) || defaultImage.smallUrl,
  };
  const [eventImage, setEventImage] = useState(initialImage);
  const [oldEventImage, setOldEventImage] = useState(
    image ? initialImage : null,
  );

  const uploadFile = useCallback(
    async (e, callback) => {
      const files = e.target.files;
      const uploadResults = await uploadImage(files[0]);
      const newEventImage = {
        publicId: uploadResults.public_id,
        url: uploadResults.secure_url,
        smallUrl: uploadResults.eager[0].secure_url,
      };

      callback({
        variables: {
          data: {
            old: oldEventImage,
            new: newEventImage,
          },
        },
      });

      setEventImage(newEventImage);
      setOldEventImage(newEventImage);
    },
    [uploadImage, oldEventImage, setEventImage, setOldEventImage],
  );

  const deleteFile = useCallback(
    async callback => {
      callback({
        variables: {
          eventImage: oldEventImage,
        },
      });

      setAvatar(defaultImage);
      setOldEventImage();
    },
    [oldEventImage, setEventImage, setOldEventImage, defaultImage],
  );

  return (
    <>
      Upload event image (cropped to 1400 x 800)
      <Mutation mutation={UPDATE_EVENT_IMAGE}>
        {(updateEventImage, { error, loading, data }) => {
          return (
            <>
              <input
                type="file"
                id="file"
                name="file"
                placeholder="Upload an image"
                required
                onChange={e => uploadFile(e, updateEventImage)}
                key={Date.now()}
              />
              {loading && <Loading loading={loading} />}
              {error && <ErrorMessage error={error} />}
              {eventImage.url && data && data.updateEventImage.message}
              {eventImage.url && (
                <img width="200" src={eventImage.url} alt="Event Image" />
              )}
            </>
          );
        }}
      </Mutation>
      {eventImage.url && (
        <Mutation mutation={DELETE_EVENT_IMAGE}>
          {(deleteEventImage, { error, loading, data }) => {
            return (
              <>
                <button
                  disabled={loading}
                  onClick={() => deleteFile(deleteEventImage)}
                >
                  Delete image
                </button>
                {loading && <Loading loading={loading} />}
                {error && <ErrorMessage error={error} />}
              </>
            );
          }}
        </Mutation>
      )}
    </>
  );
};

export default EventImageUploader;
