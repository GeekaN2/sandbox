import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export interface IElectronAPI {
  loadPreferences: () => Promise<void>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

