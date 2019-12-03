import Link from 'next/link';

import Gate from '../components/Login/Gate';
import EditProfile from '../components/user/EditProfile';
import EditGarage from '../components/vehicles/EditGarage';
import EditAccount from '../components/user/EditAccount';

const SettingsPage = ({ query }) => {
  const { settings } = query;

  const page = settings => {
    let component;
    let title;

    switch (settings) {
      case 'profile':
        component = <EditProfile />;
        title = 'Profile';
        break;
      case 'garage':
        component = <EditGarage />;
        title = 'Garage';
        break;
      case 'account':
      default:
        component = <EditAccount />;
        title = 'Account';
    }

    return { component, title };
  };

  const { component, title } = page(settings);

  return (
    <Gate redirect="/settings">
      <ul>
        <li>
          <Link href="/settings/profile">
            <a>Edit Profile</a>
          </Link>
        </li>
        <li>
          <Link href="/settings/garage">
            <a>Edit Garage</a>
          </Link>
        </li>
        <li>
          <Link href="/settings/account">
            <a>Edit Account</a>
          </Link>
        </li>
      </ul>
      <h2>{title} Settings</h2>
      {component}
    </Gate>
  );
};

export default SettingsPage;
