import styled, { ThemeProvider, injectGlobal } from 'styled-components';

import globalStyles from '../../../styles/global';
import theme from '../../../styles/theme';
import Meta from '../Meta';
import Header from '../Header';
import Footer from '../Footer';

injectGlobal`${globalStyles(theme)}`;

const StyledContainer = styled.main`
  max-width: ${({ theme }) => theme.breakpoints.maxWidth};
  margin: 0 auto;
  box-shadow: ${({ theme }) => theme.vars.bs};
  padding: 20px;
`;

const Component = props => {
  return <ThemeProvider theme={theme}>
      <>
        <Meta />
        <Header />
        <StyledContainer>
          {props.children}
        </StyledContainer>
        <Footer />
      </>
    </ThemeProvider>;
}

export default Component;
