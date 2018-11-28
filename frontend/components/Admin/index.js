import Link from 'next/link';
import PollingPlace from '../voting/PollingPlace';

const Admin = () => (
  <>
    <div>
      <ul>
        {/* <li>
          <Link href="/permissions">
            <a>Permissions</a>
          </Link>
        </li>
        <li>
          <Link href="/roles">
            <a>Roles</a>
          </Link>
        </li> */}
        <li>
          <Link href="/election-management">
            <a>Election Management</a>
          </Link>
        </li>
        {/* <li>
          <Link href="/reports">
            <a>Member Reports</a>
          </Link>
        </li> */}
      </ul>
    </div>
    <div>
      <h3>Election Results</h3>
      <PollingPlace admin />
      <ul>
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
      </ul>
      {/* <Results admin /> */}
    </div>
    {/* <div>New Members</div> */}
  </>
);

export default Admin;
