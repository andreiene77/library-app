import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export const PageHeader = () => {
  const router = useRouter();
  console.log('PageHeader -> router', router);
  return (
    <Head>
      <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' />
      <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
      <title>{`Library App | ${router.asPath.substring(1)}`}</title>
    </Head>
  );
};

export default PageHeader;
