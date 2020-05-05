import React from 'react';
import { PageHeader } from '../components/PageHeader';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <PageHeader />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
