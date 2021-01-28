import { createGlobalStyle } from 'styled-components';
import ResetStyle from './ResetStyle';

const GlobalStyle = createGlobalStyle`
  // reset style
  ${() => ResetStyle}
  // define font
  html,
  body {
    font-family: 'Inter', sans-serif;
    background: ${({ theme }) => theme.colors.background}
  }
  // define fonts
  p, h1, h2, h3, h4, h5, h6, li {
    line-height: 1.5;
  }
  p, h6 {
    font-size: 1em;
    font-weight: 400;
    margin-bottom: .4em;
  }
  li {
    font-size: 1em;
    font-weight: 400;
    margin-bottom: .1em;
  }
  h1 {
    font-weight: 300;
    color: ${(props) => props.theme.colors.primary.darkest}
  }
  h2 {
    font-weight: 400;
    color: ${(props) => props.theme.colors.primary.darkest}
  }
  h3 {
    font-weight: 500;
    color: ${(props) => props.theme.colors.primary.darkest}
  }
  h4 {
    font-size: 1.77em;
    font-weight: 700;
    margin: .2em 0 .3em;
  }
  h5 {
    font-size: 1.33em;
    font-weight: 700;
    margin-bottom: .2em;
  }
  // define colors
  body {
    color: ${(props) => props.theme.colors.dark.dark}
  }
`;

export default GlobalStyle;
