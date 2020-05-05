import { ThemeProvider } from '@material-ui/styles';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import theme from '../assets/theme';
import PageLoader from '../components/PageLoader';

const Home = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  if (loaded)
    Router.push({
      pathname: '/login',
    });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <PageLoader loaded={loaded} loadingText='Welcome to Library App!' />
      </div>
    </ThemeProvider>
  );
};

export default Home;
