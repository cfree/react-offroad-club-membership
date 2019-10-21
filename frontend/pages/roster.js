import { Component } from 'react';

import Rigbook from '../components/User/Rigbook';
import Roster from '../components/User/Roster';
import Gate from '../components/Login/Gate';
import { isAtLeastEmeritusMember, isActive } from '../lib/utils';

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

  showRoster = () => {
    this.setState({ showList: true });
  };

  render() {
    return (
      <Gate
        typeCheck={isAtLeastEmeritusMember}
        statusCheck={isActive}
        redirect="/roster"
      >
        <h2>Membership Roster</h2>
        <button onClick={this.showRigbook}>Rigbook</button> /{' '}
        <button onClick={this.showRoster}>List</button>
        {this.state.showList ? <Roster /> : <Rigbook />}
      </Gate>
    );
  }
}

export default RosterPage;
