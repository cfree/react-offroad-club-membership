import Router from 'next/router';
import get from 'lodash/get';

import Roles from '../components/Admin/Roles';
import Gate from '../components/Login/Gate';
import { isAdmin, isNotLocked } from '../lib/utils';
import EditEvent from '../components/events/EditEvent';

const AdminEventPage = ({ query }) => {
  return get(query, 'id') ? (
    <Gate statusCheck={isNotLocked} redirect="/admin-event">
      <EditEvent event={query.id} />
    </Gate>
  ) : (
    <div>Nothing to see here</div>
  );
};

export default AdminEventPage;
