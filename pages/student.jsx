import { ThemeProvider } from '@material-ui/styles';
import React, { useCallback, useMemo, useState } from 'react';
import { mutate } from 'swr';
import theme from '../assets/theme';
import ActionsList from '../components/ActionsList';
import Booking from '../components/Booking';
import BooksList from '../components/BooksList';
import NavBar from '../components/NavBar';
import PageLoader from '../components/PageLoader';
import QuoteSearch from '../components/QuoteSearch';
import StudentDrawer from '../components/StudentDrawer';
import { useStudentContext } from '../contexts/studentContext';
import { useActions } from '../hooks/useActions';
import { useAuth } from '../hooks/useAuth';
import { useBooks } from '../hooks/useBooks';
import { ACTIONS_ROUTE } from '../utils/apiRoutes';
import { poster, putter } from '../utils/fetcher';

const StudentInterface = ({ fetchedBooks = [], fetchedActions = [] }) => {
  useAuth();
  const [{ user, accessToken }, dispatch] = useStudentContext();
  // const [actions, setActions] = useState([]);
  const [page, setPage] = useState('Actions');
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { books, isLoading, isError } = useBooks({ initialBooks: fetchedBooks });
  const {
    fetcherKey,
    actions,
    isLoading: actionsLoading,
    isError: actionsError,
    addAction,
    modifyAction,
    deleteAction,
  } = useActions({
    notAdmin: true,
    initialActions: fetchedActions,
  });
  // const { actions, isLoading, isError } = useActions({ initialActions: fetchedActions });
  const bookBook = useCallback(
    async (book) => {
      await poster(ACTIONS_ROUTE.POST.USER_CREATE_BOOKING(), { bookId: book.id }, accessToken);
      mutate(fetcherKey);
    },
    [accessToken, fetcherKey],
  );

  const cancelBooking = useCallback(
    async (id) => {
      await putter(ACTIONS_ROUTE.PUT.USER_CANCEL_BOOKING(), { id }, accessToken);
      mutate(fetcherKey);
    },
    [accessToken, fetcherKey],
  );

  const userPickedUp = useCallback(
    async (id) => {
      await putter(ACTIONS_ROUTE.PUT.USER_PICKED_UP(), { id }, accessToken);
      mutate(fetcherKey);
    },
    [accessToken, fetcherKey],
  );

  const userRequestExtend = useCallback(
    async (id) => {
      await putter(ACTIONS_ROUTE.PUT.USER_REQUEST_EXTEND_BORROW(), { id }, accessToken);
      mutate(fetcherKey);
    },
    [accessToken, fetcherKey],
  );

  const userReturn = useCallback(
    async (id) => {
      await putter(ACTIONS_ROUTE.PUT.USER_RETURNED(), { id }, accessToken);
      mutate(fetcherKey);
    },
    [accessToken, fetcherKey],
  );

  const pageContent = useMemo(() => {
    switch (page) {
      case 'Books':
        return <BooksList books={books} />;
      case 'Actions':
        return (
          <ActionsList
            actions={
              actions &&
              actions.map((action) => ({
                ...action,
                book: books
                  ? (books.find((book) => book.id === action.book) || { name: action.book }).name
                  : action.book,
              }))
            }
            cancelBooking={cancelBooking}
            userPickedUp={userPickedUp}
            userRequestExtend={userRequestExtend}
            userReturn={userReturn}
          />
        );
      case 'Search by quote':
        return <QuoteSearch />;
      case 'Book a book':
        return <Booking books={books} bookBook={bookBook} />;
      default:
        return null;
    }
  }, [actions, bookBook, books, cancelBooking, page, userPickedUp, userRequestExtend, userReturn]);

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
      <PageLoader loaded={!isLoading}>
        <NavBar
          title={page}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          DrawerComponent={StudentDrawer}
          drawerProps={drawerProps}
          // search={search}
        />
        {pageContent}
      </PageLoader>
    </ThemeProvider>
  );
};

// StudentInterface.getInitialProps = async (ctx) => {
//   return { fetchedBooks: await getter('/books', localStorage.getItem('library_AccessToken')) };
// };

export default StudentInterface;
