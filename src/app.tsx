import React from 'react';
import ReactDom from 'react-dom';
import MainView from './components/MainView';

const App = () => (
  <React.StrictMode>
    <MainView />
  </React.StrictMode>
);
ReactDom.render(<App />, document.getElementById('root') as HTMLElement);
