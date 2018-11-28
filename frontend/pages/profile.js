import React from 'react';

const ProfilePage = props => {
  return (
    <div>
      Profile for {props.query.user}
    </div>
  )
}

export default ProfilePage;
