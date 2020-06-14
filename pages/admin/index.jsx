import { ThemeProvider } from '@material-ui/styles';
import Axios from 'axios';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import theme from '../../assets/theme';
import BooksTable from '../../components/BooksTable';
import UsersTable from '../../components/UsersTable';
import NavBar from '../../components/NavBar';
import PageLoader from '../../components/PageLoader';
import AdminDrawer from '../../components/AdminDrawer';

const BooksAdmin = () => {
  const [loaded, setLoaded] = useState(false);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState('Books');
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const fetchInitialProps = async () => {
    const fetchedBooks = await Axios.get('/books');
    setBooks(fetchedBooks.data);
    const fetchedUsers = await Axios.get('/users');
    setUsers(fetchedUsers.data);
    setLoaded(true);
  };

  useEffect(() => {
    fetchInitialProps();
  }, []);

  const bookAdded = useCallback(
    (book) => {
      setBooks([...books, book]);
    },
    [books],
  );

  const bookUpdated = useCallback(
    (book) => {
      const idx = books.findIndex((u) => u.id === book.id);
      books[idx] = book;
      setBooks([...books]);
    },
    [books],
  );

  const bookRemoved = useCallback(
    (idx) => {
      setBooks(books.slice(0, idx).concat(books.slice(idx + 1)));
    },
    [books],
  );

  const userAdded = useCallback(
    (user) => {
      setUsers([...users, user]);
    },
    [users],
  );
  const userUpdated = useCallback(
    (user) => {
      const idx = users.findIndex((u) => u.id === user.id);
      users[idx] = user;
      setUsers([...users]);
    },
    [users],
  );

  const userRemoved = useCallback(
    (idx) => {
      setUsers(users.slice(0, idx).concat(users.slice(idx + 1)));
    },
    [users],
  );

  const pageContent = useMemo(() => {
    switch (page) {
      case 'Books':
        return <BooksTable books={books} bookAdded={bookAdded} bookUpdated={bookUpdated} bookRemoved={bookRemoved} />;
      case 'Users':
        return <UsersTable users={users} userAdded={userAdded} userUpdated={userUpdated} userRemoved={userRemoved} />;
      default:
        return null;
    }
  }, [bookAdded, bookRemoved, bookUpdated, books, page, userAdded, userRemoved, userUpdated, users]);

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const drawerProps = useMemo(() => {
    return { setPage, page, isOpen: isDrawerOpen };
  }, [isDrawerOpen, page]);

  return (
    <ThemeProvider theme={theme}>
      <PageLoader loaded={loaded}>
        <NavBar
          title={page}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          DrawerComponent={AdminDrawer}
          drawerProps={drawerProps}
        />
        {pageContent}
      </PageLoader>
    </ThemeProvider>
  );
};

export default BooksAdmin;
