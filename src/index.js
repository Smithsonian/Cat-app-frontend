import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AuthState from './context/AuthContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthState>
        <App />
      </AuthState>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
