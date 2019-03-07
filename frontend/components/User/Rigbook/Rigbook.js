import styled from 'styled-components';
import RigbookCard from '../RigbookCard';

const StyledRigbook = styled.ul`
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  grid-gap: 10px;
`;

const Rigbook = () => {
  return <div>
    <h3>Officers</h3>
    <StyledRigbook>
      {[1, 2, 3, 4, 5].map(id => <RigbookCard key={id} id={id} />)}
    </StyledRigbook>

    <h3>Membership</h3>
    <StyledRigbook>
      {[1, 2, 3, 4, 5].map(id => <RigbookCard key={id} id={id} />)}
    </StyledRigbook>

    <h3>Guests</h3>
    <StyledRigbook>
      {[1, 2, 3, 4, 5].map(id => <RigbookCard key={id} id={id} />)}
    </StyledRigbook>
  </div>;
}

export default Rigbook;
