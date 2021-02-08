import { createGlobalStyle } from 'styled-components';
import ResetStyle from './ResetStyle';

const GlobalStyle = createGlobalStyle`

  // reset style
  ${() => ResetStyle}
  html,
  body {
    height: 100%;
    font-family:  'Inter', sans-serif;
    color: ${(props) => props.theme.colors.dark.dark};
  }
  body {

    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export default GlobalStyle;
