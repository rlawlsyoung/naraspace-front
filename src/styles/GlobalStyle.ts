import { createGlobalStyle } from 'styled-components';
import suitVariable from '../assets/fonts/SUIT-Variable.ttf';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }

  @font-face {
    font-family: "SUIT-Variable";
    src: url(${suitVariable});
  }

  a {
    text-decoration: none;
  }

  body {
    margin:0 auto;
    background-color: #f1f1f1;
    font-family: "SUIT-Variable", sans-serif;
    }

  .flex-center{
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default GlobalStyle;
