import Link from 'next/link';
import { Flex, Box } from 'rebass';

import Filter from '../login/Filter';
import PollingPlace from '../voting/PollingPlace';
import { isAtLeastFullMember } from '../../lib/utils';

const Dashboard = () => (
  <Filter roleCheck={isAtLeastFullMember}>
    <Flex>
      <Box p={3} width={1 / 2}>
        <Link href="/roster">
          <a>Roster</a>
        </Link>
      </Box>
      <Box p={3} width={1 / 2}>
        <Link href="/docs">
          <a>Club Documents</a>
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
);

export default Dashboard;
