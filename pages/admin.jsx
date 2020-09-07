import { ThemeProvider } from '@material-ui/styles';
import React, { useCallback, useMemo, useState } from 'react';
import theme from '../assets/theme';
import ActionsTable from '../components/ActionsTable';
import AdminDrawer from '../components/AdminDrawer';
import BooksTable from '../components/BooksTable';
import NavBar from '../components/NavBar';
import PageLoader from '../components/PageLoader';
import UsersTable from '../components/UsersTable';
import { useActions } from '../hooks/useActions';
import { useAuth } from '../hooks/useAuth';
import { useBooks } from '../hooks/useBooks';
import { useUsers } from '../hooks/useUsers';

const AdminInterface = ({ fetchedBooks, fetchedUsers, fetchedActions }) => {
  useAuth();
  const [page, setPage] = useState('Actions');
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { books, booksNames, isLoading: booksLoading, isError: booksError, addBook, modifyBook, deleteBook } = useBooks(
    {
      initialBooks: fetchedBooks,
    },
  );
  const { users, usersNames, isLoading: usersLoading, isError: usersError, addUser, modifyUser, deleteUser } = useUsers(
    {
      initialUsers: fetchedUsers,
    },
  );
  const {
    fetcherKey,
    actions,
    isLoading: actionsLoading,
    isError: actionsError,
    addAction,
    modifyAction,
    deleteAction,
  } = useActions({
    initialActions: fetchedActions,
  });

  const pageContent = useMemo(() => {
    switch (page) {
      case 'Books':
        return <BooksTable books={books} addBook={addBook} modifyBook={modifyBook} deleteBook={deleteBook} />;
      case 'Users':
        return <UsersTable users={users} addUser={addUser} modifyUser={modifyUser} deleteUser={deleteUser} />;
      case 'Actions':
        return (
          <ActionsTable
            actions={
              actions &&
              actions.map((action) => ({
                ...action,
                book: (booksNames && booksNames[action.book]) || action.book,
                user: (usersNames && usersNames[action.user]) || action.user,
              }))
            }
            addAction={addAction}
            modifyAction={modifyAction}
            deleteAction={deleteAction}
            fetcherKey={fetcherKey}
          />
        );
      default:
        return null;
    }
  }, [
    actions,
    addAction,
    addBook,
    addUser,
    books,
    booksNames,
    deleteAction,
    deleteBook,
    deleteUser,
    fetcherKey,
    modifyAction,
    modifyBook,
    modifyUser,
    page,
    users,
    usersNames,
  ]);

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
      <PageLoader loaded={!booksLoading && !usersLoading && !actionsLoading}>
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

// AdminInterface.getInitialProps = async (ctx) => {
//   return {
//     fetchedBooks: await getter('/books'),
//     fetchedUsers: await getter('/users'),
//   };
// };

export default AdminInterface;
