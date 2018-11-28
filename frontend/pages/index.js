import Dashboard from '../components/Dashboard';
import Gate from '../components/Login/Gate';

const Home = () => (
  <Gate>
    <h2>Dashboard</h2>
    <Dashboard />
  </Gate>
);

export default Home;
