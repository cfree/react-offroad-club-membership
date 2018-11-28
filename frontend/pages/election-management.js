import Gate from '../components/Login/Gate';
import ElectionMgmt from '../components/voting/ElectionMgmt';

const PollManagementPage = () => {
  return (
    <Gate>
      <h2>Election Management</h2>
        <ElectionMgmt />
    </Gate>
  );
};

export default PollManagementPage;
