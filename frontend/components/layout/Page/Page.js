import styled, { ThemeProvider } from 'styled-components';

import theme from '../../../styles/theme';
import injectGlobalStyles from '../../../styles/global';
import Meta from '../Meta';
import Header from '../Header';
import Footer from '../Footer';

const StyledSite = styled.div`
  background: ${({ theme }) => theme.colors.grey_light};
`

const StyledContainer = styled.main`
  max-width: ${({ theme }) => theme.breakpoints.maxWidth};
  margin: 0 auto 0;
`;

const StyledWrapper = styled.div`
  background: white;
  padding-bottom: 70px;
`;

injectGlobalStyles();

const Component = props => {
  return (
    <ThemeProvider theme={theme}>
      <StyledSite>
        <Meta />
        <StyledWrapper>
          <Header />
          <StyledContainer>{props.children}</StyledContainer>
        </StyledWrapper>
        <Footer />
      </StyledSite>
    </ThemeProvider>
  );
};

export default Component;
