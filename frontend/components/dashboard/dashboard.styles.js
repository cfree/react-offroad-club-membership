import styled from 'styled-components';

export const StyledContainer = styled.div`
  .dashboard-heading {
    margin: 0 0 20px;
    padding-bottom: 8px;
    line-height: 1;
    border-bottom: 2px solid ${({ theme }) => theme.colors.grey_lighter};
  }
`;
