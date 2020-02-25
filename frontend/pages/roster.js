import { Component } from 'react';
import { Switch } from '@rebass/forms';

import Rigbook from '../components/user/Rigbook';
import Roster from '../components/user/Roster';
import Gate from '../components/Login/Gate';
import Icon from '../components/common/Icon';
import { isAtLeastEmeritusMember, isActive } from '../lib/utils';
import styled from 'styled-components';

const StyledNav = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`

const StyledSwitch = styled.span`
  display: flex;

  align-items: center;

  span {
    margin: 0 5px;
    cursor: pointer;

    button {
      float: left;
      cursor: pointer;
    }
  }
`;

const RigbookSwitch = ({ onClick, off }) => {
  return (
    <StyledSwitch>
      <Icon icon="rigbook">Rigbook</Icon>
      <span onClick={onClick}>
        <Switch checked={off} />
      </span>
      <Icon icon="list">List</Icon>
    </StyledSwitch>
  );
}

class RosterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showList: props.query.display === 'list',
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({ showList: !prevState.showList }));
  }

  render() {
    return (
      <Gate
        typeCheck={isAtLeastEmeritusMember}
        statusCheck={isActive}
        redirect="/roster"
      >
        <StyledNav>
          <RigbookSwitch onClick={this.handleClick} off={this.state.showList}  />
        </StyledNav>
        {this.state.showList ? <Roster /> : <Rigbook />}
      </Gate>
    );
  }
}

export default RosterPage;
