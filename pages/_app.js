import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { StudentProvider } from '../contexts/studentContext';
import { AdminProvider } from '../contexts/adminContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...state,
        theme: action.newTheme,
      };

    default:
      return state;
  }
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <AdminProvider reducer={reducer}>
      <StudentProvider>
        <CssBaseline />
        <PageHeader />
        <Component {...pageProps} />
      </StudentProvider>
    </AdminProvider>
  );
};

export default MyApp;
