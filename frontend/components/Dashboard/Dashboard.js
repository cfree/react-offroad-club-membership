import Link from 'next/link';
import { Flex, Box } from 'rebass';

import Filter from '../Login/Filter';
import PollingPlace from '../voting/PollingPlace';
import {
  isFullMember,
  isNotFullMember,
  isNotLocked,
  isLocked,
} from '../../lib/utils';

const Dashboard = () => (
  <>
    <Filter typeCheck={isFullMember} statusCheck={isNotLocked}>
      <Flex>
        <Box p={3} width={1 / 2}>
          <Link href="/roster">
            <a>Roster</a>
          </Link>
        </Box>
        <Box p={3} width={1 / 2}>
          <Link href="/events">
            <a>Events Schedule</a>
          </Link>
        </Box>
      </Flex>
      {/* <PollingPlace /> */}
      {/* <div>
    <div>Carousel</div>
    <div>Upcoming Events</div>
  </div> */}
      {/* <div>Recent Photos</div> */}
      {/* <div>
    <div>Run Reports</div>
    <div>Check-Ins</div>
  </div> */}
    </Filter>
    <Filter statusCheck={isLocked}>
      <p>Your account is being reviewed, please check back later.</p>
    </Filter>
  </>
);

export default Dashboard;
