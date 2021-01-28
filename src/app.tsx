import React from 'react';
import ReactDom from 'react-dom';
import MainView from './components/MainView';
import { ThemeProvider } from 'styled-components';
import DefaultTheme from './style/themes/DefaultTheme';
import GlobalStyle from '../src/style/GlobalStyle';

const App = () => (
  <React.StrictMode>
    <ThemeProvider theme={DefaultTheme}>
      <MainView />
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>
);
ReactDom.render(<App />, document.getElementById('root') as HTMLElement);
