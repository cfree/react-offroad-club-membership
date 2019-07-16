import Gate from '../components/login/Gate';
import EditProfile from '../components/user/EditProfile';
import EditGarage from '../components/vehicles/EditGarage';
import EditAccount from '../components/user/EditAccount';

const SettingsPage = ({ query }) => {
  const page = (settings) => {
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

  const { component, title } = page(query.settings);

  return (
    <Gate redirect="/settings">
      <h2>{title} Settings</h2>
      {component}
    </Gate>
  );
};

export default SettingsPage;
