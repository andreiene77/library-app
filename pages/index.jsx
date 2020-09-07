import { ThemeProvider } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import theme from '../assets/theme';
import PageLoader from '../components/PageLoader';

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  if (loaded) router.push({ pathname: '/login' });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <PageLoader loaded={loaded} loadingText='Welcome to Library App!' />
      </div>
    </ThemeProvider>
  );
};

export default Home;
