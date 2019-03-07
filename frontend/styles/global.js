import { injectGlobal } from 'styled-components';
import theme from './theme';

const injectGlobalStyles = () => {
  injectGlobal`
    html {
      box-sizing: border-box;
      font-size: 10px;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      padding: 0;
      margin: 0;
      font-size: 1.5rem;
      line-height: 2;
      font-family: Helvetica, Arial, sans-serif;
    }
    a {
      text-decoration: none;
      color: ${theme.colors.red};
    }
  `;
};

export default injectGlobalStyles;
