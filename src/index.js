import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext';
import { RoleProvider } from './context/RoleContext';
import { PermissionProvider } from './context/PermissionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <RoleProvider>
      <PermissionProvider>
        <App />
      </PermissionProvider>
    </RoleProvider>
  </UserProvider>
);

reportWebVitals();
