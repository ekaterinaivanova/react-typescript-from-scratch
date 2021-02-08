import React from 'react';
import ReactDom from 'react-dom';
import MainView from './components/MainView';
import { ThemeProvider } from 'styled-components';
import DefaultTheme from './style/themes/DefaultTheme';
import GlobalStyle from '../src/style/GlobalStyle';
import { RelayEnvironmentProvider } from 'relay-hooks';
import environment from './relay/Environment';
import './i18n';

const App = () => (
  <React.StrictMode>
    <ThemeProvider theme={DefaultTheme}>
      <RelayEnvironmentProvider environment={environment}>
        <MainView />
        <GlobalStyle />
      </RelayEnvironmentProvider>
    </ThemeProvider>
  </React.StrictMode>
);

ReactDom.render(<App />, document.getElementById('root') as HTMLElement);
