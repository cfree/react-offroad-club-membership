import Link from 'next/link';
// import PollingPlace from '../../voting/PollingPlace';
import Filter from '../../login/Filter';
import { isAdmin, isNotLocked } from '../../../lib/utils';

const Admin = () => (
  <>
    <div>
      <ul>
        <Filter roleCheck={isAdmin} statusCheck={isNotLocked}>
          <li>
            <Link href="/admin-roles">
              <a>Roles</a>
            </Link>
          </li>
        </Filter>
        <li>
          <Link href="/admin-roster">
            <a>Membership List</a>
          </Link>
        </li>
        {/* <li>
          <Link href={{
            pathname: '/elections',
            query: { action: 'create' },
          }}>
            <a>Create New Election</a>
          </Link>
        </li> */}
        {/* <li>
          <Link href={{
            pathname: '/vote',
            query: { action: 'create' },
          }}>
            <a>Create New Poll</a>
          </Link>
        </li> */}
      </ul>
    </div>
    <div>
      {/* <PollingPlace admin /> */}
      {/* <ul>
        <li>
          Active election&nbsp;
          <Link
            href={{
              pathname: 'election-management',
              query: {
                action: 'edit',
                id: 123,
              },
            }}
          >
            <a>(edit)</a>
          </Link>
        </li>
        <li>
          <ul>
            <li>Time left</li>
            <li>Races</li>
            <li>
              <ul>
                <li>Candidates sorted by most votes</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul> */}
      {/* <Results admin /> */}
    </div>
    <div>
      <h3>At a Glance</h3>
      <ul>
        <li>
          New User Registrations
          <ul>
            <li>So and So</li>
            <li>The ugly one</li>
            <li>Whatsherface</li>
            <li>(See all)</li>
          </ul>
        </li>
        {/* <li>Newest Members</li> */}
        {/* <li>Recent Delinquents</li>
        <li>Maxed Out Events</li>
        <li>Potential New Members</li> */}
      </ul>
    </div>
  </>
);

export default Admin;
