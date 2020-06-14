import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { PageHeader } from '../components/PageHeader';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <CssBaseline />
      <PageHeader />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
