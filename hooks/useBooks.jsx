import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import { useStudentContext } from '../contexts/studentContext';
import { BOOKS_ROUTE } from '../utils/apiRoutes';
import { destroyer, getter, poster, putter } from '../utils/fetcher';

export const useBooks = ({ initialBooks = [] }) => {
  const url = BOOKS_ROUTE.GET.ALL();
  const [{ accessToken }] = useStudentContext();

  const postAuth = useCallback((givenURL, body) => poster(givenURL, body, accessToken), [accessToken]);
  const putAuth = useCallback((givenURL, body) => putter(givenURL, body, accessToken), [accessToken]);
  const deleteAuth = useCallback((givenURL) => destroyer(givenURL, accessToken), [accessToken]);
  const fetcherKey = [url, accessToken];
  const { data, error } = useSWR(accessToken ? fetcherKey : null, getter);

  const addBook = useCallback(
    async (book) => {
      try {
        mutate(fetcherKey, [...data, book], false);
        await postAuth(BOOKS_ROUTE.POST.ONE(), book);
        mutate(fetcherKey);
      } catch (e) {
        console.log(e);
      }
    },
    [data, fetcherKey, postAuth],
  );

  const modifyBook = useCallback(
    async (book) => {
      try {
        mutate(
          fetcherKey,
          data.map((b) => (book.id === b.id ? book : b)),
          false,
        );
        await putAuth(BOOKS_ROUTE.PUT(), book);
        mutate(fetcherKey);
      } catch (e) {
        console.log(e);
      }
    },
    [data, fetcherKey, putAuth],
  );

  const deleteBook = useCallback(
    async ({ id: id }) => {
      try {
        mutate(
          fetcherKey,
          data.filter((book) => book.id !== id),
          false,
        );
        await deleteAuth(BOOKS_ROUTE.DELETE(id));
        mutate(fetcherKey);
      } catch (e) {
        console.log(e);
      }
    },
    [data, deleteAuth, fetcherKey],
  );

  return {
    books: data,
    booksNames:
      data &&
      data.reduce((names, book) => {
        names[book.id] = book.name;
        return names;
      }, {}),
    isLoading: !error && !data,
    isError: error,
    addBook,
    modifyBook,
    deleteBook,
  };
};

export default useBooks;
