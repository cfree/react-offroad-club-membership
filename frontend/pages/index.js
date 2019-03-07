import Dashboard from '../components/Dashboard';
import Gate from '../components/login/Gate';
import { isAtLeastGuestMember, isNotLocked } from '../lib/utils';

const Home = () => (
  <Gate>
    <h2>Dashboard</h2>
    <Dashboard />
  </Gate>
);

export default Home;
