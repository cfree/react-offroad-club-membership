import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';
import { getUploadLocation } from '../../../lib/utils';

const UPDATE_RIG = gql`
  mutation UPDATE_RIG($data: ImageUpdateInput!) {
    updateRig(data: $data) {
      message
    }
  }
`;

const DELETE_RIG = gql`
  mutation DELETE_RIG($rig: CloudinaryImageInput!) {
    deleteRig(rig: $rig) {
      message
    }
  }
`;

const uploadImage = async file => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', getUploadLocation('rigs'));

  const res = await fetch(
    'https://api.cloudinary.com/v1_1/fourplayers/image/upload',
    {
      method: 'POST',
      body: data,
    },
  );

  return res.json();
};

const defaultRig = {
  id: null,
  publicId: null,
  url: null,
  smallUrl: null,
};

const RigUploader = ({ image }) => {
  const initialImage = {
    id: (image && image.id) || defaultRig.id,
    publicId: (image && image.publicId) || defaultRig.publicId,
    url: (image && image.url) || defaultRig.url,
    smallUrl: (image && image.smallUrl) || defaultRig.smallUrl,
  };
  const [rig, setRig] = useState(initialImage);
  const [oldRig, setOldRig] = useState(image ? initialImage : null);

  const uploadFile = useCallback(
    async (e, callback) => {
      const files = e.target.files;
      const uploadResults = await uploadImage(files[0]);
      const newRig = {
        publicId: uploadResults.public_id,
        url: uploadResults.secure_url,
        smallUrl: uploadResults.eager[0].secure_url,
      };

      callback({
        variables: {
          data: {
            old: oldRig,
            new: newRig,
          },
        },
      });

      setRig(newRig);
      setOldRig(newRig);
    },
    [rig, oldRig, setRig, setOldRig],
  );

  const deleteFile = useCallback(
    async callback => {
      callback({
        variables: {
          rig: oldRig,
        },
      });

      setRig(defaultRig);
      setOldRig();
    },
    [oldRig, setRig, setOldRig, defaultRig],
  );

  return (
    <>
      Upload rig photo (cropped to 1320 x 880)
      <Mutation mutation={UPDATE_RIG}>
        {(updateRig, { error, loading, data }) => {
          return (
            <>
              <input
                type="file"
                id="file"
                name="file"
                placeholder="Upload an image"
                required
                onChange={e => uploadFile(e, updateRig)}
                key={Date.now()}
              />
              {loading && <Loading loading={loading} />}
              {error && <ErrorMessage error={error} />}
              {rig.url && data && data.updateRig.message}
              {rig.url && <img width="660" src={rig.url} alt="Rig" />}
            </>
          );
        }}
      </Mutation>
      {rig.url && (
        <Mutation mutation={DELETE_RIG}>
          {(deleteRig, { error, loading, data }) => {
            return (
              <>
                <button
                  disabled={loading}
                  onClick={() => deleteFile(deleteRig)}
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

RigUploader.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.required,
    publicId: PropTypes.string.required,
    url: PropTypes.string.required,
    smallUrl: PropTypes.string,
  }),
};

export default RigUploader;
