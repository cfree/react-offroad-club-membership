import styled, { ThemeProvider } from 'styled-components';

import theme from '../../../styles/theme';
import injectGlobalStyles from '../../../styles/global';
import Meta from '../Meta';
import Header from '../Header';
import Footer from '../Footer';

const StyledContainer = styled.main`
  max-width: ${({ theme }) => theme.breakpoints.maxWidth};
  margin: 0 auto 0;
`;

const StyledWrapper = styled.div`
  padding-bottom: 50px;
`;

injectGlobalStyles();

const Component = props => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Meta />
        <StyledWrapper>
          <Header />
          <StyledContainer>{props.children}</StyledContainer>
        </StyledWrapper>
        <Footer />
      </>
    </ThemeProvider>
  );
};

export default Component;
