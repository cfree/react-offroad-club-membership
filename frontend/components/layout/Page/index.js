import styled, { ThemeProvider, injectGlobal } from 'styled-components';

import globalStyles from '../../../styles/global';
import theme from '../../../styles/theme';
import Meta from '../Meta';
import Header from '../Header';

injectGlobal`${globalStyles(theme)}`;

const StyledContainer = styled.main`
  max-width: ${({ theme }) => theme.breakpoints.maxWidth};
  margin: 0 auto;
`;

const Component = props => {
  return <ThemeProvider theme={theme}>
      <>
        <Meta />
        <Header />
        <StyledContainer>
          {props.children}
        </StyledContainer>
      </>
    </ThemeProvider>;
}

export default Component;
