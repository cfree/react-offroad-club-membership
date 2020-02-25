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

    @font-face {
      font-family: "4players";
      src: url("static/fonts/4players.eot");
      src: url("static/fonts/4players.eot?#iefix") format("embedded-opentype"),
        url("static/fonts/4players.woff") format("woff"),
        url("static/fonts/4players.ttf") format("truetype"),
        url("static/fonts/4players.svg#4players") format("svg");
      font-weight: normal;
      font-style: normal;
    }
  `;
};

export default injectGlobalStyles;
