import Link from 'next/link';

import Gate from '../components/Login/Gate';
import CreateTrail from '../components/trails/CreateTrail';
import EditTrail from '../components/trails/EditTrail';
import TrailsList from '../components/trails/TrailsList';

const AdminTrailsPage = ({ query }) => {
  const { action, slug = null } = query;
  const page = action => {
    let component;
    let title;

    switch (action) {
      case 'create':
        component = <CreateTrail />;
        title = 'Create a Trail';
        break;
      case 'edit':
        component = (
          <>{slug ? <EditTrail slug={slug} /> : <div>Slug not found</div>}</>
        );
        title = 'Edit a Trail';
        break;
      default:
        component = <TrailsList />;
        title = 'Trails';
    }

    return { component, title };
  };

  const { component, title } = page(action);

  return (
    <Gate redirect="/admin-trails">
      <ul>
        <li>
          <Link href="/admin-trails/create">
            <a>Create Trail</a>
          </Link>
        </li>
        <li>
          <Link href="/admin-trails">
            <a>All Trails</a>
          </Link>
        </li>
      </ul>
      <h2>{title}</h2>
      {component}
    </Gate>
  );
};

export default AdminTrailsPage;
