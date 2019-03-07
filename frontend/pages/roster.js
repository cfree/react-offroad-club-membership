import { Component } from 'react';

import Rigbook from '../components/user/Rigbook';
import MembershipList from '../components/user/MembershipList';
import Gate from '../components/login/Gate';
import { isAtLeastAssociateMember, isActive } from '../lib/utils';

class RosterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showList: props.showList,
    };
  }

  static getInitialProps({ query }) {
    return { showList: query.display === 'list' };
  }

  showRigbook = () => {
    this.setState({ showList: false });
  };

  showList = () => {
    this.setState({ showList: true });
  };

  render() {
    return (
      <Gate
        roleCheck={isAtLeastAssociateMember}
        statusCheck={isActive}
        redirect="/roster"
      >
        <h2>Membership Roster</h2>
        <button onClick={this.showRigbook}>Rigbook</button> /{' '}
        <button onClick={this.showList}>List</button>
        {this.state.showList ? <MembershipList /> : <Rigbook />}
      </Gate>
    );
  }
}

export default RosterPage;
