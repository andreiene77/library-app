/* eslint-disable no-console */
import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import { destroyer, getter, poster, putter } from '../utils/fetcher';
import { ACTIONS_ROUTE } from '../utils/apiRoutes';
import { useStudentContext } from '../contexts/studentContext';

export const useActions = ({ initialActions = [], users = [], books = [], notAdmin }) => {
  const url = notAdmin ? ACTIONS_ROUTE.GET.SELF() : ACTIONS_ROUTE.GET.ALL();
  const [{ accessToken }] = useStudentContext();

  const postAuth = useCallback((givenURL, body) => poster(givenURL, body, accessToken), [accessToken]);
  const putAuth = useCallback((givenURL, body) => putter(givenURL, body, accessToken), [accessToken]);
  const deleteAuth = useCallback((givenURL) => destroyer(givenURL, accessToken), [accessToken]);
  const fetcherKey = [url, accessToken];
  const { data, error } = useSWR(accessToken ? fetcherKey : null, getter);

  const addAction = useCallback(
    async ({ bookId }) => {
      try {
        await postAuth(ACTIONS_ROUTE.POST.MANUAL(), { userId: null, bookId });
        mutate(fetcherKey);
      } catch (e) {
        console.log(e);
      }
    },
    [fetcherKey, postAuth],
  );

  const modifyAction = useCallback(
    async (action) => {
      try {
        mutate(
          fetcherKey,
          data.map((b) => (action.id === b.id ? action : b)),
          false,
        );
        await putAuth(ACTIONS_ROUTE.PUT.MANUAL(), action);
        mutate(fetcherKey);
      } catch (e) {
        console.log(e);
      }
    },
    [data, fetcherKey, putAuth],
  );

  const deleteAction = useCallback(
    async ({ _id: id }) => {
      try {
        mutate(
          fetcherKey,
          data.filter((action) => action.id !== id),
          false,
        );
        await deleteAuth(ACTIONS_ROUTE.DELETE(id));
        mutate(fetcherKey);
      } catch (e) {
        console.log(e);
      }
    },
    [data, deleteAuth, fetcherKey],
  );

  return {
    actions: data,
    isLoading: !error && !data,
    isError: error,
    addAction,
    modifyAction,
    deleteAction,
    fetcherKey,
  };
};

export default useActions;
