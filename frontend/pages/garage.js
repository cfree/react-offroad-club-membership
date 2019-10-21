import Gate from '../components/Login/Gate';
import { isAdmin } from '../lib/utils';

const garagePage = () => {
  return (
    <Gate
      typeCheck={isAdmin}
      redirect="/"
    >
      <p>
        Vehicle Information:
        <br />
        {/* {/* {user.vehicle.year} {user.vehicle.make}{' '} */} */}
        {/* {/* {user.vehicle.model} {user.vehicle.trim} */} */}
        <br />
        {/* {user.vehicle.name} */}
        <br />
        Mods
        <br />
        Comfort level
        <br />
        {/* Select primary vehicle: */}
      </p>
    </Gate>
  );
};

export default garagePage;
