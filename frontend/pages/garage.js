import React from 'react'

const garagePage = () => {
  return (
    <div>
      <p>
        Vehicle Information:
        <br />
        {user.vehicle.year} {user.vehicle.make}{' '}
        {user.vehicle.model} {user.vehicle.trim}
        <br />
        {user.vehicle.name}
        <br />
        Mods
        <br />
        Comfort level
        <br />
        Select primary vehicle:
      </p>
    </div>
  );
};

export default garagePage;
