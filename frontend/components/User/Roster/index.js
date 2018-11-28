import styled from 'styled-components';
import RigbookCard from '../RigbookCard';

const StyledRoster = styled.ul`
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  grid-gap: 10px;
`;

const Roster = () => {
  return <div>
    <h3>Board of Directors</h3>
    <StyledRoster>
      {[1, 2, 3, 4, 5].map(id => <RigbookCard id={id} />)}
    </StyledRoster>

    <h3>Membership</h3>
    <StyledRoster>
      {[1, 2, 3, 4, 5].map(id => <RigbookCard id={id} />)}
    </StyledRoster>

    <h3>Guests</h3>
    <StyledRoster>
      {[1, 2, 3, 4, 5].map(id => <RigbookCard id={id} />)}
    </StyledRoster>
  </div>;
}

export default Roster;
