import Link from 'next/link';
// import PollingPlace from '../../voting/PollingPlace';
import Filter from '../../Login/Filter';
import { isAdmin, isNotLocked } from '../../../lib/utils';

const Admin = () => (
  <>
    <div>
      <h3>At A Glance</h3>

      <h4>Stats</h4>
      <ul>
        <li>Active Full Members: 45</li>
        <li>Needed for Quorum: 45</li>
        <li>Increase over previous year: 38% (no new members allowed; over 35%)</li>
      </ul>

      <h4>Active Members Per Year</h4>
      {/* Bar chart */}

      <h4>Locked New Accounts</h4>
      <ul>
        <li>Meowface McDuck</li>
      </ul>
      
      <h4>Eligible for Membership</h4>
      <p>18 years of age or order, have attended at least one run and one meeting</p>
      <ul>
        <li>Bosco Relli</li>
      </ul>

      <h4>Asked to Join</h4>
      <p>Have attended 3 runs, but accounts are now limited. Are not yet eligible for membership</p>
      <ul>
        <li>Ronald McDonald</li>
      </ul>
    </div>
    <div>
      <h3>Tools</h3>

      <ul>
        <Filter roleCheck={isAdmin} statusCheck={isNotLocked}>
          <li>
            <Link href="/admin-permissions">
              <a>Permissions</a>
            </Link>
          </li>
        </Filter>
        <li>
          <Link href="/admin-roster">
            <a>Membership List</a>
          </Link>
        </li>
        <li>
          <Link href="/admin-trails">
            <a>Trails</a>
          </Link>
        </li>
        <li>
          <Link href="/admin-quorum">
            <a>Meeting Quorum</a>
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
  </>
);

export default Admin;
