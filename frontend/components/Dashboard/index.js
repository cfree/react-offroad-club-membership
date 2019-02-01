import React, { Component } from 'react';
import Filter from '../Login/Filter';
import PollingPlace from '../voting/PollingPlace';
import { isAtLeastFullMember } from '../../lib/utils';

class Dashboard extends Component {
  render() {
    return <Filter roleCheck={isAtLeastFullMember}>
      <PollingPlace />
    </Filter>;
  }
}

export default Dashboard;
