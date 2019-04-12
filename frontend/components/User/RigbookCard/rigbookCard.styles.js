import styled from 'styled-components';

export const StyledRigbookCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.white_dark};
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const StyledVehicleImg = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
`;

export const StyledUserImg = styled.img`
  margin: -40px auto 0;
  display: block;
  height: 100px;
  width: 100px;
  border-radius: 100%;
  border: 5px solid white;
  position: relative;
`;

export const StyledProfileActionsList = styled.ul`
  margin: auto 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid ${({ theme }) => theme.colors.white_dark};
`;

export const StyledTitles = styled.div`
  text-transform: uppercase;
`;

export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  height: 100%;

  h2 {
    margin: 0 0 10px;
    line-height: 1;
  }

  h3 {
    margin: 5px 0;
    line-height: 1;
  }

  h4 {
    margin: 5px 0;
    line-height: 1;
    text-transform: uppercase;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.black_light};
  }

  h5 {
    margin: auto 0 0;
    text-transform: uppercase;
    font-size: 12px;
  }
`;
