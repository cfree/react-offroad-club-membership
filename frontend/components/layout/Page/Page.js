import styled, { ThemeProvider } from 'styled-components';

import theme from '../../../styles/theme';
import injectGlobalStyles from '../../../styles/global';
import Meta from '../Meta';
import Header from '../Header';
import Footer from '../Footer';

const StyledContainer = styled.main`
  max-width: ${({ theme }) => theme.breakpoints.maxWidth};
  margin: 0 auto;
`;

injectGlobalStyles();

const Component = props => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Meta />
        <Header />
        <StyledContainer>{props.children}</StyledContainer>
        <Footer />
      </>
    </ThemeProvider>
  );
};

export default Component;
