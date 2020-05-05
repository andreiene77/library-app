import { ThemeProvider } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import theme from '../../assets/theme';
import BooksTable from '../../components/BooksTable';
import NavBar from '../../components/NavBar';
import PageLoader from '../../components/PageLoader';

const BooksAdmin = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <PageLoader loaded={loaded}>
        <NavBar />
        <BooksTable />
      </PageLoader>
    </ThemeProvider>
  );
};

export default BooksAdmin;
